import { Platform, PermissionsAndroid } from 'react-native';

async function requestStoragePermission() {
    try {
        console.log('Requesting storage permission...');
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission',
                message: 'This app needs access to your storage.',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        console.log('Permission response:', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can read from storage');
        } else {
            console.log('Storage permission denied');
        }
    } catch (err) {
        console.warn('Error requesting permission:', err);
    }
}

const requestMediaPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 30) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
              title: 'Document Permission',
              message: 'App needs access to your documents.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
        }
    }
    return true;
};
  
export const requestPermissions=async()=>{ 
    await requestMediaPermissions()
    await requestStoragePermission()
}