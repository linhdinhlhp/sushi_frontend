// ** Next Import
import Link from 'next/link'

// ** React Import
import { useContext, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { getDocumentAddVersionUrl } from 'src/utils/router'
import { fetchASub } from 'src/store/apps/subscription'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { useSession } from 'next-auth/react'
import { SubscriptionsResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Utils Imports
//import { getInvoiceEditUrl, getInvoicePrintUrl } from 'src/utils/router/invoice'

// ** Context Imports
//import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Hooks Imports
//import { useTranslation } from 'react-i18next'

export interface Props {
  documentId: string
  checkedMail: boolean
  setCheckedMail: (boolean) => void
  checkedSMS: boolean
  setCheckedSMS: (boolean) => void
  createSubscription: () => void
}

const PreviewActions = ({
  documentId,
  checkedMail,
  setCheckedMail,
  checkedSMS,
  setCheckedSMS,
  createSubscription
}: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const session = useSession()

  // console.log('linh dang tét ', session.data.user)

  const subscriptionStore = useSelector(
    (state: RootState) => state.subscription.subscription as SubscriptionsResponseDto
  )

  useEffect(() => {
    dispatch(fetchASub({ documentId: parseInt(documentId), userId: session.data?.user.id ?? 0 }))
  }, [dispatch, documentId, session.data?.user.id])

  return (
    <Card>
      <CardContent>
        <Button fullWidth sx={{ mb: 3.5 }} variant='contained' startIcon={<Icon icon='mdi:plus-circle' />}>
          <Link style={{ textDecoration: 'none', color: 'white' }} href={getDocumentAddVersionUrl(documentId)}>
            Add document version
          </Link>
        </Button>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={() => setCheckedSMS(!checkedSMS)} checked={checkedSMS} />}
            label='Nhận thông báo quan SMS'
          />
          <FormControlLabel
            control={<Checkbox onChange={() => setCheckedMail(!checkedMail)} checked={checkedMail} />}
            label='Nhận thông báo qua email'
          />
        </FormGroup>
        <Button
          fullWidth
          color='success'
          variant='contained'
          startIcon={<Icon icon='mdi:mdi-send' />}
          onClick={() => createSubscription()}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  )
}

export default PreviewActions
