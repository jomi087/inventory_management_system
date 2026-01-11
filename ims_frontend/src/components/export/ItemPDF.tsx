import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from '@react-pdf/renderer';

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
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
  col: { width: '33%', fontSize: 10 }
});

export const ItemsPDF = ({
  items
}: {
  items: Item[];
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>
        Items Report
      </Text>

      {/* HEADER */}
      <View style={styles.row}>
        <Text style={styles.col}>Name</Text>
        <Text style={styles.col}>Qty</Text>
        <Text style={styles.col}>Price</Text>
      </View>

      {items.map(i => (
        <View key={i.id} style={styles.row}>
          <Text style={styles.col}>
            {i.name}
          </Text>
          <Text style={styles.col}>
            {i.quantity}
          </Text>
          <Text style={styles.col}>
            {i.price}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);
