import { createStore } from 'vuex'
import db from '../firebase/firebaseInit'

export default createStore({
  state: {
    invoiceData: [],
    isInvoiceModalOpen: false,
    isAlertModalActive: false,
    isInvoicesLoaded: null,
    currentInvoiceArray: null,
    isEditInvoiceClicked: null
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
    },
    setCurrentInvoiceArray (context, invoiceId) {
      // console.log('@1', invoiceId)
      context.commit('SET_CURRENT_INVOICE', invoiceId)
    },
    toggleEditInvoiceClicked (context) {
      context.commit('TOGGLE_EDIT_INVOICE')
    },
    async updateInvoice ({ commit, dispatch }, { docId, invoiceId }) {
      commit('DELETE_INVOICE', docId)
      await dispatch('getInvoiceData')
      commit('TOGGLE_INVOICE')
      commit('TOGGLE_EDIT_INVOICE')
      commit('SET_CURRENT_INVOICE', invoiceId)
    },
    async deleteInvoice ({ commit }, docId) {
      const getInvoice = db.collection('invoices').doc(docId)
      await getInvoice.delete()
      commit('DELETE_INVOICE', docId)
    },
    async updateStatusToPaid ({ commit }, docId) {
      const getInvoice = db.collection('invoices').doc(docId)
      await getInvoice.update({
        invoicePaid: true,
        invoicePending: false
      })
      commit('UPDATE_STATUS_TO_PAID', docId)
    },
    async updateStatusToPending ({ commit }, docId) {
      const getInvoice = db.collection('invoices').doc(docId)
      await getInvoice.update({
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false
      })
      commit('UPDATE_STATUS_TO_PENDING', docId)
    }
  },
  mutations: {
    SET_INVOICE_DATA (state, data) {
      state.invoiceData.push(data)
    },
    TOGGLE_INVOICE (state) {
      state.isInvoiceModalOpen = !state.isInvoiceModalOpen
    },
    TOGGLE_ALERT (state) {
      state.isAlertModalActive = !state.isAlertModalActive
    },
    SET_INVOICES_LOADED (state) {
      state.isInvoicesLoaded = true
    },
    SET_CURRENT_INVOICE (state, invoiceId) {
      console.log('@2', state.currentInvoiceArray)
      console.log('@22', state.invoiceData)
      console.log('@222', state.currentInvoiceArray = state.invoiceData.filter((invoice) => {
        return invoice.invoiceId === invoiceId
      }))
      state.currentInvoiceArray = state.invoiceData.filter((invoice) => {
        return invoice.invoiceId === invoiceId
      })
    },
    TOGGLE_EDIT_INVOICE (state) {
      state.isEditInvoiceClicked = !state.isEditInvoiceClicked
    },
    DELETE_INVOICE (state, docId) {
      state.invoiceData = state.invoiceData.filter(
        (invoice) => invoice.docId !== docId
      )
    },
    UPDATE_STATUS_TO_PAID (state, docId) {
      state.invoiceData.forEach((invoice) => {
        if (invoice.docId === docId) {
          invoice.invoicePaid = true
          invoice.invoicePending = false
        }
      })
    },
    UPDATE_STATUS_TO_PENDING (state, docId) {
      state.invoiceData.forEach((invoice) => {
        if (invoice.docId === docId) {
          invoice.invoicePaid = false
          invoice.invoicePending = true
          invoice.invoiceDraft = false
        }
      })
    }
  },
  getters: {
    invoiceData (state) {
      return state.invoiceData
    },
    isInvoiceModalOpen (state) {
      return state.isInvoiceModalOpen
    },
    isAlertModalActive (state) {
      return state.isAlertModalActive
    },
    isInvoicesLoaded (state) {
      console.log('!', state.isProductsLoaded)
      return state.isInvoicesLoaded
    },
    currentInvoiceArray (state) {
      return state.currentInvoiceArray
    },
    isEditInvoiceClicked (state) {
      return state.isEditInvoiceClicked
    }
  },
  modules: {}
})
