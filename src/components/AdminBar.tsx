import { useAdmin } from "@/context/AdminContext";
import { Shield } from "lucide-react";

const AdminBar = () => {
  const { isAdmin, toggleAdmin } = useAdmin();

  return (
    <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isAdmin ? "h-10" : "h-0 overflow-hidden"}`}>
      <div className="h-10 bg-foreground flex items-center justify-center gap-3 px-4">
        <Shield size={14} className="text-destructive" />
        <span className="text-xs font-medium text-background tracking-wider uppercase">
          Admin Mode Active
        </span>
      </div>
    </div>
  );
};

export const AdminToggle = () => {
  const { isAdmin, toggleAdmin } = useAdmin();

  return (
    <button
      onClick={toggleAdmin}
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg transition-all duration-300 text-sm font-medium ${
        isAdmin
          ? "bg-destructive text-destructive-foreground"
          : "bg-card text-card-foreground border border-border hover:shadow-xl"
      }`}
    >
      <Shield size={16} />
      {isAdmin ? "Exit Admin" : "Admin Mode"}
    </button>
  );
};

export default AdminBar;
