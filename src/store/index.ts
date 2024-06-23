// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/store/apps/user'
import role from 'src/store/apps/role'
import document from 'src/store/apps/document'
import invoice from 'src/store/apps/invoice'
import version from 'src/store/apps/version'
import permission from 'src/store/auth/permission'
import profile from 'src/store/auth/profile'
import subscription from 'src/store/apps/subscription'

export const store = configureStore({
  reducer: {
    user,
    role,
    document,
    invoice,
    permission,
    profile,
    version,
    subscription
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
