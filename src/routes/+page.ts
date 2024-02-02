export async function load({ url }) {
    const auth_code = url.searchParams.get('auth_code');
    return {
        auth_code
    };
}