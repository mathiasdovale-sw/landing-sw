import { redirect } from "next/navigation"

// "/" ya redirige a /es/ desde next.config.js; esto es solo por si acaso.
export default function Index() {
  redirect("/es/")
}
