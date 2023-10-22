import Cookies from "universal-cookie"

const cookies = new Cookies()
export const getCookie = () => {
    return cookies.get("currentUser")
}

export const setCookie = async (currentUser: { username: string; vault_id: string }) => {
    return cookies.set("currentUser", currentUser)
}

export const clearCookie = async () => {
    return cookies.remove("currentUser")
}

export function shortenAddress(address: string) {
    const prefix = address.startsWith("0x") ? "0x" : "";
    const isTerra = address.startsWith("terra");
    return `${prefix}${address
        .replace("0x", "")
        .substring(0, prefix ? 4 : 6)}...${address.substring(
            isTerra ? address.length - 6 : address.length - 4
        )}`;
}
