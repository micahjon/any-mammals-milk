module.exports = {
  files: {
    javascripts: {joinTo: 'app.js'},
    stylesheets: {joinTo: 'app.css'}
  },
  plugins: {
    babel: { presets: ['env'] },
    closurecompiler: {
      compilationLevel: 'SIMPLE',
      createSourceMap: true
    },
    postcss: { processors: [require('autoprefixer')] }
  },
  modules: {
    autoRequire: {
      'app.js': ['initialize']
    }
  }
};