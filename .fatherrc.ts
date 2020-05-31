export default {
  cjs: {
    type: 'babel',
    minify: true,
    lazy: true,
  },
  esm: {
    type: 'babel',
  },
  umd: {
    name: 'SZFETools',
    sourcemap: true,
  },
  runtimeHelpers: true,
}
