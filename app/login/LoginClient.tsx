"use client";

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { login, signup } from './actions';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { User, Lock, Mail, Building, Phone, Camera } from 'lucide-react';

export default function LoginClient() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('error');
  const successMessage = searchParams.get('message');

  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load avatar from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAvatar = window.localStorage.getItem('companyAvatar');
      if (savedAvatar) {
        // eslint-disable-next-line
        setAvatarUrl(savedAvatar);
      }
    }
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarUrl(base64String);
        localStorage.setItem('companyAvatar', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-jakarta p-4 relative overflow-hidden">
      {/* Radiant ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-emerald/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-lime/10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Container Principal */}
      <div className="w-full max-w-[420px] relative z-10 mt-10">
        
        {/* Le corps (formulaire) */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 relative shadow-card-lift border border-slate-200">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Facture<span className="text-brand-emerald">Pro</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Connectez-vous à votre espace
            </p>
            <a href="/" className="inline-block mt-3 text-xs font-semibold text-slate-400 hover:text-brand-emerald transition-colors">
              &larr; Retour à l'accueil
            </a>
          </div>

          <form action={login} className="space-y-5">
            
            {/* Messages de succès ou d'erreur */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm text-center border border-red-100 font-medium">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-sm text-center border border-emerald-100 font-medium">
                {successMessage}
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  className="pl-11 h-12 w-full bg-slate-50 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald transition-all"
                  required
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="password">
                  Mot de passe
                </label>
                <a href="#" className="text-xs font-semibold text-brand-emerald hover:text-brand-emerald-dark transition-colors">
                  Oublié ?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-12 w-full bg-slate-50 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald transition-all"
                  required
                />
              </div>
            </div>

            {/* Bouton de Connexion */}
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full h-12 rounded-xl font-bold text-sm bg-brand-emerald hover:bg-brand-emerald-dark text-white shadow-subtle-glow hover:-translate-y-0.5 transition-all duration-200"
              >
                Se connecter
              </button>
            </div>

            {/* Nouveau compte */}
            <div className="pt-4 text-center border-t border-slate-100 mt-6">
              <p className="text-sm text-slate-500">
                Pas encore de compte ?{' '}
                <button 
                  type="button"
                  onClick={() => setIsSignupModalOpen(true)}
                  className="font-bold text-brand-emerald hover:text-brand-emerald-dark transition-colors"
                >
                  Créer un compte
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Modal d'inscription */}
      <Modal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
        title="Créer un compte"
      >
        <form action={signup} className="space-y-4">
          <p className="text-sm text-slate-500 mb-4">
            14 jours d'essai gratuit — sans carte bancaire
          </p>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1" htmlFor="companyName">
              Nom de l'entreprise *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Ex: Atelier Plus"
                className="pl-11 h-12 w-full bg-slate-50 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1" htmlFor="firstName">
                Prénom *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Prénom"
                  className="pl-11 h-12 w-full bg-slate-50 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald transition-all"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1" htmlFor="lastName">
                Nom *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Nom"
                  className="pl-11 h-12 w-full bg-slate-50 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald transition-all"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1" htmlFor="signup-email">
              Adresse email *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                id="signup-email"
                name="email"
                type="email"
                placeholder="vous@entreprise.com"
                className="pl-11 h-12 w-full bg-slate-50 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1" htmlFor="phone">
              Téléphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                id="phone"
                name="phone"
                type="text"
                placeholder="+225 07 00 00 00 00"
                className="pl-11 h-12 w-full bg-slate-50 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1" htmlFor="signup-password">
              Mot de passe *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                id="signup-password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="pl-11 h-12 w-full bg-slate-50 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1" htmlFor="signup-password-confirm">
              Confirmer *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                id="signup-password-confirm"
                name="passwordConfirm"
                type="password"
                placeholder="••••••••"
                className="pl-11 h-12 w-full bg-slate-50 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald transition-all"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 mt-6">
            <button type="submit" className="w-full h-12 rounded-xl font-bold text-sm bg-brand-emerald hover:bg-brand-emerald-dark text-white shadow-subtle-glow hover:-translate-y-0.5 transition-all duration-200">
              Créer mon compte
            </button>
            <button type="button" onClick={() => setIsSignupModalOpen(false)} className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
              Annuler
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
