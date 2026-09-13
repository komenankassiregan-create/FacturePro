import { Menu, Search, Bell } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-base px-4 sm:px-6">
      <button
        className="md:hidden text-muted hover:text-primary"
        onClick={onMenuClick}
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex flex-1 items-center gap-4 justify-between md:justify-end">
        <div className="flex items-center gap-2 max-w-md flex-1 md:flex-initial">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg leading-5 bg-card text-primary placeholder-muted focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm transition-colors"
              placeholder="Rechercher..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-muted hover:text-primary relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-danger ring-2 ring-base" />
          </button>
          
          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50 cursor-pointer">
            <span className="text-sm font-medium text-accent">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}
