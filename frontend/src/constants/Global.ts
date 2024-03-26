export const LIMIT_PER_PAGE = 10;

export enum SESSION_STATUS {
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

export enum LOCAL_STORAGE_KEYS {
  AUTH_TOKEN = 'auth_token',
  AUTH_ID = 'auth_id',
  AUTH_EMAIL = 'auth_email',
  AUTH_NAME = 'auth_name',
  TEMP_EMAIL = 'temp_email',
}

export enum ModalType {
  DELETE = 'delete',
  MERGE = 'merge',
  RESTORE = 'restore',
}

export enum TooltipPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  RIGHT = 'right',
  LEFT = 'left',
}

export enum ROLETYPE {
  ROLE1 = 'Admin',
  ROLE2 = 'STS Manager',
  ROLE3 = 'Landfil Manager'
}

export enum TRUCKTYPE {
  TYPE1 = "Open Truck",
  TYPE2 = 'Dump Truck',
  TYPE3 = 'Compactor',
  TYPE4 = 'Container Carrier'
}