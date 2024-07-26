import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Button icon="pencil-plus" mode="contained" onPress={() => console.log('Pressed')}>
        Add new item
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
