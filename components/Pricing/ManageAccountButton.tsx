import { getPortalLink } from "@/actions/getPotalLink";

export default function ManageAccountButton() {
  return (
    <form action={getPortalLink}>
      <button type="submit">Manage Billing</button>
    </form>
  );
}
