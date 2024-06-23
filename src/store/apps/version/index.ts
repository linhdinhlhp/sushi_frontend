// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Types
// import {
//   CreateDocumentRequestDto,
//   DocumentResponseDto,
//   UpdateDocumentRequestDto
// } from 'src/__generated__/AccountifyAPI'

import {
  Api,
  CreateVersionRequestDto,
  VersionResponseDto,
  UpdateVerionRequestDto
} from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken, getOrgId } from 'src/utils/localStorage'

// ** Third Party Imports
import toast from 'react-hot-toast'

// interface DataParams {
//   query?: string
//   fromDate?: string
//   toDate?: string
//   type?: string
// }

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Documents
export const fetchVersions = createAsyncThunk('appVersions/fetchVersion', async (documentId: string) => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  try {
    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.getVersionListForDocument(organizationId!, documentId!)

    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
})

// ** Fetch 1
export const fetchAVersion = createAsyncThunk(
  'appVersions/fetchAVersion',
  async (data: { id: number; documentId: string }) => {
    const organizationId = getOrgId()
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.getVersionByIdForDocument(organizationId, data.documentId, data.id)
      console.log('file uplaod test', response.data)

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Add Document Version
export const addVersion = createAsyncThunk(
  'appVersions/addVersion',
  async (data: CreateVersionRequestDto & { documentId: string }, { dispatch }: Redux) => {
    const organizationId = getOrgId()
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.createDocumentsForAnOrganization2(organizationId, data.documentId, data)

      dispatch(fetchVersions(data.documentId))
      toast.success('Add Version succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Update Document
export const updateVersion = createAsyncThunk(
  'appVersionss/updateVersion',
  async (data: UpdateVerionRequestDto & { documentId: string; id: number }, { dispatch }: Redux) => {
    const organizationId = getOrgId()
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.updateAnDocumentForAnOrganization2(organizationId, data.documentId, data.id, data)

      dispatch(fetchVersions(data.documentId))
      toast.success('Update version succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

export const deleteVersion = createAsyncThunk(
  'appDocuments/deleteDocument',
  async (data: { id: number; documentId: string }, { dispatch }: Redux) => {
    const organizationId = getOrgId().toString()
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.deleteADocumentForAnOrganization2(data.id, organizationId)

      dispatch(fetchVersions(data.documentId))
      toast.success('Delete version succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

export const appDocumentsSlice = createSlice({
  name: 'appDocuments',
  initialState: {
    data: [] as VersionResponseDto[],
    total: 0,
    params: {},
    version: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchVersions.fulfilled, (state, action) => {
      state.data = action.payload?.versions || []
      state.total = action.payload?.metadata.total || 0
      state.params = action.payload?.metadata.params || {}
    }),
      builder.addCase(fetchAVersion.fulfilled, (state, action) => {
        state.version = action.payload || {}
      })
  }
})

export default appDocumentsSlice.reducer
