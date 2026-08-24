import { Poppins, Archivo, JetBrains_Mono } from "next/font/google";

export const inter = Poppins({ weight: "400", subsets: ["latin"] });
export const archivo = Archivo({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-archivo",
});
export const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jbmono",
});
