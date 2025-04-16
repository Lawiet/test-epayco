import env from '@/env'


export const getHttp = async (uri: string): Promise<any> => {
    const headers = {"Content-Type": "application/json"}
    const requestOptions = {
        method: "GET",
        headers
    };

    return await sendHttp(uri, requestOptions)
}

export const postHttp = async (uri: string, body: string): Promise<any> => {
    const headers = {"Content-Type": "application/json"}
    const requestOptions = {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    };

    return await sendHttp(uri, requestOptions)
}

export const putHttp = async (uri: string, body: string): Promise<any> => {
    const headers = {"Content-Type": "application/json"}
    const requestOptions = {
        method: "PUT",
        headers,
        body: JSON.stringify(body)
    };

    return await sendHttp(uri, requestOptions)
}

export const deleteHttp = async (uri: string): Promise<any> => {
    const headers = {"Content-Type": "application/json"}
    const requestOptions = {
        method: "DELETE",
        headers
    };

    return await sendHttp(uri, requestOptions)
}

export const customHttp = async (uri: string, method: string, body: string): Promise<any> => {
    const headers = {"Content-Type": "application/json"}
    const requestOptions = {
        method,
        headers,
        body: JSON.stringify(body)
    };

    return await sendHttp(uri, requestOptions)
}

export const sendHttp = async (uri: string, requestOptions: any): Promise<any> => {
    console.log(`${env.apiUri}${uri}`)
    console.log(requestOptions)
    const response = await fetch(`${env.apiUri}${uri}`, requestOptions);

    return response.json();
}
