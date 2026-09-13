export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  issue_date: string;
  due_date: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
  subtotal: number;
  tax_amount: number;
  total: number;
}

export const mockClients: Client[] = [
  { id: 'c1', name: 'Diallo Import-Export', email: 'contact@diallo.sn', phone: '+221 77 123 45 67', address: 'Dakar, Sénégal' },
  { id: 'c2', name: 'Cabinet Koné', email: 'hello@kone.ci', phone: '+225 07 01 23 45 67', address: 'Abidjan, Côte d\'Ivoire' },
  { id: 'c3', name: 'Mbaye Tech SARL', email: 'tech@mbaye.sn', phone: '+221 76 987 65 43', address: 'Thiès, Sénégal' },
  { id: 'c4', name: 'Awa Design Studio', email: 'awa@design.sn', phone: '+221 70 111 22 33', address: 'Saint-Louis, Sénégal' },
  { id: 'c5', name: 'Global Solutions SA', email: 'contact@global.ml', phone: '+223 70 00 11 22', address: 'Bamako, Mali' },
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv1',
    invoice_number: 'INV-2024-001',
    client_id: 'c1',
    issue_date: '2024-03-12',
    due_date: '2024-04-12',
    status: 'paid',
    items: [
      { id: 'i1', description: 'Consulting IT', quantity: 1, unit_price: 1059322 },
    ],
    subtotal: 1059322,
    tax_amount: 190678,
    total: 1250000
  },
  {
    id: 'inv2',
    invoice_number: 'INV-2024-002',
    client_id: 'c2',
    issue_date: '2024-03-10',
    due_date: '2024-04-10',
    status: 'sent',
    items: [
      { id: 'i2', description: 'Audit de sécurité', quantity: 1, unit_price: 720339 },
    ],
    subtotal: 720339,
    tax_amount: 129661,
    total: 850000
  },
  {
    id: 'inv3',
    invoice_number: 'INV-2024-003',
    client_id: 'c3',
    issue_date: '2024-03-08',
    due_date: '2024-03-22',
    status: 'overdue',
    items: [
      { id: 'i3', description: 'Maintenance réseau', quantity: 2, unit_price: 177966 },
    ],
    subtotal: 355932,
    tax_amount: 64068,
    total: 420000
  },
  {
    id: 'inv4',
    invoice_number: 'INV-2024-004',
    client_id: 'c4',
    issue_date: '2024-03-05',
    due_date: '2024-04-05',
    status: 'paid',
    items: [
      { id: 'i4', description: 'Design Logo', quantity: 1, unit_price: 127119 },
    ],
    subtotal: 127119,
    tax_amount: 22881,
    total: 150000
  },
  {
    id: 'inv5',
    invoice_number: 'INV-2024-005',
    client_id: 'c5',
    issue_date: '2024-03-01',
    due_date: '2024-03-31',
    status: 'draft',
    items: [
      { id: 'i5', description: 'Installation Serveurs', quantity: 5, unit_price: 355932 },
    ],
    subtotal: 1779661,
    tax_amount: 320339,
    total: 2100000
  }
];
