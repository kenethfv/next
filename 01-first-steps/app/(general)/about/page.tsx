import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'About Tittle',
    description: 'About Description',
    keywords: ['About Page', 'Keneth', 'Informacion', '...']
};

export default function AboutPage() {
    return (
        <span className="text-7xl">About Page</span>
    )
}