import AsyncStorage from "@react-native-async-storage/async-storage";
import { InvoiceList } from "@/src/types/types";

const sampleInvoices: InvoiceList[] = [
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
];

export const populateAsyncStorage = async () => {
  try {
    for (const invoiceList of sampleInvoices) {
      await AsyncStorage.setItem(
        invoiceList.name,
        JSON.stringify(invoiceList.items)
      );
    }
    console.log("AsyncStorage populated successfully");
  } catch (error) {
    console.error("Error populating AsyncStorage:", error);
  }
};
