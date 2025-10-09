import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import JsBarcode from "jsbarcode";
import { Dtrack, Row } from "@/types";
import logo from "@assets/img/logos/Department_of_Health.png";

const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 20, fontSize: 10 },
  table: { display: "flex", width: "100%", borderWidth: 0.5 },
  row: { flexDirection: "row" },
  cell: {
    borderWidth: 0.5,
    padding: 0.5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  logo: { width: 60, height: 60 },
  title: { fontSize: 12, fontWeight: "bold", textAlign: "center" },
  barcodeContainer: { marginTop: 12, alignItems: "center", textAlign: "center" },
  section: { marginTop: 12, marginBottom: 8 },
  tableCell: {
    borderWidth: 1,
    padding: 0.5,
    flex: 1,
    textAlign: "center",
  },
});

interface Props {
  data: Dtrack;
}

// how many rows fit in one A4 page (adjust until looks right)
const ROWS_PER_PAGE = 14;

const DTrackHistoryPDF: React.FC<Props> = ({ data }) => {
  const [barcode, setBarcode] = useState<string | null>(null);

  const rows = Array.isArray((data as any).rows) ? (data as any).rows : [data];

  const sortedRows = rows.sort(
    (a: Row, b: Row) =>
      new Date(a.ts_created_at).getTime() - new Date(b.ts_created_at).getTime()
  );

  const firstRecord = sortedRows[0] ?? data;

  const generateBarcode = (value: string) => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, value, {
      format: "CODE128",
      width: 2,
      height: 60,
      displayValue: false,
    });
    return canvas.toDataURL("image/png");
  };

  useEffect(() => {
    if (firstRecord?.route_no) {
      setBarcode(generateBarcode(firstRecord.route_no));
    }
  }, [firstRecord]);

  const formatDate = (dateInput?: string | Date | null) => {
    if (!dateInput) return "";
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US");
  };

  // break rows into pages
  const pages: Row[][] = [];
  for (let i = 0; i < sortedRows.length; i += ROWS_PER_PAGE) {
    const chunk = sortedRows.slice(i, i + ROWS_PER_PAGE);
    // pad with empty rows to fill the page
    while (chunk.length < ROWS_PER_PAGE) {
      chunk.push({
        ts_created_at: "",
        depart_from: "",
        docs_destin: "",
        act_taken: "",
        depart_user: "",
      } as Row);
    }
    pages.push(chunk);
  }

  // if no rows at all, still create one page with empty placeholders
  if (pages.length === 0) {
    const chunk: Row[] = [];
    while (chunk.length < ROWS_PER_PAGE) {
      chunk.push({
        ts_created_at: "",
        depart_from: "",
        docs_destin: "",
        act_taken: "",
        depart_user: "",
      } as Row);
    }
    pages.push(chunk);
  }

  return (
    <Document>
      {pages.map((pageRows, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          {/* HEADER */}
          <View style={styles.table}>
            <View style={styles.row}>
              <View
                style={[
                  styles.cell,
                  { flex: 2, height: 100, justifyContent: "center", alignItems: "center" },
                ]}
              >
                <Image src={logo} style={{ width: 80, height: 80 }} />
              </View>
              <View style={{ flex: 8, flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={[
                      styles.cell,
                      { flex: 9, height: 70, justifyContent: "center", alignItems: "center" },
                    ]}
                  >
                    <Text style={styles.title}>
                      Document Tracking Information System (DTRAK)
                    </Text>
                  </View>
                  <View style={{ flex: 3, flexDirection: "column" }}>
                    <View style={[styles.row, { height: 40 }]}>
                      <View style={[styles.cell, { flex: 2 }]}><Text></Text></View>
                      <View style={[styles.cell, { flex: 2 }]}><Text></Text></View>
                    </View>
                    <View style={[styles.row, { height: 30 }]}>
                      <View style={[styles.cell, { flex: 2 }]}><Text>Revision No.</Text></View>
                      <View style={[styles.cell, { flex: 2 }]}><Text>2.0</Text></View>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: "row", height: 30 }}>
                  <View style={[styles.cell, { flex: 6 }]}><Text>Knowledge Management - ICT - DTRACK-4.0</Text></View>
                  <View style={[styles.cell, { flex: 3 }]}><Text>ROUTING SLIP</Text></View>
                  <View style={{ flex: 3, flexDirection: "row" }}>
                    <View style={[styles.cell, { flex: 2 }]}><Text>Effectivity:</Text></View>
                    <View style={[styles.cell, { flex: 2 }]}><Text>March 30, 2015</Text></View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* BARCODE */}
          {pageIndex === 0 && (
            <View style={styles.barcodeContainer}>
              {barcode ? (
                <Image src={barcode} style={{ width: 200, height: 60 }} />
              ) : (
                <Text>Loading Barcode...</Text>
              )}
              <Text>{firstRecord?.route_no}</Text>
            </View>
          )}

          <View style={{ marginTop: 15 }} />

          {/* DETAILS */}
          {pageIndex === 0 && (
            <>
              <View style={styles.table}>
                <View style={{ flexDirection: "row", height: 30 }}>
                  <View style={[styles.cell, { flex: 11, alignItems: "flex-start" }]}>
                    <Text style={{ fontWeight: "bold" }}>
                      ORIGINATING OFFICE: {firstRecord?.depart_from}
                    </Text>
                  </View>
                  <View style={[styles.cell, { flex: 3, alignItems: "flex-start" }]}>
                    <Text style={{ fontWeight: "bold" }}>
                      DATE: {formatDate(firstRecord?.ts_created_at)}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", height: 30 }}>
                  <View style={[styles.cell, { flex: 14, alignItems: "flex-start" }]}>
                    <Text style={{ fontWeight: "bold" }}>
                      TYPE OF DOCUMENT: {firstRecord?.docs_type}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", height: 30 }}>
                  <View style={[styles.cell, { flex: 14, alignItems: "flex-start" }]}>
                    <Text style={{ fontWeight: "bold" }}>
                      SUBJECT: {firstRecord?.docs_subject}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ height: 10 }} />
            </>
          )}

          {/* Row 4: Table Header */}
          <View style={{ flexDirection: "row", height: 30 }}>
            <View style={[styles.cell, { flex: 2 }]}>
              <Text style={{ fontWeight: "bold" }}>DATE</Text>
            </View>
            <View style={[styles.cell, { flex: 2 }]}>
              <Text style={{ fontWeight: "bold" }}>FROM</Text>
            </View>
            <View style={[styles.cell, { flex: 2 }]}>
              <Text style={{ fontWeight: "bold" }}>TO</Text>
            </View>
            <View style={[styles.cell, { flex: 4 }]}>
              <Text style={{ fontWeight: "bold" }}>
                ACTION REQUIRED / ACTION TAKEN / REMARKS
              </Text>
            </View>
            <View style={[styles.cell, { flex: 2 }]}>
              <Text style={{ fontWeight: "bold" }}>DUE DATE</Text>
            </View>
            <View style={[styles.cell, { flex: 2 }]}>
              <Text style={{ fontWeight: "bold" }}>NAME</Text>
            </View>
          </View>

          {/* ROWS */}
          {pageRows.map((row, i) => (
            <View key={i} style={{ flexDirection: "row", height: 30, backgroundColor: i % 2 == 0 ? "#f9f9f9" : "#e6e6e6", }}>
              <View style={[styles.cell, { flex: 2 }]}><Text>{formatDate(row.ts_created_at)}</Text></View>
              <View style={[styles.cell, { flex: 2 }]}><Text>{row.depart_from}</Text></View>
              <View style={[styles.cell, { flex: 2 }]}><Text>{row.docs_destin}</Text></View>
              <View style={[styles.cell, { flex: 4 }]}><Text>{row.act_taken}</Text></View>
              <View style={[styles.cell, { flex: 2 }]}><Text>{formatDate(row.ts_created_at)}</Text></View>
              <View style={[styles.cell, { flex: 2 }]}><Text>{row.depart_user}</Text></View>
            </View>
          ))}
        </Page>
      ))}
    </Document>
  );
};

export default DTrackHistoryPDF;
