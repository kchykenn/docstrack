import * as React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { router, useForm } from "@inertiajs/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowLeft, Send, FileText, MapPin, OctagonAlert } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { RecevDtrack } from "@/types";
import AppLogoRouteDiv from "@/components/app-logoDepartDiv"

interface RouteDocsTrackProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dtrack: RecevDtrack;
  docstype: string;
  autoRouteNo: string;
  autoDocsConNo: string;
  autoOfficeConNo: string;
  departments: { id: number; depart_name: string }[];
  acttype: { id: number; act_name: string }[];
  departName: string;
  departUser: string;
}

export function RouteDocsTrack({
  open,
  onOpenChange,
  dtrack,
  docstype,
  autoRouteNo,
  autoDocsConNo,
  autoOfficeConNo,
  departName,
  departUser,
  departments,
  acttype,
}: RouteDocsTrackProps) {
  const [step, setStep] = useState(1);
  const { data, setData, post, reset, errors, processing } = useForm({
    route_no: dtrack?.route_no || autoRouteNo,
    docs_con_no: dtrack?.docs_con_no || autoDocsConNo,
    office_con_no: dtrack?.office_con_no || autoOfficeConNo,
    docs_subject: dtrack?.docs_subject || "",
    docs_type: dtrack?.docs_type || docstype,
    docs_destin: "",
    act_taken: "",
    depart_from: departName,
    depart_user: dtrack?.depart_user || departUser,
    remarks: dtrack?.remarks || "",
    seq_no: "yes",
  })

  const [alertOpen, setAlertOpen] = useState(false)
  const [errorAlertOpen, setErrorAlertOpen] = useState(false)
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({})

  // ✅ keep only one handleNextConfirm with validation
  const handleNextConfirm = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}
    if (!data.docs_destin) newErrors.docs_destin = "Destination Office is required"
    if (!data.act_taken) newErrors.act_taken = "Action Taken is required"

    setLocalErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setStep(3)
    }
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleBackStep = () => setStep(step - 1);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    post("/dtracks/recev/store", {
      onSuccess: () => {
        reset()
        onOpenChange(false)
        setAlertOpen(true)
      },
      onError: () => {
        onOpenChange(false)
        setErrorAlertOpen(true)

      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <DialogContent className="sm:max-w-4xl top-4 !translate-y-0" onInteractOutside={(e) => e.preventDefault()}>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <AppLogoRouteDiv />
                  </div>
                  <div>
                    <DialogTitle>Route Document</DialogTitle>
                    <DialogDescription className="text-black font-bold">
                      Caraga Region Documents Tracking System
                    </DialogDescription>
                    <DialogDescription>
                      {step === 1 && "Fill in the fields to add a new document."}
                      {step === 2 && "Select destination for this document."}
                      {step === 3 && "Confirm submission before routing this document."}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Stepper */}
              <div className="flex items-center justify-center gap-8 mb-4">
                <div className="flex flex-col items-center">
                  <FileText className={`w-8 h-8 ${step >= 1 ? "text-blue-600" : "text-gray-400"}`} />
                  <span className={`mt-2 text-sm font-semibold ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>Document Info</span>
                </div>
                <div className={`w-12 h-1 rounded ${step >= 2 ? "bg-blue-600" : "bg-gray-300"}`}></div>
                <div className="flex flex-col items-center">
                  <MapPin className={`w-8 h-8 ${step >= 2 ? "text-blue-600" : "text-gray-400"}`} />
                  <span className={`mt-2 text-sm font-semibold ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>Destination</span>
                </div>
                <div className={`w-12 h-1 rounded ${step >= 3 ? "bg-blue-600" : "bg-gray-300"}`}></div>
                <div className="flex flex-col items-center">
                  <CheckCircle className={`w-8 h-8 ${step >= 3 ? "text-blue-600" : "text-gray-400"}`} />
                  <span className={`mt-2 text-sm font-semibold ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>Confirm</span>
                </div>
              </div>

              {/* Step 1: Document Info */}
              {step === 1 && (
                <form onSubmit={handleNextStep}>
                  <div className="grid gap-4 mt-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="route_no">Route No.<strong className="text-red-500">*</strong></Label>
                        <Input id="route_no" name="route_no" value={data.route_no} readOnly className="bg-gray-100 cursor-not-allowed" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="docs_con_no">Document Control No.<strong className="text-red-500">*</strong></Label>
                        <Input id="docs_con_no" name="docs_con_no" value={data.docs_con_no} readOnly className="bg-gray-100 cursor-not-allowed" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="office_con_no">Office Control No.<strong className="text-red-500">*</strong></Label>
                        <Input id="office_con_no" name="office_con_no" value={data.office_con_no} readOnly className="bg-gray-100 cursor-not-allowed" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="docs_subject">Subject<strong className="text-red-500">*</strong></Label>
                      <Input id="docs_subject" name="docs_subject" value={data.docs_subject} readOnly className="bg-gray-100 cursor-not-allowed" onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="docs_type">Document Type<strong className="text-red-500">*</strong></Label>
                        <Input id="docs_type" name="docs_type" value={data.docs_type} readOnly className="bg-gray-100 cursor-not-allowed" onChange={handleChange} />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label>
                          Sequence No.<strong className="text-red-500">*</strong>
                        </Label>
                        <div className="flex gap-4 items-center">
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="seq_no"
                              value="yes"
                              checked={data.seq_no === "yes"}
                              onChange={handleRadioChange}
                              className="accent-blue-600"
                            />
                            Yes
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="seq_no"
                              value="no"
                              checked={data.seq_no === "no"}
                              onChange={handleRadioChange}
                              className="accent-blue-600"
                            />
                            No
                          </label>
                        </div>
                      </div>

                    </div>
                  </div>

                  <DialogFooter className="mt-8">
                    <DialogClose asChild>
                      <Button variant="outline" type="button">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit">
                      <Send className="w-4 h-4 mr-2" /> Next
                    </Button>
                  </DialogFooter>
                </form>
              )}

              {/* Step 2: Destination */}
              {step === 2 && (
                <form onSubmit={handleNextConfirm}>
                  <div className="grid gap-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label>Destination Office<strong className="text-red-500">*</strong></Label>
                        <Select value={data.docs_destin} onValueChange={(value) => setData({ ...data, docs_destin: value })}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Destination Office" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Departments</SelectLabel>
                              {departments.map((dept) => (
                                <SelectItem key={dept.id} value={dept.depart_name}>{dept.depart_name}</SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {(errors.docs_destin || localErrors.docs_destin) && (
                          <p className="text-red-500 text-xs">{errors.docs_destin || localErrors.docs_destin}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Action Taken<strong className="text-red-500">*</strong></Label>
                        <Select value={data.act_taken} onValueChange={(value) => setData({ ...data, act_taken: value })}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Action Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Actions Taken</SelectLabel>
                              {acttype.map((act) => (
                                <SelectItem key={act.id} value={act.act_name}>{act.act_name}</SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {(errors.act_taken || localErrors.act_taken) && (
                          <p className="text-red-500 text-xs">{errors.act_taken || localErrors.act_taken}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Department User From.<strong className="text-red-500">*</strong></Label>
                      <Input value={data.depart_from} readOnly className="bg-gray-100 cursor-not-allowed" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Department User<strong className="text-red-500">*</strong></Label>
                      <Input value={data.depart_user} readOnly className="bg-gray-100 cursor-not-allowed" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Remarks</Label>
                      <textarea
                        value={data.remarks}
                        onChange={(e) => setData({ ...data, remarks: e.target.value })}
                        placeholder="Remarks Here..."
                        className="w-full rounded-md border border-gray-300 p-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                  </div>

                  <DialogFooter className="mt-8">
                    <Button variant="outline" type="button" onClick={handleBackStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button type="submit">
                      <Send className="w-4 h-4 mr-2" /> Next
                    </Button>
                  </DialogFooter>
                </form>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="flex flex-col items-center justify-center min-h-[250px]">
                  {/* Fixed container prevents jump */}
                  <div className="w-15 h-15 flex items-center justify-center">
                    <AnimatePresence>
                      {processing ? (
                        <motion.div
                          key="spinner"
                          initial={{ rotate: 0 }} // <-- make sure it starts at 0
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-16 h-16 rounded-full border-[4px] border-blue-600 border-t-transparent box-border"
                          style={{ aspectRatio: "1 / 1" }} // <-- always force perfect circle
                        />
                      ) : (
                        <motion.div
                          key="icon"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <OctagonAlert className="w-full h-full text-red-600" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <h2 className="text-lg font-bold mb-2 text-center">
                    Are you sure you want to route this document?
                  </h2>
                  <p className="text-gray-600 mb-6 text-center">
                    Please confirm your submission.
                  </p>

                  <DialogFooter className="flex justify-center gap-4">
                    <Button variant="outline" onClick={handleBackStep} disabled={processing}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={processing}
                      className="bg-blue-600 text-white"
                    >
                      <Send className="w-4 h-4 mr-2" /> Yes, Route Document
                    </Button>
                  </DialogFooter>
                </div>
              )}

            </DialogContent>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Alert */}
      {alertOpen && (
        <Dialog open={alertOpen} onOpenChange={setAlertOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5 text-green-600" /> Success
              </DialogTitle>
              <DialogDescription>
                <span className="block text-xl font-bold">
                  Received Document Routed Successfully!
                </span>
                <span className="block text-sm text-gray-700">
                  All data with this route number marked as end Transaction!
                </span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  setAlertOpen(false);
                  router.visit("/dtracks/recev", {
                    onFinish: () => window.location.reload(),
                  });
                }}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Okay
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Error Alert */}
      {errorAlertOpen && (
        <Dialog open={errorAlertOpen} onOpenChange={setErrorAlertOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-red-600">⚠️ Error</DialogTitle>
              <DialogDescription>
                Failed to route document! Please check required fields.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setErrorAlertOpen(false)}>Okay</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
