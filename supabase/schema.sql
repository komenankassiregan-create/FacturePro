-- Activer l'extension pgcrypto pour la génération d'UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 1. Table des Clients (clients)
-- ==========================================
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    deleted_at TIMESTAMPTZ, -- Pour la logique de Corbeille (Trash)
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. Table des Paramètres de l'Entreprise (company_settings)
-- ==========================================
CREATE TABLE company_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL DEFAULT 'Mon Entreprise',
    ninea TEXT,
    address TEXT,
    email TEXT,
    phone TEXT,
    default_currency TEXT DEFAULT 'XOF',
    default_tax_rate NUMERIC DEFAULT 18.0,
    legal_terms TEXT,
    bank_name TEXT,
    bank_account_name TEXT,
    bank_iban TEXT,
    mobile_money_wave TEXT,
    mobile_money_orange TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. Table des Factures (invoices)
-- ==========================================
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id) ON DELETE RESTRICT,
    invoice_number TEXT NOT NULL,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft', -- draft, sent, paid, overdue
    subtotal NUMERIC NOT NULL DEFAULT 0,
    tax_rate NUMERIC NOT NULL DEFAULT 18.0,
    tax_amount NUMERIC NOT NULL DEFAULT 0,
    total NUMERIC NOT NULL DEFAULT 0,
    deleted_at TIMESTAMPTZ, -- Pour la logique de Corbeille (Trash)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. Table des Lignes de Facture (invoice_items)
-- ==========================================
CREATE TABLE invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity NUMERIC NOT NULL DEFAULT 1,
    unit_price NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- POLITIQUES DE SÉCURITÉ RLS (Row Level Security)
-- ==========================================

-- Activer RLS sur toutes les tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;

-- 1. RLS pour 'clients' (Un utilisateur ne voit que ses clients)
CREATE POLICY "Utilisateur voit ses propres clients" 
ON clients FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Utilisateur peut créer ses propres clients" 
ON clients FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utilisateur peut modifier ses propres clients" 
ON clients FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utilisateur peut supprimer ses propres clients" 
ON clients FOR DELETE 
USING (auth.uid() = user_id);

-- 2. RLS pour 'company_settings'
CREATE POLICY "Utilisateur voit ses paramètres" 
ON company_settings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Utilisateur peut créer ses paramètres" 
ON company_settings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utilisateur peut modifier ses paramètres" 
ON company_settings FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 3. RLS pour 'invoices'
CREATE POLICY "Utilisateur voit ses propres factures" 
ON invoices FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Utilisateur peut créer ses factures" 
ON invoices FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utilisateur peut modifier ses factures" 
ON invoices FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utilisateur peut supprimer ses factures" 
ON invoices FOR DELETE 
USING (auth.uid() = user_id);

-- 4. RLS pour 'invoice_items'
-- Un utilisateur ne voit les lignes que si la facture parent lui appartient
CREATE POLICY "Utilisateur voit les lignes de ses factures" 
ON invoice_items FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM invoices 
        WHERE invoices.id = invoice_items.invoice_id 
        AND invoices.user_id = auth.uid()
    )
);

CREATE POLICY "Utilisateur peut créer des lignes" 
ON invoice_items FOR INSERT 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM invoices 
        WHERE invoices.id = invoice_items.invoice_id 
        AND invoices.user_id = auth.uid()
    )
);

CREATE POLICY "Utilisateur peut modifier des lignes" 
ON invoice_items FOR UPDATE 
USING (
    EXISTS (
        SELECT 1 FROM invoices 
        WHERE invoices.id = invoice_items.invoice_id 
        AND invoices.user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM invoices 
        WHERE invoices.id = invoice_items.invoice_id 
        AND invoices.user_id = auth.uid()
    )
);

CREATE POLICY "Utilisateur peut supprimer des lignes" 
ON invoice_items FOR DELETE 
USING (
    EXISTS (
        SELECT 1 FROM invoices 
        WHERE invoices.id = invoice_items.invoice_id 
        AND invoices.user_id = auth.uid()
    )
);
