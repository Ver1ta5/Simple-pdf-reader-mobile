import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet,Text, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { getZoom } from './Context';
import Slider from '@react-native-community/slider';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';
import { updatePageInBooks, getBookCurrentPage } from './database';



export function PdfReader({ route, navigation }) {

  const { pdfFilePath, bookID } = route.params;
  const pdfRef = useRef();
  const [totalPage, setTotalPage] = useState(0)
  const [sliderValue, setSliderValue] = useState(1);
  const { zoomScale } = getZoom()
  const [isSliderVisible, setIsSliderVisible] = useState(false)


  useEffect(() => {
    const fetchPage = async () => {
      try {
        const currentPage = await getBookCurrentPage(bookID)
        console.log('currentPageFromDb:', currentPage)
        setSliderValue(currentPage)
        if (pdfRef.current) {
          pdfRef.current.setPage(currentPage);
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchPage()
  }, [])

  const changePage = async (page) => {
    setSliderValue(page)
    if (pdfRef.current) {
      pdfRef.current.setPage(page);
    }
    await updatePageInBooks(bookID)
  }

  const toggleSliderVisibility = () => {
    setIsSliderVisible(true);
    console.log("activated")
    // Set timeout to hide the slider after 3 seconds
    setTimeout(() => {
      setIsSliderVisible(false);
    }, 5000);
  };

  return (
    <GestureHandlerRootView>
      <TapGestureHandler onActivated={toggleSliderVisibility}>
        <View style={styles.container}>
          <Pdf
            trustAllCerts={false}
            ref={pdfRef}
            source={{ uri: pdfFilePath, cache: true }}
            scale={zoomScale}
            onLoadComplete={(numberOfPages,
              filePath) => {
              setTotalPage(numberOfPages)
              console.log(`Number of pages: ${numberOfPages}`);
            }}

            onPageChanged={(page, numberOfPages) => {
              setSliderValue(page)
              updatePageInBooks(bookID, page)
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={{ flex: 1, width: '100%' }}
          />{isSliderVisible && (
            <View style={styles.sliderContainer}>
              <Text>Page {sliderValue} of {totalPage}</Text>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={totalPage}
                step={1}
                value={sliderValue}
                onValueChange={(value) => setSliderValue(value)}
                onSlidingComplete={(value) => changePage(Math.round(value))}
              />

            </View>
          )}
        </View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  sliderContainer: {
    padding: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
