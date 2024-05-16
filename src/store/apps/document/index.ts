// ** Redux Imports
import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'

// ** Types
import { Api, DocumentResponseDto, InvoiceResponseDto } from 'src/__generated__/AccountifyAPI'

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
    })
  }
})

export default appDocumentsSlice.reducer
