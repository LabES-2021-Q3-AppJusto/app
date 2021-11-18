module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      test: {
        presets: [['@babel/preset-env']],
      },
    },
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-modules-commonjs',
    ],
  };
};
