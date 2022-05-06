import { createStore } from 'vuex'
import db from '../firebase/firebaseInit'

export default createStore({
  state: {
    invoiceData: [],
    isInvoiceModalOpen: false,
    isAlertModalActive: false,
    isInvoicesLoaded: null
  },
  actions: {
    async getInvoiceData ({ commit, state }) {
      const getData = db.collection('invoices')
      const results = await getData.get()
      results.forEach((doc) => {
        if (!state.invoiceData.some((invoice) => invoice.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid
          }
          commit('SET_INVOICE_DATA', data)
        }
      })
      commit('SET_INVOICES_LOADED')
    },
    toggleInvoiceModalOpen (context) {
      context.commit('TOGGLE_INVOICE')
    },
    toggleAlertModalActive (context) {
      context.commit('TOGGLE_ALERT')
    }
  },
  mutations: {
    SET_INVOICE_DATA (state, payload) {
      state.invoiceData.push(payload)
      console.log(state.invoiceData)
    },
    SET_INVOICES_LOADED (state) {
      state.isInvoicesLoaded = true
    },
    TOGGLE_INVOICE (state) {
      state.isInvoiceModalOpen = !state.isInvoiceModalOpen
    },
    TOGGLE_ALERT (state) {
      state.isAlertModalActive = !state.isAlertModalActive
    }
  },
  getters: {
    invoiceData (state) {
      return state.invoiceData
    },
    isInvoicesLoaded (state) {
      return state.isInvoicesLoaded
    },
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
