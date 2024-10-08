import AsyncStorage from "@react-native-async-storage/async-storage";
import { InvoiceList } from "@/src/types/types";

// Sample phone number used in Twilio Sandbox for all suppliers, as number needs to be verified
const sampleInvoices: InvoiceList[] = [
  {
    name: "Supplier A",
    contactDetails: "14155238886",
    additionalDetails: "additional details here",
    items: [
      {
        id: "Chicken",
        name: "Chicken",
        quantity: 13,
        price: 1.2,
      },
      {
        id: "Fish",
        name: "Fish",
        quantity: 5,
        price: 0.8,
      },
    ],
  },
  {
    name: "Supplier B",
    contactDetails: "14155238886",
    additionalDetails: "additional details here",
    items: [
      {
        id: "Salt",
        name: "Salt",
        quantity: 60,
        price: 0.4,
      },
      {
        id: "Pepper",
        name: "Pepper",
        quantity: 30,
        price: 1.5,
      },
    ],
  },
  {
    name: "Supplier C",
    contactDetails: "14155238886",
    additionalDetails: "additional details here",
    items: [
      {
        id: "Bananas",
        name: "Bananas",
        quantity: 24,
        price: 2.3,
      },
      {
        id: "Apples",
        name: "Apples",
        quantity: 19,
        price: 0.2,
      },
      {
        id: "Pineapples",
        name: "Pineapples",
        quantity: 51,
        price: 1.6,
      },
      {
        id: "Oranges",
        name: "Oranges",
        quantity: 7,
        price: 1.0,
      },
    ],
  },
];

export const populateAsyncStorage = async () => {
  try {
    await AsyncStorage.setItem("invoices", JSON.stringify(sampleInvoices));
    console.log("AsyncStorage populated successfully");
  } catch (error) {
    console.error("Error populating AsyncStorage:", error);
  }
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage cleared successfully.");
  } catch (error) {
    console.error("Failed to clear AsyncStorage:", error);
  }
};
