import Cookies from "universal-cookie"

const cookies = new Cookies()
export const getCookie = () => {
    return cookies.get("currentUser")
}

export const setCookie = async (currentUser: { username: string; jwt: string; vault_id: string }) => {
    return cookies.set("currentUser", currentUser)
}

export const clearCookie = async () => {
    return cookies.remove("currentUser")
}