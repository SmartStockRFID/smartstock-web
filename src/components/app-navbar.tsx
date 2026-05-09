"use client";

import { LogOut, Origami, UserCircle2 } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutAction } from "@/api/actions";
import { AppRoutes, Assets, newlandTheme } from "@/constants";
import { cn } from "@/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ThemeToggleButton } from "./ui/theme-toggle-button";
import { Typography } from "./ui/typography";

interface LinksDefinition {
  [key: string]: {
    label: string;
    href: Route;
  };
}

export function AppNavbar() {
  const links = {
    dashboard: {
      label: "Dashboard",
      href: AppRoutes.dashboard,
    },
    products: {
      label: "Produtos",
      href: AppRoutes.products,
    },
  } satisfies LinksDefinition;

  const route = usePathname();

  const isCurrentPage = (href: string) => route === href;

  const router = useRouter();

  return (
    <header
      className={cn(
        "text-white",
        newlandTheme ? "bg-[#b91c1c]" : "bg-slate-600",
      )}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between 3xl:px-0 px-6 py-2">
        <Link href={"/"} className="flex items-center gap-3">
          {newlandTheme ? (
            <Image
              className="invert"
              src={Assets.icons.toyota}
              alt="Toyota logomarca"
              width={40}
              height={40}
            />
          ) : (
            <Origami />
          )}

          <h1 className={cn(Typography.h1, "hidden text-lg sm:block")}>
            {newlandTheme ? (
              <>
                <span className="hidden sm:inline">Sistema </span>SSRFID
              </>
            ) : (
              "Smart Stock"
            )}
          </h1>
        </Link>
        <div className="hidden space-x-4 sm:flex">
          {[links.dashboard, links.products].map((link) => (
            <Link
              href={link.href}
              key={link.href}
              aria-current={isCurrentPage(link.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 font-medium text-sm",
                isCurrentPage(link.href)
                  ? "bg-gray-950/50 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href={
            isCurrentPage(links.dashboard.href)
              ? links.products.href
              : links.dashboard.href
          }
          className={cn(
            "rounded-md px-3 py-2 font-medium text-sm",
            "border border-gray-50/50 text-gray-300 hover:bg-white/5 hover:text-white",
            "flex items-center gap-2",
            "sm:hidden",
          )}
        >
          {isCurrentPage(links.dashboard.href)
            ? links.products.label
            : links.dashboard.label}
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-fit w-fit cursor-pointer items-center justify-center rounded-full bg-gray-600">
            <UserCircle2 className="h-8 w-8 text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="*:cursor-pointer">
            <ThemeToggleButton />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                toast.promise(
                  async function onLogout() {
                    await logoutAction();
                    router.push(AppRoutes.login);
                  },
                  {
                    loading: "Encerrando sessão...",
                  },
                )
              }
            >
              Deslogar
              <DropdownMenuShortcut>
                <LogOut />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
