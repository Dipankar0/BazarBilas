import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = order => {
  const doc = new jsPDF();

  const tableColumn = ['Product', 'Portion', 'Quantity', 'Price'];

  const tableRows = [];

  order.cart.products.map(product => {
    const productData = [
      product.product.name,
      product.product.quantity,
      product.count,
      product.product.price
    ];
    tableRows.push[productData];
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  doc.text('Closed tickets within the last one month.', 14, 15);

  doc.save('test.pdf');
};

export default generatePDF;
