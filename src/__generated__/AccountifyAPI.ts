/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginRequestDto {
  /** @example "foo@gmail.com" */
  email: string
  /** @example "password" */
  password: string
}

export interface UserRole {
  /** @example 1 */
  id: number
  /** @example "Admin" */
  name: string
  /** @example "admin" */
  slug: string
}

export interface OrganizationProfileResponseDto {
  /** @example 1 */
  id: number
  /** @example "Organization Fullname" */
  name: string
  /** @example "org_unique_name" */
  uniqueName: string
  roles: UserRole[]
}

export interface ProfileResponseDto {
  /** @example 1 */
  id: number
  /** @example "robin@moneyforward.co.jp" */
  email: string
  /** @example "robin" */
  name: string
  /** @example "0339089172" */
  phone: string
  /** @example "19A Bach Khoa, Ha Noi" */
  address: string
  /** @example "https://image.com/avatar-1" */
  avatar: string
  /** @example [{"id":1,"name":"First Organization Name","uniqueName":"first_organization_unique_name","roles":[{"id":1,"name":"Admin"}]}] */
  organizations: OrganizationProfileResponseDto[]
}

export interface LoginResponse {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" */
  accessToken: string
  userData: ProfileResponseDto
}

export interface LoginWithGoogleRequestDto {
  /** @example "foo@gmail.com" */
  email: string
  /** @example "foo" */
  name: string
  /** @example "https://avatar.png" */
  avatar: string
}

export interface RegisterRequestDto {
  /** @example "foo@gmail.com" */
  email: string
  /** @example "foo" */
  name: string
  /** @example "password" */
  password: string
}

export interface RegisterResponse {
  /** @example "foo@gmail.com" */
  email: string
  /** @example "foo" */
  name: string
  /** @example "password" */
  password: string
}

export interface UpdateProfileRequestDto {
  /** @example "Foo" */
  name?: string
  /** @example "0339089172" */
  phone?: string
  /** @example "19A Bach Khoa, Ha Noi" */
  address?: string
  /** @example "password" */
  password?: string
}

export interface OrganizationUserResponseDto {
  /** @example 1 */
  id: number
  /** @example "robin@moneyforward.co.jp" */
  email: string
  /** @example "robin" */
  name: string
  /** @example "0339089172" */
  phone: string
  /** @example "19A Bach Khoa, Ha Noi" */
  address: string
  /** @example "https://image.com/avatar-1" */
  avatar: string
  roles: UserRole[]
}

export interface UserSearchRequestDto {
  query?: string
  role?: string
}

export interface MetaData {
  total: number
  params: UserSearchRequestDto
}

export interface OrganizationUserListResponseDto {
  users: OrganizationUserResponseDto[]
  metadata: MetaData
}

export interface TotalAdminResponseDto {
  /** @example 5 */
  totalAdmins: number
}

export interface BulkInviteRequestDto {
  /** @example ["hoge@i.moneyforward.com","fuga@i.moneyforward.com"] */
  emails: string[]
  /** @example [2,3] */
  roleIds: number[]
}

export interface BulkInviteResponseDto {
  /** @example 1 */
  invitedCount: number
  /** @example 1 */
  notInvitedCount: number
}

export interface UpdateOrganizationUserRequestDto {
  /** @example [2,3] */
  roleIds: number[]
}

export type EmptyResponseDto = object

