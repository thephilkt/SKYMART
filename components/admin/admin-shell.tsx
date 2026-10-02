"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, ChevronLeft, CircleUserRound, FolderTree, Images, LayoutDashboard, Package, PanelLeftClose, PanelLeftOpen, Shapes, Store, UsersRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { adminResources, type AdminResourceKey } from "@/lib/admin/resources";

const icons: Record<AdminResourceKey, React.ComponentType<{ size?: number }>> = {
  profiles: UsersRound,
  shops: Store,
  categories: FolderTree,
  products: Package,
  "product-variants": Shapes,
  "product-images": Images,
  inventory: Boxes,
};

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 780px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    sidebarRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <div className="admin-shell">
      <aside aria-hidden={isMobile && !open} className={`admin-sidebar ${open ? "is-open" : ""}`} id="admin-navigation" inert={isMobile && !open ? true : undefined} ref={sidebarRef}>
        <div className="admin-brand"><span>SKY</span>MART <small>Admin</small></div>
        <nav aria-label="เมนูผู้ดูแลระบบ">
          <Link className={pathname === "/admin" ? "is-active" : ""} href="/admin"><LayoutDashboard size={18} />ภาพรวม</Link>
          <p>จัดการข้อมูล</p>
          {Object.values(adminResources).map((resource) => {
            const Icon = icons[resource.key];
            const href = `/admin/${resource.key}`;
            return <Link className={pathname.startsWith(href) ? "is-active" : ""} href={href} key={resource.key} onClick={() => setOpen(false)}><Icon size={18} />{resource.label}</Link>;
          })}
        </nav>
        <div className="admin-sidebar-footer"><Link className="admin-store-link" href="/"><ChevronLeft size={17} />กลับหน้าร้าน</Link></div>
      </aside>
      {open && <button aria-label="ปิดเมนู" className="admin-nav-backdrop" onClick={closeMenu} />}
      <div className="admin-main">
        <header className="admin-topbar">
          <button aria-controls="admin-navigation" aria-expanded={open} aria-label={open ? "ปิดเมนู" : "เปิดเมนู"} className="admin-menu-toggle" onClick={() => open ? closeMenu() : setOpen(true)} ref={toggleRef}>{open ? <PanelLeftClose /> : <PanelLeftOpen />}</button>
          <div><strong>ศูนย์ควบคุม SKYMART</strong><span>พื้นที่จัดการข้อมูลสำหรับผู้ดูแลระบบ</span></div>
          <div className="admin-user"><CircleUserRound size={22} /><span><strong>Admin</strong><small>ผู้ดูแลระบบ</small></span></div>
        </header>
        <main className="admin-content" id="main-content">{children}</main>
      </div>
    </div>
  );
}
