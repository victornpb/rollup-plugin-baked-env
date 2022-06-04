/* eslint-disable no-console */
import { FOO } from 'process.env';

if (FOO === 'foo') {
    console.log('Yep');
}
else {
    console.log('Nope');
}