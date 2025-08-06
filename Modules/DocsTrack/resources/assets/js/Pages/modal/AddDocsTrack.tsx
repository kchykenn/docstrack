import * as React from "react"
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

export function AddDocsTrack({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-4xl top-4 !translate-y-0"
        onInteractOutside={e => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add Document</DialogTitle>
          <DialogDescription>
            Fill in the fields to add a new document.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4 mt-6">
            {/* Grid row for 3-column layout */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="route_no">Route No.<strong className="text-red-500">*</strong></Label>
                <Input id="route_no" name="route_no" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Document Control No.<strong className="text-red-500">*</strong></Label>
                <Input id="name" name="name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="desc">Office Control No.<strong className="text-red-500">*</strong></Label>
                <Input id="desc" name="desc" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="subject">Subject<strong className="text-red-500">*</strong></Label>
              <Textarea id="subject" name="subject" className="w-full min-h-[100px]" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="ref_doc_con_no">Reference Document Control No.</Label>
              <Input id="ref_doc_con_no" name="ref_doc_con_no" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="doc_type">Document Type<strong className="text-red-500">*</strong></Label>
              <Select name="doc_type" required>
                <SelectTrigger id="doc_type" className="w-full">
                  <SelectValue placeholder="Select Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Docs Type</SelectLabel>
                    <SelectItem value="memo">Memo</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                    {/* Add more SelectItem as needed */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

          </div>

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}