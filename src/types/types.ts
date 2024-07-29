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
