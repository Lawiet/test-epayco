import {postHttp} from './http';

export const register = async (data: any): Promise<any> => {
    return await postHttp('/actions/register', data)
}

export const deposit = async (data: any): Promise<any> => {
    return await postHttp('/actions/deposit', data)
}

export const pay = async (data: any): Promise<any> => {
    return await postHttp('/actions/pay', data)
}

export const confirmPay = async (data: any): Promise<any> => {
    return await postHttp('/actions/confirmPay', data)
}

export const balance = async (data: any): Promise<any> => {
    return await postHttp('/actions/balance', data)
}
