import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Datenschutz",
    description: "Datenschutzerklärung vom Getränkeservice Bernd Mahringer in Mannheim.",
};

export default function DatenschutzLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
