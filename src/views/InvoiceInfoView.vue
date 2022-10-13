<template>
  <div v-if="currentInvoiceInfo" class="invoice-view">
    <router-link class="nav-link" :to="{ name: 'Home' }">
      <img src="@/assets/icons/icon-arrow-left.svg" alt="" /> Go Back
    </router-link>
    <div class="header">
      <div class="status">
        <span>Status</span>
        <div
          class="status-button"
          :class="{
            paid: currentInvoiceInfo.invoicePaid,
            draft: currentInvoiceInfo.invoiceDraft,
            pending: currentInvoiceInfo.invoicePending,
          }"
        >
          <span v-if="currentInvoiceInfo.invoicePaid">Paid</span>
          <span v-if="currentInvoiceInfo.invoiceDraft">Draft</span>
          <span v-if="currentInvoiceInfo.invoicePending">Pending</span>
        </div>
      </div>
      <div class="buttons">
        <button @click="toggleEditInvoice" class="dark-primary-color">Edit</button>
        <button @click="deleteInvoice(currentInvoiceInfo.docId)" class="warning-color">Delete</button>
        <button @click="updateStatusToPaid(currentInvoiceInfo.docId)" v-if="currentInvoiceInfo.invoicePending" class="pass-color">
          Mark as Paid
        </button>
        <button
          v-if="currentInvoiceInfo.invoiceDraft || currentInvoiceInfo.invoicePaid"
          @click="updateStatusToPending(currentInvoiceInfo.docId)"
          class="caution-color"
        >
          Mark as Pending
        </button>
      </div>
    </div>
    <div class="invoice-details">
      <div class="title-container">
        <div class="invoice-title">
          <p><span>#</span>{{ currentInvoiceInfo.invoiceId }}</p>
          <p>{{ currentInvoiceInfo.productDescription }}</p>
        </div>
        <div class="biller-info">
          <p>{{ currentInvoiceInfo.billerStreetAddress }}</p>
          <p>{{ currentInvoiceInfo.billerCity }}</p>
          <p>{{ currentInvoiceInfo.billerZipCode }}</p>
          <p>{{ currentInvoiceInfo.billerCountry }}</p>
        </div>
      </div>
      <div class="info-container">
        <div class="payment">
          <h4>Invoice Date</h4>
          <p>
            {{ currentInvoiceInfo.invoiceDate }}
          </p>
          <h4>Payment Date</h4>
          <p>
            {{ currentInvoiceInfo.paymentDueDate }}
          </p>
        </div>
        <div class="bill">
          <h4>Bill To</h4>
          <p>{{ currentInvoiceInfo.clientName }}</p>
          <p>{{ currentInvoiceInfo.clientStreetAddress }}</p>
          <p>{{ currentInvoiceInfo.clientCity }}</p>
          <p>{{ currentInvoiceInfo.clientZipCode }}</p>
          <p>{{ currentInvoiceInfo.clientCountry }}</p>
        </div>
        <div class="send-to">
          <h4>Sent To</h4>
          <p>{{ currentInvoiceInfo.clientEmail }}</p>
        </div>
      </div>
      <div class="item-container">
        <div class="billing-items">
          <div class="heading">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div v-for="(item, index) in currentInvoiceInfo.invoiceItemList" :key="index" class="item">
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>
        </div>
        <div class="total">
          <p>Amount Due</p>
          <p>{{ currentInvoiceInfo.invoiceTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'invoiceInfoView',
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const setCurrentInvoiceInfo = () => {
      const invoiceId = route.params.invoiceId
      store.dispatch('setCurrentInvoiceArray', invoiceId)
    }
    const currentInvoiceInfo = computed(() => {
      // console.log('2', store.getters.currentInvoiceArray)

      return store.getters.currentInvoiceArray[0]
    })
    // console.log('3', currentInvoiceInfo.value)

    const toggleEditInvoice = () => {
      store.dispatch('toggleEditInvoiceClicked')
      store.dispatch('toggleInvoiceModalOpen')
    }

    const deleteInvoice = async (docId) => {
      await store.dispatch('deleteInvoice', docId)
      router.push({ name: 'Home' })
    }

    const updateStatusToPaid = (docId) => {
      store.dispatch('updateStatusToPaid', docId)
    }

    const updateStatusToPending = (docId) => {
      store.dispatch('updateStatusToPending', docId)
    }

    setCurrentInvoiceInfo()

    return {
      currentInvoiceInfo,
      toggleEditInvoice,
      deleteInvoice,
      updateStatusToPaid,
      updateStatusToPending
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/_invoiceInfoView.scss';
</style>
