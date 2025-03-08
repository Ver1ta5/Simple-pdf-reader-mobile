
import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer} from '@react-navigation/native';
import { ZoomValue,AddBook,SearchQuery,IsFavouritePage} from './Context';
import { useEffect } from 'react';
import { requestPermissions } from './requestPermission';
import { createBooks,wipeDatabase} from './database';
import { MenuProvider } from 'react-native-popup-menu'
import { AllBookStack } from './allbookStack';
import { CatalogueStack } from './catalougeStack.js';


const tab = createBottomTabNavigator();


export default function App() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await requestPermissions();
        await wipeDatabase()
        await createBooks(); 
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    // Call the async function
    initializeApp();
  }, []);
    
  
  return (
    <MenuProvider>
      <AddBook>
        <SearchQuery>
         <ZoomValue>
          <IsFavouritePage>
             <NavigationContainer>
                <tab.Navigator>
          
                  <tab.Screen
                          name="All"
                          component={AllBookStack}
                          options={{
                            headerShown: false
                          }}
                    />

         

                  <tab.Screen
                      name="Search Books"
                              component={CatalogueStack}  
                              options={{
                                headerShown: false
                              }}
                              
                    
                    />

                </tab.Navigator>
                <StatusBar style="auto" />
              </NavigationContainer>
            </IsFavouritePage>
          </ZoomValue>
        </SearchQuery>
      </AddBook>
    </MenuProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center',
  },

  bookContainerRow: {
    flexDirection:'row',
    flex: 1,
    margin: 10,
    width: "100%",
    justifyContent: 'flex-start',
    flexWrap:'wrap'
  },

  bookContainerCol: {
    marginTop:50,
    flex: 1,
    width:'100%',
    flexDirection: 'column',
    margin: 10,
    alignItems: 'center',
  },

  bookSpacing: {
    width: '45%',
    margin:10
  }


});
