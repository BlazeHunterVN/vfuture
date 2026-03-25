"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/common/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navItems, siteConfig } from "@/lib/constants/site";

const ICON_LIGHT = "https://ik.imagekit.io/veltrixmediagroup/vfuture/20262203/b20262203?updatedAt=1774193355414";
const ICON_DARK  = "https://ik.imagekit.io/veltrixmediagroup/vfuture/20262203/w20262203?updatedAt=1774193489095";

export function SiteNavbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const navLinkClass = isHomePage
    ? "relative py-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate-700 transition hover:text-slate-950 dark:text-white dark:hover:text-white/80"
    : "relative py-2 text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground transition hover:text-foreground dark:text-white dark:hover:text-white/80";
  const activeNavClass = isHomePage ? "text-primary dark:text-amber-300" : "text-primary dark:text-amber-300";
  const homeControlClass =
    "theme-control-surface border-slate-200/90 bg-white/84 text-slate-900 hover:bg-white dark:border-white/15 dark:bg-[#0F1115]/72 dark:text-white dark:hover:bg-[#151820]";

  return (
    <header
      className={cn(
        "z-50 backdrop-blur-xl",
        isHomePage
          ? "fixed inset-x-0 top-0 border-b-0 bg-white/72 shadow-[0_12px_32px_rgba(15,23,42,0.08)] dark:bg-slate-950/42 dark:shadow-none"
          : "sticky top-0 border-b border-border bg-background/85",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" aria-label={siteConfig.shortName} className="inline-flex items-center">
          {/* Light mode logo */}
          <Image
            src={ICON_LIGHT}
            alt={siteConfig.shortName}
            width={36}
            height={36}
            className="block object-contain drop-shadow-[0_8px_22px_rgba(15,23,42,0.18)] dark:hidden"
          />
          {/* Dark mode logo */}
          <Image
            src={ICON_DARK}
            alt={siteConfig.shortName}
            width={36}
            height={36}
            className="hidden object-contain drop-shadow-[0_8px_22px_rgba(0,0,0,0.38)] dark:block"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  navLinkClass,
                  active && activeNavClass,
                )}
              >
                {item.title}
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-[1px] left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] dark:from-amber-400 dark:to-orange-500"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className={isHomePage ? homeControlClass : undefined} />
          <Sheet>
            <SheetTrigger
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-xl md:hidden",
                isHomePage
                  ? homeControlClass
                  : "theme-control-surface",
              )}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="border-border bg-card text-foreground">
              <SheetHeader>
                <SheetTitle className="font-heading uppercase tracking-[0.08em] text-foreground">
                  {siteConfig.name}
                </SheetTitle>
                <SheetDescription className="text-muted-foreground">
                  Điều hướng nhanh tới các khu vực cộng đồng.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-xl border border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground transition hover:border-primary/20 hover:bg-primary/10 hover:text-primary dark:text-white dark:hover:text-amber-300",
                      pathname === item.href &&
                        "border-primary/25 bg-primary/10 text-primary dark:border-primary/20 dark:bg-primary/12 dark:text-amber-300",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
