import React, { useState } from 'react';
import {StyleSheet,View, Text, TextInput, Button, FlatList,TouchableOpacity,Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export function setTitle(title) { 
  titleArray=title.split(' ')
  let replacementTitle=""
  for (i = 0; i < Math.min(8, titleArray.length);i++) { 
    replacementTitle += ' ' + titleArray[i]
    if (i == 7) { 
      replacementTitle+='...'
    }
  }
  return replacementTitle
}


export const GoogleBooksAPI = () => {
  const [queryApi, setQueryApi] = useState('');
  const [books, setBooks] = useState([])
  
  const navigation = useNavigation();

  const ApiKey = 'AIzaSyCWPFeZtnen2UayTA-lGFPl-ib48-P3YSw'
    
  const searchBooks = async () => {
      try {
          const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${queryApi}&key=${ApiKey}`)
              ;
          setBooks(response.data.items || [])
      }
      catch (error) {
          console.error('Error fetching books:', error);
      }
  }

    return (
      <View style={styles.container }>
        <View style={styles.searchBoxContainer }>
          <TextInput
            placeholder="Search for books"
            value={queryApi}
            onChangeText={(text) =>  setQueryApi(text)}
            style={styles.searchBox}
          />
          <Button title="Search" onPress={searchBooks} />
        </View>
        <FlatList style={{backgroundColor:'lightgray'}}
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
                  
            <TouchableOpacity onPress={() => navigation.navigate("Book Detail", { book: item })}>
              <View style={styles.itemContainer}>
            {item.volumeInfo.imageLinks && (
              <Image
                source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                style={styles.image}
              />
              )}
              <View style={styles.textContainer }>
                <Text style={styles.titleStyle}>{setTitle(item.volumeInfo.title)}</Text>
                <Text style={styles.authorStyle }>{item.volumeInfo.authors?.join(', ')}</Text>
              </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
  },
  image: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
   
  searchBox: {
    padding: 10,
    borderWidth:1,
    flex:8
  },

  searchBoxContainer: {
    flexDirection: 'row',
    margin:8,
  },

  titleStyle: {
    fontWeight: 'bold' 
  },

  authorStyle: {
    fontStyle:'italic'
  }

});