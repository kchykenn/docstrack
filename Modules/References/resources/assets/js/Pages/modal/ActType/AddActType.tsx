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

export function AddActType({ open, onOpenChange, autoActCode }: { open: boolean, onOpenChange: (open: boolean) => void, autoActCode: string }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    act_code: autoActCode || "",
    act_name: "",
    act_stat: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post('/storeActionType', {
      onSuccess: () => {
        alert("Action Type Added successfully!");
        reset();
        onOpenChange(false);
        router.visit('/addActionType');
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
              <DialogTitle>ADD Action Type</DialogTitle>
              <DialogDescription className="text-black font-bold">
                Caraga Region Documents Tracking System
              </DialogDescription>
              <DialogDescription>
                Fill in the fields to add a new Action Type.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="act_code">Action Code<strong className="text-red-500">*</strong></Label>
                <Input
                  id="act_code"
                  name="act_code"
                  value={data.act_code}
                  readOnly
                  className="bg-gray-100"
                />
                {errors.act_code && <span className="text-sm text-red-500">{errors.act_code}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="act_name">Action Name<strong className="text-red-500">*</strong></Label>
              <Textarea
                id="act_name"
                name="act_name"
                value={data.act_name}
                onChange={(e) => setData("act_name", e.target.value)}
                className="w-full min-h-[100px]"
                autoFocus
              />
              {errors.act_name && <span className="text-sm text-red-500">{errors.act_name}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="act_stat">Action Status<strong className="text-red-500">*</strong></Label>
              <Select
                name="act_stat"
                value={data.act_stat}
                onValueChange={(value) => setData("act_stat", value)}
                required
              >
                <SelectTrigger id="act_stat" className="w-full">
                  <SelectValue placeholder="Select Action Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Action Status</SelectLabel>
                    <SelectItem value="1">Active</SelectItem>
                    <SelectItem value="0">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.act_stat && <span className="text-sm text-red-500">{errors.act_stat}</span>}
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