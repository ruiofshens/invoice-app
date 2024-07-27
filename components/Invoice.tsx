import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, DataTable, Modal, Portal, Button } from "react-native-paper";

export default function Invoice() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const handleRowPress = (rowData: string) => {
    setSelectedRow(rowData);
    setModalVisible(true);
  };

  // To replace with actual data
  const [items] = useState([
    {
      key: 1,
      name: "Item 1",
      quantity: 13,
      price: 1.2,
    },
    {
      key: 2,
      name: "Item 2",
      quantity: 5,
      price: 0.8,
    },
    {
      key: 3,
      name: "Item 3",
      quantity: 60,
      price: 0.8,
    },
    {
      key: 4,
      name: "Item 4",
      quantity: 30,
      price: 0.8,
    },
  ]);

  const calculateSum = (): string => {
    const sum = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
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
          <DataTable.Row
            key={item.key}
            onPress={() => handleRowPress(item.name)}
          >
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
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text>Clicked on {selectedRow}</Text>
          <Button onPress={() => setModalVisible(false)}>Close</Button>
        </Modal>
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
