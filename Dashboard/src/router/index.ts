import { createRouter, createWebHistory } from 'vue-router'

import SigninView from '@/views/Authentication/SigninView.vue'
import SignupView from '@/views/Authentication/SignupView.vue'
import CalendarView from '@/views/CalendarView.vue'
import BasicChartView from '@/views/Charts/BasicChartView.vue'
import Dashboard from '@/views/Dashboard/DashboardView.vue'
import FormElementsView from '@/views/Forms/FormElementsView.vue'
import FormLayoutView from '@/views/Forms/FormLayoutView.vue'
import SettingsView from '@/views/Pages/SettingsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TablesView from '@/views/TablesView.vue'
import AlertsView from '@/views/UiElements/AlertsView.vue'
import ButtonsView from '@/views/UiElements/ButtonsView.vue'
import ResetView from '@/views/Authentication/ResetView.vue'
import VerificationView from '@/views/Authentication/VerificationView.vue'
import ClientProduct from '@/views/Product/ClientProduct.vue'
import ClientTransaction from '@/views/Transaction/ClientTransaction.vue'
import ExampleAppClient from '@/views/ExampleApp/ExampleAppClient.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      title: 'Dashboard'
    }
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
    meta: {
      title: 'Calendar'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/forms/form-elements',
    name: 'formElements',
    component: FormElementsView,
    meta: {
      title: 'Form Elements'
    }
  },
  {
    path: '/forms/form-layout',
    name: 'formLayout',
    component: FormLayoutView,
    meta: {
      title: 'Form Layout'
    }
  },
  {
    path: '/tables',
    name: 'tables',
    component: TablesView,
    meta: {
      title: 'Tables'
    }
  },
  {
    path: '/product',
    name: 'Product',
    component: ClientProduct,
    meta: {
      title: 'Client Product'
    }
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: ClientTransaction,
    meta: {
      title: 'Client Transaction '
    }
  },
  // {
  //   path: '/example-app',
  //   name: 'Example App',
  //   component: ExampleAppClient,
  //   meta: {
  //     title: 'Example App '
  //   }
  // },
  {
    path: '/pages/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: 'Settings'
    }
  },
  {
    path: '/charts/basic-chart',
    name: 'basicChart',
    component: BasicChartView,
    meta: {
      title: 'Basic Chart'
    }
  },
  {
    path: '/ui-elements/alerts',
    name: 'alerts',
    component: AlertsView,
    meta: {
      title: 'Alerts'
    }
  },
  {
    path: '/ui-elements/buttons',
    name: 'buttons',
    component: ButtonsView,
    meta: {
      title: 'Buttons'
    }
  },
  {
    path: '/auth/signin',
    name: 'signin',
    component: SigninView,
    meta: {
      title: 'Signin'
    }
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  },
  {
    path: '/auth/reset-pass',
    name: 'resetpass',
    component: ResetView,
    meta: {
      title: 'ResetPassword'
    }
  },
  {
    path: '/auth/verification-email/:id',
    name: 'verification email',
    component: VerificationView,
    meta: {
      title: 'VerificationEmail'
    },
  },
  {
    path: '/example-app',
    name: 'example-app',
    component: ExampleAppClient,
    meta: {
      title: 'How To Make SGKMS'
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Athena Dashboard`
  const isAuthenticated = !!localStorage.getItem('token')
  const userRole = localStorage.getItem('role')
  
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'signin' })
    } else if (to.meta.role && to.meta.role !== userRole) {
        next({ name: 'dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
