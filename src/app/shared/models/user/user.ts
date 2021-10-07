export interface User {
    id: number|undefined,
    email:string ,
    first_name: string,
    last_name: string,
    avatar: string,
    name?:string,
    job?:string
}
