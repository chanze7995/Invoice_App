<template>
  <div class="home">
    <!-- Header -->
    <div class="header">
      <div class="headerTitle">
        <h1>INVOICES</h1>
        <span>There are 3 total invoices</span>
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
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Home',
  components: {
  },
  setup () {
    const isFilterMenuOpen = ref(false)
    const toggleFilterMenu = () => {
      isFilterMenuOpen.value = !isFilterMenuOpen.value
    }
    return {
      isFilterMenuOpen,
      toggleFilterMenu
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/views/_home.scss';
</style>
