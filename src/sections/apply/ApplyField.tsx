import type { ReactNode } from "react";

type ApplyFieldProps = {
  label: string;
  children: ReactNode;
};

const ApplyField = ({ label, children }: ApplyFieldProps) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
};

export default ApplyField;
