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

Headline description

## Installation

### [NPM](https://npmjs.com/package/rollup-plugin-baked-env)

    npm install --save-dev rollup-plugin-baked-env
### [Yarn](https://github.com/yarnpkg/yarn)

    yarn add rollup-plugin-baked-env

## Usage

### rollup.config.js
```js
import bakedEnv from 'rollup-plugin-baked-env';

export default {
    // ...
    plugins: [
        bakedEnv(),
    ],
};
```

### Inside your code
```js
import { production } from 'process.env';

if (production === 'production') {
    // code
}
```
or
```js
import * as env from 'process.env';

if (env.production === 'production') {
    // code
}
```

or
```js
import { production as alias } from 'process.env';

if  (alias === 'production') {
    // code
}
```


## License

The code is available under the [MIT](LICENSE) license.

## Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.
