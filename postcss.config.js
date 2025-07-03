export default {
  plugins: {
    autoprefixer: {}, 
    'postcss-preset-env': {
      features: {
        'custom-properties': { preserve: false } //
      }
    }
  },
};
