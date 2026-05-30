import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Impressum & Kontakt",
    description: "Kontaktinformationen und rechtliche Hinweise zum Getränkeservice Bernd Mahringer in Mannheim.",
};

export default function ImpressumLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
