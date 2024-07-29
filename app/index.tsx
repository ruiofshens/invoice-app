import { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Link } from "expo-router";
import { InvoicesContext } from "@/src/context/InvoicesContext";

export default function HomeScreen() {
  const { invoices, setInvoices } = useContext(InvoicesContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    invoices.map((invoice) => ({
      label: invoice.name,
      value: invoice.name,
    }))
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
        />
        <Link href="/invoice">View details</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
