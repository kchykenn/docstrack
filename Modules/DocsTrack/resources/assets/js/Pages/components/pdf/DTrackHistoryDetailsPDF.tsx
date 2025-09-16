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
  page: { flexDirection: "column", padding: 20, fontSize: 8 },
  table: { display: "table", width: "100%", borderWidth: 0.5 },
  row: { flexDirection: "row" },
  cell: {
    borderWidth: 0.5,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  logo: { width: 60, height: 60 },
  title: { fontSize: 12, fontWeight: "bold", textAlign: "center" },
  barcodeContainer: {
    marginTop: 12,
    alignItems: "center",
    textAlign: "center",
  },
  section: { marginTop: 12, marginBottom: 8 },
});

interface Props {
  data: Dtrack;
}

const DTrackHistoryDetailsPDF: React.FC<Props> = ({ data }) => {
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

  const getIsoColor = (tsCreated?: string, dateReceived?: string) => {
    if (!tsCreated || !dateReceived) return "#000000";

    const routed = new Date(tsCreated);
    const received = new Date(dateReceived);

    if (isNaN(routed.getTime()) || isNaN(received.getTime())) return "#000000";

    const diffTime = Math.abs(received.getTime() - routed.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 2) return "#008000";
    if (diffDays == 3) return "#FFA500";
    if (diffDays > 3)  return "#FF0000";
  };

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* HEADER */}
        <View style={styles.table}>
          <View style={styles.row}>
            <View
              style={[
                styles.cell,
                {
                  flex: 2,
                  height: 80,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Image src={logo} style={{ width: 60, height: 60 }} />
            </View>
            <View style={{ flex: 8, flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={[
                    styles.cell,
                    {
                      flex: 9,
                      height: 50,
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
                  <View style={[styles.row, { height: 20 }]}>
                    <View style={[styles.cell, { flex: 2 }]}>
                      <Text></Text>
                    </View>
                    <View style={[styles.cell, { flex: 2 }]}>
                      <Text></Text>
                    </View>
                  </View>
                  <View style={[styles.row, { height: 30 }]}>
                    <View style={[styles.cell, { flex: 2 }]}>
                      <Text>Revision No.</Text>
                    </View>
                    <View style={[styles.cell, { flex: 2 }]}>
                      <Text>2.0</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: "row", height: 30 }}>
                <View style={[styles.cell, { flex: 6 }]}>
                  <Text>Knowledge Management - ICT - DTRACK-4.0</Text>
                </View>
                <View style={[styles.cell, { flex: 3 }]}>
                  <Text>Documents Tracking History</Text>
                </View>
                <View style={{ flex: 3, flexDirection: "row" }}>
                  <View style={[styles.cell, { flex: 2 }]}>
                    <Text>Effectivity:</Text>
                  </View>
                  <View style={[styles.cell, { flex: 2 }]}>
                    <Text>March 30, 2015</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* BARCODE */}
        <View style={styles.barcodeContainer}>
          {barcode ? (
            <Image src={barcode} style={{ width: 200, height: 60 }} />
          ) : (
            <Text>Loading Barcode...</Text>
          )}
          <Text>{firstRecord?.route_no}</Text>
        </View>

        <View style={{ marginTop: 10 }} />
        {/* NEW TABLE HEADER */}
        <View style={{ flexDirection: "row", height: 25 }}>
          <View style={[styles.cell, { flex: 20 }]}>
            <Text style={{ fontWeight: "bold" }}>ROUTE NUMBER HISTORY DETAILS</Text>
            <Text style={{ fontWeight: "bold" }}>ORIGINATING OFFICE: {firstRecord.depart_from}</Text>
          </View>
        </View>

        {/* NEW TABLE HEADER */}
        <View style={{ flexDirection: "row", height: 25 }}>
          <View style={[styles.cell, { flex: 2 }]}>
            <Text style={{ fontWeight: "bold" }}>DATE ROUTED</Text>
          </View>
          <View style={[styles.cell, { flex: 2 }]}>
            <Text style={{ fontWeight: "bold" }}>RN CODE</Text>
          </View>
          <View style={[styles.cell, { flex: 4 }]}>
            <Text style={{ fontWeight: "bold" }}>SUBJECT</Text>
          </View>
          <View style={[styles.cell, { flex: 2 }]}>
            <Text style={{ fontWeight: "bold" }}>FROM</Text>
          </View>
          <View style={[styles.cell, { flex: 2 }]}>
            <Text style={{ fontWeight: "bold" }}>TO</Text>
          </View>
          <View style={[styles.cell, { flex: 2 }]}>
            <Text style={{ fontWeight: "bold" }}>DATE RECEIVED</Text>
          </View>
          <View style={[styles.cell, { flex: 2 }]}>
            <Text style={{ fontWeight: "bold" }}>DATE RE-ROUTED</Text>
          </View>
          <View style={[styles.cell, { flex: 2 }]}>
            <Text style={{ fontWeight: "bold" }}>DATE END/FINISH</Text>
          </View>
          <View style={[styles.cell, { flex: 2 }]}>
            <Text style={{ fontWeight: "bold" }}>ISO ACT</Text>
          </View>
        </View>

        {/* ROWS */}
        {sortedRows.map((row, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              height: 25,
              backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#e6e6e6",
            }}
          >
            <View style={[styles.cell, { flex: 2 }]}>
              <Text>{formatDate(row.ts_created_at)}</Text>
            </View>
            <View style={[styles.cell, { flex: 2 }]}>
              <Text>{row.route_no}</Text>
            </View>
            <View style={[styles.cell, { flex: 4 }]}>
              <Text>{row.docs_subject}</Text>
            </View>
            <View style={[styles.cell, { flex: 2 }]}>
              <Text>{row.depart_from}</Text>
            </View>
            <View style={[styles.cell, { flex: 2 }]}>
              <Text>{row.docs_destin}</Text>
            </View>
            <View style={[styles.cell, { flex: 2 }]}>
              <Text>{formatDate((row as any).date_received)}</Text>
            </View>
            <View style={[styles.cell, { flex: 2 }]}>
              <Text>{formatDate((row as any).date_rerouted)}</Text>
            </View>
            <View style={[styles.cell, { flex: 2 }]}>
              <Text>{formatDate((row as any).date_end)}</Text>
            </View>
            <View
              style={[
                styles.cell,
                {
                  flex: 2,
                  backgroundColor: getIsoColor(row.ts_created_at, (row as any).date_received),
                },
              ]}
            >
              <Text style={{ fontWeight: "bold", color: "#fff" }}>
                {(row as any).iso_act}
              </Text>
            </View>
          </View>
        ))}
        {/* LEGEND */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>ISO ACT Legends:</Text>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <View style={{ width: 15, height: 15, backgroundColor: "#008000", marginRight: 5 }} />
            <Text>1–2 days (Green)</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <View style={{ width: 15, height: 15, backgroundColor: "#FFA500", marginRight: 5 }} />
            <Text>3 days (Orange)</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 3 }}>
            <View style={{ width: 15, height: 15, backgroundColor: "#FF0000", marginRight: 5 }} />
            <Text>More than 3 days (Red)</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DTrackHistoryDetailsPDF;
