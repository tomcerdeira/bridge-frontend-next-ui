import ResetPasswordForm from "./resetPasswordForm";

export default async function ResetPasswordPage({ params: { token } }: { params: { token: string } }) {
    return (
      <div>
        <ResetPasswordForm token={token}></ResetPasswordForm>
      </div>
    )
  }