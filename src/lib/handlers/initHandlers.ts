import { InitConnectorHandler } from '$lib/handlers/SocialConnectorQueHandlers';
import { InitToastsHandler } from '$lib/handlers/ToastHandlers';
export function initHandlers() {
    InitConnectorHandler();
    InitToastsHandler();
}