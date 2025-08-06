import * as React from "react";
import { useForm } from "@inertiajs/react";

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
import { X, Save } from "lucide-react";
import AppLogoDepartDiv from "@/components/app-logoDepartDiv";

export function AddDivision({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    depart_code:"",
    depart_name: "",
    div_stat: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('storeDivision.storeDiv'), {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl top-4 !translate-y-0" onInteractOutside={e => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AppLogoDepartDiv />
            </div>
            <div>
              <DialogTitle>ADD Division</DialogTitle>
              <DialogDescription className="text-black font-bold">
                Caraga Region Documents Tracking System
              </DialogDescription>
              <DialogDescription>
                Fill in the fields to add a new division.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="depart_code">Division Code<strong className="text-red-500">*</strong></Label>
                <Input
                  id="depart_code"
                  name="depart_code"
                  value={data.depart_code}
                  onChange={(e) => setData("depart_code", e.target.value)}
                  readOnly
                  className="bg-gray-100"
                />
                {errors.depart_code && <span className="text-sm text-red-500">{errors.depart_code}</span>}
              </div>
              <div className="flex flex-col gap-2" />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="depart_name">Division Name<strong className="text-red-500">*</strong></Label>
              <Textarea
                id="depart_name"
                name="depart_name"
                className="w-full min-h-[100px]"
                value={data.depart_name}
                onChange={(e) => setData("depart_name", e.target.value)}
              />
              {errors.depart_name && <span className="text-sm text-red-500">{errors.depart_name}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="div_stat">Division Status<strong className="text-red-500">*</strong></Label>
              <Select
                value={data.div_stat}
                onValueChange={(value) => setData("div_stat", value)}
              >
                <SelectTrigger id="div_stat" className="w-full">
                  <SelectValue placeholder="Select Division Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="1">Active</SelectItem>
                    <SelectItem value="0">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.div_stat && <span className="text-sm text-red-500">{errors.div_stat}</span>}
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
