export interface SignUpUser {
    username: string,
    password: string
}

export interface ConfirmUserCode {
    username: string,
    code: string
}

export interface LogInUser {
    username: string,
    password: string
}

export interface PasswordResetRequest {
    username: string,
    newPassword: string,
    code: string
}
export interface UpdatePasswordRequest {
    username: string,
    oldPassword: string,
    newPassword: string
}