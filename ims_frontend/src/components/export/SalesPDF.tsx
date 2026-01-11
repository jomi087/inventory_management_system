import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from '@react-pdf/renderer';
import type { Sale } from '../../pages/reports/SalesReport';

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

export const SalesPDF: React.FC<{ sales: Sale[] }> = ({ sales }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>
        Sales Report
      </Text>

      {/* HEADER */}
      <View style={styles.row}>
        <Text style={styles.col}>Item</Text>
        <Text style={styles.col}>Qty</Text>
        <Text style={styles.col}>Price</Text>
        <Text style={styles.col}>Payment</Text>
        <Text style={styles.col}>Date</Text>
      </View>

      {sales.map(s => (
        <View key={s.id} style={styles.row}>
          <Text style={styles.col}>
            {s.item.name}
          </Text>
          <Text style={styles.col}>
            {s.quantity}
          </Text>
          <Text style={styles.col}>
            {s.priceAtSale}
          </Text>
          <Text style={styles.col}>
            {s.paymentType}
          </Text>
          <Text style={styles.col}>
            {new Date(
              s.createdAt
            ).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);

