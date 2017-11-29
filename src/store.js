import Vue from 'vue'
import Vuex from 'vuex'
import {
  init, get, insert, update, getPublicNames, createPublicName,
  mintCoins, sendTxNotif, loadWalletData, storeCoinsToWallet, readTxInboxData, createWallet, createTxInbox, transferCoin
} from './websafe'
// import safeCoins from 'safe-coins-wallet'
import router from './router'

const coinTagType = 21082018
const inboxTagType = 20082018
const walletTagType = 1012017
let appInfo = {
  id: 'plimst.moinhodigital.0.1',
  name: 'Plimst',
  vendor: 'Plimst'
}
const perms = {
  _public: ['Read', 'Insert', 'Update', 'Delete'],
  _publicNames: ['Read', 'Insert', 'Update', 'Delete']
}
const idsInfo = {
  key: 'ownContainer',
  tagType: walletTagType,
  name: 'Wallet Ids',
  description: 'Container to store user wallet ids'
}
let walletInfo = {
  name: 'Wallet',
  description: 'Container to receive notifications for wallet transactions',
  key: '__coins',
  tagType: walletTagType
}
let inboxInfo = {
  key: '__tx_enc_pk',
  metadataKey: '_metadata',
  name: 'Transaction Inbox',
  description: 'Container to receive notifications of transactions',
  tagType: inboxTagType
}
let assetInfo = {
  key: 'coin-data',
  tagType: coinTagType
}
let assetRegistry = {
  name: 'Asset registry',
  description: 'Container to save new unique assets',
  key: 'asset-list',
  tagType: 66606
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    handles: {
      appHandle: null,
      authUri: null
    },
    data: {
      publicNames: null,
      inboxData: [],
      walletList: null,
      coins: [],
      assetIndex: 0,
      wallet: null
    },
    modals: {
      menu: false,
      about: false
    },
    inputs: {
      authForm: 'Satoshi Nakamoto',
      authenticating: false,
      authError: null,
      assetForm: { asset: 'BTC', quantity: 3 },
      creatingAsset: false,
      assetError: null,
      transferForm: { receiver: 'User Public Name', quantity: 0 },
      transfering: false,
      transferError: {
        hasAmount: false,
        exists: false
      }
    }
  },
  getters: {
    walletData: state => {
      // Hack to merge coins with same name
      const walletCoins = state.data.coins
        .reduce((prev, coin) => {
          const assetIndex = prev.findIndex(i => i.name === coin.asset)
          if (assetIndex === -1) {
            return prev.concat({ name: coin.asset, quantity: 1 })
          }
          prev[assetIndex].quantity = prev[assetIndex].quantity + 1
          return prev
        }, [])
      if (walletCoins.length < 1) return [{ name: 'PLIMST', quantity: 0 }]
      else return walletCoins
    },
    currentAsset: (state, getters) => {
      const index = state.data.assetIndex
      return getters.walletData[index]
    }
  },
  mutations: {
    init: (state, payload) => {
      const { appHandle, authUri } = payload
      state.handles.authUri = authUri
      state.handles.appHandle = appHandle
    },
    resetId: (state) => {
      state.data = {
        publicNames: null,
        inboxData: [],
        walletList: null,
        coins: [],
        assetIndex: 0,
        wallet: null
      }
    },
    setPublicNames: (state, payload) => {
      state.data.publicNames = payload
    },
    setId: (state, payload) => {
      state.data.id = payload
    },
    coins: (state, payload) => {
      state.data.coins = payload
    },
    assetIndex: (state, payload) => {
      state.data.assetIndex = payload
    },
    toggleMenuModal: (state, payload) => {
      state.modals.menu = payload
    },
    toggleAboutModal: (state) => {
      state.modals.about = !state.modals.about
    },
    authForm: (state, payload) => {
      state.inputs.authForm = payload
    },
    authenticating: (state, payload) => {
      state.inputs.authenticating = payload
    },
    authError: (state, payload) => {
      state.inputs.authError = payload
    },
    assetForm: (state, payload) => {
      state.inputs.assetForm = payload
    },
    creatingAsset: (state, payload) => {
      state.inputs.creatingAsset = payload
    },
    assetError: (state, payload) => {
      state.inputs.assetError = payload
    },
    transferForm: (state, payload) => {
      state.inputs.assetForm = payload
    },
    transfering: (state, payload) => {
      console.log('CHANGING TRAs', payload)
      state.inputs.transfering = payload
    },
    transferError: (state, payload) => {
      state.inputs.transferError = payload
    },
    setWalletList: (state, payload) => {
      state.data.walletList = payload
    },
    setWallet: (state, payload) => {
      state.data.wallet = payload
    },
    setPk: (state, payload) => {
      state.data.pk = payload
    },
    setInbox: (state, payload) => {
      state.data.inbox = payload
    },
    inboxData: (state, payload) => {
      state.data.inboxData = payload
    },
    updateWalletIds: (state, payload) => {
      payload.map(wallet => state.data.walletIds.push(wallet))
    }
  },
  actions: {
    async init ({ commit }) {
      const { appHandle, authUri } = await init(appInfo, perms, true)
      commit('init', { appHandle, authUri })
    },
    async getPublicNames ({ commit, state }) {
      const publicNames = await getPublicNames(state.handles.appHandle)
      commit('setPublicNames', publicNames)
    },
    async createPublicName ({ commit, state, dispatch }) {
      const { handles: { appHandle }, inputs: { authForm } } = state
      commit('authenticating', true)
      const request = await createPublicName(appHandle, authForm)
      if (request.success) {
        await dispatch('getPublicNames')
        await commit('authenticating', false)
        router.push(authForm)
      } else {
        commit('authError', request.error)
        commit('authenticating', false)
      }
    },
    async createWallet ({ commit, state }, id) {
      const { appHandle } = state.handles
      try {
        const wallet = await createWallet(appHandle, id, walletInfo)
        const inbox = await createTxInbox(appHandle, id, inboxInfo)
        let rawData = {
          serialised: wallet,
          pk: inbox.pk,
          sk: inbox.sk,
          lastUpdate: new Date().toUTCString()
        }
        const serialisedData = JSON.stringify(rawData)
        const saveWallet = await insert(appHandle, idsInfo, { [id]: serialisedData })
        if (!saveWallet.error) {
          const rawWalletList = await get(appHandle, idsInfo.key, idsInfo.tagType)
          let walletList = []
          await Promise.all(rawWalletList.map((item) => {
            let parsed = JSON.parse(Object.values(item)[0])
            parsed.id = Object.keys(item)[0]
            walletList.push(parsed)
          }))
          await loadWalletData(appHandle, wallet, walletInfo.key)
          rawData.id = id
          commit('setWallet', rawData)
          commit('setWalletList', walletList)
        }
      } catch (err) {
        console.log('Error creating wallet: ', err)
      }
    },
    async setWalletList ({ commit, state }, raw) {

    },
    async changeAsset ({commit, state}, index) {
      commit('assetIndex', index)
    },
    async selectWallet ({commit, state}, id) {
      const { data: { walletList }, handles: { appHandle } } = state
      let receivedCoins = []
      let wallet
      try {
        await Promise.all(walletList
          .filter((wallet) => wallet.id === id)
          .map((selected) => {
            wallet = selected
          }))
        console.log('Wallet', id, walletList)
        const pk = wallet.id
        inboxInfo.encPk = wallet.pk
        inboxInfo.encSk = wallet.sk
        const inboxData = await readTxInboxData(appHandle, pk, inboxInfo)
        // Check for new transactions
        await Promise.all(inboxData
          .filter((tx) => {
            console.log('New transaction: ', new Date(tx.date) > new Date(wallet.lastUpdate))
            return new Date(tx.date) > new Date(wallet.lastUpdate)
          })
          .map(async (tx) => {
            console.log('New transactions', tx)
            tx.coinIds.map(coin => receivedCoins.push({ xorName: coin, asset: tx.asset }))
          })
        )
        // Load wallet data
        let coins = await loadWalletData(appHandle, wallet.serialised, walletInfo.key)
        // Update wallet data with received coins, store in wallet and update lastUpdate on IDs
        if (receivedCoins.length > 0) {
          console.log('receivedCoins', receivedCoins)
          receivedCoins.map(coin => coins.push(coin))
          console.log('All coins', coins)
          await storeCoinsToWallet(appHandle, wallet.serialised, coins, walletInfo.key)
          wallet.lastUpdate = new Date().toUTCString()
          await update(appHandle, idsInfo.key, idsInfo.tagType, wallet.id, wallet)
        }
        commit('coins', coins)
        commit('inboxData', inboxData)
        commit('setWallet', wallet)
      } catch (err) {
        console.log('Error selecting wallet', err)
      }
    },
    async selectId ({ commit, state, dispatch }) {
      try {
        const { handles: { appHandle }, route: { params: { id } } } = state
        const rawWalletList = await get(appHandle, idsInfo.key, idsInfo.tagType)
        let walletList = []
        await Promise.all(rawWalletList.map((item) => {
          let parsed = JSON.parse(Object.values(item)[0])
          parsed.id = Object.keys(item)[0]
          walletList.push(parsed)
        }))
        // const sortedList = walletList.sort((a, b) => walletList.lastUpdate[a] - walletList.lastUpdate[b])
        await commit('setWalletList', walletList)
        const wallet = walletList.findIndex(wallet => wallet.id === id)
        if (wallet === -1) {
          await dispatch('createWallet', id)
        }
        dispatch('selectWallet', id)
      } catch (err) {
        console.log('Error on selecting id:', err)
      }
    },
    async createAsset ({ commit, state }) {
      const { handles: { appHandle }, data: { wallet, coins }, inputs: { assetForm: { asset, quantity } } } = state
      commit('creatingAsset', true)
      try {
        console.log(`Minting ${quantity} coins for ${wallet.id}`)
        const newAsset = await insert(appHandle, assetRegistry, { [asset]: quantity })
        if (!newAsset.error) {
          const newCoins = await mintCoins(appHandle, wallet.id, assetInfo, asset, quantity)
          const newList = coins.concat(newCoins)
          console.log('New list ', newList)
          console.log('Notifying coins transfer to recipient\'s wallet inbox...')
          await storeCoinsToWallet(appHandle, wallet.serialised, newList, walletInfo.key)
          const txId = await sendTxNotif(appHandle, wallet.id, newCoins, inboxInfo, asset, 'minted')
          let newValue = wallet
          newValue.lastUpdate = new Date().toUTCString()
          await update(appHandle, idsInfo.key, idsInfo.tagType, wallet.id, newValue)
          console.log(`Asset coins minted!`, txId)
          inboxInfo.encPk = wallet.pk
          inboxInfo.encSk = wallet.sk
          const inboxData = await readTxInboxData(appHandle, wallet.id, inboxInfo)
          const updatedCoins = await loadWalletData(appHandle, wallet.serialised, walletInfo.key)
          await commit('inboxData', inboxData)
          await commit('coins', updatedCoins)
          router.push(`/${wallet.id}/send`)
          commit('creatingAsset', false)
        } else {
          commit('assetError', newAsset.error)
          commit('creatingAsset', false)
        }
      } catch (err) {
        commit('assetError', err.toString())
        commit('creatingAsset', false)
      }
    },
    async transferAssets ({ commit, state, getters }) {
      const { handles: { appHandle }, data: { wallet, coins }, inputs: { transferForm: { quantity, receiver } } } = state
      const { currentAsset } = getters
      const asset = currentAsset.name
      let transferedCoinIds = []
      await commit('transfering', true)
      if (quantity > 0 && quantity <= currentAsset.quantity) {
        console.log(`Transfering ${quantity} ${asset}s to ${receiver}`)
        const checkUser = true
        if (checkUser.error) {
          commit('transferError', { exists: checkUser.error })
          commit('transfering', false)
        } else {
          await Promise.all(coins
            .filter(coin => coin.asset === asset)
            .map(async (coin, index) => {
              const coinInfo = {
                asset,
                xorName: coin.xorName,
                key: assetInfo.key,
                tagType: assetInfo.tagType
              }
              if (index + 1 <= quantity) {
                const transfer = await transferCoin(appHandle, wallet.id, wallet.sk, coinInfo, receiver)
                if (transfer) {
                  transferedCoinIds.push(coin.xorName)
                }
              }
            })
          )
          console.log('transferedCoinIds', transferedCoinIds)
          console.log('coins', coins)
          const toRemoveMap = transferedCoinIds.reduce((memo, item) => {
            memo[item] = memo[item] || true
            return memo
          }, {})
          const newValue = await Promise.all(coins.filter(coin => !toRemoveMap[coin.xorName]))
          console.log('New value to store', newValue)
          await storeCoinsToWallet(appHandle, wallet.serialised, newValue, walletInfo.key)
          const subsTx = await sendTxNotif(appHandle, wallet.id, transferedCoinIds, inboxInfo, asset, 'sent')
          wallet.lastUpdate = new Date().toUTCString()
          await update(appHandle, idsInfo.key, idsInfo.tagType, wallet.id, wallet)
          const addTx = await sendTxNotif(appHandle, receiver, transferedCoinIds, inboxInfo, asset, 'received')
          console.log('Transaction TX id:', subsTx, addTx)
          const inboxData = await readTxInboxData(appHandle, wallet.id, inboxInfo)
          const updatedCoins = await loadWalletData(appHandle, wallet.serialised, walletInfo.key)
          await commit('inboxData', inboxData)
          await commit('coins', updatedCoins)
          await commit('transfering', false)
          await commit('transferForm', {
            receiver: '',
            quantity: 0
          })
        }
      } else {
        commit('transferError', { hasAmount: true })
        commit('transfering', false)
      }
    },
    resetId ({ commit }) {
      commit('resetId')
      router.push('/auth')
      commit('toggleMenuModal', false)
    }
  }
})
