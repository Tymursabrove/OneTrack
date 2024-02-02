export async function load({ url }) {
    const google_auth_code = url.searchParams.get('code');
    return {
        google_auth_code
    };
}