// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'
import { getOrgUniqueName } from 'src/utils/organization'

// ** Utils

const navigation = (): HorizontalNavItemsType => {
  const uniqueName = getOrgUniqueName()

  return [
    {
      title: 'dashboards',
      icon: 'mdi:home-outline',
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          action: 'read',
          subject: 'dashboard',
          title: 'analytics',
          path: `/${uniqueName}/dashboards/analytics`
        }
      ]
    },
    {
      path: `/${uniqueName}/roles`,
      action: 'read',
      subject: 'role',
      title: 'role_page',
      icon: 'mdi:shield-outline'
    },
    {
      title: 'document',
      icon: 'mdi:file-document-outline',
      children: [
        {
          action: 'read',
          subject: 'document',
          title: 'document list',
          path: `/${uniqueName}/document/list`
        },
        {
          action: 'create',
          subject: 'document',
          title: 'navbar.document_page.add',
          path: `/${uniqueName}/document/add`
        }
      ]
    },
    {
      path: `/${uniqueName}/users`,
      action: 'read',
      subject: 'user',
      title: 'navbar.user_page',
      icon: 'mdi:account-outline'
    },
    {
      action: 'read',
      subject: 'account-settings',
      title: 'navbar.account_settings_page.account_settings',
      icon: 'mdi:account-cog-outline',
      children: [
        {
          action: 'read',
          subject: 'account-settings',
          title: 'navbar.account_settings_page.account',
          path: `/${uniqueName}/account-settings/account`
        },
        {
          action: 'read',
          subject: 'account-settings',
          title: 'navbar.account_settings_page.security',
          path: `/${uniqueName}/account-settings/security`
        }
      ]
    }
  ]
}

export default navigation
