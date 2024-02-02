export async function load({ url }) {
	const profile_id = url.searchParams.get('id');
	return {
		profile_id
	};
}