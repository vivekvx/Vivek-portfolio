"use client";

import { useEffect, useRef, useState } from "react";

type CommandPaletteProps = {
  links: ReadonlyArray<{ label: string; href: string }>;
  copyActions: ReadonlyArray<{ label: string; value: string }>;
};

export function CommandPalette({ links, copyActions }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button className="icon-button" type="button" onClick={() => setOpen(true)} aria-label="Open command palette">
        ⌘
      </button>
      <dialog
        ref={dialogRef}
        className="command-palette"
        aria-labelledby="command-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="command-panel">
          <div className="command-header">
            <strong id="command-title">Quick Actions</strong>
            <button className="icon-button" type="button" onClick={() => setOpen(false)} aria-label="Close command palette">
              ×
            </button>
          </div>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          {copyActions.map((action) => (
            <button
              key={action.value}
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(action.value);
                } finally {
                  setOpen(false);
                }
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </dialog>
    </>
  );
}
