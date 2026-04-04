import { getAccounts } from "@/lib/dal";
import { AccountsContent } from "@/features/accounts/components/accounts-content";

export default async function AccountsPage() {
  const accounts = await getAccounts();
  return <AccountsContent accounts={accounts} />;
}
