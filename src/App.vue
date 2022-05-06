<template>
  <div v-if="isInvoicesLoaded">
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
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import InvoiceModal from '@/components/InvoiceModal.vue'
import AlertModal from '@/components/AlertModal.vue'

import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    Navigation,
    InvoiceModal,
    AlertModal
  },
  setup () {
    const store = useStore()

    const getInvoiceData = () => {
      return store.dispatch('getInvoiceData')
    }
    const isInvoicesLoaded = computed(() => {
      return store.getters.isInvoicesLoaded
    })
    const isInvoiceModalOpen = computed(() => {
      return store.getters.isInvoiceModalOpen
    })
    const isAlertModalActive = computed(() => {
      return store.getters.isAlertModalActive
    })
    onMounted(() => {
      getInvoiceData()
    })
    return {
      isInvoicesLoaded,
      isInvoiceModalOpen,
      isAlertModalActive
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_app.scss';
</style>
