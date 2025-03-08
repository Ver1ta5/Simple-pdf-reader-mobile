import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



export const ContextMenu = ({ onDelete, onRename, onFavourite, isFavourite }) => (
  <Menu>
    <MenuTrigger>
      <TouchableOpacity style={styles.menuTrigger}>
        <Text style={styles.menuOption}>Select Action</Text>
      </TouchableOpacity>
    </MenuTrigger>
    <MenuOptions style={{ backgroundColor: 'black' }}>
      <MenuOption style={styles.menuBorder} onSelect={onFavourite}>
        <Text style={styles.menuOption}>
          {isFavourite ? 'Remove From Favourite' : 'Add to Favourite'}
        </Text>
      </MenuOption>
      <MenuOption style={styles.menuBorder} onSelect={onDelete}>
        <Text style={styles.menuOption}>Delete</Text>
      </MenuOption>
      <MenuOption style={styles.menuBorder} onSelect={onRename}>
        <Text style={styles.menuOption}>Rename</Text>
      </MenuOption>
    </MenuOptions>
  </Menu>
);


const styles = StyleSheet.create({

  menuTrigger: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'

  },

  menuBorder: {
    borderStyle: 'solid',
    color: 'white',
    borderColor: 'white',
    borderWidth: 1
  },

  menuOption: {
    padding: 10,
    zIndex: 100,
    color: 'white',
    borderStyle: 'solid',
    borderColor: 'white',
  },

});
