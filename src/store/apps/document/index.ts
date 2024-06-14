// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Types
import {
  Api,
  CreateDocumentRequestDto,
  DocumentResponseDto,
  UpdateDocumentRequestDto
} from 'src/__generated__/AccountifyAPI'

// ** Utils
import { getAccessToken, getOrgId } from 'src/utils/localStorage'

// ** Third Party Imports
import toast from 'react-hot-toast'

interface DataParams {
  query?: string
  fromDate?: string
  toDate?: string
  type?: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Documents
export const fetchDocuments = createAsyncThunk('appDocuments/fetchDocument', async () => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  try {
    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.getDocumentListForOrganization(organizationId!)

    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
})

// ** Fetch 1 document
export const fetchAnDocument = createAsyncThunk('appDocuments/fetchAnDocument', async (id: number) => {
  const organizationId = getOrgId()
  const storedToken = getAccessToken()

  try {
    const response = await new Api({
      baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 30 * 1000, // 30 seconds
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }).internal.getDocumentByIdForAnOrg(organizationId!, id)

    return response.data
  } catch (error: any) {
    toast.error(error.message)
  }
})

// ** Add Document
export const addDocument = createAsyncThunk(
  'appDocuments/addDocument',
  async (data: CreateDocumentRequestDto, { dispatch }: Redux) => {
    const organizationId = getOrgId()
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.createDocumentsForAnOrganization(organizationId, data)

      dispatch(fetchDocuments())
      toast.success('Add Document succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

// ** Update Document
export const updateDocument = createAsyncThunk(
  'appDocuments/updateDocument',
  async (data: UpdateDocumentRequestDto & { documentId: number }, { dispatch }: Redux) => {
    const organizationId = getOrgId()
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.updateAnDocumentForAnOrganization(organizationId, data.documentId, data)

      dispatch(fetchDocuments())
      toast.success('Update document succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

export const deleteDocument = createAsyncThunk(
  'appDocuments/deleteDocument',
  async (documentId: number, { dispatch }: Redux) => {
    const organizationId = getOrgId()
    const storedToken = getAccessToken()

    try {
      const response = await new Api({
        baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
        timeout: 30 * 1000, // 30 seconds
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }).internal.deleteADocumentForAnOrganization(organizationId, documentId)

      dispatch(fetchDocuments())
      toast.success('Delete document succeed')

      return response.data
    } catch (error: any) {
      toast.error(error.message)
    }
  }
)

export const appDocumentsSlice = createSlice({
  name: 'appDocuments',
  initialState: {
    data: [] as DocumentResponseDto[],
    total: 0,
    params: {},

    document: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      state.data = action.payload?.documents || []
      state.total = action.payload?.metadata.total || 0
      state.params = action.payload?.metadata.params || {}
    }),
      builder.addCase(fetchAnDocument.fulfilled, (state, action) => {
        state.document = action.payload || {}
      })
  }
})

export default appDocumentsSlice.reducer
