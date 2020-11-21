import * as path from 'path';
import * as glob from 'glob';

async function data2tw(src: string, dst: string) {
	const files = glob.sync(`${src}/*.png`)

	for (const file of files) {
		const basename = path.basename(file);	// 2734-fe0f.png
		const m = basename.match(/^([\w-]+)\.png$/);
		if (!m) continue;
		let codes = m[1].split('-');	// [ '2764', '200d', '1f525' ]

		if (!codes.includes('200d') && codes.includes('fe0f')) {
			const full = codes.join('-');
			codes = codes.filter(x => x != 'fe0f');
			const tw = codes.join('-');
			console.log(`'${tw}': '${full}',`);
		}
	}
}

const args = process.argv.slice(2);
const src = args[0];
const dst = args[1];

data2tw(src, dst).then(result => {
	console.log(`Done: ${result}`);
}).catch(e => {
	console.warn(e);
});
