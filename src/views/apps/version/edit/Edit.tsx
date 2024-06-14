// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchAnInvoice, updateInvoice } from 'src/store/apps/invoice'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import {
  CurrencyType,
  DocumentResponseDto,
  InvoiceResponseDto,
  UpdateDocumentRequestDto,
  UpdateInvoiceItemRequest,
  UpdateInvoiceRequestDto
} from 'src/__generated__/AccountifyAPI'

// ** Components Imports
import EditCard from './EditCard'
import EditActions from './EditActions'
import AddPaymentDrawer from 'src/views/apps/document/shared-drawer/AddPaymentDrawer'
import SendInvoiceDrawer from 'src/views/apps/document/shared-drawer/SendInvoiceDrawer'

// ** Utils Imports
import { getInvoiceListUrl, getInvoicePreviewUrl } from 'src/utils/router/invoice'

// ** Third Party Imports
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { fetchAnDocument, updateDocument } from 'src/store/apps/document'
import { getDocumentListUrl } from 'src/utils/router'

export interface InvoiceEditProps {
  id: string
}

export type UpdateInvoiceFormData = UpdateInvoiceItemRequest & { id: number; index: number }

const InvoiceEdit = ({ id }: InvoiceEditProps) => {
  // ** Store
  const dispatch = useDispatch<AppDispatch>()
  const documentStore = useSelector((state: RootState) => state.document)
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchAnDocument(parseInt(id!)))
  }, [dispatch, id])

  // ** States
  const [date, setDate] = useState<Date>(
    (documentStore.document as DocumentResponseDto).createdAt
      ? new Date((documentStore.document as DocumentResponseDto).createdAt)
      : new Date()
  )
  const [documentName, setDocumentName] = useState<string>(
    (documentStore.document as DocumentResponseDto).document_name
  )
  const [documentNote, setDocumentNote] = useState<string>((documentStore.document as DocumentResponseDto).note)

  const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false)
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false)

  const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  const onSubmit = () => {
    // Update invoice api call
    const updateDocumentRequest: UpdateDocumentRequestDto = {
      createdAt: format(date as Date, 'yyyy-MM-dd'),
      document_name: documentName,
      note: documentNote
    }

    // Call api
    dispatch(updateDocument({ ...updateDocumentRequest, documentId: parseInt(id!) }))
    router.replace(getDocumentListUrl())
  }

  if (documentStore.document) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <EditCard
              data={documentStore.document as DocumentResponseDto}
              date={date}
              setDate={setDate}
              documentName={documentName}
              setDocumentName={setDocumentName}
              documentNote={documentNote}
              setDocumentNote={setDocumentNote}
            />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <EditActions id={id} onSubmit={onSubmit} toggleAddPaymentDrawer={toggleAddPaymentDrawer} />
          </Grid>
        </Grid>
        <SendInvoiceDrawer open={sendInvoiceOpen} toggle={toggleSendInvoiceDrawer} />
        <AddPaymentDrawer open={addPaymentOpen} toggle={toggleAddPaymentDrawer} />
      </>
    )
  } else {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            document with the id: {id} does not exist. Please check the list of documents:{' '}
            <Link href={getInvoiceListUrl()}>Invoice List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  }
}

export default InvoiceEdit
