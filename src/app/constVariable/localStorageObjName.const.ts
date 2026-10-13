export const localStorageObjName={
  currentUserObj:"CurrentUser",
  accessToken:"accessToken",
  userRoles:"userRoles"
}

export interface localStorageObjNameModel {
  currentUserObj:currentUserObjModel;
}

export interface currentUserObjModel{
  password:string
  userNameAndEmail:string
}



export const CONSTE_NAME={
  CURRENT_USER:"CurrentUser"
}


export interface currentUserObjModel{
  password:string
  userNameAndEmail:string
}
