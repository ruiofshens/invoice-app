import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { Text, DataTable, Portal } from "react-native-paper";
import { InvoiceItem } from "../types/types";
import DetailedItemModal from "./DetailedItemModal";
import { useInvoice } from "../context/InvoiceContext";

export default function CurrentInvoice() {
  const navigation = useNavigation();

  const { invoice, updateInvoice } = useInvoice();
  const [items, setItems] = useState(invoice.items);

  useEffect(() => {
    navigation.setOptions({ title: invoice.name });
  }, [invoice, navigation]);

  const handleUpdateItem = (updatedItem: InvoiceItem) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      );

      // Callback to have access to newItems returned by handleUpdateItem
      updateInvoice({
        name: invoice.name,
        items: newItems,
      });

      return newItems;
    });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InvoiceItem>();

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

        {!items.length ? (
          <View style={styles.emptyTextContainer}>
            <Text style={styles.emptyText}>
              Selected invoice is empty, please fill in items using bottom left
              button!
            </Text>
          </View>
        ) : (
          <>
            {items.map((item) => (
              <DataTable.Row key={item.id} onPress={() => handleRowPress(item)}>
                <View style={[styles.cell, { flex: 13 }]}>
                  <Text style={styles.cellText}>{item.name}</Text>
                </View>
                <View style={[styles.cell, { flex: 2 }]}>
                  <Text style={[styles.cellText, { textAlign: "right" }]}>
                    {item.quantity}
                  </Text>
                </View>
                <View style={[styles.cell, { flex: 5 }]}>
                  <Text style={[styles.cellText, { textAlign: "right" }]}>
                    {formatPrice(item.price)}
                  </Text>
                </View>
              </DataTable.Row>
            ))}
            <DataTable.Row key={-1} style={styles.bottomRow}>
              <View style={[styles.cell, { width: "100%" }]}>
                <Text
                  style={[
                    styles.cellText,
                    { textAlign: "right", fontWeight: "bold" },
                  ]}
                >
                  Total: {calculateSum()}
                </Text>
              </View>
            </DataTable.Row>
          </>
        )}
      </DataTable>

      {selectedItem && (
        <Portal>
          <DetailedItemModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            item={selectedItem}
            handleUpdateItem={handleUpdateItem}
          />
        </Portal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cell: {
    paddingVertical: 10,
  },
  emptyTextContainer: {
    marginTop: "10%",
    marginHorizontal: "5%",
  },
  emptyText: {
    fontSize: 20,
    textAlign: "center",
  },
  cellText: {
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
