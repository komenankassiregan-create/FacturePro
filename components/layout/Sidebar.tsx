"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, Settings, Package, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { logout } from "@/app/login/actions";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Factures", href: "/invoices", icon: FileText, badge: "3" },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Paramètres", href: "/settings", icon: Settings },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={onClose} 
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-border transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:flex md:flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2 text-xl font-display font-bold text-primary">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-base">
              <Package className="w-5 h-5 text-white" />
            </div>
            FacturePro
          </Link>
          <button className="md:hidden text-muted hover:text-primary" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-card hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      "flex-shrink-0 w-5 h-5",
                      isActive ? "text-accent" : "text-muted group-hover:text-primary"
                    )}
                  />
                  {item.name}
                </div>
                {item.badge && (
                  <span className={cn(
                    "inline-block py-0.5 px-2 text-xs rounded-full",
                    isActive ? "bg-accent text-base" : "bg-card text-muted"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade Plan Section */}
        <div className="p-4 mt-auto">
          <div className="glass-card rounded-xl p-4 border border-border mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/20 text-accent mb-3">
              <Package className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-primary">Plan Pro</h4>
            <p className="text-xs text-muted mt-1 mb-3">
              Débloquez des factures illimitées et des insights intelligents.
            </p>
            <Button className="w-full text-xs h-8" variant="primary">
              Mettre à niveau
            </Button>
          </div>
          
          <form action={logout}>
            <button
              type="submit"
              className="group flex w-full items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
            >
              <LogOut className="flex-shrink-0 w-5 h-5" />
              Se déconnecter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
