import { CreateRole, User } from "@/types.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  role: CreateRole | null;
}

const initialState: AuthState = {
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setAuthRole: (state, action: PayloadAction<CreateRole | null>) => {
      state.role = action.payload;
    },
  },
});

export const { setAuthUser, setAuthRole } = authSlice.actions;

export default authSlice.reducer;
