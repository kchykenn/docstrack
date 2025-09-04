import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PrintDocsTrackProps {
  open: boolean;
  onClose: () => void;
  doc: any | null;
}

export const PrintDocsTrack: React.FC<PrintDocsTrackProps> = ({
  open,
  onClose,
  doc,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-screen h-screen max-w-none mt-0 bg-gray-100 rounded-none"
        style={{ transform: "translateY(0)" }}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Print Form</DialogTitle>
        </DialogHeader>

        {doc ? (
          <Card className="w-full max-w-6xl mx-auto shadow-lg border">
            <CardHeader>
              <CardTitle className="text-center">
                Document Tracking Information System (DTRAK)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-lg font-bold uppercase">
                    Document Tracking Information System (DTRAK)
                  </h1>
                  <p className="text-sm">
                    Knowledge Management - Information & Communications
                    Technology - DTRAK-3.0
                  </p>
                  <p className="text-sm font-semibold">Routing Slip</p>
                </div>
                <div className="text-right text-sm">
                  <p>
                    <strong>Revision No:</strong> 2.0
                  </p>
                  <p>
                    <strong>Effectivity:</strong> March 30, 2015
                  </p>
                </div>
              </div>

              {/* Barcode + Route */}
              <div className="text-center mb-6">
                <div className="h-12 w-64 bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                  [Barcode here]
                </div>
                <p className="font-semibold">{doc.route_no}</p>
              </div>

              {/* Originating Office */}
              <div className="grid grid-cols-2 gap-4 border border-gray-400 p-3 mb-4">
                <p>
                  <strong>Originating Office:</strong> {doc.office_con_no}
                </p>
                <p className="text-right">
                  <strong>Date:</strong> {doc.date ?? "____"}
                </p>
              </div>

              {/* Document Info */}
              <div className="border border-gray-400 p-3 mb-4">
                <p>
                  <strong>Type of Document:</strong> {doc.docs_type}
                </p>
                <p>
                  <strong>Subject:</strong> {doc.docs_subject}
                </p>
              </div>

              {/* Table */}
              <table className="w-full border border-gray-400 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1">DATE</th>
                    <th className="border px-2 py-1">FROM</th>
                    <th className="border px-2 py-1">TO</th>
                    <th className="border px-2 py-1">
                      ACTION REQUIRED / ACTION TAKEN / REMARKS
                    </th>
                    <th className="border px-2 py-1">DUE DATE</th>
                    <th className="border px-2 py-1">NAME</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1">{doc.date}</td>
                    <td className="border px-2 py-1">{doc.from_office}</td>
                    <td className="border px-2 py-1">{doc.to_office}</td>
                    <td className="border px-2 py-1">{doc.remarks}</td>
                    <td className="border px-2 py-1">{doc.due_date}</td>
                    <td className="border px-2 py-1"></td>
                  </tr>
                  {/* empty rows for continuation */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i}>
                      <td className="border px-2 py-6">&nbsp;</td>
                      <td className="border px-2 py-6"></td>
                      <td className="border px-2 py-6"></td>
                      <td className="border px-2 py-6"></td>
                      <td className="border px-2 py-6"></td>
                      <td className="border px-2 py-6"></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Footer */}
              <div className="text-xs text-right mt-4">
                192.168.5.3/otis/docregistryprint.php?route_no={doc.route_no}
              </div>
            </CardContent>
          </Card>
        ) : (
          <p>No document selected.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};
