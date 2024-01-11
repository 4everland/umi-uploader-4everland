import { babel } from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import replace from '@rollup/plugin-replace'

const extensions = ['.ts']
export default {
  input: './src/index.ts',
  output: [
    {
      dir: 'dist/cjs',
      entryFileNames: `[name].cjs`,
      format: 'cjs',
      preserveModules: true,
      exports: 'named',
      plugins: [terser()]
    },
    {
      dir: 'dist/esm',
      entryFileNames: `[name].mjs`,
      format: 'esm',
      preserveModules: true,
      exports: 'named',
      plugins: [terser()]
    }
  ],
  plugins: [
    commonjs(),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true
    }),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    nodeResolve({ browser: true }),
    nodePolyfills(),
    babel({ babelHelpers: 'bundled', extensions: [...DEFAULT_EXTENSIONS, ...extensions] })
  ]
}
