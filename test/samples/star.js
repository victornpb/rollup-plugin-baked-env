import * as env from 'process.env';

if (env.FOO==='foo' && env.BAR==='bar') {
    console.log('Yep');
} else {
    console.log('Nope');
}
