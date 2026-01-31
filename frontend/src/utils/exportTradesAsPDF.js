// Hilfsfunktion für PDF-Export (jsPDF)


import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
export function exportTradesAsPDF(tradesWithPnl, startkapital) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  // Titel mittig
  const pageWidth = doc.internal.pageSize.getWidth();
  const title = 'Trading-Journal Export';
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, 16);
  doc.setFontSize(10);
  const header = ['Datum','Symbol','Typ','Gewinn','Verlust','G/V','Kontostand','Stimmung','Fehler/Tags','Reflexion','Notiz'];
  const rows = tradesWithPnl.map(trade => [
    trade.date,
    trade.symbol,
    trade.type,
    trade.gewinn,
    trade.verlust,
    trade.pnl,
    Number(startkapital) + trade.balance,
    trade.mood || '',
    Array.isArray(trade.fehler_tags) ? trade.fehler_tags.join(', ') : (trade.fehler_tags || ''),
    trade.reflexion || '',
    (trade.note || '').replace(/\n/g, ' ')
  ]);
  let y = 28;
  autoTable(doc, {
    head: [header],
    body: rows,
    startY: y,
    styles: { fontSize: 8, cellPadding: 1 },
    headStyles: { fillColor: [30, 64, 175] },
    margin: { left: 0, right: 0 },
    tableWidth: 'wrap',
    theme: 'grid',
    didDrawPage: function (data) {
      // Tabelle mittig auf Seite
      const tableWidth = data.table.width;
      const pageWidth = doc.internal.pageSize.getWidth();
      const marginX = (pageWidth - tableWidth) / 2;
      data.settings.margin.left = marginX;
      data.settings.margin.right = marginX;
    },
    columnStyles: {
      0: { cellWidth: 28 }, // Datum
      1: { cellWidth: 18 }, // Symbol
      2: { cellWidth: 14 }, // Typ
      3: { cellWidth: 16 }, // Gewinn
      4: { cellWidth: 16 }, // Verlust
      5: { cellWidth: 16 }, // G/V
      6: { cellWidth: 22 }, // Kontostand
      7: { cellWidth: 22 }, // Stimmung
      8: { cellWidth: 28 }, // Fehler/Tags
      9: { cellWidth: 32 }, // Reflexion
      10: { cellWidth: 32 }, // Notiz
    }
  });
  doc.save(`trades_export_${new Date().toISOString().slice(0,10)}.pdf`);
}
