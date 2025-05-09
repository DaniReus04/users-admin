export interface IUser {
  id: number,
  name: string,
  email: string,
  createdAt: Date,
  updatedAt: Date,
  profile: string,
  tokenVersion: number,
  companyId: number,
  super: boolean,
  online: boolean,
  endWork: string,
  startWork: string,
  color: string | null,
  farewellMessage: string | null,
  whatsappId: number,
  allTicket: string,
  allowGroup: boolean,
  defaultMenu: string,
  defaultTheme: string,
  profileImage: string | null,
  wpp: string | null
}

export interface IFetchCreateUser {
  name: string,
  email: string,
  password: string,
  companyId: number
}

export interface IFetchEditUser {
  name: string,
  email: string,
  companyId: number
}

export interface IUploadImage {
  profileImage: string
}