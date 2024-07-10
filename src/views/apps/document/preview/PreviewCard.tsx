// ** MUI Imports
import { useEffect, useState, useContext } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

//import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'

// import TableRow from '@mui/material/TableRow'
// import TableHead from '@mui/material/TableHead'
// import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

//import { styled, useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'

// import TableContainer from '@mui/material/TableContainer'
// import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import { GridColDef, DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import OptionsMenu from 'src/@core/components/option-menu'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { deleteVersion, fetchVersions } from 'src/store/apps/version'

// ** Configs
//import themeConfig from 'src/configs/themeConfig'

// ** Types
import { DocumentResponseDto } from 'src/__generated__/AccountifyAPI'
import { VersionResponseDto } from 'src/__generated__/AccountifyAPI'

// ** Third Parties Imports
import { format } from 'date-fns'

// ** Utils Imports
import { getVersionEditUrl } from 'src/utils/router/version'

// ** Hooks Imports
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip'

interface Props {
  data: DocumentResponseDto //InvoiceResponseDto
}
interface CellType {
  row: VersionResponseDto
}

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
//   borderBottom: 0,
//   paddingLeft: '0 !important',
//   paddingRight: '0 !important',
//   paddingTop: `${theme.spacing(1)} !important`,
//   paddingBottom: `${theme.spacing(1)} !important`
// }))

// const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   '&:not(:last-of-type)': {
//     marginBottom: theme.spacing(2)
//   }
// }))

const PreviewCard = ({ data }: Props) => {
  // ** Hook
  //const theme = useTheme()
  const { t } = useTranslation()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  //const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const ability = useContext(AbilityContext)

  const dispatch = useDispatch<AppDispatch>()

  // const invoiceStore = useSelector((state: RootState) => state.invoice)
  const versionStore = useSelector((state: RootState) => state.version)

  useEffect(() => {
    dispatch(fetchVersions(data.document_id))
  }, [dispatch, data.document_id])

  const defaultColumns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 50,
      headerName: 'id',
      renderCell: ({ row }: CellType) => <LinkStyled href={getVersionEditUrl(row.id)}>{row.id}</LinkStyled>
    },
    {
      flex: 0.2,
      field: 'document_name',
      minWidth: 50,
      headerName: t('document_page.list.name') as string,
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.versionName}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 125,
      field: 'createdAt',
      headerName: t('document_page.list.date') as string,
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>
          {format(row.createdAt ? new Date(row.createdAt) : new Date(), 'dd/MM/yyyy')}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 125,
      field: 'downloadNumber',
      headerName: 'Downloaded',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{row.downloadNumber ? row.downloadNumber : 0}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 125,
      field: 'note',
      headerName: 'Note',
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.note ? row.note : ''}</Typography>
    }
  ]

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: t('document_page.list.actions') as string,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ability?.can('delete', 'invoice') && (
            <Tooltip title={t('document_page.list.delete_invoice')}>
              <IconButton
                size='small'
                onClick={() => dispatch(deleteVersion({ id: row.id, documentId: data.document_id }))}
              >
                <Icon icon='mdi:delete-outline' fontSize={20} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={t('document_page.list.delete_invoice')}>
            <IconButton size='small'>
              <Link href={row.url}>
                <Icon icon='mdi:download' fontSize={20} />
              </Link>
            </IconButton>
          </Tooltip>
          {/* <Tooltip title={t('document_page.list.view')}>
            <IconButton size='small' component={Link} href={getVersionEditUrl(row.id)}>
              <Icon icon='mdi:eye-outline' fontSize={20} />
            </IconButton>
          </Tooltip> */}
          {ability?.can('update', 'invoice') && (
            <OptionsMenu
              iconProps={{ fontSize: 20 }}
              iconButtonProps={{ size: 'small' }}
              menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
              options={[
                {
                  text: t('document_page.list.edit'),
                  href: getVersionEditUrl(row.id),
                  icon: <Icon icon='mdi:pencil-outline' fontSize={20} />
                }

                // {
                //   text: t('document_page.list.duplicate'),
                //   icon: <Icon icon='mdi:content-copy' fontSize={20} />
                // }
              ]}
            />
          )}
        </Box>
      )
    }
  ]

  if (data) {
    return (
      <Card>
        <CardContent>
          <Grid container>
            <Grid item sm={6} xs={12}>
              <Typography variant='h6'>{data.document_name}</Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
              <strong>Date created: </strong>
              {format(new Date(data?.createdAt ? new Date(data.createdAt) : new Date()), 'dd MMM yyyy')}
            </Grid>
            {/* <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                  <svg
                    width={30}
                    height={25}
                    version='1.1'
                    viewBox='0 0 30 23'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                  >
                    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                      <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                        <g id='logo' transform='translate(95.000000, 50.000000)'>
                          <path
                            id='Combined-Shape'
                            fill={theme.palette.primary.main}
                            d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                            transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                          />
                          <polygon
                            id='Rectangle'
                            opacity='0.077704'
                            fill={theme.palette.common.black}
                            points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                            transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                          />
                          <path
                            id='Rectangle'
                            fillOpacity='0.15'
                            fill={theme.palette.common.white}
                            d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                          />
                          <path
                            id='Rectangle'
                            fillOpacity='0.35'
                            fill={theme.palette.common.white}
                            transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                            d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <Typography
                    variant='h6'
                    sx={{ ml: 2.5, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
                  >
                    {themeConfig.templateName}
                  </Typography>
                </Box>
              </Box>
            </Grid> */}
            {/* <Grid item sm={6} xs={12} sx={{ mb: { lg: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                <Table sx={{ maxWidth: '250px' }}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='h6'>{t('document_page.preview.invoice')}</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'>{`#${data.id}`}</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>{t('document_page.preview.date')}:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          {format(new Date(data?.createdAt ? new Date(data.createdAt) : new Date()), 'dd MMM yyyy')}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid> */}
          </Grid>
        </CardContent>

        <Divider />

        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
              <Typography variant='body2' sx={{ mb: 3.5, fontWeight: 600 }}>
                {/* {t('document_page.preview.name')}: */} Document Id:
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                #{data.document_id}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
              <Typography variant='body2' sx={{ mb: 3.5, fontWeight: 600 }}>
                {/* {t('document_page.preview.name')}: */} Latest Version:
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Click to download: <Link href={data.url ? data.url : ''}>Download</Link>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardContent>
          <Typography variant='body2'>
            <strong>{t('document_page.preview.note')}:</strong> {data.note ? data.note : 'No note'}
          </Typography>
        </CardContent>

        <CardContent>
          <DataGrid
            autoHeight
            pagination
            rows={versionStore.data}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}

            //onRowSelectionModelChange={rows => setSelectedRows(rows)}
          />
        </CardContent>
      </Card>
    )
  } else {
    return null
  }
}

export default PreviewCard
