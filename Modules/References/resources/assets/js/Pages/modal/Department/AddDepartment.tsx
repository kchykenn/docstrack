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

export function AddDocsTrack({
  open,
  onOpenChange,
  divisions = [],
  autoDepartCode = "",
}: {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  divisions: { id: number, division_name: string }[],
  autoDepartCode?: string
}) {
  const { data, setData, post, processing, reset, errors } = useForm({
    depart_code: autoDepartCode,
    division_name: "",
    depart_name: "",
    depart_stat: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post('/storeDepart', {
      onSuccess: () => {
        alert("Department added successfully!");
        reset();
        onOpenChange(false);
        router.visit('/addDepartment');
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
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="depart_code">Department Code<strong className="text-red-500">*</strong></Label>
                <Input
                  id="depart_code"
                  name="depart_code"
                  value={data.depart_code}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="division_name">Division<strong className="text-red-500">*</strong></Label>
                <Select
                  name="division_name"
                  value={data.division_name}
                  onValueChange={(value) => setData("division_name", value)}
                  required
                >
                  <SelectTrigger id="division_name" className="w-full">
                    <SelectValue placeholder="Select Division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Division</SelectLabel>
                      {divisions.map((division) => (
                        <SelectItem key={division.id} value={division.division_name}>
                          {division.division_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.division_name && <span className="text-sm text-red-500">{errors.division_name}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="depart_name">Department Name<strong className="text-red-500">*</strong></Label>
              <Textarea
                id="depart_name"
                name="depart_name"
                value={data.depart_name}
                onChange={(e) => setData("depart_name", e.target.value.toUpperCase())}
                className="w-full min-h-[100px]"
                autoFocus
              />
              {errors.depart_name && <span className="text-sm text-red-500">{errors.depart_name}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="depart_stat">Department Type<strong className="text-red-500">*</strong></Label>
              <Select
                name="depart_stat"
                value={data.depart_stat}
                onValueChange={(value) => setData("depart_stat", value)}
                required
              >
                <SelectTrigger id="depart_stat" className="w-full">
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
              {errors.depart_stat && <span className="text-sm text-red-500">{errors.depart_stat}</span>}
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