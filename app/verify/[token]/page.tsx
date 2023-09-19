import Verify from "./verify";

export default async function VerifyPage({ params: { token } }: { params: { token: string } }) {
    return (
      <div>
        <Verify token={token}></Verify>
      </div>
    )
  }