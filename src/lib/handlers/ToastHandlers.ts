
import toasts from '$lib/local-packages/toasts/toasts';
import { ToastHolder } from '$lib/store';

const position = 'top-right';
const theme = "dark";

export function InitToastsHandler() {
    ToastHolder.subscribe(async (t) => {
        if (!t) {
            return;
        }
        createToast(t.heading, t.subHeading ?? "", t.type, t.duration);
        ToastHolder.set(null);
    })
}

function createToast(title: string, description: string, type: string, duration: number) {
    if (!duration) {
        duration = 3000;
    }
    toasts.add({
        title: title,
        description: description,
        duration: duration,
        placement: position,
        type: type,
        theme: theme,
        onClick: () => { },
        onRemove: () => { }
    });
}