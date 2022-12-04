import React from "react";
import { inferQueryOutput } from "../utils/trpc";
import { Dialog, DialogContent, DialogTitle } from "./Dialog";

interface DefinitionDialogProps {
  definition: inferQueryOutput<"definitions.getAllDefinitions">["definitions"][number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const InfoLabel: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <p className="text-xs font-light text-contrast-dark">
    <strong className="font-bold">{label}:</strong> {value}
  </p>
);

export const DefinitionDialog: React.FC<DefinitionDialogProps> = ({
  isOpen,
  onClose,
  definition,
}) => {
  if (!definition) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{definition.value}</DialogTitle>

        <div className="flex flex-wrap justify-between gap-1">
          <InfoLabel label="Created at" value={definition.createdAt.toLocaleString()} />

          <InfoLabel label="Language" value={definition.language.name} />

          {definition.knownFrom && <InfoLabel label="Known from" value={definition.knownFrom} />}
        </div>

        <div className="my-3 h-[1px] bg-slate-600" />

        <div className="text-sm text-contrast-secondary">
          <p>{definition.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
