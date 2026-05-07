import { Metadata } from "next";
import Link from "next/link";
import { FileText, ImageIcon, LayoutDashboard, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin | GrowWithMaya",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="w-full md:w-64 shrink-0 border-r border-border bg-card">
        <div className="p-6">
          <Link href="/" className="text-lg font-bold tracking-tight">GrowWithMaya</Link>
          <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
        </div>
        <nav className="px-4 pb-6 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary transition-colors">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/admin/posts" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary transition-colors">
            <FileText className="h-4 w-4" /> Posts
          </Link>
          <Link href="/admin/images" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary transition-colors">
            <ImageIcon className="h-4 w-4" /> Images
          </Link>
          <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary transition-colors">
            <Settings className="h-4 w-4" /> Back to Site
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
    </div>
  );
}
