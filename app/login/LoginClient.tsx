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
    <div className="min-h-screen flex items-center justify-center bg-base p-4">
      {/* Container Principal */}
      <div className="w-full max-w-[400px] relative mt-16">
        
        {/* L'en-tête (fond vert émeraude / accent) */}
        <div className="bg-accent rounded-t-2xl pt-10 pb-16 px-6 text-center relative overflow-hidden">
          {/* Effet décoratif (cercles) */}
          <div className="absolute top-4 left-4 w-4 h-4 rounded-full border-2 border-white/20 opacity-50"></div>
          <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full border-2 border-white/20 opacity-50"></div>
          
          <h1 className="text-xl font-display font-bold text-white uppercase tracking-wider">
            BIENVENUE
          </h1>
          <p className="text-white/80 text-xs mt-2 max-w-[250px] mx-auto leading-relaxed">
            Connectez-vous pour gérer vos factures, clients et paiements en toute simplicité.
          </p>
        </div>

        {/* Le corps (formulaire) */}
        <div className="bg-card rounded-b-2xl px-6 pb-8 pt-12 relative shadow-2xl border border-border border-t-0">
          
          {/* Avatar flottant cliquable */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 group cursor-pointer" onClick={handleAvatarClick} title="Changer le logo">
            <div className="w-24 h-24 bg-card rounded-full p-2 shadow-xl border border-border relative overflow-hidden">
              <div className="w-full h-full bg-sidebar rounded-full flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-muted mt-4" strokeWidth={1.5} />
                )}
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-2 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          <form action={login} className="space-y-5 mt-4">
            
            {/* Messages de succès ou d'erreur */}
            {errorMessage && (
              <div className="p-3 rounded-lg bg-danger/10 text-danger text-sm text-center border border-danger/20 animate-in fade-in">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="p-3 rounded-lg bg-accent/10 text-accent text-sm text-center border border-accent/20 animate-in fade-in">
                {successMessage}
              </div>
            )}

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-muted" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Adresse email"
                className="pl-10 h-12 bg-sidebar border-border rounded-xl text-primary focus:ring-accent"
                required
              />
            </div>
            
            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted" />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Mot de passe"
                className="pl-10 h-12 bg-sidebar border-border rounded-xl text-primary focus:ring-accent"
                required
              />
            </div>

            {/* Bouton de Connexion */}
            <div className="pt-2">
              <Button 
                type="submit"
                className="w-full h-12 rounded-full font-bold uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all"
              >
                Se connecter
              </Button>
            </div>

            <div className="pt-2">
              <Button 
                type="button"
                onClick={() => setIsSignupModalOpen(true)}
                variant="ghost"
                className="w-full text-xs text-muted hover:text-primary transition-colors"
              >
                Créer un nouveau compte
              </Button>
            </div>

            {/* Options additionnelles */}
            <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-border/50">
              <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                <input 
                  type="checkbox" 
                  className="rounded border-muted bg-sidebar text-accent focus:ring-accent"
                />
                Se souvenir de moi
              </label>
              
              <a href="#" className="hover:text-accent transition-colors">
                Mot de passe oublié ?
              </a>
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
          <p className="text-sm text-muted mb-4">
            7 jours d&apos;essai gratuit — sans carte bancaire
          </p>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="companyName">
              Nom de l&apos;entreprise / Atelier *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-4 w-4 text-muted" />
              </div>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Ex: Atelier Sérigraphie Plus"
                className="pl-10 h-11 bg-sidebar border-border rounded-xl text-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="firstName">
                Prénom *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-muted" />
                </div>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Prénom"
                  className="pl-10 h-11 bg-sidebar border-border rounded-xl text-primary"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="lastName">
                Nom *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-muted" />
                </div>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Nom"
                  className="pl-10 h-11 bg-sidebar border-border rounded-xl text-primary"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="signup-email">
              Adresse email *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-muted" />
              </div>
              <Input
                id="signup-email"
                name="email"
                type="email"
                placeholder="vous@entreprise.com"
                className="pl-10 h-11 bg-sidebar border-border rounded-xl text-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="phone">
              Téléphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-4 w-4 text-muted" />
              </div>
              <Input
                id="phone"
                name="phone"
                type="text"
                placeholder="+225 07 00 00 00 00"
                className="pl-10 h-11 bg-sidebar border-border rounded-xl text-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="signup-password">
              Mot de passe * (min. 6 caractères)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-muted" />
              </div>
              <Input
                id="signup-password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="pl-10 h-11 bg-sidebar border-border rounded-xl text-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted uppercase tracking-wider" htmlFor="signup-password-confirm">
              Confirmer *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-muted" />
              </div>
              <Input
                id="signup-password-confirm"
                name="passwordConfirm"
                type="password"
                placeholder="Répétez le mot de passe"
                className="pl-10 h-11 bg-sidebar border-border rounded-xl text-primary"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 mt-6">
            <Button type="submit" className="w-full h-11 font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              Créer mon compte
            </Button>
            <Button type="button" variant="ghost" onClick={() => setIsSignupModalOpen(false)} className="text-muted hover:text-primary">
              &larr; Retour à l&apos;accueil
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
