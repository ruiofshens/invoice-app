export interface InvoiceList {
  name: string;
  contactDetails: string;
  additionalDetails: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceListItem {
  id: string;
  name: string;
}

export const INVOICES_KEY: string = "invoices";
export const WHATSAPPNUM_KEY: string = "whatsappNum";
