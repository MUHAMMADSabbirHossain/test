import UserLoginForm from "@/components/forms/UserLoginForm";
import { Suspense } from "react";

function OwnerLoginPage() {
  return (
    <>
      <Suspense fallback={<div>Loading login form...</div>}>
        <UserLoginForm />
      </Suspense>
    </>
  );
}

export default OwnerLoginPage;
