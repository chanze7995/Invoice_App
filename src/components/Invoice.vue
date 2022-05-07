<template>
  <router-link class="invoice" :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }">
    <div class="invoice-info">
      <span class="tracking-number">#{{ invoice.invoiceId }}</span>
      <span class="due-date">{{ invoice.paymentDueDate }}</span>
      <span class="person">{{ invoice.clientName }}</span>
    </div>
    <div class="invoice-state">
      <span class="price">${{ invoice.invoiceTotal }}</span>
      <div
        class="status-button"
        :class="{ paid: invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending }"
      >
        <span v-if="invoice.invoicePaid">Paid</span>
        <span v-if="invoice.invoiceDraft">Draft</span>
        <span v-if="invoice.invoicePending">Pending</span>
      </div>
      <div class="icon">
        <img src="@/assets/icons/icon-arrow-right.svg" alt="" />
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'invoice',
  props: ['invoice']
}
</script>

<style lang="scss" scoped>
@import '@//assets/scss/components/_invoice.scss';
</style>
