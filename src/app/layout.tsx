import "@/app/global.scss";
import { ReactNode } from "react";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { Header } from "@/widgets/Header";

export const metadata = {
  title: "TMDB App",
  description: "A simple movie app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
