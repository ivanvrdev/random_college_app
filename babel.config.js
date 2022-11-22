module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [require.resolve('babel-plugin-module-resolver'), {
        root: ['./src',],
        "alias": { "~": "./src" }
      }],
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env"
        }
      ]
    ]
  };
};
