"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState("company");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    company_name: "Mon Entreprise",
    ninea: "",
    address: "",
    email: "",
    phone: "",
    default_currency: "XOF",
    default_tax_rate: 18,
    legal_terms: "",
    bank_name: "",
    bank_account_name: "",
    bank_iban: "",
    mobile_money_wave: "",
    mobile_money_orange: "",
  });

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('company_settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data && !error) {
      setFormData({
        company_name: data.company_name || "",
        ninea: data.ninea || "",
        address: data.address || "",
        email: data.email || "",
        phone: data.phone || "",
        default_currency: data.default_currency || "XOF",
        default_tax_rate: data.default_tax_rate || 18,
        legal_terms: data.legal_terms || "",
        bank_name: data.bank_name || "",
        bank_account_name: data.bank_account_name || "",
        bank_iban: data.bank_iban || "",
        mobile_money_wave: data.mobile_money_wave || "",
        mobile_money_orange: data.mobile_money_orange || "",
      });
    }
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async () => {
    setIsSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('company_settings')
      .upsert({
        user_id: user.id,
        ...formData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });

    if (error) {
      alert("Erreur lors de la sauvegarde: " + error.message);
    } else {
      alert("Paramètres enregistrés avec succès !");
    }
    setIsSaving(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <div className="p-8 text-center text-muted">Chargement des paramètres...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold font-display text-primary">Paramètres</h1>
        <p className="text-muted mt-1">Gérez les configurations de votre entreprise et de vos factures.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 overflow-x-auto shrink-0 pb-2 md:pb-0">
          <button 
            onClick={() => setActiveTab("company")}
            className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "company" ? "bg-accent/10 text-accent" : "text-muted hover:bg-sidebar hover:text-primary"}`}
          >
            Profil Entreprise
          </button>
          <button 
            onClick={() => setActiveTab("billing")}
            className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "billing" ? "bg-accent/10 text-accent" : "text-muted hover:bg-sidebar hover:text-primary"}`}
          >
            Préférences Facturation
          </button>
          <button 
            onClick={() => setActiveTab("payment")}
            className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "payment" ? "bg-accent/10 text-accent" : "text-muted hover:bg-sidebar hover:text-primary"}`}
          >
            Moyens de Paiement
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === "security" ? "bg-accent/10 text-accent" : "text-muted hover:bg-sidebar hover:text-primary"}`}
          >
            Sécurité
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full">
          {activeTab === "company" && (
            <Card className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-semibold text-primary">Informations Légales</h3>
                <p className="text-sm text-muted">Ces informations apparaîtront sur vos factures.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Nom de l'entreprise</label>
                  <Input name="company_name" value={formData.company_name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">NINEA / RCCM</label>
                  <Input name="ninea" value={formData.ninea} onChange={handleChange} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-primary">Adresse du Siège</label>
                  <Input name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Email de contact</label>
                  <Input name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Téléphone</label>
                  <Input name="phone" value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              <div className="pt-4 flex justify-end border-t border-border mt-6">
                <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
                  <Save className="w-4 h-4" /> {isSaving ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "billing" && (
            <Card className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-semibold text-primary">Facturation</h3>
                <p className="text-sm text-muted">Définissez vos règles par défaut.</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2 max-w-sm">
                  <label className="text-sm font-medium text-primary">Devise par défaut</label>
                  <Select name="default_currency" value={formData.default_currency} onChange={handleChange as any}>
                    <option value="XOF">FCFA (XOF)</option>
                    <option value="XAF">FCFA (XAF)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="USD">Dollar ($)</option>
                  </Select>
                </div>
                <div className="space-y-2 max-w-sm">
                  <label className="text-sm font-medium text-primary">Taux de TVA par défaut (%)</label>
                  <Input name="default_tax_rate" type="number" value={formData.default_tax_rate} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Mentions légales en bas de facture</label>
                  <textarea 
                    name="legal_terms"
                    value={formData.legal_terms}
                    onChange={handleChange}
                    className="flex w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-primary ring-offset-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors min-h-[100px] resize-y"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end border-t border-border mt-6">
                <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
                  <Save className="w-4 h-4" /> {isSaving ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "payment" && (
            <Card className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-semibold text-primary">Moyens de Paiement</h3>
                <p className="text-sm text-muted">Coordonnées affichées sur la facture pour recevoir vos paiements.</p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-sidebar border border-border space-y-4">
                  <h4 className="font-medium text-primary">Virement Bancaire (RIB/IBAN)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-muted uppercase">Banque</label>
                      <Input name="bank_name" value={formData.bank_name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-muted uppercase">Titulaire du compte</label>
                      <Input name="bank_account_name" value={formData.bank_account_name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs text-muted uppercase">IBAN</label>
                      <Input name="bank_iban" value={formData.bank_iban} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-sidebar border border-border space-y-4">
                  <h4 className="font-medium text-primary">Mobile Money</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-muted uppercase">Numéro Wave</label>
                      <Input name="mobile_money_wave" value={formData.mobile_money_wave} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-muted uppercase">Numéro Orange Money</label>
                      <Input name="mobile_money_orange" value={formData.mobile_money_orange} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end border-t border-border mt-6">
                <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
                  <Save className="w-4 h-4" /> {isSaving ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-semibold text-primary">Sécurité du compte</h3>
                <p className="text-sm text-muted">Gérez votre mot de passe et vos accès.</p>
              </div>
              
              <div className="space-y-4 max-w-sm">
                <p className="text-sm text-muted">Pour modifier le mot de passe avec Supabase, nous devons implémenter l'envoi de mail de réinitialisation.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
