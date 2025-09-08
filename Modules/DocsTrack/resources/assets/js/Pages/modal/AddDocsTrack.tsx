import * as React from "react"
import { useForm, router } from "@inertiajs/react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  X,
  Save,
  FileText,
  MapPin,
  CheckCircle,
  ArrowLeft,
  OctagonAlert,
  Send,
} from "lucide-react"
import AppLogoDepartDiv from "@/components/app-logoDepartDiv"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AddDocsTrack({
  open,
  onOpenChange,
  docstype,
  autoRouteNo,
  autoDocsConNo,
  autoOfficeConNo,
  departments,
  departName,
  departUser,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  docstype: { id: number; docs_code: string; docs_name: string; docs_stat: string }[],
  autoRouteNo: string
  autoDocsConNo: string
  autoOfficeConNo: string
  departments: { id: number; depart_name: string }[],
  departName: string
  departUser: string
}) {
  const [step, setStep] = React.useState(1)

  const { data, setData, post, reset, errors, processing } = useForm({
    route_no: autoRouteNo || "",
    docs_con_no: autoDocsConNo || "",
    office_con_no: autoOfficeConNo || "",
    docs_subject: "",
    docs_type: "",
    seq_no: "yes",
    docs_destin: "",
    remarks: "",
    depart_from: departName || "",
    depart_user: departUser || "",
  })

  const [alertOpen, setAlertOpen] = React.useState(false)
  const [errorAlertOpen, setErrorAlertOpen] = React.useState(false)

  const [localErrors, setLocalErrors] = React.useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(e.target.name as keyof typeof data, e.target.value)
  }

  const handleSelectChange = (value: string) => {
    setData("docs_type", value)
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData("seq_no", e.target.value)
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}

    if (!data.route_no) newErrors.route_no = "Route No. is required"
    if (!data.docs_con_no) newErrors.docs_con_no = "Document Control No. is required"
    if (!data.office_con_no) newErrors.office_con_no = "Office Control No. is required"
    if (!data.docs_subject) newErrors.docs_subject = "Subject is required"
    if (!data.docs_type) newErrors.docs_type = "Document Type is required"

    setLocalErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setStep(2)
    }
  }

  const handleNextConfirm = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}
    if (!data.docs_destin) newErrors.docs_destin = "Destination Office is required"

    setLocalErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setStep(3)
    }
  }

  const handleBackStep = () => setStep((prev) => Math.max(1, prev - 1))

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    post("/dtracks/store", {
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
                    <AppLogoDepartDiv />
                  </div>
                  <div>
                    <DialogTitle>Add Document Details</DialogTitle>
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
                  <span className={`mt-2 text-sm font-semibold ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                    Document Info
                  </span>
                </div>
                <div className={`w-12 h-1 rounded ${step >= 2 ? "bg-blue-600" : "bg-gray-300"}`}></div>
                <div className="flex flex-col items-center">
                  <MapPin className={`w-8 h-8 ${step >= 2 ? "text-blue-600" : "text-gray-400"}`} />
                  <span className={`mt-2 text-sm font-semibold ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                    Destination
                  </span>
                </div>
                <div className={`w-12 h-1 rounded ${step >= 3 ? "bg-blue-600" : "bg-gray-300"}`}></div>
                <div className="flex flex-col items-center">
                  <CheckCircle className={`w-8 h-8 ${step >= 3 ? "text-blue-600" : "text-gray-400"}`} />
                  <span className={`mt-2 text-sm font-semibold ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
                    Confirm
                  </span>
                </div>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <form onSubmit={handleNextStep}>
                  <div className="grid gap-4 mt-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="route_no">
                          Route No.<strong className="text-red-500">*</strong>
                        </Label>
                        <Input
                          id="route_no"
                          name="route_no"
                          value={data.route_no}
                          readOnly
                          className="bg-gray-100 cursor-not-allowed"
                        />
                        {(errors.route_no || localErrors.route_no) && (
                          <p className="text-red-500 text-xs">{errors.route_no || localErrors.route_no}</p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="docs_con_no">
                          Document Control No.<strong className="text-red-500">*</strong>
                        </Label>
                        <Input
                          id="docs_con_no"
                          name="docs_con_no"
                          value={data.docs_con_no}
                          readOnly
                          className="bg-gray-100 cursor-not-allowed"
                        />
                        {(errors.docs_con_no || localErrors.docs_con_no) && (
                          <p className="text-red-500 text-xs">{errors.docs_con_no || localErrors.docs_con_no}</p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="office_con_no">
                          Office Control No.<strong className="text-red-500">*</strong>
                        </Label>
                        <Input
                          id="office_con_no"
                          name="office_con_no"
                          value={data.office_con_no}
                          readOnly
                          className="bg-gray-100 cursor-not-allowed"
                        />
                        {(errors.office_con_no || localErrors.office_con_no) && (
                          <p className="text-red-500 text-xs">{errors.office_con_no || localErrors.office_con_no}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="docs_subject">Subject<strong className="text-red-500">*</strong></Label>
                      <Textarea
                        id="docs_subject"
                        name="docs_subject"
                        className="w-full min-h-[100px]"
                        value={data.docs_subject}
                        onChange={handleChange}
                        autoFocus
                      />
                      {(errors.docs_subject || localErrors.docs_subject) && (
                        <p className="text-red-500 text-xs">{errors.docs_subject || localErrors.docs_subject}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="docs_type">Document Type<strong className="text-red-500">*</strong></Label>
                        <Select value={data.docs_type} onValueChange={handleSelectChange}>
                          <SelectTrigger id="docs_type" className="w-full">
                            <SelectValue placeholder="Select Document Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select Docs Type</SelectLabel>
                              {docstype.map((type) => (
                                <SelectItem key={type.id} value={type.docs_name}>
                                  {type.docs_name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {(errors.docs_type || localErrors.docs_type) && (
                          <p className="text-red-500 text-xs">{errors.docs_type || localErrors.docs_type}</p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label>Sequence No.<strong className="text-red-500">*</strong></Label>
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
                        <X className="w-4 h-4 mr-2" /> Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit">
                      <Save className="w-4 h-4 mr-2" /> Add Destination
                    </Button>
                  </DialogFooter>
                </form>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <form onSubmit={handleNextConfirm}>
                  <div className="grid gap-4 mt-6">
                    {/* Destination Office */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="docs_destin">
                        Destination Office<strong className="text-red-500">*</strong>
                      </Label>
                      <Select
                        value={data.docs_destin}
                        onValueChange={(value) => setData("docs_destin", value)}
                      >
                        <SelectTrigger id="docs_destin" className="w-full">
                          <SelectValue placeholder="Select Destination Office" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Departments</SelectLabel>
                            {departments.map((dept) => (
                              <SelectItem key={dept.id} value={dept.depart_name}>
                                {dept.depart_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {(errors.docs_destin || localErrors.docs_destin) && (
                        <p className="text-red-500 text-xs">
                          {errors.docs_destin || localErrors.docs_destin}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="depart_from">
                        Department User From.<strong className="text-red-500">*</strong>
                      </Label>
                      <Input
                        id="depart_from"
                        name="depart_from"
                        value={data.depart_from}
                        readOnly
                        className="bg-gray-100 cursor-not-allowed"
                      />
                      {(errors.depart_from || localErrors.depart_from) && (
                        <p className="text-red-500 text-xs">{errors.depart_from || localErrors.depart_from}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="depart_user">
                        Department User<strong className="text-red-500">*</strong>
                      </Label>
                      <Input
                        id="depart_user"
                        name="depart_user"
                        value={data.depart_user
                          .split(' ')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                        readOnly
                        className="bg-gray-100 cursor-not-allowed"
                      />
                      {(errors.depart_user || localErrors.depart_user) && (
                        <p className="text-red-500 text-xs">{errors.depart_user || localErrors.depart_user}</p>
                      )}
                    </div>

                    {/* Remarks */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="remarks">Remarks</Label>
                      <textarea
                        id="remarks"
                        value={data.remarks}
                        onChange={(e) => setData("remarks", e.target.value)}
                        placeholder="Remarks Here..."
                        className="w-full rounded-md border border-gray-300 p-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                      {errors.remarks && (
                        <p className="text-red-500 text-xs">{errors.remarks}</p>
                      )}
                    </div>
                  </div>

                  <DialogFooter className="mt-8">
                    <Button variant="outline" type="button" onClick={handleBackStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button type="submit">
                      <Save className="w-4 h-4 mr-2" /> Confirm
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
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Success
            </AlertDialogTitle>
            <AlertDialogDescription>
              Document Routed Successfully! Click okay to proceed to add another document.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  setAlertOpen(false)
                  router.visit("/dtracks/create")
                }}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Okay
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Alert */}
      <AlertDialog open={errorAlertOpen} onOpenChange={setErrorAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">⚠️ Error</AlertDialogTitle>
            <AlertDialogDescription>
              Failed to route document. Please check required fields or make sure values are unique.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setErrorAlertOpen(false)}>
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </Dialog>
  )
}
