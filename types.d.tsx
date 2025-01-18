export type SignupFormData = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignInFormData = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  fullname: string;
  email: string;
  contactNo: string | null;
  address: string | null;
  gender: string | null;
  avatar: string | null;
  isVerified: Boolean;
  createdAt: Date;
};

export type UpdateUser = {
  contactNo: string | null;
  address: string | null;
  gender: string | null;
  avatar: string | null;
};

export type UpdatePassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
