export enum Gender{
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
}

export interface userRegisterationData{
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: Gender;
}