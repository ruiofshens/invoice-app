import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { InvoiceContextProvider } from "@/src/context/InvoiceContext";

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
                title: "Settings",
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </InvoiceContextProvider>
    </PaperProvider>
  );
}
