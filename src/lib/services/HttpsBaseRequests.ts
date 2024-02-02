import { dev } from '$app/environment';
import { Error500, UserTokenContainer } from '$lib/store';
import { get } from 'svelte/store';

const BaseAPILink = `${import.meta.env.VITE_ONE_BACKEND_API}`;

export enum HeaderTypes {
	default,
	access,
	bearer
}

export async function sendPostRequest(
	url: string,
	data: object | null,
	headers: HeadersInit | null | HeaderTypes = null,
	show500 = true
) {
	const method = 'POST';
	let response;
	response = await MakeHttpRequest(method, url, data, headers, show500);
	return response;
}

export async function sendPutRequest(
	url: string,
	data: object | null,
	headers: HeadersInit | null | HeaderTypes = null
) {
	const method = 'PUT';
	let response;
	response = await MakeHttpRequest(method, url, data, headers);
	return response;
}

export async function sendGetRequest(
	url: string,
	headers: HeadersInit | null | HeaderTypes = null,
	show500 = true
) {
	const method = 'GET';
	let response = await MakeHttpRequest(method, url, null, headers, show500);
	return response;
}

export async function sendDeleteRequest(
	url: string,
	headers: HeadersInit | null | HeaderTypes = null
) {
	const method = 'DELETE';
	let response = await MakeHttpRequest(method, url, null, headers);
	return response;
}

async function MakeHttpRequest(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	url: string,
	data: Object | null = null,
	headers: HeadersInit | null | HeaderTypes = null,
	show500 = true
) {
	try {
			url = `${BaseAPILink}${url}`;
		
		let tokens = GetUserTokens();
		if (headers == null || headers == HeaderTypes.default || tokens == null || tokens == 'init') {
			headers = {
				'Content-Type': 'application/json'
			};
		} else {
			if (headers == HeaderTypes.bearer) {
				headers = {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokens.idToken}`
				};
			} else if (headers == HeaderTypes.access) {
				headers = {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokens.accessToken}`
				};
			}
		}

		let requestObj: RequestInit = {
			method,
			headers
		};
		if (data) {
			requestObj.body = JSON.stringify(data);
		}
		let response = await fetch(url, requestObj);
		let json: any = {};
		if (method != 'DELETE') {
			json = await response.json();
		}
		if (response.ok) {
			if (dev) {
				console.log({ requestUrl: url, response: json, data, method });
			}
			Error500.set(null);
			return {
				error: false,
				json
			};
		}
		parseResponseForError(json);
		return {
			error: true,
			json
		};
	} catch (error) {
		if (show500) {
			Error500.set({ error, url });
		}
		console.error(error);
		return {
			error: true,
			json: null
		};
	}
}

export async function sendLocalRequest(method: string, url: string, body: BodyInit | null = null) {
	try {
		if (dev) {
			url = `http://localhost:3000${url}`;
		}
		let request: RequestInit = {
			method: method,
			headers: {
				'Content-Type': 'application/json'
			}
		};
		if (body) {
			request.body = body;
		}
		let response = await fetch(url, request);
		let json = await response.json();
		return json;
	} catch (error) {
		console.error(error);
		return null;
	}
}
export function GetUserTokens() {
	return get(UserTokenContainer);
}
function parseResponseForError(response: any) {
	let message = response.message as string;
	const tokenRevokeErrorText = "access toke has been revoked";
	if (message.toLowerCase().includes(tokenRevokeErrorText)) {
		UserTokenContainer.set(null);
		location.reload();
	}
}