import { defaultLocale } from "@/i18n";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(`/${defaultLocale}`);

  // This part will never be reached
  return null;
}
