import { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Text } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  InvoiceList,
  InvoiceDropdownItem,
  INVOICES_KEY,
} from "@/src/types/types";
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
          const results = await AsyncStorage.getItem(INVOICES_KEY);
          if (results) {
            const fetchedData = JSON.parse(results) as InvoiceList[];
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
          setSelectedInvoice(undefined);
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
        <View style={styles.header}>
          <Icon source="food" size={50} />
          <Text style={styles.mainText}>Invoices</Text>
        </View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          loading={loading}
          containerStyle={styles.dropdown}
          textStyle={styles.dropdownText}
          placeholderStyle={styles.placeholderText}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select an option..."
          onSelectItem={(item) => {
            setSelectedInvoice(
              allInvoices.filter((invoice) => invoice.name === item.value)[0]
            );
          }}
        />

        <Button
          style={styles.button}
          mode="contained"
          disabled={!selectedInvoice}
          onPress={() => {
            updateInvoice(selectedInvoice!);
            router.push("/invoice");
          }}
        >
          Navigate to Selected Invoice
        </Button>

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            router.push("/settings");
          }}
        >
          Settings
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  mainText: {
    fontSize: 40,
  },
  dropdown: {
    marginTop: "10%",
    width: "85%",
    alignSelf: "center",
  },
  dropdownText: {
    fontSize: 25,
  },
  placeholderText: {
    color: "gray",
  },
  button: {
    marginTop: "10%",
  },
});
