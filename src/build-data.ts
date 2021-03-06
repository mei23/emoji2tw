import * as path from 'path';
import * as glob from 'glob';
import * as fs from 'fs';

async function buildFlavarData(flavar: string) {
	const srcDir = `${__dirname}/../node_modules/emoji-datasource-${flavar}/img/${flavar}/64/`;
	const dstDir = `${__dirname}/../emoji-data/${flavar}`;
	fs.mkdirSync(dstDir, { recursive: true });

	const files = glob.sync(`${srcDir}/*.png`)

	for (const file of files) {
		const basename = path.basename(file);	// 2734-fe0f.png
		const m = basename.match(/^([\w-]+)\.png$/);
		if (!m) continue;
		let codes = m[1].split('-');	// [ '2764', '200d', '1f525' ]

		// Twemoji式正規化
		if (!codes.includes('200d') && codes.includes('fe0f')) {
			codes = codes.filter(x => x != 'fe0f');
		}

		const dstFile = `${dstDir}/${codes.join('-')}.png`;

		console.log(`${file} => ${dstFile})`);
		fs.copyFileSync(file, dstFile);
	}
}

async function buildAllData() {
	for (const flavar of ['twitter', 'google', 'apple', 'facebook']) {
		await buildFlavarData(flavar);
	}
}

buildAllData().then(result => {
	console.log(`Done: ${result}`);
}).catch(e => {
	console.warn(e);
});
