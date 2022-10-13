<template>
  <div v-if="isInvoicesLoaded">
    <div  v-if="!mobileDevice" class="app">
      <Navigation />
      <div class="appContainer">
        <AlertModal v-if="isAlertModalActive"/>
        <transition name="invoiceModal">
          <InvoiceModal v-if="isInvoiceModalOpen"/>
        </transition>
        <router-view />
      </div>
    </div>
    <div v-else class="mobile-message">
      <img src="@/assets/images/invoice-dollar.png" alt="">
      <h2>此應用程式尚未支援手機裝置</h2>
      <p>請使用電腦或平板裝置，以開啟此應用程式</p>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import InvoiceModal from '@/components/InvoiceModal.vue'
import AlertModal from '@/components/AlertModal.vue'

import { ref, computed, onMounted, onUnmounted } from 'vue'
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
    const mobileDevice = ref(null)
    const checkWidth = () => {
      const width = window.innerWidth
      if (width <= 750) {
        mobileDevice.value = true
      } else {
        mobileDevice.value = false
      }
    }

    onMounted(() => {
      getInvoiceData()
      checkWidth()
      window.addEventListener('resize', checkWidth)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', checkWidth)
    })
    return {
      isInvoicesLoaded,
      isInvoiceModalOpen,
      isAlertModalActive,
      mobileDevice
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_app.scss';
</style>
