module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./src/assets",
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@schema": "./src/schema",
            "@utils": "./src/utils",
            "@navigation": "./src/navigation",
            "@networking": "./src/networking",
            "@redux": "./src/redux",
            "@mocks": "./src/__mock__",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: false,
          verbose: false,
        },
      ],
    ],
  };
};
