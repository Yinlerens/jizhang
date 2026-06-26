import { redirect } from "next/navigation";

export default function GachaAdminRoot() {
  redirect("/admin/gacha/items");
}
