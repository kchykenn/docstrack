import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { AddDtrack } from "@/types";
import { PDFViewer } from "@react-pdf/renderer";
import DTrackPDF from "../components/pdf/DTrackPDF";

interface PrintDocsTrackProps {
  open: boolean;
  onClose: () => void;
  doc: AddDtrack | null;
}

export const PrintDocsTrack: React.FC<PrintDocsTrackProps> = ({
  open,
  onClose,
  doc,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="p-4">
          {/* <DialogTitle>Print Form</DialogTitle> */}
        </DialogHeader>

        {doc ? (
          <div className="h-[100vh] w-full">
            <PDFViewer width="100%" height="100%">
              <DTrackPDF doc={doc} />
            </PDFViewer>
          </div>
        ) : (
          <p className="p-4">No document selected.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};
