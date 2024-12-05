"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog";

interface BlurredDialogProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function BlurredDialog({ trigger, children }: BlurredDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      {isOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-md" aria-hidden="true" />
      )}
      <DialogContent className="md:w-[80vw] lg:w-[60vw] max-w-[80vw] z-50 backdrop-blur-md">
        <DialogTitle hidden>
          Georgy
        </DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  )
}

