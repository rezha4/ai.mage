import DashboardLayout from "@/components/shared/sidebar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardLayout children={children} />
  )
}

export default layout;
