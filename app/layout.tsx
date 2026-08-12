import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Bookworm — Sua vida entre livros", description: "Uma rede social para compartilhar leituras, descobrir livros e organizar sua biblioteca." };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="pt-BR"><body>{children}</body></html>; }
