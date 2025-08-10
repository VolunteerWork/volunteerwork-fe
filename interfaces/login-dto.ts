import Account from "./account";

export default interface LoginDto {
          account: Account,
          jwtToken: string
} 