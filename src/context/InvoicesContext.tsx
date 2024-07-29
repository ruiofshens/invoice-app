import { createContext } from "react";
import { InvoiceList } from "../types/types";

const items: InvoiceList[] = [];

export const InvoicesContext = createContext({
  invoices: items,
  setInvoices: (invoices: InvoiceList[]) => {},
});
