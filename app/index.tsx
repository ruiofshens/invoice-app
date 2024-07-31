import { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InvoiceList, InvoiceDropdownItem } from "@/src/types/types";
import { populateAsyncStorage } from "@/scripts/populateSampleInvoices";
import { useInvoice } from "@/src/context/InvoiceContext";
import { useFocusEffect } from "expo-router";

export default function HomeScreen() {
  // Hook to update currently active invoice
  const { updateInvoice } = useInvoice();
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceList>();

  // States for all stored invoices in storage
  const [loading, setLoading] = useState<boolean>(true);
  const [allInvoices, setAllInvoices] = useState<InvoiceList[]>([]);

  // States for dropdown menu
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<InvoiceDropdownItem[]>([]);

  // Fetch data from local storage and reset dropdown menu whenever screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          // Fetch raw data for all invoices
          const allKeys = await AsyncStorage.getAllKeys();
          const results = await AsyncStorage.multiGet(allKeys);

          // Populate dropdown menu with invoices retrieved
          if (results) {
            const fetchedData = results.map(([key, serializedItems]) => ({
              name: key,
              items: serializedItems ? JSON.parse(serializedItems) : [],
            }));

            setAllInvoices(fetchedData);
            setItems(
              fetchedData.map((invoice) => ({
                label: invoice.name,
                value: invoice.name,
              }))
            );
          }

          setLoading(false);
          setValue(null);
        } catch (error) {
          console.error("Error retrieving data from AsyncStorage:", error);
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  return (
    <>
      <View style={styles.container}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select an invoice"
          onSelectItem={(item) => {
            setSelectedInvoice(
              allInvoices.filter((invoice) => invoice.name === item.value)[0]
            );
          }}
        />

        <Button
          disabled={!selectedInvoice}
          onPress={() => {
            updateInvoice(selectedInvoice!);
            router.push("/invoice");
          }}
        >
          Navigate to Invoice
        </Button>

        <Button onPress={populateAsyncStorage}>Click to populate!</Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
