import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";

export const useDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    open,
    close,
  };
};

export const Dialog = DialogPrimitive.Root;

export const DialogContent: React.FC<DialogPrimitive.DialogContentProps> = (props) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black bg-opacity-30" />

    <DialogPrimitive.Content
      className="fixed top-1/2 left-1/2 z-50 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-primary-dark p-4 md:w-full"
      {...props}
    />
  </DialogPrimitive.Portal>
);

export const DialogTitle: React.FC<DialogPrimitive.DialogTitleProps> = (props) => (
  <DialogPrimitive.Title className="mb-2 text-xl font-bold" {...props} />
);
export const DialogDescription: React.FC<DialogPrimitive.DialogDescriptionProps> = (props) => (
  <DialogPrimitive.Description className="text-sm text-contrast-secondary" {...props} />
);
export const DialogClose = DialogPrimitive.Close;
