import TemplateDiAccesso from "@/app/components/frontOffice/TemplateDiAccesso"
import { SetNewPasswordForm } from "@/app/components/frontOffice/setNewPassword-form"

export default async function setNewPassword({
    searchParams,
}: {
    searchParams: Promise<{ token_hash: string; type: string }>;
}) {
    // Attendi la risoluzione della Promise
    const params = await searchParams;
    const tokenHash = params.token_hash;
    const type = params.type;

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
    );
}