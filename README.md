# rollup-plugin-baked-env
<!-- badge -->
[![LICENSE](https://img.shields.io/github/license/victornpb/rollup-plugin-baked-env?style=flat-square)](LICENSE)
[![Node](https://img.shields.io/node/v/rollup-plugin-baked-env.svg?style=flat-square)](package.json)
[![CodeFactor](https://www.codefactor.io/repository/github/victornpb/rollup-plugin-baked-env/badge?style=flat-square)](https://www.codefactor.io/repository/github/victornpb/rollup-plugin-baked-env)

[![Coverage Status](https://img.shields.io/coveralls/victornpb/rollup-plugin-baked-env.svg?style=flat-square)](https://coveralls.io/github/victornpb/rollup-plugin-baked-env)
[![Travis](https://img.shields.io/travis/victornpb/rollup-plugin-baked-env/master.svg?style=flat-square)](https://travis-ci.org/victornpb/rollup-plugin-baked-env)

[![Version](https://img.shields.io/npm/v/rollup-plugin-baked-env.svg?style=flat-square)](https://www.npmjs.com/package/rollup-plugin-baked-env)
[![Downloads](https://img.shields.io/npm/dt/rollup-plugin-baked-env.svg?style=flat-square)](https://www.npmjs.com/package/rollup-plugin-baked-env)
[![](https://img.shields.io/bundlephobia/minzip/tiny-dedent?style=flat-square)](https://www.npmjs.com/package/rollup-plugin-baked-env)
[![](https://img.shields.io/tokei/lines/github/victornpb/rollup-plugin-baked-env?style=flat-square)](https://www.npmjs.com/package/rollup-plugin-baked-env)
<!-- endbadge -->

![](https://repository-images.githubusercontent.com/488007221/52dec7b4-4d30-420a-b958-238c8b78d4b8)

This plugin allow you to use environment variables inside your code by importing process.env as a faux module. The environment variable will be baked in your code at compile time. Only the variables being used are included.

## Installation

### [NPM](https://npmjs.com/package/rollup-plugin-baked-env)

    npm install --save-dev rollup-plugin-baked-env
### [Yarn](https://github.com/yarnpkg/yarn)

    yarn add --dev rollup-plugin-baked-env

## Adding to your project

#### rollup.config.js
```js
import bakedEnv from 'rollup-plugin-baked-env';

export default {
    // ...
    plugins: [
        bakedEnv(),
    ],
};
```

## Usage Examples
Inside your code you can do something like this:

#### Basic usage
```js
import { NODE_ENV } from 'process.env';

if (NODE_ENV === 'production') {
    // code
}
```

#### Import variable, aliasing it to another name
```js
import { ROLLUP_WATCH as isDev } from 'process.env';

if (isDev) {
    // code
}
else {
    // code
}
```

#### Import multiple variables
```js
import { NODE_ENV, FOO, BAR } from 'process.env';

console.log(FOO, BAR);
if (NODE_ENV === 'production') {
    // code
}
```

#### Import all variables
```js
import * as env from 'process.env'; // ✋ use with caution!

if (env.production !== 'production') {
    console.log('My home directory is ' + env.HOME);
}
```
**NOTE:** If you do `import * as env from 'process.env'` never use the `env` variable directly!
This will cause rollup to embed ALL environment variables inside your bundle.

```js
import * as env from 'process.env';

// DON'T DO THIS!
console.log(env); // BAD!

Object.keys(env).filter(/* ... */) // BAD! (if you access the env at runtime, it will force rollup to embed everything)
```

## Validation by default
Your code will fail to compile if the code imports variables that are not set!

<img width="486" alt="image" src="https://user-images.githubusercontent.com/3372598/166487903-fa766449-852b-456c-9509-3b8b3642ec20.png">
<img width="814" alt="image" src="https://user-images.githubusercontent.com/3372598/166487655-a4b15ea2-e53c-4a23-bb9c-ca0de2334b5c.png">


## Options




## License

The code is available under the [MIT](LICENSE) license.

## Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.
