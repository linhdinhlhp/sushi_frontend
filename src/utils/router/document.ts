import { getOrgUniqueName } from '../organization'

export const getDocumentListUrl = (): string => {
  return `/${getOrgUniqueName()}/document/list`
}

export const getDocumentEditUrl = (id: string | number | undefined): string => {
  return `/${getOrgUniqueName()}/document/edit/${id}`
}

export const getDocumentPreviewUrl = (id: string | number | undefined): string => {
  return `/${getOrgUniqueName()}/document/${id}/preview`
}

export const getDocumentPrintUrl = (id: string | number | undefined): string => {
  return `/${getOrgUniqueName()}/document/print/${id}`
}

export const getDocumentAddVersionUrl = (id: string | number | undefined): string => {
  return `/${getOrgUniqueName()}/document/${id}/add`
}
