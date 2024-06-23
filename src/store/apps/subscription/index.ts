// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Types
import {
  Api,
  CreateSubscriptionsRequestDto,
  UpdateSubscriptionsRequestDto,
  SubscriptionsResponseDto
} from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken, getOrgId } from 'src/utils/localStorage'

// ** Third Party Imports
import toast from 'react-hot-toast'

//dinh nghia kieu cho interface redux
//
interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Subscription
export const fetchSubs = createAsyncThunk('appSubs/fetchSub', async (documentId: number) => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  try {
    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.getAllSubsByADocumentForAnOrg(organizationId!, documentId!)

    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
})

// ** Fetch 1 state of a user-document sub
export const fetchASub = createAsyncThunk('appSubs/fetchASub', async (data: { documentId: number; userId: number }) => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  try {
    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.getStateOfASubByADocumentForAUserOfAnOrg(organizationId!, data.documentId, data.userId)

    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
})

// ** Add Sub
export const addSub = createAsyncThunk(
  'appSubs/addSub',
  async (data: CreateSubscriptionsRequestDto & { documentId: number; userId: number }, { dispatch }: Redux) => {
    const organizationId = getOrgId()
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.createASubOfADocumentForAnOrg(organizationId, data.documentId, data)

      dispatch(fetchASub({ documentId: data.documentId, userId: data.userId }))
      toast.success('Add subsription succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Update Document
export const updateSub = createAsyncThunk(
  'appSubs/updateSub',
  async (data: UpdateSubscriptionsRequestDto & { documentId: number; userId: number }, { dispatch }: Redux) => {
    const organizationId = getOrgId()
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.updateASubOfADocumentForAnOrg(organizationId, data.documentId, data)

      dispatch(fetchASub({ documentId: data.documentId, userId: data.userId }))
      toast.success('Update Subscription succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

export const appSubsSlice = createSlice({
  name: 'appSubs',
  initialState: {
    data: [] as SubscriptionsResponseDto[],
    total: 0,
    params: {},

    subscription: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSubs.fulfilled, (state, action) => {
      state.data = action.payload?.subscriptions || []
      state.total = action.payload?.metadata.total || 0
      state.params = action.payload?.metadata.params || {}
    }),
      builder.addCase(fetchASub.fulfilled, (state, action) => {
        state.subscription = action.payload || {}
      })
  }
})

export default appSubsSlice.reducer
