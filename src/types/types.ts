export interface InvoiceList {
  name: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceDropdownItem {
  label: string;
  value: string;
}

export const INVOICES_KEY: string = "invoices";
export const WHATSAPPNUM_KEY: string = "whatsappNum";
