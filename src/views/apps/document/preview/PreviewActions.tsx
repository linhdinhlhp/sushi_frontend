// ** Next Import
import Link from 'next/link'

// ** React Import
import { useContext } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { getDocumentAddVersionUrl } from 'src/utils/router'

// ** Utils Imports
//import { getInvoiceEditUrl, getInvoicePrintUrl } from 'src/utils/router/invoice'

// ** Context Imports
//import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Hooks Imports
//import { useTranslation } from 'react-i18next'

export interface Props {
  id: string
}

const PreviewActions = ({ id }: Props) => {
  // ** Hooks
  // const ability = useContext(AbilityContext)
  // const { t } = useTranslation()

  return (
    <Card>
      <CardContent>
        <Button fullWidth sx={{ mb: 3.5 }} variant='contained' startIcon={<Icon icon='mdi:plus-circle' />}>
          <Link style={{ textDecoration: 'none', color: 'white' }} href={getDocumentAddVersionUrl(id)}>
            Add document version
          </Link>
        </Button>
        {/* <Button fullWidth sx={{ mb: 3.5 }} color='secondary' variant='outlined'>
          {t('document_page.preview.download')}
        </Button>
        <Button
          fullWidth
          target='_blank'
          sx={{ mb: 3.5 }}
          component={Link}
          color='secondary'
          variant='outlined'
          href={getInvoicePrintUrl(id)}
        >
          {t('document_page.preview.print')}
        </Button>
        <Button
          fullWidth
          sx={{ mb: 3.5 }}
          component={Link}
          color='secondary'
          variant='outlined'
          href={getInvoiceEditUrl(id)}
          disabled={!ability?.can('update', 'invoice')}
        >
          {t('document_page.preview.update_document')}
        </Button>
        <Button
          fullWidth
          color='success'
          variant='contained'
          onClick={toggleAddPaymentDrawer}
          startIcon={<Icon icon='mdi:currency-usd' />}
        >
          Add Payment
        </Button> */}
      </CardContent>
    </Card>
  )
}

export default PreviewActions