export enum PermissionAction {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

export enum PermissionSubject {
  ALL = 'all',
  ORGANIZATION = 'organization',
  USER = 'user',
  ROLE = 'role',
  INVOICE = 'invoice'
}

export interface CaslPermission {
  action: PermissionAction
  subject: PermissionSubject
}

export interface GetUserPermissionsResponseDto {
  permissions: CaslPermission[]
}

export interface CreateOrganizationRequestDto {
  /** @example "Example organization" */
  name: string
  /** @example "example-org" */
  uniqueName: string
}

export interface OrganizationResponseDto {
  /** @example 1 */
  id: number
  /** @example "Test org" */
  name: string
  /** @example "test-org" */
  uniqueName: string
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface UpdateOrganizationRequestDto {
  /** @example "Example organization" */
  name?: string
  /** @example "example-org" */
  uniqueName?: string
}

export interface PermissionSubjectResponseDto {
  /** @example "organization" */
  subject: string
}

export interface PermissionConfigDto {
  /** @example "create" */
  action: PermissionConfigDtoActionEnum
  /** @example "organization" */
  subject: PermissionConfigDtoSubjectEnum
}

export interface CreateRoleRequestDto {
  /** @example "Developer" */
  name: string
  /** @example "developer" */
  slug: string
  permissionConfigs: PermissionConfigDto[]
}

export type Permission = object

export interface RoleResponseDto {
  /** @example 1 */
  id: number
  /** @example "Admin" */
  name: string
  /** @example "admin" */
  slug: string
  permissions: Permission[]
  isCustom: boolean
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface RoleResponseListDto {
  roles: RoleResponseDto[]
  metadata: MetaData
}

export interface UpdateRoleRequestDto {
  /** @example "Admin" */
  name?: string
  /** @example "admin" */
  slug?: string
  permissionConfigs: PermissionConfigDto[]
}

export interface DocumentResponseDto {
  /** @example 1 */
  id: number
  /** @example "ABC123" */
  document_id: string
  /** @example "abcxyz.txt" */
  document_name: string
  /** @example "linkexample" */
  url: string
  /** @example "ghi chu cho document" */
  note: string
  /** @example "abcxyz.txt" */
  created_by: string
  /** @example 1 */
  organizationId: number
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface DocumentResponseListDto {
  documents: DocumentResponseDto[]
  metadata: MetaData
}

export interface CreateDocumentRequestDto {
  /** @example "phieu giao nhiem vu" */
  document_name: string
  /** @example "Pay monthly internet bill" */
  note?: string
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface UpdateDocumentRequestDto {
  /** @example "phieu giao nhiem vu" */
  document_name?: string
  /** @example "Pay monthly internet bill" */
  note?: string
  /** @example "Pay monthly internet bill" */
  url?: string
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt?: string
}

export enum CurrencyType {
  VND = 'vnd',
  USD = 'usd'
}

export enum InvoiceType {
  EXPENSE = 'expense',
  INCOME = 'income'
}

export interface CreateInvoiceItemRequest {
  /** @example "Monthly bill" */
  name: string
  /** @example "Pay monthly internet bill" */
  note?: string
  /** @example 100000 */
  price: number
  /** @example 1 */
  quantity: number
  /** @example "expense" */
  type: InvoiceType
}

export interface CreateInvoiceRequestDto {
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  date: string
  /** @example "vnd" */
  currency: CurrencyType
  items: CreateInvoiceItemRequest[]
}

export interface InvoiceItemResponseDto {
  /** @example 1 */
  id: number
  /** @example "Monthly bill" */
  name: string
  /** @example "Pay monthly internet bill" */
  note: string
  /** @example 10000 */
  price: number
  /** @example 1 */
  quantity: number
  /** @example "expense" */
  type: InvoiceType
}

export interface InvoiceResponseDto {
  /** @example 1 */
  id: number
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  date: string
  /** @example "vnd" */
  currency: CurrencyType
  /** @example 10 */
  total: number
  items: InvoiceItemResponseDto[]
  creator: OrganizationUserResponseDto
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface InvoiceResponseListDto {
  invoices: InvoiceResponseDto[]
  metadata: MetaData
}

export interface UpdateInvoiceItemRequest {
  /** @example "Monthly bill" */
  name?: string
  /** @example "Pay monthly internet bill" */
  note?: string
  /** @example 100000 */
  price?: number
  /** @example 1 */
  quantity?: number
  /** @example "expense" */
  type?: InvoiceType
}

export interface UpdateInvoiceRequestDto {
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  date?: string
  /** @example "vnd" */
  currency?: CurrencyType
  items: UpdateInvoiceItemRequest[]
}

export interface SubscriptionsResponseDto {
  /** @example 1 */
  id: number
  /** @example "123" */
  documentId: number
  /** @example "123" */
  userId: number
  /** @example "true/false" */
  bySMS: boolean
  /** @example "true/false" */
  byEmail: boolean
  /** @example "fake@gmail.com" */
  email: string
  /** @example "123456789" */
  phone: string
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface SubscriptionsResponseListDto {
  subscriptions: SubscriptionsResponseDto[]
  metadata: MetaData
}

export interface CreateSubscriptionsRequestDto {
  /** @example "0/1" */
  byEmail: boolean
  /** @example "0/1" */
  bySMS: boolean
  /** @example "0123456789" */
  phone: string
  /** @example "fake@mail.com" */
  email: string
}

export interface UpdateSubscriptionsRequestDto {
  /** @example "12" */
  documentId: number
  /** @example "0/1" */
  byEmail: boolean
  /** @example "0/1" */
  bySMS: boolean
  /** @example "0123456789" */
  phone: string
  /** @example "fake@mail.com" */
  email: string
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface VersionResponseDto {
  /** @example 1 */
  id: number
  /** @example "ABC123" */
  versionId: string
  /** @example "ABC123" */
  documentId: string
  /** @example "abcxyz.txt" */
  versionName: string
  /** @example "ghi chu cho document" */
  note: string
  /** @example "" */
  downloadNumber: number
  /** @example "link cloudinary" */
  url: string
  /** @example "xlsx,pptx,.." */
  type: string
  /** @example "ten nguoi" */
  created_by: string
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
}

export interface VersionResponseListDto {
  versions: VersionResponseDto[]
  metadata: MetaData
}

export interface CreateVersionRequestDto {
  /** @example "phieu giao nhiem vu" */
  versionName: string
  /** @example "Link file" */
  url?: string
  /** @example "xlsx,docx,..." */
  type?: string
  /** @example "xlsx,docx,..." */
  created_by?: string
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt: string
  /** @example "Pay monthly internet bill" */
  note?: string
}

export interface UpdateVerionRequestDto {
  /** @example "phieu giao nhiem vu" */
  versionName?: string
  /** @example "Pay monthly internet bill" */
  note?: string
  /**
   * @format date-time
   * @example "2024-02-26T07:31:35.000Z"
   */
  createdAt?: string
}

/** @example "create" */
export enum PermissionConfigDtoActionEnum {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

/** @example "organization" */
export enum PermissionConfigDtoSubjectEnum {
  ALL = 'all',
  ORGANIZATION = 'organization',
  USER = 'user',
  ROLE = 'role',
  INVOICE = 'invoice'
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios'
import axios from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)
    const defaultMethodHeaders = (method && this.instance.defaults.headers[method.toLowerCase()]) || {}

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        // ...(((method && (this.instance.defaults.headers[method.toLowerCase()] as AxiosRequestConfig)) ||
        //   {}) as AxiosRequestConfig),
        ...(typeof defaultMethodHeaders === 'object' ? defaultMethodHeaders : {}),

        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body)
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path
    })
  }
}

/**
 * @title GR API
 * @version 1.0
 * @contact
 *
 * GR API Description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: 'GET',
      ...params
    })

  internal = {
    /**
     * @description Login with email and password
     *
     * @tags Auth
     * @name Login
     * @summary Login endpoint for users
     * @request POST:/internal/api/v1/auth/login
     */
    login: (data: LoginRequestDto, params: RequestParams = {}) =>
      this.request<LoginResponse, any>({
        path: `/internal/api/v1/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Login with Google
     *
     * @tags Auth
     * @name LoginWithGoogle
     * @summary Login with Google endpoint for users
     * @request POST:/internal/api/v1/auth/login-google
     */
    loginWithGoogle: (data: LoginWithGoogleRequestDto, params: RequestParams = {}) =>
      this.request<LoginResponse, any>({
        path: `/internal/api/v1/auth/login-google`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Register with email and password
     *
     * @tags Auth
     * @name Register
     * @summary Register endpoint for users
     * @request POST:/internal/api/v1/auth/register
     */
    register: (data: RegisterRequestDto, params: RequestParams = {}) =>
      this.request<RegisterResponse, any>({
        path: `/internal/api/v1/auth/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Return user data and their belonging organization
     *
     * @tags Auth
     * @name GetUserProfile
     * @summary Get user profile
     * @request GET:/internal/api/v1/auth/profile
     * @secure
     */
    getUserProfile: (params: RequestParams = {}) =>
      this.request<ProfileResponseDto, any>({
        path: `/internal/api/v1/auth/profile`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update user profile
     *
     * @tags Auth
     * @name UpdateUserProfile
     * @summary Update user profile
     * @request PATCH:/internal/api/v1/auth/profile
     * @secure
     */
    updateUserProfile: (data: UpdateProfileRequestDto, params: RequestParams = {}) =>
      this.request<ProfileResponseDto, any>({
        path: `/internal/api/v1/auth/profile`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get all organization users
     *
     * @tags Organization User
     * @name GetUserListForOrganization
     * @summary Get all organization users
     * @request GET:/internal/api/v1/organizations/{organizationId}/users
     * @secure
     */
    getUserListForOrganization: (
      organizationId: number,
      query?: {
        query?: string
        role?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<OrganizationUserListResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Count total admins
     *
     * @tags Organization User
     * @name CountTotalAdminsOfOrganization
     * @summary Count total admins
     * @request GET:/internal/api/v1/organizations/{organizationId}/users/admin-count
     * @secure
     */
    countTotalAdminsOfOrganization: (organizationId: number, params: RequestParams = {}) =>
      this.request<TotalAdminResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/users/admin-count`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Bulk invite users
     *
     * @tags Organization User
     * @name InviteUsersToOrganization
     * @summary Bulk invite users
     * @request POST:/internal/api/v1/organizations/{organizationId}/users/bulk-invitations
     * @secure
     */
    inviteUsersToOrganization: (organizationId: number, data: BulkInviteRequestDto, params: RequestParams = {}) =>
      this.request<BulkInviteResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/users/bulk-invitations`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Update organization users information
     *
     * @tags Organization User
     * @name UpdateOrganizationUserInformation
     * @summary Update organization users information
     * @request PATCH:/internal/api/v1/organizations/{organizationId}/users/{id}
     * @secure
     */
    updateOrganizationUserInformation: (
      organizationId: number,
      id: number,
      data: UpdateOrganizationUserRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<OrganizationUserResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/users/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete an organization user
     *
     * @tags Organization User
     * @name DeleteAnOrganizationUser
     * @summary Delete an organization user
     * @request DELETE:/internal/api/v1/organizations/{organizationId}/users/{id}
     * @secure
     */
    deleteAnOrganizationUser: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/users/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get organization user's permissions
     *
     * @tags Organization User
     * @name GetOrganizationUsersPermissions
     * @summary Get organization user's permissions
     * @request GET:/internal/api/v1/organizations/{organizationId}/users/permissions
     * @secure
     */
    getOrganizationUsersPermissions: (organizationId: number, params: RequestParams = {}) =>
      this.request<GetUserPermissionsResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/users/permissions`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Create new organization with organization name (Example org) and global unique name (example-org)
     *
     * @tags Organization
     * @name OrganizationsControllerCreate
     * @summary Create new organization
     * @request POST:/internal/api/v1/organizations
     * @secure
     */
    organizationsControllerCreate: (data: CreateOrganizationRequestDto, params: RequestParams = {}) =>
      this.request<OrganizationResponseDto, any>({
        path: `/internal/api/v1/organizations`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get organization
     *
     * @tags Organization
     * @name GetOrganization
     * @summary Get organization
     * @request GET:/internal/api/v1/organizations/{id}
     * @secure
     */
    getOrganization: (id: number, params: RequestParams = {}) =>
      this.request<OrganizationResponseDto, any>({
        path: `/internal/api/v1/organizations/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update organization
     *
     * @tags Organization
     * @name UpdateOrganization
     * @summary Update organization
     * @request PATCH:/internal/api/v1/organizations/{id}
     * @secure
     */
    updateOrganization: (id: number, data: UpdateOrganizationRequestDto, params: RequestParams = {}) =>
      this.request<OrganizationResponseDto, any>({
        path: `/internal/api/v1/organizations/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete an organization
     *
     * @tags Organization
     * @name DeleteAnOrganization
     * @summary Delete an organization
     * @request DELETE:/internal/api/v1/organizations/{id}
     * @secure
     */
    deleteAnOrganization: (id: number, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, any>({
        path: `/internal/api/v1/organizations/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get permission subject list
     *
     * @tags Permission
     * @name GetPermissionSubjectList
     * @summary Get permission subject list
     * @request GET:/internal/api/v1/permissions
     * @secure
     */
    getPermissionSubjectList: (params: RequestParams = {}) =>
      this.request<PermissionSubjectResponseDto[], any>({
        path: `/internal/api/v1/permissions`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Create roles for an organization
     *
     * @tags Organization Role
     * @name CreateRolesForAnOrganization
     * @summary Create roles for an organization
     * @request POST:/internal/api/v1/organizations/{organizationId}/roles
     * @secure
     */
    createRolesForAnOrganization: (organizationId: number, data: CreateRoleRequestDto, params: RequestParams = {}) =>
      this.request<RoleResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/roles`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get role list for organization
     *
     * @tags Organization Role
     * @name GetRoleListForOrganization
     * @summary Get role list for organization
     * @request GET:/internal/api/v1/organizations/{organizationId}/roles
     * @secure
     */
    getRoleListForOrganization: (
      organizationId: number,
      query?: {
        query?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<RoleResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/roles`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get role by ID for an org
     *
     * @tags Organization Role
     * @name GetRoleByIdForAnOrg
     * @summary Get role by ID for an org
     * @request GET:/internal/api/v1/organizations/{organizationId}/roles/{id}
     * @secure
     */
    getRoleByIdForAnOrg: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<RoleResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/roles/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update a role for an organization
     *
     * @tags Organization Role
     * @name UpdateARoleForAnOrganization
     * @summary Update a role for an organization
     * @request PATCH:/internal/api/v1/organizations/{organizationId}/roles/{id}
     * @secure
     */
    updateARoleForAnOrganization: (
      organizationId: number,
      id: number,
      data: UpdateRoleRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<RoleResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/roles/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete a role for an organization
     *
     * @tags Organization Role
     * @name DeleteARoleForAnOrganization
     * @summary Delete a role for an organization
     * @request DELETE:/internal/api/v1/organizations/{organizationId}/roles/{id}
     * @secure
     */
    deleteARoleForAnOrganization: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/roles/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get document list for organization
     *
     * @tags Organization Document
     * @name GetDocumentListForOrganization
     * @summary Get document list for organization
     * @request GET:/internal/api/v1/organizations/{organizationId}/documents
     * @secure
     */
    getDocumentListForOrganization: (organizationId: number, params: RequestParams = {}) =>
      this.request<DocumentResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/documents`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Create Documents for an organization
     *
     * @tags Organization Document
     * @name CreateDocumentsForAnOrganization
     * @summary Create Documents for an organization
     * @request POST:/internal/api/v1/organizations/{organizationId}/documents
     * @secure
     */
    createDocumentsForAnOrganization: (
      organizationId: number,
      data: CreateDocumentRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<DocumentResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/documents`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get document by ID for an org
     *
     * @tags Organization Document
     * @name GetDocumentByIdForAnOrg
     * @summary Get document by ID for an org
     * @request GET:/internal/api/v1/organizations/{organizationId}/documents/{id}
     * @secure
     */
    getDocumentByIdForAnOrg: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<DocumentResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/documents/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update an document for an organization
     *
     * @tags Organization Document
     * @name UpdateAnDocumentForAnOrganization
     * @summary Update an document for an organization
     * @request PATCH:/internal/api/v1/organizations/{organizationId}/documents/{id}
     * @secure
     */
    updateAnDocumentForAnOrganization: (
      organizationId: number,
      id: number,
      data: UpdateDocumentRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<DocumentResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/documents/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete a document for an organization
     *
     * @tags Organization Document
     * @name DeleteADocumentForAnOrganization
     * @summary Delete a document for an organization
     * @request DELETE:/internal/api/v1/organizations/{organizationId}/documents/{id}
     * @secure
     */
    deleteADocumentForAnOrganization: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/documents/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Create invoices for an organization
     *
     * @tags Organization Invoice
     * @name CreateInvoicesForAnOrganization
     * @summary Create invoices for an organization
     * @request POST:/internal/api/v1/organizations/{organizationId}/invoices
     * @secure
     */
    createInvoicesForAnOrganization: (
      organizationId: number,
      data: CreateInvoiceRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<InvoiceResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/invoices`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get invoice list for organization
     *
     * @tags Organization Invoice
     * @name GetInvoiceListForOrganization
     * @summary Get invoice list for organization
     * @request GET:/internal/api/v1/organizations/{organizationId}/invoices
     * @secure
     */
    getInvoiceListForOrganization: (
      organizationId: number,
      query?: {
        query?: string
        /** @format date-time */
        fromDate?: string
        /** @format date-time */
        toDate?: string
        type?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<InvoiceResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/invoices`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get invoice by ID for an org
     *
     * @tags Organization Invoice
     * @name GetInvoiceByIdForAnOrg
     * @summary Get invoice by ID for an org
     * @request GET:/internal/api/v1/organizations/{organizationId}/invoices/{id}
     * @secure
     */
    getInvoiceByIdForAnOrg: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<InvoiceResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/invoices/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update an invoice for an organization
     *
     * @tags Organization Invoice
     * @name UpdateAnInvoiceForAnOrganization
     * @summary Update an invoice for an organization
     * @request PATCH:/internal/api/v1/organizations/{organizationId}/invoices/{id}
     * @secure
     */
    updateAnInvoiceForAnOrganization: (
      organizationId: number,
      id: number,
      data: UpdateInvoiceRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<InvoiceResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/invoices/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete an invoice for an organization
     *
     * @tags Organization Invoice
     * @name DeleteAnInvoiceForAnOrganization
     * @summary Delete an invoice for an organization
     * @request DELETE:/internal/api/v1/organizations/{organizationId}/invoices/{id}
     * @secure
     */
    deleteAnInvoiceForAnOrganization: (organizationId: number, id: number, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/invoices/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get all subs by a document for an org
     *
     * @tags Organization Document Subscription
     * @name GetAllSubsByADocumentForAnOrg
     * @summary Get all subs by a document for an org
     * @request GET:/internal/api/v1/organizations/{organizationId}/subcriptions/{documentId}
     * @secure
     */
    getAllSubsByADocumentForAnOrg: (organizationId: number, documentId: number, params: RequestParams = {}) =>
      this.request<SubscriptionsResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/subcriptions/${documentId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Create a sub of a document for an org
     *
     * @tags Organization Document Subscription
     * @name CreateASubOfADocumentForAnOrg
     * @summary Create a sub of a document for an org
     * @request POST:/internal/api/v1/organizations/{organizationId}/subcriptions/{documentId}
     * @secure
     */
    createASubOfADocumentForAnOrg: (
      organizationId: number,
      documentId: number,
      data: CreateSubscriptionsRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<SubscriptionsResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/subcriptions/${documentId}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Update a sub of a document for an org
     *
     * @tags Organization Document Subscription
     * @name UpdateASubOfADocumentForAnOrg
     * @summary Update a sub of a document for an org
     * @request PATCH:/internal/api/v1/organizations/{organizationId}/subcriptions/{subId}
     * @secure
     */
    updateASubOfADocumentForAnOrg: (
      organizationId: number,
      subId: number,
      data: UpdateSubscriptionsRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<SubscriptionsResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/subcriptions/${subId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get state of a sub by a document for a user of an org
     *
     * @tags Organization Document Subscription
     * @name GetStateOfASubByADocumentForAUserOfAnOrg
     * @summary Get state of a sub  by a document  for user of  an org
     * @request GET:/internal/api/v1/organizations/{organizationId}/subcriptions/state/{documentId}/{userId}
     * @secure
     */
    getStateOfASubByADocumentForAUserOfAnOrg: (
      organizationId: number,
      documentId: number,
      userId: number,
      params: RequestParams = {}
    ) =>
      this.request<SubscriptionsResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/subcriptions/state/${documentId}/${userId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get version list for document
     *
     * @tags Document Version
     * @name GetVersionListForDocument
     * @summary Get version list for document
     * @request GET:/internal/api/v1/organizations/{organizationId}/versions/{documentId}
     * @secure
     */
    getVersionListForDocument: (organizationId: number, documentId: string, params: RequestParams = {}) =>
      this.request<VersionResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/versions/${documentId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Create Documents for an organization
     *
     * @tags Document Version
     * @name CreateDocumentsForAnOrganization2
     * @summary Create Documents for an organization
     * @request POST:/internal/api/v1/organizations/{organizationId}/versions/{documentId}
     * @originalName createDocumentsForAnOrganization
     * @duplicate
     * @secure
     */
    createDocumentsForAnOrganization2: (
      organizationId: number,
      documentId: string,
      data: CreateVersionRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<VersionResponseListDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/versions/${documentId}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Get version id for document
     *
     * @tags Document Version
     * @name GetVersionByIdForDocument
     * @summary Get version by id for document
     * @request GET:/internal/api/v1/organizations/{organizationId}/versions/{documentId}/{id}
     * @secure
     */
    getVersionByIdForDocument: (organizationId: number, documentId: string, id: number, params: RequestParams = {}) =>
      this.request<VersionResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/versions/${documentId}/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Update an document for an organization
     *
     * @tags Document Version
     * @name UpdateAnDocumentForAnOrganization2
     * @summary Update an document for an organization
     * @request PATCH:/internal/api/v1/organizations/{organizationId}/versions/{documentId}/{id}
     * @originalName updateAnDocumentForAnOrganization
     * @duplicate
     * @secure
     */
    updateAnDocumentForAnOrganization2: (
      organizationId: number,
      documentId: string,
      id: number,
      data: UpdateVerionRequestDto,
      params: RequestParams = {}
    ) =>
      this.request<VersionResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/versions/${documentId}/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Delete a document for an organization
     *
     * @tags Document Version
     * @name DeleteADocumentForAnOrganization2
     * @summary Delete a document for an organization
     * @request DELETE:/internal/api/v1/organizations/{organizationId}/versions/{id}
     * @originalName deleteADocumentForAnOrganization
     * @duplicate
     * @secure
     */
    deleteADocumentForAnOrganization2: (id: number, organizationId: string, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, any>({
        path: `/internal/api/v1/organizations/${organizationId}/versions/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      })
  }
  email = {
    /**
     * @description Send email of anoucements for users
     *
     * @tags Send email
     * @name SendEmailOfAnoucementsForUsers
     * @summary Send email of anoucements for users
     * @request POST:/email/send-email
     */
    sendEmailOfAnoucementsForUsers: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/email/send-email`,
        method: 'POST',
        ...params
      })
  }
  upload = {
    /**
     * No description
     *
     * @name UploadControllerUploadSingleImageFromLocal
     * @request POST:/upload/single-file-from-local
     */
    uploadControllerUploadSingleImageFromLocal: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/upload/single-file-from-local`,
        method: 'POST',
        ...params
      })
  }
}
