import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const navItems = [{ name: "Login", href: "/login" }];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-10 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
          <nav className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center gap-4">
              <Link href="/" className="font-bold text-xl">
                365Days
              </Link>
            </div>
            <div id="nav-items" className="flex items-center gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-zinc-950 dark:text-zinc-50 hover:text-blue-500"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
