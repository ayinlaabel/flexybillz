
if (process.env.EAS_BUILD_PLATFORM === 'android') {
    console.log('Run commands for Android builds here', 'ENV:', process.env.APP_ENV);
} else if (process.env.EAS_BUILD_PLATFORM === 'ios') {
    console.log('Run commands for iOS builds here', 'ENV:', process.env.APP_ENV);
}