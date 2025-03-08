
import { View,Button,TextInput } from 'react-native';

import { getZoom, getAddBook, getSearchContext, getFavouritePage } from './Context';

import { selectFile } from './detectBooks';

export function HeaderAddBook() {
  const { eBookFiles, setEBookFiles } = getAddBook()


  return (
    <View style={{ flexDirection: 'row', marginRight: 10 }}>
      <Button title="  +  " onPress={() => selectFile(setEBookFiles)} />
    </View>
  );
}

export function HeaderFavourite() {
  const { isFavouritePage, setIsFavouritePage } = getFavouritePage()


  return (
    <View style={{ flexDirection: 'row', marginRight: 10 }}>
      <Button title=" ★ " onPress={() => setIsFavouritePage(!isFavouritePage)} />
    </View>
  );
}

export function SearchHeader({ navigation }) {
  const { searchQuery, setSearchQuery } = getSearchContext()

  return (
    <View style={{ width: '40%', flexDirection: 'row', marginRight: 10, padding: 3, backgroundColor: 'lightgray' }}>
      <TextInput
        placeholder="Search for a book"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
    </View>
  );
}

export function ZoomButtons({ navigation }) {
  const { zoomScale, setZoomScale } = getZoom()
  const zoomIn = () => {
    setZoomScale(prevScale => prevScale * 1.2); // Zoom in by 20%
    console.log(zoomScale)
  };


  const zoomOut = () => {
    setZoomScale(prevScale => prevScale / 1.2); // Zoom out by 20%
    console.log(setZoomScale)
  };


  return (
    <View style={{ flexDirection: 'row', marginRight: 10 }}>
      <View style={{ padding: 5 }}>
        <Button title="Zoom In" onPress={zoomIn} />
      </View>
      <View style={{ padding: 5 }}>
        <Button title="Zoom Out" onPress={zoomOut} />
      </View>
    </View>
  );
}

