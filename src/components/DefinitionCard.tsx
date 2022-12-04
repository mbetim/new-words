import React from "react";
import { inferQueryOutput } from "../utils/trpc";

interface DefinitionCardProps {
  definition: inferQueryOutput<"definitions.getAllDefinitions">["definitions"][number];
  onClick: () => void;
}

export const DefinitionCard: React.FC<DefinitionCardProps> = ({ definition, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full break-inside-avoid rounded-xl border border-slate-500 p-4 shadow-xl transition hover:border-slate-300"
    >
      <h3 className="flex items-center justify-between text-xl font-bold">
        {definition.value}
        <span className="text-sm font-thin">{definition.language.abbr}</span>
      </h3>

      <p className="text-left text-sm text-contrast-secondary">{definition.description}</p>
    </button>
  );
};
