import React, { useEffect } from 'react';
import { Image, Dimensions, View } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { commonStyles } from '../styles/theme';
import { ITransactionImage } from '../transaction/TransactionTypes';
import AppHeader from './AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
interface IImageView {
  route: any;
  imageListCallback: Function;
}
// interface IImage {
//   uri: string;
// }
// interface IImageView {
//   [key: string]: IImage[];
// }
const ImageView = ({ navigation, route }: IImageView) => {
  // console.log(route?.params);
  const imageList: ITransactionImage[] = route?.params?.imageList ?? [];
  // const [image, setImage] = useState<ITransactionImage>({});
  console.log('imageList[0]---', imageList[0].base64);

  useEffect(() => {
    // const newList: any[] = [];
    // imageList.forEach((image: ITransactionImage) => {
    //   newList.push({
    //     source: { uri: `data:image/jpeg;base64,${image.base64}` },
    //   });
    // });
    // console.log('----newList--', newList);
    // setImages(newList);
  }, []);

  return (
    // <ImageView
    //   images={images}
    //   backgroundColor={colors.theme[THEME].brandMedium}
    //   imageIndex={0}
    //   animationType={'slide'}
    //   visible={true}
    //   onRequestClose={() => {
    //     navigation.goBack();
    //     //   setIsVisible(false);
    //   }}
    // />
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          title=""
          backTo=""
          navigation={navigation}
          homeScreen={false}
        />
      </View>
      {imageList.length > 0 && (
        <ImageZoom
          // center
          useNativeDriver
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').height + 120}>
          <Image
            resizeMode={'contain'}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height + 120,
            }}
            // blurRadius=
            source={{
              uri: imageList[0].base64,
            }}
          />
        </ImageZoom>
      )}
    </SafeAreaView>
  );
};
export default ImageView;
