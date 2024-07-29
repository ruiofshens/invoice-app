import { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, DataTable, Portal } from "react-native-paper";
import { InvoiceItem } from "../types/types";
import DetailedItemModal from "./DetailedItemModal";
import { InvoicesContext } from "../context/InvoicesContext";

export default function Invoice() {
  const { invoices, setInvoices } = useContext(InvoicesContext);
  const [items, setItems] = useState(invoices[0].items);

  const handleUpdateItem = (updatedItem: InvoiceItem) => {
    setItems((items) =>
      items.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InvoiceItem>(items[1]);

  const handleRowPress = (item: InvoiceItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const calculateSum = (): string => {
    const sum = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    return formatPrice(sum);
  };

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <>
      <DataTable>
        <DataTable.Header style={styles.headerRow}>
          <DataTable.Title style={{ flex: 13 }}>Item</DataTable.Title>
          <DataTable.Title style={{ flex: 2 }} numeric>
            Qty
          </DataTable.Title>
          <DataTable.Title style={{ flex: 5 }} numeric>
            Price
          </DataTable.Title>
        </DataTable.Header>

        {items.map((item) => (
          <DataTable.Row key={item.id} onPress={() => handleRowPress(item)}>
            <View style={[styles.cell, { flex: 13 }]}>
              <Text style={styles.text}>{item.name}</Text>
            </View>
            <View style={[styles.cell, { flex: 2 }]}>
              <Text style={[styles.text, { textAlign: "right" }]}>
                {item.quantity}
              </Text>
            </View>
            <View style={[styles.cell, { flex: 5 }]}>
              <Text style={[styles.text, { textAlign: "right" }]}>
                {formatPrice(item.price)}
              </Text>
            </View>
          </DataTable.Row>
        ))}

        <DataTable.Row key={-1} style={styles.bottomRow}>
          <View style={[styles.cell, { width: "100%" }]}>
            <Text
              style={[styles.text, { textAlign: "right", fontWeight: "bold" }]}
            >
              Total: {calculateSum()}
            </Text>
          </View>
        </DataTable.Row>
      </DataTable>

      <Portal>
        <DetailedItemModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          item={selectedItem}
          handleUpdateItem={handleUpdateItem}
        />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  cell: {
    paddingVertical: 10,
  },
  text: {
    fontSize: 20,
  },
  headerRow: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  bottomRow: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  modalContainer: {
    backgroundColor: "white",
    margin: "5%",
    padding: "5%",
  },
});
