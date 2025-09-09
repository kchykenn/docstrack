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
import { createCanvas } from "canvas";
import { AddDtrack } from "@/types";
import logo from "@assets/img/logos/Department_of_Health.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontSize: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderWidth: 0.5,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    borderWidth: 0.5,
    padding: 0.5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  barcodeContainer: {
    marginTop: 12,
    alignItems: "center",
    textAlign: "center",
  },
  section: {
    marginTop: 12,
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    marginRight: 4,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    borderWidth: 0.5, 
    padding: 0.5,
    flex: 1,
    textAlign: "center",
  },
});

interface Props {
  doc: AddDtrack;
}


const DTrackPDF: React.FC<Props> = ({ doc }) => {
  const [barcode, setBarcode] = useState<string | null>(null);

  useEffect(() => {
    if (doc?.route_no) {
      const canvas = createCanvas();
      JsBarcode(canvas, doc.route_no, {
        format: "CODE128",
        width: 2,
        height: 60,
        displayValue: false,
      });
      setBarcode(canvas.toDataURL("image/png"));
    }
  }, [doc]);

  // Format date to MM/DD/YYYY
  const formatDate = (dateInput?: string | Date | null) => {
    if (!dateInput) return "";
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    if (isNaN(date.getTime())) return ""; // Invalid date check

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };


  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Table */}
        <View style={styles.table}>
          <View style={styles.row}>

            <View
              style={[
                styles.cell,
                { flex: 2, height: 100, justifyContent: "center", alignItems: "center" },
              ]}
            >
              <Image
                src={logo}
                style={{ width: 80, height: 80 }}
              />
            </View>

            <View style={{ flex: 8, flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={[
                    styles.cell,
                    {
                      flex: 9,
                      height: 70,
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text style={styles.title}>
                    Document Tracking Information System (DTRAK)
                  </Text>
                </View>

                <View style={{ flex: 3, flexDirection: "column" }}>
                  <View style={[styles.row, { height: 40 }]}>
                    <View style={[styles.cell, { flex: 2, justifyContent: "center" }]}>
                      <Text></Text>
                    </View>
                    <View style={[styles.cell, { flex: 2, justifyContent: "center" }]}>
                      <Text></Text>
                    </View>
                  </View>
                  <View style={[styles.row, { height: 30 }]}>
                    <View style={[styles.cell, { flex: 2, justifyContent: "center" }]}>
                      <Text>Revision No.</Text>
                    </View>
                    <View style={[styles.cell, { flex: 2, justifyContent: "center" }]}>
                      <Text>2.0</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* BOTTOM ROW (Row 3): Knowledge text + ROUTING SLIP + Effectivity */}
              <View style={{ flexDirection: "row", height: 30 }}>
                <View style={[styles.cell, { flex: 6, justifyContent: "center" }]}>
                  <Text>
                    Knowledge Management - Information & Communications Technology - DTRACK-4.0
                  </Text>
                </View>
                <View style={[styles.cell, { flex: 3, justifyContent: "center" }]}>
                  <Text>ROUTING SLIP</Text>
                </View>
                <View style={{ flex: 3, flexDirection: "row" }}>
                  <View style={[styles.cell, { flex: 2, justifyContent: "center" }]}>
                    <Text>Effectivity:</Text>
                  </View>
                  <View style={[styles.cell, { flex: 2, justifyContent: "center" }]}>
                    <Text>March 30, 2015</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Barcode */}
        <View style={styles.barcodeContainer}>
          {barcode ? (
            <Image src={barcode} style={{ width: 200, height: 60 }} />
          ) : (
            <Text>Loading Barcode...</Text>
          )}
          <Text>{doc.route_no}</Text>
        </View>

        {/* Add spacing before the table */}
        <View style={{ marginTop: 15 }} />

        {/* Table Section */}
        <View style={styles.table}>
          {/* Row 1: Originating Office + Date */}
          <View style={{ flexDirection: "row", height: 30 }}>
            <View
              style={[styles.cell, { flex: 11, justifyContent: "flex-start", alignItems: "flex-start" }]}
            >
              <Text style={{ fontWeight: "bold" }}>
                ORIGINATING OFFICE: {doc.depart_from}
              </Text>
            </View>
            <View
              style={[styles.cell, { flex: 3, justifyContent: "flex-start", alignItems: "flex-start" }]}
            >
              <Text style={{ fontWeight: "bold" }}>
                DATE: {formatDate(doc.ts_created_at)}
              </Text>
            </View>
          </View>

          {/* Row 2: Type of Document */}
          <View style={{ flexDirection: "row", height: 30 }}>
            <View
              style={[styles.cell, { flex: 14, justifyContent: "flex-start", alignItems: "flex-start" }]}
            >
              <Text style={{ fontWeight: "bold" }}>
                TYPE OF DOCUMENT: {doc.docs_type}
              </Text>
            </View>
          </View>

          {/* Row 3: Subject */}
          <View style={{ flexDirection: "row", height: 30 }}>
            <View
              style={[styles.cell, { flex: 14, justifyContent: "flex-start", alignItems: "flex-start" }]}
            >
              <Text style={{ fontWeight: "bold" }}>
                SUBJECT: {doc.docs_subject}
              </Text>
            </View>
          </View>


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

          {/* Auto-generated rows */}
          {(() => {
            const rowHeight = 30;     // row height
            const pageHeight = 842;   // A4 height in points
            const headerHeight = 300; // adjust: space taken by logo + top tables
            const footerHeight = 40;  // adjust if footer exists
            const availableHeight = pageHeight - headerHeight - footerHeight;

            const totalRows = Math.floor(availableHeight / rowHeight);

            // Support either one doc or an array of docs
            const rows = Array.isArray(doc.rows) ? doc.rows : [doc];

            const filledRows = rows.slice(0, totalRows); // prevent overflow
            const emptyRows = totalRows - filledRows.length;

            return (
              <>
                {/* Actual Data Rows */}
                {filledRows.map((row, i) => {
                  const createdAt = row.ts_created_at
                    ? new Date(row.ts_created_at).toLocaleDateString("en-US")
                    : "";
                  const dueDate = row.ts_created_at
                    ? new Date(row.ts_created_at).toLocaleDateString("en-US")
                    : "";

                  return (
                    <View key={i} style={{ flexDirection: "row", height: rowHeight }}>
                      <View style={[styles.cell, { flex: 2 }]}>
                        <Text>{createdAt}</Text>
                      </View>
                      <View style={[styles.cell, { flex: 2 }]}>
                        <Text>{row.depart_from}</Text>
                      </View>
                      <View style={[styles.cell, { flex: 2 }]}>
                        <Text>{row.docs_destin}</Text>
                      </View>
                      <View style={[styles.cell, { flex: 4 }]}>
                        <Text>{row.act_taken}</Text>
                      </View>
                      <View style={[styles.cell, { flex: 2 }]}>
                        <Text>{dueDate}</Text>
                      </View>
                      <View style={[styles.cell, { flex: 2 }]}>
                        <Text>{row.depart_user}</Text>
                      </View>
                    </View>
                  );
                })}

                {/* Empty Rows */}
                {Array.from({ length: emptyRows }).map((_, i) => (
                  <View key={`empty-${i}`} style={{ flexDirection: "row", height: rowHeight }}>
                    <View style={[styles.cell, { flex: 2 }]}><Text> </Text></View>
                    <View style={[styles.cell, { flex: 2 }]}><Text> </Text></View>
                    <View style={[styles.cell, { flex: 2 }]}><Text> </Text></View>
                    <View style={[styles.cell, { flex: 4 }]}><Text> </Text></View>
                    <View style={[styles.cell, { flex: 2 }]}><Text> </Text></View>
                    <View style={[styles.cell, { flex: 2 }]}><Text> </Text></View>
                  </View>
                ))}
              </>
            );

          })()}
        </View>
      </Page>
    </Document>
  );
};

export default DTrackPDF;
