"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SuccessModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Registration received</DialogTitle>
          <DialogDescription>
            Thanks for registering. We’ll reach out with next steps.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}


