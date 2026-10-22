"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { nav, site } from "@/config/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, "");

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-aluminium/10 bg-navy/95 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.8)] backdrop-blur-md"
          : "border-transparent bg-navy"
      }`}
    >
      <div
        className={`container-x flex items-center justify-between gap-6 transition-[height] duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link href="/" aria-label="SriAero home" className="shrink-0 rounded-md">
          <Logo
            variant="white"
            height={40}
            className={`h-auto origin-left transition-transform duration-300 ${scrolled ? "scale-[0.85]" : ""}`}
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-[0.94rem] font-medium transition-colors hover:text-sky ${
                    isActive(item.href) ? "text-sky" : "text-cloud/90"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span aria-hidden="true" className="absolute inset-x-4 -bottom-0.5 h-px bg-amber" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.contact.phoneHref}
            className="hidden items-center gap-2 rounded-full px-3 py-2 font-mono text-sm text-aluminium transition-colors hover:text-sky xl:inline-flex"
          >
            <Phone aria-hidden="true" className="size-4" />
            {site.contact.phoneDisplay}
          </a>
          <Link
            href="/contact/"
            className="shine hidden min-h-11 items-center rounded-full bg-amber px-5 font-display text-sm font-semibold text-navy transition-colors hover:bg-amber-300 sm:inline-flex"
          >
            <span className="relative z-[2]">Request a Quote</span>
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-cloud hover:text-sky lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="blueprint h-[calc(100dvh-5rem)] overflow-y-auto border-t border-aluminium/10 lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x py-8">
          <ul className="space-y-1">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/contact/", label: "Contact" }].map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-baseline gap-4 border-b border-aluminium/10 py-4 font-display text-2xl text-cloud hover:text-sky aria-[current=page]:text-sky"
                >
                  <span aria-hidden="true" className="label-mono text-sky/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link
              href="/contact/"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-amber font-display font-semibold text-navy"
            >
              Request a Quote
            </Link>
            <a
              href={site.contact.phoneHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cloud/30 font-mono text-cloud"
            >
              <Phone aria-hidden="true" className="size-4" /> {site.contact.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
