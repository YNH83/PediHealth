"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { mockChildren, type Child } from "@/lib/mock/data";

interface ChildContextValue {
  children: Child[];
  selectedChild: Child | null;
  selectChild: (childId: string) => void;
}

const ChildContext = createContext<ChildContextValue>({
  children: [],
  selectedChild: null,
  selectChild: () => {},
});

export function ChildProvider({ children: node }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string>(mockChildren[0]?.id ?? "");

  const selectChild = useCallback((childId: string) => {
    setSelectedId(childId);
  }, []);

  const selectedChild =
    mockChildren.find((c) => c.id === selectedId) ?? null;

  return (
    <ChildContext.Provider
      value={{
        children: mockChildren,
        selectedChild,
        selectChild,
      }}
    >
      {node}
    </ChildContext.Provider>
  );
}

export function useChild() {
  const ctx = useContext(ChildContext);
  if (!ctx) throw new Error("useChild must be used within ChildProvider");
  return ctx;
}
