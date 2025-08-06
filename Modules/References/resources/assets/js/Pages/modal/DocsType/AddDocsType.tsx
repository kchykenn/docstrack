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

export function AddDocsType({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
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
              <DialogTitle>ADD Docs Type</DialogTitle>
              <DialogDescription className="text-black font-bold">
                Caraga Region Documents Tracking System
              </DialogDescription>
              <DialogDescription>
                Fill in the fields to add a new Docs Type.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form>
          <div className="grid gap-4 mt-6">
            {/* Grid row for 3-column layout */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="docs_code">Document Code<strong className="text-red-500">*</strong></Label>
                <Input id="docs_code" name="docs_code" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="docs_type">Document Type Name<strong className="text-red-500">*</strong></Label>
              <Textarea id="docs_type" name="docs_type" className="w-full min-h-[100px]" />
            </div>


            <div className="flex flex-col gap-2">
              <Label htmlFor="docs_stat">Document Status<strong className="text-red-500">*</strong></Label>
              <Select name="docs_stat" required>
                <SelectTrigger id="docs_stat" className="w-full">
                  <SelectValue placeholder="Select Document Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Document Status</SelectLabel>
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