import { createStore } from 'vuex'

export default createStore({
  state: {
    isInvoiceModalOpen: false,
    isAlertModalActive: false
  },
  actions: {
    toggleInvoiceModalOpen (context) {
      context.commit('TOGGLE_INVOICE')
    },
    toggleAlertModalActive (context) {
      context.commit('TOGGLE_ALERT')
    }
  },
  mutations: {
    TOGGLE_INVOICE (state) {
      state.isInvoiceModalOpen = !state.isInvoiceModalOpen
    },
    TOGGLE_ALERT (state) {
      state.isAlertModalActive = !state.isAlertModalActive
    }
  },
  getters: {
    isInvoiceModalOpen (state) {
      return state.isInvoiceModalOpen
    },
    isAlertModalActive (state) {
      return state.isAlertModalActive
    }
  },
  modules: {
  }
})
