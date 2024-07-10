"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.HttpClient = exports.ContentType = exports.PermissionConfigDtoSubjectEnum = exports.PermissionConfigDtoActionEnum = exports.InvoiceType = exports.CurrencyType = exports.PermissionSubject = exports.PermissionAction = void 0;
var PermissionAction;
(function (PermissionAction) {
    PermissionAction["MANAGE"] = "manage";
    PermissionAction["CREATE"] = "create";
    PermissionAction["READ"] = "read";
    PermissionAction["UPDATE"] = "update";
    PermissionAction["DELETE"] = "delete";
})(PermissionAction = exports.PermissionAction || (exports.PermissionAction = {}));
var PermissionSubject;
(function (PermissionSubject) {
    PermissionSubject["ALL"] = "all";
    PermissionSubject["ORGANIZATION"] = "organization";
    PermissionSubject["USER"] = "user";
    PermissionSubject["ROLE"] = "role";
    PermissionSubject["INVOICE"] = "invoice";
})(PermissionSubject = exports.PermissionSubject || (exports.PermissionSubject = {}));
var CurrencyType;
(function (CurrencyType) {
    CurrencyType["VND"] = "vnd";
    CurrencyType["USD"] = "usd";
})(CurrencyType = exports.CurrencyType || (exports.CurrencyType = {}));
var InvoiceType;
(function (InvoiceType) {
    InvoiceType["EXPENSE"] = "expense";
    InvoiceType["INCOME"] = "income";
})(InvoiceType = exports.InvoiceType || (exports.InvoiceType = {}));
/** @example "create" */
var PermissionConfigDtoActionEnum;
(function (PermissionConfigDtoActionEnum) {
    PermissionConfigDtoActionEnum["MANAGE"] = "manage";
    PermissionConfigDtoActionEnum["CREATE"] = "create";
    PermissionConfigDtoActionEnum["READ"] = "read";
    PermissionConfigDtoActionEnum["UPDATE"] = "update";
    PermissionConfigDtoActionEnum["DELETE"] = "delete";
})(PermissionConfigDtoActionEnum = exports.PermissionConfigDtoActionEnum || (exports.PermissionConfigDtoActionEnum = {}));
/** @example "organization" */
var PermissionConfigDtoSubjectEnum;
(function (PermissionConfigDtoSubjectEnum) {
    PermissionConfigDtoSubjectEnum["ALL"] = "all";
    PermissionConfigDtoSubjectEnum["ORGANIZATION"] = "organization";
    PermissionConfigDtoSubjectEnum["USER"] = "user";
    PermissionConfigDtoSubjectEnum["ROLE"] = "role";
    PermissionConfigDtoSubjectEnum["INVOICE"] = "invoice";
})(PermissionConfigDtoSubjectEnum = exports.PermissionConfigDtoSubjectEnum || (exports.PermissionConfigDtoSubjectEnum = {}));
const axios_1 = __importDefault(require("axios"));
var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
    ContentType["Text"] = "text/plain";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
class HttpClient {
    constructor({ securityWorker, secure, format, ...axiosConfig } = {}) {
        this.securityData = null;
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.request = async ({ secure, path, type, query, format, body, ...params }) => {
            const secureParams = ((typeof secure === 'boolean' ? secure : this.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
                {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const responseFormat = format || this.format || undefined;
            if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
                body = this.createFormData(body);
            }
            if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
                body = JSON.stringify(body);
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
            });
        };
        this.instance = axios_1.default.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }
    mergeRequestParams(params1, params2) {
        const method = params1.method || (params2 && params2.method);
        const defaultMethodHeaders = (method && this.instance.defaults.headers[method.toLowerCase()]) || {};
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
        };
    }
    stringifyFormItem(formItem) {
        if (typeof formItem === 'object' && formItem !== null) {
            return JSON.stringify(formItem);
        }
        else {
            return `${formItem}`;
        }
    }
    createFormData(input) {
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            const propertyContent = property instanceof Array ? property : [property];
            for (const formItem of propertyContent) {
                const isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
            }
            return formData;
        }, new FormData());
    }
}
exports.HttpClient = HttpClient;
/**
 * @title GR API
 * @version 1.0
 * @contact
 *
 * GR API Description
 */
