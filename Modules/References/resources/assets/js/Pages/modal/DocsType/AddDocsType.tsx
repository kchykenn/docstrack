import * as React from "react";
import { useForm, router } from "@inertiajs/react";
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
import { X, Save } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AppLogoDepartDiv from "@/components/app-logoDepartDiv";

export function AddDocsType({ open, onOpenChange, autoDocsCode }: { open: boolean, onOpenChange: (open: boolean) => void, autoDocsCode: string }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    docs_code: autoDocsCode || "",
    docs_name: "",
    docs_stat: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post('/storeDocsType', {
      onSuccess: () => {
        alert("Document Type Added successfully!");
        reset();
        onOpenChange(false);
        router.visit('/addDocsType');
      },
    });
  };

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
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="docs_code">Document Code<strong className="text-red-500">*</strong></Label>
                <Input
                  id="docs_code"
                  name="docs_code"
                  value={data.docs_code}
                  readOnly
                  className="bg-gray-100"
                />
                {errors.docs_code && <span className="text-sm text-red-500">{errors.docs_code}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="docs_name">Document Type Name<strong className="text-red-500">*</strong></Label>
              <Textarea
                id="docs_name"
                name="docs_name"
                value={data.docs_name}
                onChange={(e) => setData("docs_name", e.target.value)}
                className="w-full min-h-[100px]"
              />
              {errors.docs_name && <span className="text-sm text-red-500">{errors.docs_name}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="docs_stat">Document Status<strong className="text-red-500">*</strong></Label>
              <Select
                name="docs_stat"
                value={data.docs_stat}
                onValueChange={(value) => setData("docs_stat", value)}
                required
              >
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
              {errors.docs_stat && <span className="text-sm text-red-500">{errors.docs_stat}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="docs_name">Document Type Name<strong className="text-red-500">*</strong></Label>
              <Textarea
                id="docs_name"
                name="docs_name"
                value={data.docs_name}
                onChange={(e) => setData("docs_name", e.target.value)}
                className="w-full min-h-[100px]"
              />
              {errors.docs_name && <span className="text-sm text-red-500">{errors.docs_name}</span>}
            </div>
            
          </div>

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={processing}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}