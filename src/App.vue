<template>
  <div class="app">
    <Navigation />
    <div class="appContainer">
      <AlertModal v-if="isAlertModalActive"/>
      <transition name="invoiceModal">
        <InvoiceModal v-if="isInvoiceModalOpen"/>
      </transition>
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import InvoiceModal from '@/components/InvoiceModal.vue'
import AlertModal from '@/components/AlertModal.vue'

import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    Navigation,
    InvoiceModal,
    AlertModal
  },
  setup () {
    const store = useStore()

    const isInvoiceModalOpen = computed(() => {
      return store.getters.isInvoiceModalOpen
    })
    const isAlertModalActive = computed(() => {
      return store.getters.isAlertModalActive
    })
    return {
      isInvoiceModalOpen,
      isAlertModalActive
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_app.scss';
</style>
