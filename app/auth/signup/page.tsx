import { RegisterForm } from "@/components/RegisterForm";
import Title from "@/components/Title";

export default function CommonLayout() {
  return (
    <>
      <Title description="Welcome to Signup page, here you can start creating your account by providing your informations.">
        Auth - Signup
      </Title>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
