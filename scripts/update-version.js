const fs = require("fs");
const path = require("path");
const versionFile = path.join(__dirname, "../.version.json");
const currentVersion = require(versionFile);
const { exec } = require("child_process");

currentVersion.build = currentVersion.build + 1;
console.log(JSON.stringify(currentVersion), "<== Current version");
try {
  console.log("writing back to file:", versionFile);
  const response = fs.writeFileSync(
    versionFile,
    JSON.stringify(currentVersion)
  );
  console.log("Done:", response);

  // const gitCommit = `git remote set-url origin https://Abeleazy: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@github.com/DIGITAVILLE-STUDIO-LTD/FlexyBillz_ReactNative.git && git config user.email abelng8@gmail.com && git config user.name "Abel Otoikhian" && git commit -am "[skip ci] update build number to: ${currentVersion.build}" && sleep 2 && git push`;
  const gitCommit = `git remote set-url origin https://github.com/DIGITAVILLE-STUDIO-LTD/FlexyBillz_ReactNative.git && git config user.email abelng8@gmail.com && git config user.name "Abel Otoikhian" && git commit -am "[skip ci] update build number to: 2" && sleep 2 && git push`;

  console.log("committing the update with command:", gitCommit);
  exec(gitCommit, (error, stdout, stderr) => {
    if (error !== null) {
      throw error;
    }
    console.log("Final Response:", stdout);
    console.log("Final Error:", stderr);
  });
} catch (err) {
  console.log(err, "<== Unable to increment version");
}
