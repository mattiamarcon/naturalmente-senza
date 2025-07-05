import { SignUpForm } from "@/app/components/frontOffice/signUp-form"
import TemplateDiAccesso from "@/app/components/frontOffice/TemplateDiAccesso"
import { SetNewPasswordForm } from "@/app/components/frontOffice/setNewPassword-form"

export default function setNewPassword({
    searchParams,
}: {
    searchParams: { token_hash?: string; type?: string };
}) {

  const tokenHash = searchParams.token_hash;
  const type = searchParams.type;

  if (!tokenHash || type !== 'recovery') {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <p>Link di reset non valido o scaduto</p>
                </div>
            </div>
        );
  }

  return (
    <TemplateDiAccesso>
      <SetNewPasswordForm tokenHash={tokenHash} />
    </TemplateDiAccesso>
  )
}