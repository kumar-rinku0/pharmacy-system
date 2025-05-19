import { useEffect } from "react";
import { useAuth } from "./provider/auth-provider";

const Logout: React.FC = () => {
  const { signOut } = useAuth();
  useEffect(() => {
    signOut();
  }, [signOut]);
  return null;
};

export default Logout;
