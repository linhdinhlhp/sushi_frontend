// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Components Imports
import AddCard from 'src/views/apps/version/add/AddCard'
import AddActions from 'src/views/apps/version/add/AddActions'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'src/store'
import { RootState } from 'src/store'
import { fetchAnDocument } from 'src/store/apps/document'

// ** Types Imports
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { CreateVersionRequestDto, DocumentResponseDto, UpdateDocumentRequestDto } from 'src/__generated__/AccountifyAPI'

// ** Third Party Imports

import toast from 'react-hot-toast'
import { format } from 'date-fns'

// ** Utils Imports
//import { getInvoiceListUrl } from 'src/utils/router/invoice'

//import { addDocument } from 'src/store/apps/document'
import { addVersion } from 'src/store/apps/version'
import { updateDocument } from 'src/store/apps/document'

// import { fileURLToPath } from 'url'
import { getOrgUniqueName } from 'src/utils/organization'

//export type CreateInvoiceFormData = CreateInvoiceItemRequest & { index: number }

const InvoiceAdd = () => {
  // ** States
  const [date, setDate] = useState<DateType>(new Date())
  const [versionName, setVersionName] = useState<string>('')
  const [versionNote, setVersionNote] = useState<string>('')
  const [file, setFile] = useState<any>()

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const id = router.query.id as string

  // const invoiceStore = useSelector((state: RootState) => state.invoice)
  const documentStore = useSelector((state: RootState) => state.document.document as DocumentResponseDto)

  useEffect(() => {
    dispatch(fetchAnDocument(parseInt(id!)))
  }, [dispatch, id])

  const handleAddFile = (event: any) => {
    console.log('choosing')
    const ChosenFile = event.target.files[0]
    const newFormData = new FormData()
    newFormData.append('file', ChosenFile)
    setFile(newFormData)
  }

  const addItem = async () => {
    try {
      const response = await fetch('NEXT_PUBLIC_API_ENDPOINT/upload/single-file-from-local', {
        method: 'POST',
        body: file
      })
      const result = await response.json()
      console.log('Success:', result)

      return result.metadata.file_url
    } catch (error) {
      console.error('Error:', error)

      return false
    }
  }

  const createVersion = async () => {
    if (versionName.length === 0) {
      toast.error('Please provide a name')
    } else if (!file) {
      toast.error('Please choose file to upload')
    } else {
      const uploadResponse = await addItem()
      console.log('URL: ' + uploadResponse)
      if (!uploadResponse) {
        toast.error('Upload file failed')
      } else {
        // Create version api call
        const createVersionRequest: CreateVersionRequestDto & { documentId: string } = {
          createdAt: format(date as Date, 'yyyy-MM-dd'),
          created_by: '1',
          versionName: versionName,
          note: versionNote,
          documentId: documentStore.document_id,
          url: uploadResponse.toString()
        }
        const updateDocumentRequest: UpdateDocumentRequestDto & { documentId: number } = {
          url: uploadResponse.toString(),
          documentId: documentStore.id
        }

        //Call api
        dispatch(addVersion(createVersionRequest))
        dispatch(updateDocument(updateDocumentRequest))

        router.replace(`/${getOrgUniqueName()}/document/list/`)
      }
    }
  }

  return (
    <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
      <Grid container spacing={6}>
        <Grid item xl={9} md={8} xs={12}>
          <AddCard
            date={date}
            setDate={setDate}
            documentName={versionName}
            setDocumentName={setVersionName}
            documentNote={versionNote}
            setDocumentNote={setVersionNote}
            handleAddFile={handleAddFile}
          />
        </Grid>
        <Grid item xl={3} md={4} xs={12}>
          <AddActions onSubmit={createVersion} />
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
