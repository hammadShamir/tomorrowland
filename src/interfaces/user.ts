export enum UserRoles {
    USER = "user",
    ADMIN = "admin",
    SUB_ADMIN = "sub-admin",
}

export interface UserMenuProps {
    onLogout: () => void;
}