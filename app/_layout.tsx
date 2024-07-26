import { 
  MD3LightTheme as DefaultTheme,
  PaperProvider,
 } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
};

export default function Layout() {
  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Screen 1',
              title: 'Screen 1',
            }}
          />
          <Drawer.Screen
            name="(suppliers)/supplier1"
            options={{
              drawerLabel: 'Screen 2',
              title: 'Screen 2',
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
