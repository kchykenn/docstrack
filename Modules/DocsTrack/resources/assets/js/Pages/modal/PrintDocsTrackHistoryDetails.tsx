"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dtrack } from "@/types";
import { PDFViewer } from "@react-pdf/renderer";
import DTrackHistoryDetailsPDF from "../components/pdf/DTrackHistoryDetailsPDF";
import { router } from "@inertiajs/react";

interface PrintDocsTrackHistoryDetailsProps {
  open: boolean;
  onClose: () => void;
  data: Dtrack | null;
}

export const PrintDocsTrackHistoryDetails: React.FC<PrintDocsTrackHistoryDetailsProps> = ({
  open,
  onClose,
  data,
}) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      router.visit("/dtracks", {
        onFinish: () => window.location.reload(),
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-7xl max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="p-4">
          <DialogTitle className="sr-only"></DialogTitle>
        </DialogHeader>

        {data ? (
          <div className="h-[100vh] w-full">
            <PDFViewer width="100%" height="100%">
              <DTrackHistoryDetailsPDF data={data} />
            </PDFViewer>
          </div>
        ) : (
          <p className="p-4">No document selected.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PrintDocsTrackHistoryDetails;
