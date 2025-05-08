export interface IFetchLogin {
  email: string,
  password: string
}

export interface IFetchRegister {
  name: string,
  email: string,
  password: string
}

export interface ITokens {
  token: string,
  refreshToken: string
}