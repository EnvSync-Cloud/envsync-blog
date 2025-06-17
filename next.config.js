const fs = require("fs");
const path = require("path");
const { NOTION_INTERNAL_TOKEN, BLOG_INDEX_ID } = require("./src/lib/notion/server-constants");

try {
	fs.unlinkSync(path.resolve(".blog_index_data"));
} catch (_) {
	/* non fatal */
}
try {
	fs.unlinkSync(path.resolve(".blog_index_data_previews"));
} catch (_) {
	/* non fatal */
}

const warnOrError =
	process.env.NODE_ENV !== "production"
		? console.warn
		: msg => {
				throw new Error(msg);
			};

if (!NOTION_INTERNAL_TOKEN) {
	// We aren't able to build or serve images from Notion without the
	// NOTION_INTERNAL_TOKEN being populated
	warnOrError(
		`\nNOTION_INTERNAL_TOKEN is missing from env, this will result in an error\n` +
			`Make sure to provide one before starting Next.js`,
	);
}

if (!BLOG_INDEX_ID) {
	// We aren't able to build or serve images from Notion without the
	// NOTION_INTERNAL_TOKEN being populated
	warnOrError(
		`\nBLOG_INDEX_ID is missing from env, this will result in an error\n` +
			`Make sure to provide one before starting Next.js`,
	);
}

module.exports = {
	webpack(cfg, { dev, isServer }) {
		// only compile build-rss in production server build
		if (dev || !isServer) return cfg;

		if (!isServer) {
			config.node = {
				fs: "empty",
				os: "empty",
				path: "empty",
			};
		}

		// we're in build mode so enable shared caching for Notion data
		process.env.USE_CACHE = "true";

		const originalEntry = cfg.entry;
		cfg.entry = async () => {
			const entries = { ...(await originalEntry()) };
			return entries;
		};
		return cfg;
	},
};
