import { createContext, useContext, useState, ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  toggleAdmin: () => void;
}

const AdminContext = createContext<AdminContextType>({ isAdmin: false, toggleAdmin: () => {} });

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <AdminContext.Provider value={{ isAdmin, toggleAdmin: () => setIsAdmin((v) => !v) }}>
      {children}
    </AdminContext.Provider>
  );
};
