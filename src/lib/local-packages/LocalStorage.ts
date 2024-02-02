import localForage from 'localforage'
import { type Writable, writable } from 'svelte/store'

export default {
    get,
    set,
    remove,
    exists,
    bind,
}

export function get (key: string): any {
    const value = localStorage.getItem(key)
    if (!value) return null

    try {
        return JSON.parse(value)
    } catch (error) {
        return value
    }
}

export function set (key: string, value: any): any {
    const valueAsString = JSON.stringify(value ?? null)
    localStorage.setItem(key, valueAsString)
    return get(key)
}

export function remove (key: string): boolean {
    const hasValue = exists(key)
    if (hasValue) localStorage.removeItem(key)
    return hasValue
}

export function exists (key: string): boolean {
    return key in localStorage
}

export function bind<T> (key: string, defaultValue: T): Writable<T> {
    const store = writable(exists(key) ? get(key) : set(key, defaultValue))
    store.subscribe(value => set(key, value))
    return store
}

export async function setItemInDB (key: string, value: any) {
    await localForage.setItem(key, value)
}
export async function getItemFromDB (key: string) {
    return await localForage.getItem(key)
}