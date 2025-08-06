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
import { X, Save } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import AppLogoDepartDiv from "@/components/app-logoDepartDiv";

export function AddDocsTrack({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-xl top-4 !translate-y-0"
        onInteractOutside={e => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AppLogoDepartDiv />
            </div>
            <div>
              <DialogTitle>ADD Department</DialogTitle>
              <DialogDescription className="text-black font-bold">
                Caraga Region Documents Tracking System
              </DialogDescription>
              <DialogDescription>
                Fill in the fields to add a new division.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form>
          <div className="grid gap-4 mt-6">
            {/* Grid row for 3-column layout */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="depart_code">Department Code<strong className="text-red-500">*</strong></Label>
                <Input id="depart_code" name="depart_code" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="doc_type">Division<strong className="text-red-500">*</strong></Label>
                <Select name="doc_type" required>
                  <SelectTrigger id="doc_type" className="w-full">
                    <SelectValue placeholder="Select Division" />
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

            <div className="flex flex-col gap-2">
              <Label htmlFor="depart_name">Department Name<strong className="text-red-500">*</strong></Label>
              <Textarea id="depart_name" name="depart_name" className="w-full min-h-[100px]" />
            </div>


            <div className="flex flex-col gap-2">
              <Label htmlFor="dept_type">Department Type<strong className="text-red-500">*</strong></Label>
              <Select name="dept_type" required>
                <SelectTrigger id="dept_type" className="w-full">
                  <SelectValue placeholder="Select Department Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Department Type</SelectLabel>
                    <SelectItem value="1">Active</SelectItem>
                    <SelectItem value="0">Inactive</SelectItem>

                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

          </div>

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}