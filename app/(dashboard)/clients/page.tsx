"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Plus, Search, Edit, Trash2, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  deleted_at: string | null;
}

export default function ClientsPage() {
  const supabase = createClient();
  const [clients, setClients] = useState<Client[]>([]);
  const [deletedClients, setDeletedClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState<"actifs" | "corbeille">("actifs");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });

  const fetchClients = useCallback(async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching clients:", error);
    } else if (data) {
      setClients(data.filter(c => !c.deleted_at));
      setDeletedClients(data.filter(c => c.deleted_at));
    }
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const filteredDeletedClients = deletedClients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenModal = (client?: Client) => {
    if (client) {
      setEditingId(client.id);
      setFormData({
        name: client.name,
        email: client.email || "",
        phone: client.phone || "",
        address: client.address || ""
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", email: "", phone: "", address: "" });
    }
    setIsModalOpen(true);
  };

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (editingId) {
      // Modification
      const { error } = await supabase
        .from('clients')
        .update({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        })
        .eq('id', editingId);
        
      if (!error) fetchClients();
    } else {
      // Création
      const { error } = await supabase
        .from('clients')
        .insert([{
          user_id: user.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        }]);
        
      if (!error) fetchClients();
    }
    setIsModalOpen(false);
  };

  const handleDeleteToTrash = async (id: string) => {
    const { error } = await supabase
      .from('clients')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
      
    if (!error) fetchClients();
  };

  const handleRestore = async (id: string) => {
    const { error } = await supabase
      .from('clients')
      .update({ deleted_at: null })
      .eq('id', id);
      
    if (!error) fetchClients();
  };

  const handlePermanentDelete = async (id: string) => {
    if (confirm("Supprimer définitivement ce client ? Cette action est irréversible.")) {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
        
      if (!error) fetchClients();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-primary">Clients</h1>
          <p className="text-muted mt-1">Gérez votre base de clients.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="w-4 h-4" />
          Nouveau Client
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-sidebar/30">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted">
              <Search className="w-4 h-4" />
            </div>
            <Input 
              type="text" 
              placeholder="Rechercher un client..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 p-1 bg-sidebar border border-border rounded-lg">
            <button
              onClick={() => setActiveTab("actifs")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "actifs" ? "bg-accent text-white" : "text-muted hover:text-primary"
              }`}
            >
              Actifs ({clients.length})
            </button>
            <button
              onClick={() => setActiveTab("corbeille")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "corbeille" ? "bg-danger text-white" : "text-muted hover:text-primary"
              }`}
            >
              Corbeille ({deletedClients.length})
            </button>
          </div>
        </div>

        {activeTab === "corbeille" && (
          <div className="bg-danger/10 text-danger text-sm p-3 border-b border-danger/20 flex justify-center">
            Les clients placés dans la corbeille sont conservés pendant 7 jours avant suppression définitive.
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted uppercase bg-sidebar/50">
              <tr>
                <th className="px-6 py-4 font-medium rounded-tl-lg">Nom</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Adresse</th>
                {activeTab === "corbeille" && <th className="px-6 py-4 font-medium">Supprimé le</th>}
                <th className="px-6 py-4 text-right rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted">
                    Chargement des clients...
                  </td>
                </tr>
              ) : activeTab === "actifs" ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-sidebar/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-medium text-primary">{client.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-primary">{client.email}</div>
                      <div className="text-xs text-muted">{client.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-muted max-w-[200px] truncate">
                      {client.address}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          className="p-2 text-muted hover:text-accent transition-colors rounded-md hover:bg-card" 
                          title="Modifier"
                          onClick={() => handleOpenModal(client)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 text-muted hover:text-danger transition-colors rounded-md hover:bg-danger/10" 
                          title="Mettre à la corbeille"
                          onClick={() => handleDeleteToTrash(client.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                filteredDeletedClients.map((client) => (
                  <tr key={client.id} className="hover:bg-sidebar/30 transition-colors opacity-75">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-danger/20 flex items-center justify-center text-danger font-bold">
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-medium text-primary line-through">{client.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-primary">{client.email}</div>
                      <div className="text-xs text-muted">{client.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-muted max-w-[200px] truncate">
                      {client.address}
                    </td>
                    <td className="px-6 py-4 text-muted text-xs">
                      {client.deleted_at && new Date(client.deleted_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="gap-2 text-accent border-accent/20 hover:bg-accent/10"
                          onClick={() => handleRestore(client.id)}
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Restaurer
                        </Button>
                        <button 
                          className="p-2 text-muted hover:text-danger transition-colors rounded-md hover:bg-danger/10" 
                          title="Supprimer définitivement"
                          onClick={() => handlePermanentDelete(client.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              
              {(!isLoading && activeTab === "actifs" && filteredClients.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted">
                    Aucun client trouvé.
                  </td>
                </tr>
              )}

              {(!isLoading && activeTab === "corbeille" && filteredDeletedClients.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted">
                    La corbeille est vide.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingId ? "Modifier le client" : "Ajouter un client"}
      >
        <form onSubmit={handleSaveClient} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Nom de l'entreprise ou client</label>
            <Input 
              required 
              placeholder="Ex: Diallo Import-Export" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Email</label>
              <Input 
                type="email" 
                required 
                placeholder="contact@exemple.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Téléphone</label>
              <Input 
                required 
                placeholder="+221..."
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Adresse complète</label>
            <Input 
              required 
              placeholder="Dakar, Sénégal"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" variant="primary">
              {editingId ? "Enregistrer" : "Ajouter le client"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
