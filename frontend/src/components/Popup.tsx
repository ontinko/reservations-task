import { ReactNode } from "react";

export function Popup({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col max-w-[400px] w-full p-4">
      {children}
    </div>
  );
}
