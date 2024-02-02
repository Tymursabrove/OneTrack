import { sendPostRequest, sendGetRequest, GetUserTokens } from './HttpsBaseRequests';
import type { SignUpUser, ConfirmUserCode, LogInUser, PasswordResetRequest, UpdatePasswordRequest } from '$lib/types/CognitoTypes';
import { showErrorMessage } from './ToastService';

export async function SignUp(signUpUser: SignUpUser) {
    let response = await sendPostRequest("auth/signup", signUpUser, null, false);
    return response;
}
export async function ConfirmSignUpCode(confirmationCode: ConfirmUserCode) {
    let response = await sendPostRequest("auth/signup/confirm", confirmationCode, null, false);
    return response;
}

export async function LogIn(loginUser: LogInUser) {
    let response = await sendPostRequest("auth/session/signin", loginUser, null, false);
    return response;
}

export async function ResetPassword(resetData: PasswordResetRequest) {
    let response = await sendPostRequest("auth/password/forgot/confirm", resetData, null, false);
    return response;
}
export async function UpdatePassword(updateData: UpdatePasswordRequest) {
    let tokens = GetUserTokens();
    if (tokens == null || tokens == "init") {
        return {
            error: true,
            json: null
        }
    }
    let response = await sendPostRequest(`auth/password/change?access_token=${tokens.accessToken}`, updateData, null, false);
    return response;
}
export async function RefreshToken(refreshToken: string) {
    let response = await sendGetRequest(`auth/session/refresh?refresh_token=${refreshToken}`, null, false);
    return response;
}
export async function LogOut(accessToken: string) {
    let response = await sendGetRequest(`auth/session/signout?access_token=${accessToken}`, null, false);
    return response;
}
export async function SendForgetPasswordCode(username: string) {
    let response = await sendGetRequest(`auth/password/forgot?username=${username}`, null, false);
    return response;
}
export async function ResendConfirmSignUpCode(username: string) {
    let response = await sendGetRequest(`auth/signup/resend?username=${username}`, null, false);
    return response;
}
export function HandleErrorResponse(response: { error: boolean, json: any }) {
    let errorMessage = 'Server is unable to process the request, please try later.';
    if (response.json) {
        errorMessage = response.json.message.split(':').pop();
    }
    showErrorMessage(errorMessage);
}