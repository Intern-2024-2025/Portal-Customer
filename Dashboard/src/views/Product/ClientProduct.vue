<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ProductAPI from '@/api/product'
import API from '@/api/auth'
import router from '@/router/index'
import NameProduct from '@/components/Product/NameProduct.vue'
import KeyProduct from '@/components/Product/KeyProduct.vue'

const pageTitle = ref('Product')

type Product = {
  id: string
  name: string
  csr_key: string
  password: string
  postman_pem: string
  slot_id: string
  keyId:any
  status: boolean
  call_api: Number
  count_trial: Number
  createdAt: any
}
const dataProduct = ref<Product>()

const getProductClient = async () => {
  try {
    const resposne = await ProductAPI.getProductClient()
    console.log(resposne.data)
    dataProduct.value = resposne.data
  } catch (error) {
    console.log('get product failed', error)
  }
}

const chekVerification = async () => {
  try {
    const token = localStorage.getItem("token")
    const response = await API.fetch(token)
    if (response.data.verificationData == 'not_verifed') {
      router.push('/auth/verify-acc')
    } else if (response.data.verificationData == 'process') {
      router.push('/waiting-list')
    } else {
      router.push('/product')
    }
  } catch (error) {
    console.log('fetch clint product', error)
  }
}

// console.log("data", dataProduct)
onMounted(() => {
  chekVerification()
  getProductClient()
})
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <NameProduct :dataProduct="dataProduct"/>
    <KeyProduct :dataProduct="dataProduct"/>
  </DefaultLayout>
</template>
