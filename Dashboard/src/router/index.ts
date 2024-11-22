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
import ListClient from '@/views/List Admin/ListClient.vue'
import AdminTransaction from '@/views/Transaction/AdminTransaction.vue'
import RegisterVerification from '@/views/List Admin/SubmissionTrial.vue'
import SubmissionTrial from '@/views/List Admin/SubmissionTrial.vue'
import ExampleAppClient from '@/views/ExampleApp/ExampleAppClient.vue'
import ClientVerifView from '@/views/Authentication/ClientVerifView.vue'
import DetailTransaction from '@/views/Transaction/DetailTransaction.vue'
import WaitingView from '@/views/WaitPage/WaitingView.vue'
import NotFoundView from '@/views/Pages/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: 'admin', 
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
    path: '/:pathMatch(.*)*',
    name: 'Not found page',
    component: NotFoundView,
    meta: {
      title: 'Not Found'
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
    name: 'product',
    component: ClientProduct,
    meta: {
      requiresAuth: true,
      title: 'Client Product'
    }
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: ClientTransaction,
    meta: {
      requiresAuth: true,
      title: 'Client Transaction '
    }
  },
  {
    path: '/auth/verify-acc',
    name: 'Verify Client',
    component: ClientVerifView,
    meta: {
      requiresAuth: true,
      title: 'Verify Client '
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
    path: '/list-client',
    name: 'List Client',
    component: ListClient,
    meta: {
      requiresAuth: true,
      title: 'List client'
    }
  },
  {
    path: '/waiting-list',
    name: 'waiting list',
    component: WaitingView,
    meta: {
      requiresAuth: true,
      title: 'Waiting List'
    }
  },
  {
    path: '/submission-trial',
    name: 'Submission Trial',
    component: SubmissionTrial,
    meta: {
      requiresAuth: true,
      title: ' Submission Trial'
    }
  },
  {
    path: '/transaction-admin',
    name: 'Admin Transaction',
    component: AdminTransaction,
    meta: {
      requiresAuth: true,
      title: 'Admin Transaction'
    }
  },
  {
    path: '/transaction-detail/:productId',
    name: 'Detail Transaction',
    component: DetailTransaction,
    meta: {
      requiresAuth: true,
      role: 'admin', 
      title: 'Detail Transaction'
    }
  },
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
      requiresAuth: true,
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
      if(userRole != 'client'){
        next({ name: 'dashboard' })
      }else{
        next({ name: 'product' })
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
