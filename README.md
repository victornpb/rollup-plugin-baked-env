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

![](https://user-images.githubusercontent.com/3372598/221454014-917d328c-9d88-4fee-b451-42f505a8ca52.jpg)

This plugin allow you to use environment variables inside your code by importing "process.env" as a module. The environment variable will be baked in your code at compile time. Only the variables being used are included in your bundled file.

# Usage Examples
Inside your code you can do something like this:

## Basic usage
```js
import { FOO_BAR } from 'process.env';

// use the variable
if (FOO_BAR === 'foo') {
    // do stuff
}
```

## Import variable, aliasing it to another name
```js
import { FOO_BAR as myFooBar } from 'process.env';

if (myFooBar) {
    // code
}
else {
    // code
}
```

## Import multiple variables
```js
import { NODE_ENV, FOO, BAR } from 'process.env';

console.log(FOO, BAR);
if (NODE_ENV === 'production') {
    // code
}
```

## Readability and consistency
If you used to plugins like EnvironmentPlugin or DefinePlugin they use find/replace to replace the constants in your source codoe, but reading the code it's unclear where a variable is coming from, also ESLint and prettier thinks those variables are globals, since there's no reference about then anywhere. This fixes the, whithout having to make a whitelist.

## Validation by default
Your code will fail to compile if the code imports variables that are not set!

<img width="486" alt="image" src="https://user-images.githubusercontent.com/3372598/166487903-fa766449-852b-456c-9509-3b8b3642ec20.png">
<img width="814" alt="image" src="https://user-images.githubusercontent.com/3372598/166487655-a4b15ea2-e53c-4a23-bb9c-ca0de2334b5c.png">


## Caveats importing all variables

If you do `import * as env from 'process.env'` never use the `env` variable directly!
This will cause rollup to embed ALL environment variables inside your bundle.

Works fine, but not recommended:
```js
import * as env from 'process.env'; // ✋ AVOID!

if (env.production !== 'production') {
    console.log('My home directory is ' + env.HOME);
}
```
Because if you do this, bad things happen:
```js
import * as env from 'process.env'; // ✋ BAD!

console.log(env); // 🚫 BAD! (DON'T DO THIS!)

Object.keys(env).filter(/* ... */) // 🚫 BAD! (if you access the env at runtime, it will force rollup to embed everything)
```


# Installation

## [NPM](https://npmjs.com/package/rollup-plugin-baked-env)

    npm install --D rollup-plugin-baked-env
## [Yarn](https://github.com/yarnpkg/yarn)

    yarn add --dev rollup-plugin-baked-env

# Adding to your project

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

## Options

bakedEnv(variables, options)

| Parameters            | Description                                                                       | Type    | Default Value   |
|-----------------------|-----------------------------------------------------------------------------------|---------|-----------------|
| `variables`           | The variables to be exposed.                                                      | object  | `process.env`   |
| `options.moduleName`  | The name of the faux module. You can choose another name like 'environment_vars'` | string  | `'process.env'` |
| `options.preferConst` | Embed variables in the code as const instead of var.                              | boolean | `true`          |
| `options.compact`     | Generate code without line breaks.                                                | boolean | `false`         |
| `options.indent`      | The indentation to use in the generated code.                                     | string  | `'\t'`          |


### Options example
```js
import bakedEnv from 'rollup-plugin-baked-env';

const myVariables = {
  MY_VAR_1: 'value1',
  MY_VAR_2: 'value2',
};

export default {
  // ...
  plugins: [
    bakedEnv(myVariables, {
      moduleName: 'enviroment_vars', // expose variables as a module called 'enviroment_vars' example: `import { FOO } from 'enviroment_vars';`
      preferConst: true,
      compact: false,
      indent: '  ',
    }),
  ],
};
```

## License

The code is available under the [MIT](LICENSE) license.

## Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.
