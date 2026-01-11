import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from '@react-pdf/renderer';

interface Ledger {
  id: string;
  item: { name: string };
  quantity: number;
  priceAtSale: number;
  paymentType: string;
  createdAt: string;
}

const styles = StyleSheet.create({
  page: { padding: 20 },
  title: {
    fontSize: 16,
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1px solid #ccc',
    padding: 5
  },
  col: { width: '20%', fontSize: 10 }
});

export const LedgerPDF = ({
  ledger,
  customer
}: {
  ledger: Ledger[];
  customer: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>
        Ledger - {customer}
      </Text>

      {/* HEADER */}
      <View style={styles.row}>
        <Text style={styles.col}>Item</Text>
        <Text style={styles.col}>Qty</Text>
        <Text style={styles.col}>Price</Text>
        <Text style={styles.col}>Payment</Text>
        <Text style={styles.col}>Date</Text>
      </View>

      {ledger.map(l => (
        <View key={l.id} style={styles.row}>
          <Text style={styles.col}>
            {l.item.name}
          </Text>
          <Text style={styles.col}>
            {l.quantity}
          </Text>
          <Text style={styles.col}>
            {l.priceAtSale}
          </Text>
          <Text style={styles.col}>
            {l.paymentType}
          </Text>
          <Text style={styles.col}>
            {new Date(
              l.createdAt
            ).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);
