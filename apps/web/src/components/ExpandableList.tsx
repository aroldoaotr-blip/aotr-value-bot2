"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

// Lista con límite inicial y botón "Ver más" que despliega el resto.
export function ExpandableList({
  items,
  initial = 5,
  renderItem,
  className
}: {
  items: ReactNode[];
  initial?: number;
  renderItem?: (node: ReactNode, index: number) => ReactNode;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, initial);
  const hidden = items.length - visible.length;

  return (
    <div className={className}>
      <div className="space-y-3">
        {visible.map((item, i) =>
          renderItem ? renderItem(item, i) : <div key={i}>{item}</div>
        )}
      </div>

      {hidden > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="glass-panel mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-label-caps text-xs font-bold tracking-wider text-on-surface-variant transition-all hover:border-primary/40 hover:text-on-surface"
        >
          Ver más ({hidden}) <ChevronDown className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
