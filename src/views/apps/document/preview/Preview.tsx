// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchAnDocument } from 'src/store/apps/document'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import {
  CreateSubscriptionsRequestDto,
  DocumentResponseDto,
  SubscriptionsResponseDto
} from 'src/__generated__/AccountifyAPI'

// ** Components Imports
import PreviewCard from 'src/views/apps/document/preview/PreviewCard'
import PreviewActions from 'src/views/apps/document/preview/PreviewActions'

// import AddPaymentDrawer from 'src/views/apps/document/shared-drawer/AddPaymentDrawer'
// import SendInvoiceDrawer from 'src/views/apps/document/shared-drawer/SendInvoiceDrawer'

// // ** Utils Imports

import { getInvoiceListUrl } from 'src/utils/router/invoice'
import { useRouter } from 'next/router'
import { getOrgUniqueName } from 'src/utils/organization'
import { useSession } from 'next-auth/react'
import subscription, { addSub, fetchASub } from 'src/store/apps/subscription'

// import { fetchVersions } from 'src/store/apps/version'

export interface InvoicePreviewProps {
  id: string
}

const InvoicePreview = ({ id }: InvoicePreviewProps) => {
  // ** Store
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const session = useSession()

  // const invoiceStore = useSelector((state: RootState) => state.invoice)
  const documentStore = useSelector((state: RootState) => state.document)
  const subscriptionStore = useSelector((state: RootState) => state.subscription)

  const [checkedMail, setCheckedMail] = useState<boolean>(
    (subscriptionStore.subscription as SubscriptionsResponseDto).byEmail ?? false
  )
  const [checkedSMS, setCheckedSMS] = useState<boolean>(
    (subscriptionStore.subscription as SubscriptionsResponseDto).bySMS ?? false
  )

  useEffect(() => {
    dispatch(fetchAnDocument(parseInt(id!)))
    dispatch(fetchASub({ documentId: parseInt(id!), userId: session.data?.user.id ?? 0 }))
  }, [dispatch, id, session.data?.user.id])

  useEffect(() => {
    if (subscriptionStore) {
      setCheckedMail((subscriptionStore.subscription as SubscriptionsResponseDto).byEmail)
      setCheckedSMS((subscriptionStore.subscription as SubscriptionsResponseDto).bySMS)
    }
  }, [subscriptionStore])

  // useEffect(() => {
  //   if (subscriptionStore) {
  //     setCheckedMail(subscriptionStore.byEmail)
  //     setCheckedSMS(subscriptionStore.bySMS)
  //   } else {
  //     setCheckedMail(false)
  //     setCheckedSMS(false)
  //   }
  // }, [subscriptionStore])

  const createSubscription = async () => {
    if (session.data?.user.phone && checkedSMS) {
      router.replace(`/${getOrgUniqueName()}/account-settings/account/`)

      return
    }

    // Create invoice api call
    const createSubscriptionRequest: CreateSubscriptionsRequestDto & { documentId: number; userId: number } = {
      byEmail: checkedMail,
      bySMS: checkedSMS,
      phone: session.data?.user.phone ?? '',
      email: session.data?.user.email ?? '',
      documentId: parseInt(id),
      userId: session.data?.user.id ?? 0
    }

    //Call api
    console.log(createSubscriptionRequest)

    dispatch(addSub(createSubscriptionRequest))
    router.replace(`/${getOrgUniqueName()}/document/${id}/preview/`)
  }

  // ** State
  // const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>(false)
  // const [sendInvoiceOpen, setSendInvoiceOpen] = useState<boolean>(false)

  // const toggleSendInvoiceDrawer = () => setSendInvoiceOpen(!sendInvoiceOpen)
  // const toggleAddPaymentDrawer = () => setAddPaymentOpen(!addPaymentOpen)

  if (documentStore.document) {
    return (
      <>
        <Grid container spacing={6}>
          <Grid item xl={9} md={8} xs={12}>
            <PreviewCard data={documentStore.document as DocumentResponseDto} />
          </Grid>
          <Grid item xl={3} md={4} xs={12}>
            <PreviewActions
              documentId={id}
              checkedMail={checkedMail}
              setCheckedMail={setCheckedMail}
              checkedSMS={checkedSMS}
              setCheckedSMS={setCheckedSMS}
              createSubscription={createSubscription}

              // toggleAddPaymentDrawer={toggleAddPaymentDrawer}
              // toggleSendInvoiceDrawer={toggleSendInvoiceDrawer}
            />
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
            Looks like the document you looking for does not exist. Please go back{' '}
            <Link href={getInvoiceListUrl()}>Invoice List</Link>
          </Alert>
        </Grid>
      </Grid>
    )
  }
}

export default InvoicePreview
