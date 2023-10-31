
// This is a file called "pre-install.js" in the root of the project

if (process.env.EAS_BUILD_PLATFORM === 'android') {
    console.log('Push the apk to firebase distribution');
    if (process.env.APP_ENV === 'uat') {
        // send the app to UAT
    } else if (process.env.APP_ENV === 'production') {
        // send the app to Production...
        // pass - do nothing
    }
} else if (process.env.EAS_BUILD_PLATFORM === 'ios') {
    console.log('Push the ipa to firebase distribution');
    if (process.env.APP_ENV === 'uat') {
        // send the app to UAT
    } else if (process.env.APP_ENV === 'production') {
        // send the app to Production...
        // pass - do nothing
    }
}