import { createStore } from 'vuex'

export default createStore({
  state: {
    isInvoiceModalOpen: false
  },
  actions: {
    toggleInvoiceModalOpen (context) {
      context.commit('TOGGLE_INVOICE')
    }
  },
  mutations: {
    TOGGLE_INVOICE (state) {
      state.isInvoiceModalOpen = !state.isInvoiceModalOpen
    }
  },
  getters: {
    isInvoiceModalOpen (state) {
      return state.isInvoiceModalOpen
    }
  },
  modules: {
  }
})