class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @name AppControllerGetHello
         * @request GET:/
         */
        this.appControllerGetHello = (params = {}) => this.request({
            path: `/`,
            method: 'GET',
            ...params
        });
        this.internal = {
            /**
             * @description Login with email and password
             *
             * @tags Auth
             * @name Login
             * @summary Login endpoint for users
             * @request POST:/internal/api/v1/auth/login
             */
            login: (data, params = {}) => this.request({
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
            loginWithGoogle: (data, params = {}) => this.request({
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
            register: (data, params = {}) => this.request({
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
            getUserProfile: (params = {}) => this.request({
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
            updateUserProfile: (data, params = {}) => this.request({
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
            getUserListForOrganization: (organizationId, query, params = {}) => this.request({
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
            countTotalAdminsOfOrganization: (organizationId, params = {}) => this.request({
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
            inviteUsersToOrganization: (organizationId, data, params = {}) => this.request({
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
            updateOrganizationUserInformation: (organizationId, id, data, params = {}) => this.request({
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
            deleteAnOrganizationUser: (organizationId, id, params = {}) => this.request({
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
            getOrganizationUsersPermissions: (organizationId, params = {}) => this.request({
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
            organizationsControllerCreate: (data, params = {}) => this.request({
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
            getOrganization: (id, params = {}) => this.request({
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
            updateOrganization: (id, data, params = {}) => this.request({
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
            deleteAnOrganization: (id, params = {}) => this.request({
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
            getPermissionSubjectList: (params = {}) => this.request({
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
            createRolesForAnOrganization: (organizationId, data, params = {}) => this.request({
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
            getRoleListForOrganization: (organizationId, query, params = {}) => this.request({
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
            getRoleByIdForAnOrg: (organizationId, id, params = {}) => this.request({
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
            updateARoleForAnOrganization: (organizationId, id, data, params = {}) => this.request({
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
            deleteARoleForAnOrganization: (organizationId, id, params = {}) => this.request({
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
            getDocumentListForOrganization: (organizationId, params = {}) => this.request({
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
            createDocumentsForAnOrganization: (organizationId, data, params = {}) => this.request({
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
            getDocumentByIdForAnOrg: (organizationId, id, params = {}) => this.request({
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
            updateAnDocumentForAnOrganization: (organizationId, id, data, params = {}) => this.request({
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
            deleteADocumentForAnOrganization: (organizationId, id, params = {}) => this.request({
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
            createInvoicesForAnOrganization: (organizationId, data, params = {}) => this.request({
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
            getInvoiceListForOrganization: (organizationId, query, params = {}) => this.request({
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
            getInvoiceByIdForAnOrg: (organizationId, id, params = {}) => this.request({
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
            updateAnInvoiceForAnOrganization: (organizationId, id, data, params = {}) => this.request({
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
            deleteAnInvoiceForAnOrganization: (organizationId, id, params = {}) => this.request({
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
            getAllSubsByADocumentForAnOrg: (organizationId, documentId, params = {}) => this.request({
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
            createASubOfADocumentForAnOrg: (organizationId, documentId, data, params = {}) => this.request({
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
            updateASubOfADocumentForAnOrg: (organizationId, subId, data, params = {}) => this.request({
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
            getStateOfASubByADocumentForAUserOfAnOrg: (organizationId, documentId, userId, params = {}) => this.request({
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
            getVersionListForDocument: (organizationId, documentId, params = {}) => this.request({
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
            createDocumentsForAnOrganization2: (organizationId, documentId, data, params = {}) => this.request({
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
            getVersionByIdForDocument: (organizationId, documentId, id, params = {}) => this.request({
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
            updateAnDocumentForAnOrganization2: (organizationId, documentId, id, data, params = {}) => this.request({
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
            deleteADocumentForAnOrganization2: (id, organizationId, params = {}) => this.request({
                path: `/internal/api/v1/organizations/${organizationId}/versions/${id}`,
                method: 'DELETE',
                secure: true,
                format: 'json',
                ...params
            })
        };
        this.email = {
            /**
             * @description Send email of anoucements for users
             *
             * @tags Send email
             * @name SendEmailOfAnoucementsForUsers
             * @summary Send email of anoucements for users
             * @request POST:/email/send-email
             */
            sendEmailOfAnoucementsForUsers: (params = {}) => this.request({
                path: `/email/send-email`,
                method: 'POST',
                ...params
            })
        };
        this.upload = {
            /**
             * No description
             *
             * @name UploadControllerUploadSingleImageFromLocal
             * @request POST:/upload/single-file-from-local
             */
            uploadControllerUploadSingleImageFromLocal: (params = {}) => this.request({
                path: `/upload/single-file-from-local`,
                method: 'POST',
                ...params
            })
        };
    }
}
exports.Api = Api;
