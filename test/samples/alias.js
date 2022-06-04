/* eslint-disable no-console */
import { FOO as foo} from 'process.env';

if (foo === 'foo') {
    console.log('Yep');
}
else {
    console.log('Nope');
}