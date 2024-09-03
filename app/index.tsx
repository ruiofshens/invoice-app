import CustomText from "@/src/components/CustomText";
import { useInvoice } from "@/src/context/InvoiceContext";
import { INVOICES_KEY, InvoiceList, InvoiceListItem } from "@/src/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon } from "react-native-paper";

export default function HomeScreen() {
  const { updateInvoice } = useInvoice();

  // States for all stored invoices in storage
  const [loading, setLoading] = useState<boolean>(true);
  const [allInvoices, setAllInvoices] = useState<InvoiceList[]>([]);

  // Items for display in FlatList
  const [items, setItems] = useState<InvoiceListItem[]>([]);

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
                id: invoice.name,
                name: invoice.name,
              }))
            );
          }

          setLoading(false);
        } catch (error) {
          console.error("Error retrieving data from AsyncStorage:", error);
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  const renderItem = ({ item }: { item: InvoiceListItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        updateInvoice(
          allInvoices.filter((invoice) => invoice.name === item.name)[0]
        );
        router.push("/invoice");
      }}
    >
      <CustomText style={styles.itemText}>{item.name}</CustomText>
    </TouchableOpacity>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon source="food" size={50} />
          <CustomText style={styles.mainText}>Invoices</CustomText>
          <CustomText style={styles.subtitleText}>Select Supplier:</CustomText>
        </View>

        <FlatList
          refreshing={loading}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
          persistentScrollbar
          showsVerticalScrollIndicator
          ItemSeparatorComponent={renderSeparator}
        />

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            router.push("/settings");
          }}
          icon="cog"
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
  subtitleText: {
    marginTop: "5%",
    fontSize: 30,
  },
  flatList: {
    marginTop: "10%",
    width: "90%",
    alignSelf: "center",
    height: "30%",
    flexGrow: 0,
  },
  itemContainer: {
    alignItems: "center",
    paddingVertical: "2%",
  },
  itemText: {
    fontSize: 20,
  },
  separator: {
    height: 3,
    backgroundColor: "#ccc",
    width: "auto",
  },
  button: {
    marginTop: "10%",
  },
});
