<template>
  <div class="app">
    <Navigation />
    <div class="appContainer">
      <!-- <AlertModal v-if="isAlertModalActive"/> -->
      <!-- <transition name="invoiceModal">
        <InvoiceModal v-if="isInvoiceModalOpen"/>
      </transition> -->
      <InvoiceModal />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import InvoiceModal from '@/components/InvoiceModal.vue'

export default {
  components: {
    Navigation,
    InvoiceModal
  },
  setup () {

  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_app.scss';
</style>
