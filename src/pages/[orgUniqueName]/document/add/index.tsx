// ** React Imports
import { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Components Imports
import AddCard from 'src/views/apps/document/add/AddCard'
import AddActions from 'src/views/apps/document/add/AddActions'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { addInvoice } from 'src/store/apps/invoice'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import {
  CreateDocumentRequestDto,
  CreateInvoiceItemRequest,
  CreateInvoiceRequestDto,
  CurrencyType,
  InvoiceType
} from 'src/__generated__/AccountifyAPI'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { format } from 'date-fns'

// ** Utils Imports
import { getInvoiceListUrl } from 'src/utils/router/invoice'
import { addDocument } from 'src/store/apps/document'

export type CreateInvoiceFormData = CreateInvoiceItemRequest & { index: number }

const InvoiceAdd = () => {
  // ** States
  const [date, setDate] = useState<DateType>(new Date())
  const [documentName, setDocumentName] = useState<string>('')
  const [documentNote, setDocumentNote] = useState<string>('')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const createDocument = () => {
    // Create invoice api call
    const createDocumentRequest: CreateDocumentRequestDto = {
      createdAt: format(date as Date, 'yyyy-MM-dd'),
      document_name: documentName,
      note: documentNote
    }

    console.log(createDocumentRequest)

    // Call api
    dispatch(addDocument(createDocumentRequest))
    router.replace(getInvoiceListUrl())
  }

  console.log(documentName)

  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AddCard
            date={date}
            setDate={setDate}
            documentName={documentName}
            setDocumentName={setDocumentName}
            documentNote={documentNote}
            setDocumentNote={setDocumentNote}
          />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AddActions onSubmit={createDocument} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

InvoiceAdd.acl = {
  action: 'create',
  subject: 'invoice'
}

export default InvoiceAdd
