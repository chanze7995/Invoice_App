<template>
  <div class="modal">
    <div class="modal-content">
      <p>Are you sure you want to exit? Your changes will not be saved?</p>
      <div class="actions">
        <button @click="closeAlertModal" class="primary-color">Return</button>
        <button @click="closeInvoiceModal" class="warning-color">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'AlertModal',
  setup () {
    const store = useStore()
    const closeAlertModal = () => {
      store.dispatch('toggleAlertModalActive')
    }
    const closeInvoiceModal = () => {
      store.dispatch('toggleAlertModalActive')
      store.dispatch('toggleInvoiceModalOpen')
    }

    return {
      closeAlertModal,
      closeInvoiceModal
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_alertmodal.scss';
</style>
