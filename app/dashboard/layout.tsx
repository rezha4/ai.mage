import DashboardLayout from "@/components/shared/sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardLayout>{children}</DashboardLayout>
  )
}

export default layout;
