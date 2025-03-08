
import {Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import PdfThumbnail from 'react-native-pdf-thumbnail'
import { insertIntoBooks,getBookData} from './database';
import { randomBackgroundColour } from './randomBGColour';
// search phone download directionary for ebook files


export const selectFile = async (setEBookFiles) => {
    try {

        //pick a folder
    const pickedFile = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true, 
        copyTo: 'documentDirectory'
    })
    
       // select only files ending in pdf 
    let eBookFiles = pickedFile.filter(file => 
    (file.name.endsWith('.pdf'))
        );
     
    

        eBookFiles = eBookFiles.map(file => ({
            ...file,fileCopyUri: `file://${decodeURIComponent(file.fileCopyUri)}`
        }))
        
        

        // take photo of the first page
    const page = 0
        // get thumbnail of pdf

        //use promise all to keep array structure for usage in setEbookFiles
        const pdfThumbnail = await Promise.all(eBookFiles.map(async (file) => {
            if (file.name.endsWith('.pdf')) { 
                const { uri: thumbnailUri } = await PdfThumbnail.generate(file.uri,page)
                return { ...file, thumbnailUri};
            }
            return { ...file, thumbnailUri: null }
        }))
        bookColour = randomBackgroundColour()
        for (i = 0; i < pdfThumbnail.length; i++) {
            const checkIfInDatabase = await insertIntoBooks(pdfThumbnail[i].name, bookColour, pdfThumbnail[i].fileCopyUri, pdfThumbnail[i].thumbnailUri)
            console.log('checkIfInDatabase:', checkIfInDatabase)
            if (checkIfInDatabase == false) {
                Alert.alert(`This book is already in the library`)
            }
            else {
                const newBookList = await getBookData()
                setEBookFiles(newBookList)
            }
        }


    } catch (error) {
        if (DocumentPicker.isCancel(error)) {
            // User cancelled the picker
            console.log('User cancelled file selection.');
        } else {
            // Handle other errors
            console.error('Error selecting files:', error);
        };
    }
};




