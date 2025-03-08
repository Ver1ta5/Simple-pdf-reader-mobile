    
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { PdfReader } from './pdfViewer';
import { HeaderAddBook, ZoomButtons ,SearchHeader,HeaderFavourite} from './headers'
import { AllBooks } from './allBooks';

const Stack = createStackNavigator();
    
export function AllBookStack() { 
    return (
  
    <Stack.Navigator>
        <Stack.Screen name="All Books" component={AllBooks}  options={({ route }) => ({
                headerRight: () => {
                  return (
                    <View style={{ flexDirection: 'row' }}>
                      <SearchHeader />
                      <HeaderFavourite/>
                     <HeaderAddBook />
                     
                    </View>
                  );
                },
              })}
            />
          <Stack.Screen name="PdfReader" component={PdfReader} options={{
            headerRight: () => {
              return (
                <View>
                  <ZoomButtons/>
                </View>
              )
            }
  }
          } />
        </Stack.Navigator>
       
    )
  }
    
   