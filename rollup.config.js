import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import banner from 'rollup-plugin-banner2';
import S from 'tiny-dedent';
import packageJson from './package.json';

const license = () => S(`
  /*!
   * ${packageJson.nameFull} v${packageJson.version} (${packageJson.homepage})
   * Copyright (c) ${packageJson.author}
   * @license ${packageJson.license}
   */
   `
);

const production = !process.env.ROLLUP_WATCH;
const sourcemap = production ? true : 'inline';
const entry = 'src/index.js';

const assumptions = {
  constantSuper: true,
  enumerableModuleMeta: true,
  ignoreFunctionLength: true,
  ignoreToPrimitiveHint: true,
  noClassCalls: true,
  noDocumentAll: true,
  noNewArrows: true,
  privateFieldsAsProperties: true,
  setClassMethods: true,
  setComputedProperties: true,
  setPublicClassFields: true,
};

const config = [

  // Modern Module (No babel preset)
  {
    input: entry,
    output: [
      {
        file: packageJson.module.replace('.js', '.mjs'),
        format: 'esm',
        sourcemap: false,
        exports: 'default',
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      // babel({
      //   assumptions,
      //   plugins: [

      //   ]
      // }),
      banner(license)
    ]
  },

  // CJS and ESM (preset-env)
  {
    input: entry,
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap,
        exports: 'default',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap,
        exports: 'default',
      },
    ],
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
        presets: [
          [
            '@babel/env',
            {
              modules: 'auto',
              targets: {
                browsers: '> 1%, IE 11, not op_mini all, not dead',
                node: 8
              },
              // useBuiltIns: 'usage',
              // corejs: 3,
            }
          ]
        ],
        assumptions,
        plugins: [

        ]
      }),
      commonjs(),
      // production &&
      // terser({
      //   output: {
      //     // compress: false,
      //     // mangle: false,

      //   }
      // }),
      banner(license)
    ]
  },

  // Legacy UMD (preset-env)
  {
    input: entry,
    output: [
      {
        name: packageJson.globalVar,
        file: packageJson.unpkg,
        format: 'umd',
        sourcemap,
        exports: 'default',
      }
    ],
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
        presets: [
          [
            '@babel/env',
            {
              modules: 'auto',
              targets: {
                browsers: '> 1%, IE 11, not op_mini all, not dead',
                node: 8
              },
              // useBuiltIns: 'usage',
              // corejs: 3,
            }
          ]
        ],
        assumptions,
        plugins: [

        ]
      }),
      commonjs(),
      production && terser({
        output: {}
      }),
      banner(license)
    ]
  }

];


// generate a markdown table containing output options for the README
function updateReadmeOutputTable() {
  function generateOutputDescription(rollupConfig) {
    const matrixToAsciiTable = require('asciitable.js');
    const gihubTable = {
      row: {
        paddingLeft: '|',
        paddingRight: '|',
        colSeparator: '|',
        lineBreak: '\n'
      },
      cell: {
        paddingLeft: ' ',
        paddingRight: ' ',
        defaultAlignDir: -1
      },
      hr: {
        str: '-',
        colSeparator: '|'
      }
    };
    const header = ['File', 'Module Type', 'Transpiled', 'Source Maps', /*'Import example'*/];
    const lines = [header, null];
    for (const config of rollupConfig) {
      const babel = config.plugins.find(plugin => plugin.name === 'babel');
      const transpiled = babel ? 'Yes' : 'No';
      for (const outputConfig of config.output) {
        const sourceMaps = outputConfig.sourcemap === true ? 'Yes' : 'No';
        // const importExample = outputConfig.format === 'esm' ? `import ${packageJson.globalVar} from '${outputConfig.file}';` : `require('${outputConfig.file}')`;
        lines.push([outputConfig.file, outputConfig.format, transpiled, sourceMaps, /*importExample*/]);
      }
    }
    return matrixToAsciiTable(lines, gihubTable);
  }
  function replaceBetween(str, startString, endString, substitute) {
    const startIndex = str.indexOf(startString);
    const endIndex = str.indexOf(endString, startIndex + startString.length);
    return (startIndex !== -1 && endIndex !== -1) ? str.slice(0, startIndex + startString.length) + substitute + str.slice(endIndex) : str;
  }
  const fs = require('fs');
  const readme = fs.readFileSync('README.md', 'utf8');
  const outputDescription = generateOutputDescription(config);
  const newReadme = replaceBetween(readme, '<!-- Output table (auto generated do not modify) -->', '<!-- END -->', `\n\n${outputDescription}\n\n`);
  fs.writeFileSync('README.md', newReadme);
}

updateReadmeOutputTable();

export default config;
