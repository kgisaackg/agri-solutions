export interface User{
    uuid?: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    emailAddress: string;
    password?: string;
    role: string;
}