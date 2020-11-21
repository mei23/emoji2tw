import * as Fastify from 'fastify'
import FastifyStatic, { FastifyStaticOptions } from 'fastify-static';
import { inspect } from 'util';

const fastify = Fastify.fastify({
	logger: true,
	trustProxy: [
		'127.0.0.1', '::1'
	],
});

fastify.register<FastifyStaticOptions>(FastifyStatic, {
	root: `${__dirname}/../emoji-data`,
	prefix: '/emojis/',
	immutable: true,
	maxAge: 300 * 1000,
});

fastify.setNotFoundHandler((request, reply) => {
	reply.header('Cache-Control', 'public, max-age=60').send('Not Found');
});

const port = process.env.PORT ? Number(process.env.PORT) : 3310;

fastify.listen(port, '0.0.0.0', (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
});
