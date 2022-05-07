<template>
  <div class="home">
    <div class="header">
      <div class="headerTitle">
        <h1>INVOICES</h1>
        <span>There are {{invoiceData.length}} total invoices</span>
      </div>
      <div class="headerFnContainer">
        <div @click="toggleFilterMenu" class="filter">
          <span>Filter by status</span>
          <img src="@/assets/icons/icon-arrow-down.svg" alt="" />
          <ul v-show="isFilterMenuOpen" class="filter-menu">
            <li @click="filteredInvoices">Draft</li>
            <li @click="filteredInvoices">Pending</li>
            <li @click="filteredInvoices">Paid</li>
            <li @click="filteredInvoices">Clear Filter</li>
          </ul>
        </div>
        <div @click="newInvoiceModal" class="button">
          <div class="inner-button">
            <img src="@/assets/icons/icon-plus.svg" alt="" />
          </div>
          <span>New Invoice</span>
        </div>
      </div>
    </div>
    <div v-if="invoiceData.length > 0">
      <!-- <Invoice v-for="(invoice, index) in filteredData" :invoice="invoice" :key="index" /> -->
      <Invoice v-for="(invoice, index) in invoiceData" :invoice="invoice" :key="index" />
    </div>
    <div v-else class="empty">
      <img src="@/assets/images/illustration-empty.svg" alt="" />
      <h3>There is nothing here</h3>
      <p>Create a new invoice by clicking the New Invoice button and get started</p>
    </div>
  </div>
</template>

<script>
import Invoice from '../components/Invoice.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  components: {
    Invoice
  },
  setup () {
    const store = useStore()
    const isFilterMenuOpen = ref(false)
    const toggleFilterMenu = () => {
      isFilterMenuOpen.value = !isFilterMenuOpen.value
    }
    const newInvoiceModal = () => {
      store.dispatch('toggleInvoiceModalOpen')
    }
    const invoiceData = computed(() => {
      return store.getters.invoiceData
    })
    return {
      isFilterMenuOpen,
      toggleFilterMenu,
      newInvoiceModal,
      invoiceData
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/views/_home.scss';
</style>
