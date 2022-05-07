import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import InvoiceInfoView from '../views/InvoiceInfoView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/invoice/:invoiceId',
    name: 'Invoice',
    component: InvoiceInfoView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
