/**
 * @example
 * import { production } from '@process.env';
 *
 * if (production === 'production') {
 *     // Production only code ...
 * } else {
 *     // Development only code ...
 * }
 */

const PLUGIN_NAME = 'rollup-plugin-baked-env';
import { dataToEsm } from '@rollup/pluginutils';

/**
  * It takes an object and returns a Rollup plugin that will create a module that exports the object as
  * a JavaScript module
  * @param {object} [variables=process.env] The variables to be exported. Defaults to process.env.
  * @param {object} [options] Options to be passed to the plugin.
  * @param {string} [options.moduleName='process.env'] The name of the faux module. Defaults to import { FOO } from 'process.env' but you can change it if you want.
  * @param {boolean} [options.preferConst=true] Embed variables in the code as const instead of var.
  * @param {boolean} [options.compact=false] Generate code without line breaks
  * @param {string} [options.indent] The indentation to use.
  * @returns A function that takes two arguments, variables and options.
  */
export default function envPlugin(variables = process.env, options = {}) {

  let moduleName = options.moduleName ?? 'process.env';
  let indent = 'indent' in options ? options.indent : '\t';

  return {
    name: PLUGIN_NAME,
    resolveId(id) {
      if (id === moduleName) {
        return id;
      }
    },
    load(id) {
      if (id === moduleName) {
        let code = dataToEsm(variables, {
          namedExports: true,
          objectShorthand: true, // irrelevant as we don't use the default export
          // disableDefaultExport: true, // this option doesn't exist (TODO: make PR to propose @rollup/pluginutils)

          // code generation preferences
          preferConst: options.preferConst ?? true,
          compact: options.compact,
          indent: indent,
        });

        // remove default export from code so people can't import the whole process.env object
        // because it would embedd all the environment variables in the code,
        // this could lead to unintentionally exposing sensitive information
        // replace with a empty object
        // code = code.replace(/export default[\s\S]*$/, '');

        return {
          code: `/* ${PLUGIN_NAME} */` + `\n${code}\n`,
          map: { mappings: '' }
        };
      }
    },
  };
}
