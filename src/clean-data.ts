import rmfr = require('rmfr');

async function cleanData() {
	const dstDir = `${__dirname}/../emoji-data`;
	await rmfr(dstDir);
}

cleanData().then(result => {
	console.log(`Done: ${result}`);
}).catch(e => {
	console.warn(e);
});
