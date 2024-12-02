"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

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
      <DialogContent className="sm:max-w-[425px] z-50 bg-background/70 backdrop-blur-md">
        {children}
      </DialogContent>
    </Dialog>
  )
}

