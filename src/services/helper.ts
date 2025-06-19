import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const checkForMessage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const message = searchParams.get("message");
    if (message) {
        toast.error(message);
        searchParams.delete("message");
        const newUrl = searchParams.toString()
            ? `${window.location.pathname}?${searchParams.toString()}`
            : window.location.pathname;

        window.history.replaceState(null, "", newUrl);
    }
};

export const checkAuth = () => {
    return Cookies.get("token") || null;
};

export const getUser = ()=>{
    return Cookies.get("user") || null;
}

export const logout = () => {
    const allCookies = Cookies.get();
    for (const cookieName in allCookies) {
        Cookies.remove(cookieName, { path: "/" });
    }
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "UTC" // Always show in UTC
    }) + " UTC";
};

