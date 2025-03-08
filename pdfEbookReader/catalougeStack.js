import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GoogleBooksAPI } from './catalogue';
import { BookDetails } from './BookDetail';

const Stack = createStackNavigator();
    
export function CatalogueStack() { 
    return (
  
    <Stack.Navigator>
        <Stack.Screen name="Catalogue" component={GoogleBooksAPI}
            />
          <Stack.Screen name="Book Detail" component={BookDetails} />
        </Stack.Navigator>
       
    )
  }
    
   