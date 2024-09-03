import CustomText from "@/src/components/CustomText";
import { InvoiceContextProvider } from "@/src/context/InvoiceContext";
import {
  CourierPrime_400Regular,
  useFonts,
} from "@expo-google-fonts/courier-prime";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    secondary: "#f1c40f",
    tertiary: "#a1b2c3",
  },
};

export default function Layout() {
  const [loaded, error] = useFonts({
    CourierPrime_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <InvoiceContextProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#f2f2f2",
              },
              headerTintColor: "black",
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: "",
              }}
            />
            <Stack.Screen
              name="invoice"
              options={{
                title: "Current Invoice",
              }}
            />
            <Stack.Screen
              name="settings"
              options={{
                headerTitle: (props) => (
                  <CustomText {...props} style={{ fontSize: 17 }}>
                    Settings
                  </CustomText>
                ),
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </InvoiceContextProvider>
    </PaperProvider>
  );
}
