import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { InvoiceList } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface InvoiceContextType {
  invoice: InvoiceList;
  updateInvoice: (invoice: InvoiceList) => void;
}

type InvoiceProviderProps = {
  children: ReactNode;
};

const InvoicesContext = createContext<InvoiceContextType | undefined>(
  undefined
);

// updateInvoice() calls setInvoice() hook
// This triggers useEffect() hook to save updated invoice to storage
const InvoiceContextProvider = ({ children }: InvoiceProviderProps) => {
  const [invoice, setInvoice] = useState<InvoiceList>({
    name: "test",
    items: [],
  });

  const updateInvoice = (invoice: InvoiceList) => setInvoice(invoice);

  // Figure out how to prevent redundant saving when setting initially
  useEffect(() => {
    AsyncStorage.setItem(`${invoice.name}`, JSON.stringify(invoice.items));
  }, [invoice]);

  return (
    <InvoicesContext.Provider value={{ invoice, updateInvoice }}>
      {children}
    </InvoicesContext.Provider>
  );
};

// Custom hook to be exported for components to access and update current invoice
const useInvoice = () => {
  const context = useContext(InvoicesContext);
  if (!context) {
    throw new Error("useInvoice must be used within a InvoiceContextProvider");
  }
  return context;
};

export { InvoiceContextProvider, useInvoice };
