import rmfr = require('rmfr');

async function cleanData() {
	const dstDir = `${__dirname}/../emoji-data`;
	await rmfr(dstDir, { recursive: true, force: true });
}

cleanData().then(result => {
	console.log(`Done: ${result}`);
}).catch(e => {
	console.warn(e);
});
