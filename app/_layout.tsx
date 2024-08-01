import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Button,
} from "react-native-paper";
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
                headerRight: () => <Button>+</Button>,
              }}
            />
            <Stack.Screen
              name="invoice"
              options={{
                title: "Invoice 1",
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </InvoiceContextProvider>
    </PaperProvider>
  );
}
