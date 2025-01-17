import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useUser = () => {
  return useSelector((state: RootState) => state.auth.user);
};

export default useUser;
