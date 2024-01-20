import fs from 'fs';
import path from 'path';
import {name} from './app.json';
const logoFilename = 'logo.png';

const logoFilePath = path.resolve(__dirname, logoFilename);
const androidDrawablePath = path.resolve(
  __dirname,
  'android/app/src/main/res/drawable',
);
const iosImagesPath = path.resolve(__dirname, `ios/${name}/Images.xcassets`);

const copyLogoToAndroid = () => {
  const destinationPath = path.join(androidDrawablePath, 'splash_screen.png');

  fs.copyFileSync(logoFilePath, destinationPath);

  console.log(`Logo copied to Android drawable folder: ${destinationPath}`);
};

const copyLogoToIOS = () => {
  const destinationPath = path.join(
    iosImagesPath,
    'AppIcon.appiconset',
    'splash_screen.png',
  );

  fs.copyFileSync(logoFilePath, destinationPath);

  console.log(`Logo copied to iOS Images.xcassets folder: ${destinationPath}`);
};

export function setupLogo() {
  copyLogoToAndroid();
  copyLogoToIOS();
}
