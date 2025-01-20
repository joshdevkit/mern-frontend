import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useRole = () => {
  return useSelector((state: RootState) => state.auth.role);
};

export default useRole;
