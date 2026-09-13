import { updatePassword } from '@/app/login/actions';
import { Lock } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export default function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-jakarta p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">Nouveau mot de passe</h1>
            <p className="text-slate-500 text-sm mt-2">Veuillez entrer votre nouveau mot de passe ci-dessous.</p>
          </div>

          {searchParams.error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
              <div className="w-5 h-5 text-red-500 shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <p className="text-sm font-medium text-red-800">{searchParams.error}</p>
            </div>
          )}

          <form action={updatePassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1" htmlFor="new-password">
                Nouveau mot de passe *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="new-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-12 w-full bg-slate-50 border-slate-200 rounded-xl text-slate-900"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1" htmlFor="confirm-password">
                Confirmer le mot de passe *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="confirm-password"
                  name="passwordConfirm"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-12 w-full bg-slate-50 border-slate-200 rounded-xl text-slate-900"
                  required
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full h-12 rounded-xl font-bold text-sm bg-brand-emerald hover:bg-brand-emerald-dark text-white shadow-subtle-glow transition-all"
              >
                Mettre à jour le mot de passe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
