import { getOrgUniqueName } from '../organization'

export const getInvoiceListUrl = (): string => {
  return `/${getOrgUniqueName()}/document/list`
}

export const getInvoiceEditUrl = (id: string | number | undefined): string => {
  return `/${getOrgUniqueName()}/document/edit/${id}`
}

export const getInvoicePreviewUrl = (id: string | number | undefined): string => {
  return `/${getOrgUniqueName()}/document/preview/${id}`
}

export const getInvoicePrintUrl = (id: string | number | undefined): string => {
  return `/${getOrgUniqueName()}/document/print/${id}`
}
