import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { commonStyles, uploadMenu } from '../styles/theme';
import { ITransactionImage } from '../transaction/TransactionTypes';
import ImageView from 'react-native-image-viewing';
interface IImageViewer {
  route: any;
  imageListHandler: Function;
}
// interface IImage {
//   uri: string;
// }
// interface IImageView {
//   [key: string]: IImage[];
// }
const ImageViewer = ({ navigation, route }: IImageViewer) => {
  const imageList: ITransactionImage[] = route?.params?.imageList ?? [];
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const newList: any[] = [];
    imageList.forEach((image: ITransactionImage) => {
      newList.push({ uri: image.uri });
    });
    console.log('----newList--', newList);
    setImages(newList);
  }, []);

  return (
    <ImageView
      images={images}
      imageIndex={0}
      visible={true}
      onRequestClose={() => {
        navigation.goBack();
        //   setIsVisible(false);
      }}
    />
  );
};
export default ImageViewer;
