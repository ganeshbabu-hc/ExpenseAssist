import React from 'react';
import { Pressable, Text, View } from 'react-native';
import IconMap from '../common/IconMap';
import t from '../common/translations/Translation';
import { colors, commonStyles, uploadMenu } from '../styles/theme';
import { THEME } from '../utils/Constants';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
interface IUploadMenu {
  menuHandler: Function;
  imageListHandler: Function;
}
const UploadMenu = ({ menuHandler, imageListHandler }: IUploadMenu) => {
  const cameraUpload = async () => {
    const cameraOption: CameraOptions = {
      mediaType: 'photo',
      quality: 0.1,
      includeExtra: true,
      saveToPhotos: false,
      includeBase64: true,
      //   maxWidth: 100,
    };
    const result: ImagePickerResponse = await launchCamera(cameraOption);
    if (!result.didCancel) {
      imageListHandler(result.assets);
    }
    menuHandler(false);
  };

  const galleryUpload = async () => {
    const imageLibraryOptions: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.1,
      includeExtra: true,
      selectionLimit: 1,
      includeBase64: true,
    };
    const result = await launchImageLibrary(imageLibraryOptions);
    if (!result.didCancel) {
      imageListHandler(result.assets);
    }
    menuHandler(false);
  };

  return (
    <View style={[commonStyles.container, uploadMenu.uploadContainer]}>
      <Pressable
        style={uploadMenu.uploadMenu}
        onPress={() => {
          cameraUpload();
        }}>
        <IconMap
          size={30}
          name="camera"
          color={colors.theme[THEME].brandMedium}
        />
        <Text style={uploadMenu.uploadText}>{t('camera')}</Text>
      </Pressable>
      <Pressable
        style={uploadMenu.uploadMenu}
        onPress={() => {
          galleryUpload();
        }}>
        <IconMap
          size={28}
          name="scenary"
          color={colors.theme[THEME].brandMedium}
        />
        <Text style={uploadMenu.uploadText}>{t('gallery')}</Text>
      </Pressable>
    </View>
  );
};
export default UploadMenu;
