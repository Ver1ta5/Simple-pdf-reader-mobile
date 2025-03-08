import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Button, Linking } from 'react-native';
import { setTitle } from './catalogue';

export const BookDetails = ({ route }) => {
  const { book } = route.params;

  const onPressLink = (url) => {
    Linking.openURL(url);
  };
   
  const bookTitle = book.volumeInfo.title
  
  


  const bookSaleability=book.saleInfo.saleability
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style= {styles.imageContainer}>
      {book.volumeInfo.imageLinks && (
                <Image
                  source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
                  style={styles.imageStyle}
                />
      )}
      </View>
      { }
      <Text style={styles.title}>{setTitle(bookTitle)}</Text>
      <Text style={styles.subtitle}>{book.volumeInfo.subtitle}</Text>
      <Text style={styles.bookInfo}>Author:</Text>
      <Text  style={styles.bookInfoText }>{book.volumeInfo.authors? book.volumeInfo.authors.join(', '):'Unknown'}</Text>
      <Text style={styles.bookInfo}>Publisher:</Text>
      <Text style={styles.bookInfoText } >{book.volumeInfo.publisher?book.volumeInfo.publisher:'Unknown'}</Text>
      <Text style={styles.bookInfo}>Published Date:</Text>
      <Text style={styles.bookInfoText}>{book.volumeInfo.publishedDate?book.volumeInfo.publishedDate:'Unknown'}</Text>
      <Text style={styles.bookInfo}>Book Price: </Text >
      {bookSaleability == "FOR_SALE" ?(
        <Text style={styles.bookInfoText}>{book.saleInfo.retailPrice.currencyCode}:{book.saleInfo.retailPrice.amount}</Text>
      ):( <Text style={styles.bookInfoText}>Price Unavailable</Text>)
      }
      <Text style={styles.bookSummary }>Book Summary:</Text>
      <Text style={{ fontSize: 16, padding:10, borderWidth:1,lineHeight:24 }}>{book.volumeInfo.description?book.volumeInfo.description:"No summary available"}</Text>
     
      {book.accessInfo.pdf.acsTokenLink ? (
        <View style={styles.unavailableContainter} >
          <Button
            title={`Download ${book.volumeInfo.title} asc Sample file`}
            onPress={() => onPressLink(book.accessInfo.pdf.acsTokenLink)}
          />
        </View>
      ) : (
        <View style={styles.unavailableContainter}>
            <Button title='No sample link available'/>
       </View>
          
)}
      {book.saleInfo.buyLink ? (
        <View style={styles.unavailableContainter}>
            <Button
              title={`Buy this book from Google Books`}
              onPress={() => onPressLink(book.saleInfo.buyLink)}
          />
        </View>
      ):(
      <View style={styles.unavailableContainter}>
            <Button title='No purchase link available' />
            </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
  },
  imageStyle: {
    width: 180,
    height: 250,
      justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    borderRadius:10
  },
  imageContainer: {
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign:'center'
  },

  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign:'center'
  },

  bookSummary: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize:18
  },

  bookInfo: {
    fontSize: 16,
    paddingTop: 10,
    fontWeight:'bold'
  },

  bookInfoText: {
    fontSize: 16,
  },

  unavailableContainter: {
    marginTop: 10,
  }
});

