// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Utils Imports
import { getInvoicePreviewUrl } from 'src/utils/router/invoice'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

interface EditActionsProps {
  id: string | undefined
  onSubmit: () => void
  toggleAddPaymentDrawer: () => void
}

const OptionsWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const EditActions = ({ id, onSubmit, toggleAddPaymentDrawer }: EditActionsProps) => {
  // ** Hook
  const { t } = useTranslation()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button
              fullWidth
              sx={{ mb: 3.5 }}
              variant='contained'
              startIcon={<Icon icon='mdi:send-outline' />}
              onClick={() => onSubmit()}
            >
              UPDATE DOCUMENT
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default EditActions
