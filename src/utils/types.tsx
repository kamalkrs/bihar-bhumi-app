import { ParamListBase } from "@react-navigation/native"

export interface IUserType {
    id: number,
    first_name?: string,
    last_name?: string,
    mobile_number?: string,
    user_type?: number,
    created?: string,
    image?: string,
    address?: string,
    name?: string,
    email_id?: string,
    aadhar_number?: string,
    admin_verified?: boolean
}

export interface IPropertyType {
    id: 0,
    site_title?: string,
    details?: string,
    photo_front?: string,
    photo_back?: string,
    photo_left?: string,
    photo_right?: string,
    user_id?: number,
    address?: string,
    total_amount: string,
    total_area: string,
    area_unit: string
}

export interface Restapi {
    success: boolean,
    message: string,
    data: any
}

export interface ParamList extends ParamListBase {
    Users: {
        title: string,
        userType: number
    },
    Userinfo: { id: number }
}