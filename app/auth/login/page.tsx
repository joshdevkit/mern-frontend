import { LoginForm } from "@/components/LoginForm";
import Title from "@/components/Title";
export default function CommonLayout() {
  return (
    <>
      <Title description="Welcome to Login page, here you can start signin by providing your registered user account.">
        Auth - Login
      </Title>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
