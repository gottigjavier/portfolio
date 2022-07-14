export interface User{
    userId: number,
    userName: string,
    email: string,
    password: string,
    authorities: Array<any>
}