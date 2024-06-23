// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchAnDocument, updateDocument } from 'src/store/apps/document'
import { fetchAVersion, updateVersion } from 'src/store/apps/version'
import { getDocumentListUrl } from 'src/utils/router'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import {
  DocumentResponseDto,
  UpdateDocumentRequestDto,
  UpdateInvoiceItemRequest,
  VersionResponseDto,
  UpdateVerionRequestDto
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
import { Divider } from '@mui/material'

export interface InvoiceEditProps {
  id: string
}

//export type UpdateInvoiceFormData = UpdateInvoiceItemRequest & { id: number; index: number }

const InvoiceEdit = ({ id }: InvoiceEditProps) => {
  // ** Store
  const dispatch = useDispatch<AppDispatch>()
  const versionStore = useSelector((state: RootState) => state.version)
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchAVersion({ id: parseInt(id!), documentId: 'a' }))
  }, [dispatch, id])

  // ** States
  const [date, setDate] = useState<Date>(
    (versionStore.version as VersionResponseDto).createdAt
      ? new Date((versionStore.version as VersionResponseDto).createdAt)
      : new Date()
  )
  const [versionName, setVersionName] = useState<string>((versionStore.version as VersionResponseDto).versionName)
  const [versionNote, setVersionNote] = useState<string>((versionStore.version as VersionResponseDto).note)

  // const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false)
  // const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false)

  // const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  // const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  const onSubmit = () => {
    // Update invoice api call
    const updateVersionRequest: UpdateVerionRequestDto = {
      createdAt: format(date as Date, 'yyyy-MM-dd'),
      versionName: versionName,
      note: versionNote
    }

    // Call api
    dispatch(updateVersion({ ...updateVersionRequest, id: parseInt(id!), documentId: 'a' }))
    router.replace(getDocumentListUrl())
  }

  if (versionStore.version) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <EditCard
              data={versionStore.version as VersionResponseDto}
              date={date}
              setDate={setDate}
              versionName={versionName}
              setVersionName={setVersionName}
              versionNote={versionNote}
              setVersionNote={setVersionNote}
            />
            <Button
              fullWidth
              sx={{ mb: 3.5 }}
              variant='contained'
              startIcon={<Icon icon='mdi:send-outline' />}
              onClick={onSubmit}
            >
              Update
            </Button>
          </Grid>
        </Grid>
        {/* <SendInvoiceDrawer open={sendInvoiceOpen} toggle={toggleSendInvoiceDrawer} />
        <AddPaymentDrawer open={addPaymentOpen} toggle={toggleAddPaymentDrawer} /> */}
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
