<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap">
    <form @submit.prevent="submitForm" class="invoice-content">
      <h2 >New Invoice</h2>

      <!-- Bill From -->
      <div class="bill-from">
        <h3>Bill From</h3>
        <div class="input">
          <label for="billerStreetAddress">Street Address</label>
          <input required type="text" id="billerStreetAddress" v-model="invoiceModalInfo.billerStreetAddress" />
        </div>
        <div class="location-details">
          <div class="input">
            <label for="billerCity">City</label>
            <input required type="text" id="billerCity" v-model="invoiceModalInfo.billerCity" />
          </div>
          <div class="input">
            <label for="billerZipCode">Zip Code</label>
            <input required type="text" id="billerZipCode" v-model="invoiceModalInfo.billerZipCode" />
          </div>
          <div class="input">
            <label for="billerCountry">Country</label>
            <input required type="text" id="billerCountry" v-model="invoiceModalInfo.billerCountry" />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-to">
        <h3>Bill To</h3>
        <div class="input">
          <label for="clientName">Client's Name</label>
          <input required type="text" id="clientName" v-model="invoiceModalInfo.clientName" />
        </div>
        <div class="input">
          <label for="clientEmail">Client's Email</label>
          <input required type="text" id="clientEmail" v-model="invoiceModalInfo.clientEmail" />
        </div>
        <div class="input">
          <label for="clientStreetAddress">Street Address</label>
          <input required type="text" id="clientStreetAddress" v-model="invoiceModalInfo.clientStreetAddress" />
        </div>
        <div class="location-details flex">
          <div class="input">
            <label for="clientCity">City</label>
            <input required type="text" id="clientCity" v-model="invoiceModalInfo.clientCity" />
          </div>
          <div class="input">
            <label for="clientZipCode">Zip Code</label>
            <input required type="text" id="clientZipCode" v-model="invoiceModalInfo.clientZipCode" />
          </div>
          <div class="input">
            <label for="clientCountry">Country</label>
            <input required type="text" id="clientCountry" v-model="invoiceModalInfo.clientCountry" />
          </div>
        </div>
      </div>

      <!-- Invoice Work Details -->
      <div class="invoice-work">
        <div class="payment">
          <div class="input">
            <label for="invoiceDate">Invoice Date</label>
            <input disabled type="text" id="invoiceDate" v-model="invoiceModalInfo.invoiceDate" />
          </div>
          <div class="input">
            <label for="paymentDueDate">Payment Due</label>
            <input disabled type="text" id="paymentDueDate" v-model="invoiceModalInfo.paymentDueDate" />
          </div>
        </div>
        <div class="input">
          <label for="paymentTerms">Payment Terms</label>
          <select required id="paymentTerms" v-model="invoiceModalInfo.paymentTerms">
            <option value="30">30日後</option>
            <option value="60">60日後</option>
          </select>
        </div>
        <div class="input">
          <label for="productDescription">Product Description</label>
          <input required type="text" id="productDescription" v-model="invoiceModalInfo.productDescription" />
        </div>
        <div class="work-items">
          <h3>Item List</h3>
          <table class="item-list">
            <tr class="table-heading">
              <th class="item-name">Item Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>
            <tr class="table-items" v-for="(item, index) in invoiceModalInfo.invoiceItemList" :key="index">
              <td class="item-name"><input type="text" v-model="item.itemName" /></td>
              <td class="qty"><input type="text" v-model="item.qty" /></td>
              <td class="price"><input type="text" v-model="item.price" /></td>
              <td class="total">${{ (item.total = item.qty * item.price) }}</td>
              <img @click="deleteInvoiceItem(item.id)" src="@/assets/icons/icon-delete.svg" alt="" />
            </tr>
          </table>

          <div @click="addNewInvoiceItem" class="button">
            <img src="@/assets/icons/icon-plus.svg" alt="" class="plus-icon"/>
            Add New Item
          </div>
        </div>
      </div>

      <!-- Save/Exit -->
      <div class="btnContainer">
        <div class="cancel-btn">
          <button type="button" @click="closeInvoiceModal" class="warning-color">Cancel</button>
        </div>
        <div class="keep-btn">
          <button v-if="!editInvoice" type="submit" @click="saveDraft" class="dark-primary-color">Save Draft</button>
          <button v-if="!editInvoice" type="submit" @click="publishInvoice" class="primary-color">Create Invoice</button>
          <button v-if="editInvoice" type="submit" class="primary-color">Update Invoice</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'InvoiceModal',
  setup () {
    const store = useStore()

    const invoiceModalInfo = reactive({
      dateOptions: { year: 'numeric', month: 'short', day: 'numeric' },
      docId: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0
    })
    const closeInvoiceModal = () => {
      store.dispatch('toggleInvoiceModalOpen')
    }

    invoiceModalInfo.invoiceDateUnix = Date.now()
    invoiceModalInfo.invoiceDate = new Date(invoiceModalInfo.invoiceDateUnix).toLocaleDateString('zh-tw', invoiceModalInfo.dateOptions)// 台灣格式
    // invoiceModalInfo.invoiceDate = new Date(invoiceModalInfo.invoiceDateUnix).toLocaleDateString('en-us', invoiceModalInfo.dateOptions)

    watch(() => invoiceModalInfo.paymentTerms, () => {
      const futureDate = new Date()
      invoiceModalInfo.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(invoiceModalInfo.paymentTerms))
      invoiceModalInfo.paymentDueDate = new Date(invoiceModalInfo.paymentDueDateUnix).toLocaleDateString('zh-tw', invoiceModalInfo.dateOptions)// 台灣格式
      // invoiceModalInfo.paymentDueDate = new Date(invoiceModalInfo.paymentDueDateUnix).toLocaleDateString('en-us', invoiceModalInfo.dateOptions)
    })

    return {
      invoiceModalInfo,
      closeInvoiceModal
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_invoiceModal.scss';
</style>
