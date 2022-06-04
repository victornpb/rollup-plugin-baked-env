import { FOO } from 'process.env';
import { BAR } from 'process.env';
import * as env from 'process.env';

console.log([FOO, BAR, env.BAZ]);