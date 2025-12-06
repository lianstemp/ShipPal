import "../globals.css";

export default function PitchLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-black text-white overflow-hidden">
                {children}
            </body>
        </html>
    );
}
