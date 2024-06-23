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
}

const PreviewActions = ({ documentId }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const session = useSession()

  const [checkedMail, setCheckedMail] = useState<boolean>(false)
  const [checkedSMS, setCheckedSMS] = useState<boolean>(false)

  // console.log('linh dang tét ', session.data.user)

  const subscriptionStore = useSelector(
    (state: RootState) => state.subscription.subscription as SubscriptionsResponseDto
  )

  useEffect(() => {
    dispatch(fetchASub({ documentId: parseInt(documentId), userId: 7 }))
  }, [dispatch, documentId])

  console.log('linh dang ', subscriptionStore)

  useEffect(() => {
    if (subscriptionStore) {
      setCheckedMail(subscriptionStore.byEmail)
      setCheckedSMS(subscriptionStore.bySMS)
    } else {
      setCheckedMail(false)
      setCheckedSMS(false)
    }
  }, [subscriptionStore])

  return (
    <Card>
      <CardContent>
        <Button fullWidth sx={{ mb: 3.5 }} variant='contained' startIcon={<Icon icon='mdi:plus-circle' />}>
          <Link style={{ textDecoration: 'none', color: 'white' }} href={getDocumentAddVersionUrl(documentId)}>
            Add document version
          </Link>
        </Button>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label='Nhận thông báo quan SMS' />
          <FormControlLabel control={<Checkbox />} label='Nhận thông báo qua email' />
        </FormGroup>
        <Button fullWidth color='success' variant='contained' startIcon={<Icon icon='mdi:mdi-send' />}>
          Submit
        </Button>
      </CardContent>
    </Card>
  )
}

export default PreviewActions
