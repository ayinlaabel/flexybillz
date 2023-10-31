const version = "0.0.1";
const buildNumber = 1;

export default ({ config }) => {
  // Define the flavor parameters so apps in dev, uat and production can be easily identified
  const flavorMap = {
    development: {
      androidBundleId: "com.flexybillz.dev",
      iosBundleId: "com.digitaville.flexybillz.dev",
      bundleName: "FlexyBillz (dev)",
      icon: "./assets/flexyBillzIcon-dev.png",
      adaptiveIcon: "./assets/flexyBillzIcon-dev.png",
    },
    uat: {
      androidBundleId: "com.flexybillz.uat",
      iosBundleId: "com.digitaville.flexybillz.uat",
      bundleName: "FlexyBillz (uat)",
      icon: "./assets/flexyBillzIcon-uat.png",
      adaptiveIcon: "./assets/flexyBillzIcon-uat.png",
    },
    production: {
      androidBundleId: "com.flexybillz",
      iosBundleId: "com.digitaville.flexybillz",
      bundleName: "FlexyBillz",
      icon: "./assets/flexyBillzIcon.png",
      adaptiveIcon: "./assets/flexyBillzIcon.png",
    },
  };

  return {
    ...config,
    owner: "flexybillz-by-digitaville",
    version: version,
    name: flavorMap?.[process.env.APP_ENV]?.bundleName,
    icon: flavorMap?.[process.env.APP_ENV]?.icon,
    ios: {
      bundleIdentifier: flavorMap?.[process.env.APP_ENV]?.iosBundleId,
      buildNumber: `${buildNumber}`,
    },
    android: {
      ...config.android,
      package: flavorMap?.[process.env.APP_ENV]?.androidBundleId,
      versionCode: buildNumber,
      adaptiveIcon: {
        ...config.android.adaptiveIcon,
        foregroundImage: flavorMap?.[process.env.APP_ENV]?.adaptiveIcon,
      },
    },
    extra: {
      eas: {
        projectId: "9badffbc-6b9e-4cb6-b327-ff44a13a5ec8",
      },
      updates: {
        url: "https://u.expo.dev/9badffbc-6b9e-4cb6-b327-ff44a13a5ec8",
      },
      runtimeVersion: {
        policy: "appVersion",
      },
    },
    // ... other config here
  };
};
