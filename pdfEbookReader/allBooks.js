    
import { StatusBar } from 'expo-status-bar';
import { Modal,Alert,StyleSheet, Text, View, Image,Button,TextInput,ScrollView,TouchableOpacity  } from 'react-native';
import { useState,useEffect} from 'react';
import { getAddBook,getSearchContext,getFavouritePage } from './Context';
import { useNavigation } from '@react-navigation/native';
import { getBookData,deleteFromBook,updateTitleInBooks,updateFavouriteInBooks,getFavouriteStatus} from './database';
import { ContextMenu } from './contextMenu';



export function AllBooks() { 
  const { eBookFiles, setEBookFiles } = getAddBook()
  const {isFavouritePage, setIsFavouritePage }=getFavouritePage()
  const { searchQuery, setSearchQuery}=getSearchContext()
  const [filteredBooks, setFilteredBooks] = useState([]);;
  const [menuVisibleBookId, setMenuVisibleBookId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false)
  const [newName, setNewName] = useState(false)
  const [renameBookID,setRenameBookId]=useState('')
  const navigation = useNavigation();
  

  useEffect(() => {
    // Update filteredBooks whenever searchQuery or eBookFiles changes
    if (eBookFiles) {
      const results = eBookFiles.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(results);
    }
  }, [searchQuery, eBookFiles]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetchData function called');
      try {
        const data = await getBookData();
        console.log('fetchData', data);
        setEBookFiles(data||[])
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

   fetchData();

  }, []);

  const pressLongPress = (bookId) => {
    console.log('longPress active')
    setMenuVisibleBookId(bookId);
    setTimeout(() => { 
      setMenuVisibleBookId(null)
    },5000)// Set the specific book ID to show the menu
  };
  

  const navigateToBook = async (fileUri,bookId) => { 
    console.log('navigateToBook', fileUri);
    if (fileUri) {
      navigation.navigate('PdfReader', { pdfFilePath: fileUri ,bookID:bookId });
    } else {
      console.log('Invalid file URI', fileUri);
    }
  };

  const pressDelete = (bookID) => {
    Alert.alert('Delete', `Are you sure you want to delete the book?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
         onPress: async() => {
          deleteFromBook(bookID) 
          const newData = await getBookData()
          setEBookFiles(newData)
      } },
    ]);
    setMenuVisibleBookId(null); // Hide the menu after action
  };

  const pressRename = (bookID) => {
    setRenameBookId(bookID)
   setModalVisible(true)
    setMenuVisibleBookId(null); // Hide the menu after action
  };


  const pressModalSubmission = async () => { 
    await updateTitleInBooks(renameBookID, newName)
    const newBookList = await getBookData()
    setEBookFiles(newBookList)
    setRenameBookId('')
    setModalVisible(false)
  }

  const pressFavourite = async (id) => {
    try {
        const favouriteStatus = await getFavouriteStatus(id);
        console.log('Current favourite status:', favouriteStatus);
        
      // toggle true or false
        const newFavouriteStatus = favouriteStatus === 0 ? 1 : 0;
        await updateFavouriteInBooks(id, newFavouriteStatus);
        
      
      const newData = await getBookData();
      console.log("AfterFavourite",newData)
        await setEBookFiles(newData);
    } catch (error) {
        console.error('Error handling favourite status:', error);
    }
  };
  

  // display only favourite books
  const booksToDisplay = isFavouritePage
    ? filteredBooks.filter(book => book.favourite === 1)
    : filteredBooks;
  
  return (

      <ScrollView style={styles.container}>
       
         
        <View style={ styles.bookContainerCol}>
        <View style={styles.bookContainerRow}>
         
         
            {booksToDisplay.map((file, index) => (
              <View key={index} style={[styles.bookSpacing,{backgroundColor:file.bookColour} ]}>
                <TouchableOpacity onLongPress={() => { pressLongPress(file.id) }} onPress={() => navigateToBook(file.filePath, file.id)}>
                
                    {file.fileThumbnail ? (
                    <View style={ styles.imageContainer}>
                        <Image
                            source={{ uri: file.fileThumbnail }}
                            style={styles.imageStyle}
                      />
                      </View>
                    ) : (
                        <Text>No Thumbnail Available</Text>
                    )}
                    
                  <View style={styles.textView}>
                   
                    <Text style={file.favourite ?styles.favouriteTextStyle: styles.textStyle }>
                      {file.title}
                    </Text>
            
                  </View>
                  {menuVisibleBookId === file.id && (
                  <ContextMenu
                      onDelete={() => pressDelete(file.id)}
                      onRename={() => pressRename(file.id)}
                      onFavourite={() => { pressFavourite(file.id) }}
                      isFavourite={file.favourite}
                    />
                  )}
                </TouchableOpacity>

              </View>
            ))}
 
         
          </View>
      </View>
      <Modal
  visible={isModalVisible}
  transparent={true} 
  animationType="slide"
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <TextInput
        style={styles.input}
        placeholder="New book name"
        value={newName}
        onChangeText={(text) => setNewName(text)}
            />
            <View style={{flexDirection:'row',}}>
      <View style={styles.buttonContainer}>
        <Button title='Cancel'
          onPress={() => setModalVisible(false)} // Cancel action
              />
            </View>
            <View style={ styles.buttonContainer}>
        <Button title='Rename'
          onPress={pressModalSubmission} // Rename action
              />
              
              </View>
      </View>
    </View>
  </View>
</Modal>
        
        <StatusBar style="auto" />
        
      </ScrollView>

    );
}
  

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
   
    },
  
    bookContainerRow: {
      flexDirection:'row',
      flex: 1,
      width: "100%",
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    },
  
    bookContainerCol: {
      flex: 1,
      width:'100%',
      flexDirection: 'column',
      alignItems: 'center',
    },
  
    bookSpacing: {
      borderRadius:20,
      width: '45%',
      margin: 10,
      alignItems:'center',
      paddingTop: 10,
    },

    imageStyle: {
      marginBottom: 10,
      width: 150,
      height: 200,
      resizeMode: 'stretch',

    },

    imageContainer: {
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 12

    },


    textView: {
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      marginBottom:10
    },
    textStyle:{
      color: 'white',
      marginBottom: 5,
      fontSize: 14
    },

    favouriteTextStyle:{
      color: '#FFD700',
      marginBottom: 5,
      fontSize: 14
    },

    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkens the background when modal is open
    },
    modalContainer: {
      width: '80%',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 20,
      padding:10
    },
    
    input: {
      width: '100%',
      padding: 10,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 10,
    },
  });
  