import { getOrgUniqueName } from '../organization'

export const getVersionEditUrl = (id: string | number | undefined): string => {
  return `/${getOrgUniqueName()}/version/edit/${id}`
}
