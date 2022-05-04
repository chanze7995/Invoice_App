<template>
  <div class="app">
    <Navigation />
    <div class="appContainer">
      <!-- <AlertModal v-if="isAlertModalActive"/> -->
      <!-- <transition name="invoiceModal">
        <InvoiceModal v-if="isInvoiceModalOpen"/>
      </transition> -->
      <InvoiceModal v-if="isInvoiceModalOpen"/>
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import InvoiceModal from '@/components/InvoiceModal.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  components: {
    Navigation,
    InvoiceModal
  },
  setup () {
    const store = useStore()

    const isInvoiceModalOpen = computed(() => {
      return store.getters.isInvoiceModalOpen
    })

    return {

      isInvoiceModalOpen
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_app.scss';
</style>
