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
  isVerified: Boolean;
  createdAt: Date;
};
