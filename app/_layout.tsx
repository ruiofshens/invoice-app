import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Button,
} from "react-native-paper";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { InvoicesContext } from "@/src/context/InvoicesContext";
import { InvoiceList } from "@/src/types/types";

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
  const [invoices, setInvoices] = useState<InvoiceList[]>([
    {
      name: "Owner A",
      items: [
        {
          id: 1,
          name: "Item 1",
          quantity: 13,
          price: 1.2,
        },
        {
          id: 2,
          name: "Item 2",
          quantity: 5,
          price: 0.8,
        },
      ],
    },
    {
      name: "Owner B",
      items: [
        {
          id: 3,
          name: "Item 3",
          quantity: 60,
          price: 0.8,
        },
        {
          id: 4,
          name: "Item 4",
          quantity: 30,
          price: 0.8,
        },
      ],
    },
  ]);
  const value = { invoices, setInvoices };

  return (
    <PaperProvider theme={theme}>
      <InvoicesContext.Provider value={value}>
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
      </InvoicesContext.Provider>
    </PaperProvider>
  );
}
