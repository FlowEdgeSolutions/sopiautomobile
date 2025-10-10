'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Car, User, Phone, Mail, Calendar, Gauge, AlertCircle, 
  CheckCircle, Clock, Trash2, RefreshCw, TrendingUp,
  Filter, Search, Download, LogOut
} from 'lucide-react';

interface Lead {
  id: string;
  timestamp: string;
  vehicle: {
    brand: string;
    model: string;
    firstRegistrationYear: number;
    mileageKm: number;
    condition: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  meta: {
    source: string;
    consent: boolean;
    userAgent?: string;
    ip?: string;
  };
  status?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Stats {
  total: number;
  today: number;
  thisWeek: number;
  statusCounts: { status: string; count: number }[];
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/leads');
      const data = await response.json();
      
      if (data.success) {
        setLeads(data.leads);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateLeadStatus = async (id: string, status: string, notes?: string) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, notes }),
      });

      if (response.ok) {
        fetchLeads();
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diesen Lead löschen möchten?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchLeads();
        setSelectedLead(null);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status?: string) => {
    const statusConfig = {
      new: { label: 'Neu', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
      contacted: { label: 'Kontaktiert', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      qualified: { label: 'Qualifiziert', color: 'bg-purple-100 text-purple-800', icon: TrendingUp },
      won: { label: 'Gewonnen', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      lost: { label: 'Verloren', color: 'bg-red-100 text-red-800', icon: AlertCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        <Icon size={12} />
        <span>{config.label}</span>
      </span>
    );
  };

  const getConditionLabel = (condition: string) => {
    const conditions: Record<string, string> = {
      motorschaden: 'Motorschaden',
      unfallschaden: 'Unfallschaden',
      getriebeschaden: 'Getriebeschaden',
      fahrbereit: 'Fahrbereit mit Mängeln',
      gut: 'Guter Zustand',
    };
    return conditions[condition] || condition;
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Datum', 'Name', 'Email', 'Telefon', 'Marke', 'Modell', 'Baujahr', 'KM', 'Zustand', 'Status'];
    const rows = filteredLeads.map(lead => [
      lead.id,
      new Date(lead.createdAt || lead.timestamp).toLocaleDateString('de-DE'),
      lead.contact.name,
      lead.contact.email,
      lead.contact.phone,
      lead.vehicle.brand,
      lead.vehicle.model,
      lead.vehicle.firstRegistrationYear,
      lead.vehicle.mileageKm,
      getConditionLabel(lead.vehicle.condition),
      lead.status || 'new',
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin text-red-500 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Lade Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Admin Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600">Sopi Automobile - Lead-Verwaltung</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 sm:py-2 px-4 rounded-lg font-semibold transition-colors touch-manipulation min-h-[44px]"
          >
            <LogOut size={20} />
            <span>Abmelden</span>
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-gray-500 text-xs sm:text-sm">Gesamt</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Car className="text-red-500 hidden sm:block" size={40} />
                <Car className="text-red-500 sm:hidden self-end" size={32} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-gray-500 text-xs sm:text-sm">Heute</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.today}</p>
                </div>
                <TrendingUp className="text-blue-500 hidden sm:block" size={40} />
                <TrendingUp className="text-blue-500 sm:hidden self-end" size={32} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-gray-500 text-xs sm:text-sm">Diese Woche</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.thisWeek}</p>
                </div>
                <Calendar className="text-green-500 hidden sm:block" size={40} />
                <Calendar className="text-green-500 sm:hidden self-end" size={32} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6 col-span-2 lg:col-span-1"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-gray-500 text-xs sm:text-sm">Konversionsrate</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                    {stats.total > 0 
                      ? Math.round(((stats.statusCounts.find(s => s.status === 'won')?.count || 0) / stats.total) * 100)
                      : 0}%
                  </p>
                </div>
                <CheckCircle className="text-purple-500 hidden sm:block" size={40} />
                <CheckCircle className="text-purple-500 sm:hidden self-end" size={32} />
              </div>
            </motion.div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Suchen nach Name, Email, Fahrzeug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base min-h-[44px]"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none text-sm sm:text-base min-h-[44px]"
              >
                <option value="all">Alle Status</option>
                <option value="new">Neu</option>
                <option value="contacted">Kontaktiert</option>
                <option value="qualified">Qualifiziert</option>
                <option value="won">Gewonnen</option>
                <option value="lost">Verloren</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={fetchLeads}
                className="flex-1 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 touch-manipulation min-h-[44px]"
              >
                <RefreshCw size={20} />
                <span className="hidden sm:inline">Aktualisieren</span>
                <span className="sm:hidden">Refresh</span>
              </button>
              <button
                onClick={exportToCSV}
                className="flex-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 touch-manipulation min-h-[44px]"
              >
                <Download size={20} />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Leads Table/Cards */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Desktop Table - Hidden on Mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Datum</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Kontakt</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Fahrzeug</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <AlertCircle className="mx-auto mb-2 text-gray-400" size={48} />
                      <p>Keine Leads gefunden</p>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {new Date(lead.createdAt || lead.timestamp).toLocaleDateString('de-DE')}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(lead.createdAt || lead.timestamp).toLocaleTimeString('de-DE')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <User size={16} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{lead.contact.name}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-1">
                          <Mail size={12} />
                          <span>{lead.contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Phone size={12} />
                          <span>{lead.contact.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <Car size={16} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {lead.vehicle.brand} {lead.vehicle.model}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {lead.vehicle.firstRegistrationYear}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 mb-1 text-xs text-gray-600">
                          <Gauge size={12} />
                          <span>{lead.vehicle.mileageKm.toLocaleString('de-DE')} km</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {getConditionLabel(lead.vehicle.condition)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(lead.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <select
                            value={lead.status || 'new'}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateLeadStatus(lead.id, e.target.value);
                            }}
                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="new">Neu</option>
                            <option value="contacted">Kontaktiert</option>
                            <option value="qualified">Qualifiziert</option>
                            <option value="won">Gewonnen</option>
                            <option value="lost">Verloren</option>
                          </select>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteLead(lead.id);
                            }}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards - Shown only on Mobile */}
          <div className="md:hidden divide-y divide-gray-200">
            {filteredLeads.length === 0 ? (
              <div className="px-4 py-12 text-center text-gray-500">
                <AlertCircle className="mx-auto mb-2 text-gray-400" size={48} />
                <p>Keine Leads gefunden</p>
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 active:bg-gray-50 transition-colors"
                  onClick={() => setSelectedLead(lead)}
                >
                  {/* Header: Name + Status */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <User size={16} className="text-gray-400 flex-shrink-0" />
                        <span className="text-sm font-semibold text-gray-900 truncate">{lead.contact.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar size={12} className="flex-shrink-0" />
                        <span>{new Date(lead.createdAt || lead.timestamp).toLocaleDateString('de-DE')}</span>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      {getStatusBadge(lead.status)}
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Car size={16} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {lead.vehicle.brand} {lead.vehicle.model}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>
                        <span className="text-gray-500">Baujahr:</span>
                        <span className="ml-1 font-medium">{lead.vehicle.firstRegistrationYear}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">KM:</span>
                        <span className="ml-1 font-medium">{lead.vehicle.mileageKm.toLocaleString('de-DE')}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getConditionLabel(lead.vehicle.condition)}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center space-x-2 text-xs">
                      <Mail size={12} className="text-gray-400 flex-shrink-0" />
                      <a href={`mailto:${lead.contact.email}`} className="text-red-600 hover:underline truncate" onClick={(e) => e.stopPropagation()}>
                        {lead.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Phone size={12} className="text-gray-400 flex-shrink-0" />
                      <a href={`tel:${lead.contact.phone}`} className="text-red-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                        {lead.contact.phone}
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <select
                      value={lead.status || 'new'}
                      onChange={(e) => {
                        e.stopPropagation();
                        updateLeadStatus(lead.id, e.target.value);
                      }}
                      className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[44px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="new">Neu</option>
                      <option value="contacted">Kontaktiert</option>
                      <option value="qualified">Qualifiziert</option>
                      <option value="won">Gewonnen</option>
                      <option value="lost">Verloren</option>
                    </select>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteLead(lead.id);
                      }}
                      className="bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200 p-3 rounded-lg transition-colors touch-manipulation min-h-[44px] min-w-[44px]"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Lead Details</h2>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="text-gray-400 hover:text-gray-600 p-2 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Lead Info */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Lead-Informationen</h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm">Lead-ID:</span>
                        <span className="text-gray-900 font-mono text-xs sm:text-sm break-all">{selectedLead.id}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm">Erstellt am:</span>
                        <span className="text-gray-900 text-sm">
                          {new Date(selectedLead.createdAt || selectedLead.timestamp).toLocaleString('de-DE')}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm">Quelle:</span>
                        <span className="text-gray-900 text-sm">{selectedLead.meta.source}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm">Status:</span>
                        {getStatusBadge(selectedLead.status)}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Kontaktdaten</h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-gray-400 flex-shrink-0" />
                        <span className="text-gray-900 font-medium text-sm sm:text-base">{selectedLead.contact.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-gray-400 flex-shrink-0" />
                        <a href={`mailto:${selectedLead.contact.email}`} className="text-red-600 hover:underline text-sm sm:text-base break-all">
                          {selectedLead.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-gray-400 flex-shrink-0" />
                        <a href={`tel:${selectedLead.contact.phone}`} className="text-red-600 hover:underline text-sm sm:text-base">
                          {selectedLead.contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Fahrzeugdaten</h3>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm">Fahrzeug:</span>
                        <span className="text-gray-900 font-medium text-sm sm:text-base">
                          {selectedLead.vehicle.brand} {selectedLead.vehicle.model}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm">Baujahr:</span>
                        <span className="text-gray-900 text-sm sm:text-base">{selectedLead.vehicle.firstRegistrationYear}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm">Kilometerstand:</span>
                        <span className="text-gray-900 text-sm sm:text-base">{selectedLead.vehicle.mileageKm.toLocaleString('de-DE')} km</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm">Zustand:</span>
                        <span className="text-gray-900 text-sm sm:text-base">{getConditionLabel(selectedLead.vehicle.condition)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Notizen</h3>
                    <textarea
                      defaultValue={selectedLead.notes || ''}
                      placeholder="Notizen hinzufügen..."
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                      rows={4}
                      onBlur={(e) => updateLeadStatus(selectedLead.id, selectedLead.status || 'new', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
