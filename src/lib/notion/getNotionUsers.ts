import rpc from "./rpc";

export default async function getNotionUsers(ids: string[]) {
	const { results = [] } = await rpc("getRecordValues", {
		requests: ids.map((id: string) => ({
			id,
			table: "notion_user",
		})),
	});

	const users: {
		[id: string]: {
			full_name: string;
			profile_photo: string;
		};
	} = {};

	for (const result of results) {
		const { value } = result || { value: {} };
		const { name, profile_photo } = value;
		let full_name = name || "";

		users[value.id] = { full_name, profile_photo };
	}

	return { users };
}
