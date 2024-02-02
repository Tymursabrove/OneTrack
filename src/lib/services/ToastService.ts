import { ToastHolder } from '$lib/store';
export const showPasswordValidationToast = (message: string) => {
    showMessage('Password validation failed', message, "error")
};

export const showDataWasUpdated = (message: string) => {
    showMessage('Data updated', message, "success")
}

export function showMessage(heading: string, message: string, type: "info" | "success" | "error", duration = 3000) {
    ToastHolder.set({ type, heading, subHeading: message, duration });
}

export const showCopiedToClipboardToast = () => {
    showMessage('Copied Successfully', "Copied to clipboard", "success");
};
export const showErrorMessage = (message: string) => {
    showMessage(message, "", "error");
}