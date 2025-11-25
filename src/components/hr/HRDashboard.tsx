// src/components/dashboard/HRDashboard.tsx
import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { NineBoxMatrix } from '../shared/NineBoxMatrix';
import { mockEmployees, Employee } from '../../lib/mockData';
import {
  Users,
  ClipboardCheck,
  Clock,
  TrendingUp,
  BarChart3,
  Search,
  X,
  ChevronRight
} from 'lucide-react';
import { DataUpload } from './DataUpload';
import { SuccessProfileManagement } from './SuccessProfileManagement';
import { EmployeeDetailView } from './EmployeeDetailView';

/**
 * Use the uploaded file path from the conversation history as the page logo.
 * The platform will transform this local path into a URL during rendering.
 */
const LOGO_PATH = '/mnt/data/669bd3f1-9bf0-43c9-b187-87433b4e58b0.png';

/* =========================
   Compact EmployeeIdForm (inline)
   ========================= */
function EmployeeIdForm({ onSubmit }: { onSubmit?: (payload: any) => void }) {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive' | 'Pending'>('Active');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setEmpId(''); setPassword(''); setCurrentRole(''); setDepartment(''); setStatus('Active'); setError(null); setSuccess(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!empId.trim()) return setError('Employee ID required');
    if (!password.trim()) return setError('Password required');
    if (!currentRole.trim()) return setError('Current role required');
    if (!department.trim()) return setError('Department required');

    const payload = { empId: empId.trim(), password, currentRole: currentRole.trim(), department: department.trim(), status };
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess('Saved successfully');
      if (onSubmit) onSubmit(payload);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-500">{error}</div>}
      {success && <div className="text-sm text-green-400">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Employee ID</label>
          <input value={empId} onChange={(e) => setEmpId(e.target.value)} placeholder="EMP0001" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800" />
        </div>

        <div>
          <label className="text-xs text-muted-foreground block mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800" />
        </div>

        <div>
          <label className="text-xs text-muted-foreground block mb-1">Current Role</label>
          <input value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} placeholder="Senior Engineer" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800" />
        </div>

        <div>
          <label className="text-xs text-muted-foreground block mb-1">Department</label>
          <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Engineering" className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save'}</Button>
        <Button type="button" variant="ghost" onClick={resetForm}>Reset</Button>
      </div>
    </form>
  );
}

/* =========================
   HRDashboard — final combined code
   ========================= */
export function HRDashboard() {
  // tabs: overview | employee-id | employee-id-bulk | data-upload | success-profiles
  const [activeTab, setActiveTab] = useState<'overview' | 'employee-id' | 'employee-id-bulk' | 'data-upload' | 'success-profiles'>('overview');

  // selected employee detail view
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);

  // selected nine-box cell
  const [selectedCell, setSelectedCell] = useState<{ performance: number; potential: number } | null>(null);

  // search in IDP review list
  const [searchQuery, setSearchQuery] = useState('');

  // KPIs
  const totalEmployees = mockEmployees.length;
  const pendingApprovals = mockEmployees.filter(emp => emp.idpStatus === 'manager_approved').length;
  const approvedIDPs = mockEmployees.filter(emp => emp.idpStatus === 'committee_approved').length;
  const avgReadiness = totalEmployees === 0 ? 0 : Math.round(mockEmployees.reduce((s, e) => s + (e.overallProgress || 0), 0) / totalEmployees);

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();

  // nine-box click: unchanged behavior (select cell only)
  const handleCellClick = (performance: number, potential: number) => {
    setSelectedCell({ performance, potential });
  };

  // employee click => open full detail view
  const handleEmployeeClick = (emp: Employee) => {
    setSelectedEmployee(emp);
    setIsDetailView(true);
  };

  const handleBackFromDetail = () => {
    setIsDetailView(false);
    setSelectedEmployee(null);
  };

  // filtered pending approvals list
  const filteredPending = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = mockEmployees.filter(e => e.idpStatus === 'manager_approved');
    if (!q) return list;
    return list.filter(e =>
      (e.name || '').toLowerCase().includes(q) ||
      (e.title || '').toLowerCase().includes(q) ||
      (e.empId || '').toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // employees in selected cell
  const employeesInSelectedCell = selectedCell
    ? mockEmployees.filter(emp => Number(emp.nineBoxPosition?.performance) === selectedCell.performance && Number(emp.nineBoxPosition?.potential) === selectedCell.potential)
    : [];

  // if user opened employee detail, show that component (same behavior)
  if (isDetailView && selectedEmployee) {
    return <EmployeeDetailView employee={selectedEmployee} onBack={handleBackFromDetail} />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={LOGO_PATH} alt="UdaanSetu" className="h-10 w-auto rounded-md object-contain" />
          <div>
            <h1 className="text-2xl font-bold">HR Committee</h1>
            <p className="text-sm text-muted-foreground">Succession planning & IDP management</p>
          </div>
        </div>

        {/* Removed the right-side buttons (Upload Data, Success Profiles, HR Admin) as requested */}
      </div>

      {/* tabs */}
      <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
        <TabsList className="mb-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employee-id">Employee ID</TabsTrigger>
          <TabsTrigger value="employee-id-bulk">Employee ID Bulk</TabsTrigger>
          <TabsTrigger value="data-upload">Data Upload</TabsTrigger>
          <TabsTrigger value="success-profiles">Success Profiles</TabsTrigger>
        </TabsList>

        {/* ===== Overview ===== */}
        <TabsContent value="overview">
          {/* KPI row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center gap-4">
              <div className="p-3 rounded bg-slate-800"><Users className="w-5 h-5 text-blue-400" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Total Pipeline</p>
                <h3 className="text-xl font-semibold">{totalEmployees}</h3>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center gap-4">
              <div className="p-3 rounded bg-slate-800"><Clock className="w-5 h-5 text-orange-400" /></div>
              <div>
                <p className="text-xs text-muted-foreground">IDP Review</p>
                <h3 className="text-xl font-semibold">{pendingApprovals}</h3>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center gap-4">
              <div className="p-3 rounded bg-slate-800"><ClipboardCheck className="w-5 h-5 text-green-400" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Approved Plans</p>
                <h3 className="text-xl font-semibold">{approvedIDPs}</h3>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center gap-4">
              <div className="p-3 rounded bg-slate-800"><TrendingUp className="w-5 h-5 text-purple-400" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Readiness</p>
                <h3 className="text-xl font-semibold">{avgReadiness}%</h3>
              </div>
            </div>
          </div>

          {/* main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance vs Potential Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <NineBoxMatrix employees={mockEmployees} onCellClick={handleCellClick} selectedCell={selectedCell} />
                </CardContent>
              </Card>

              {selectedCell && employeesInSelectedCell.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Employees in Selected Cell ({employeesInSelectedCell.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {employeesInSelectedCell.map(emp => (
                        <div key={emp.id} className="p-3 bg-slate-900 rounded-lg flex items-center justify-between cursor-pointer hover:shadow" onClick={() => handleEmployeeClick(emp)}>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.name}`} />
                              <AvatarFallback>{getInitials(emp.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{emp.name}</p>
                              <p className="text-xs text-muted-foreground">{emp.title}</p>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">{emp.overallProgress}%</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-orange-400" />
                      <div>
                        <h4 className="font-medium">IDP Review</h4>
                        <p className="text-xs text-muted-foreground">Pending approvals</p>
                      </div>
                    </div>

                    <Badge variant="secondary">{pendingApprovals}</Badge>
                  </div>

                  {/* Search bar: full width with clear button */}
                  <div className="mb-3">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2"><Search className="w-4 h-4 text-muted-foreground" /></div>
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search name, title, role or id"
                        className="w-full pl-10 pr-10 py-2 rounded bg-slate-900 border border-slate-800 text-sm"
                        aria-label="Search pending approvals"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-slate-800"
                          aria-label="Clear search"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 max-h-[520px] overflow-y-auto">
                    {filteredPending.length === 0 ? (
                      <div className="text-center py-8 text-sm text-muted-foreground">No pending IDP reviews</div>
                    ) : (
                      filteredPending.map(emp => (
                        <div key={emp.id} className="p-3 rounded-lg hover:bg-slate-800 transition cursor-pointer" onClick={() => handleEmployeeClick(emp)}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{emp.name}</p>
                              <p className="text-xs text-muted-foreground">{emp.title}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>

                          <div className="mt-2 flex items-center gap-2">
                            <Badge className="bg-blue-600 text-xs">→ {emp.targetRole}</Badge>
                            <Badge variant="outline" className="text-xs">{emp.readinessLevel}</Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* competency gap */}
          <Card className="mt-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5" />
                <CardTitle className="m-0">Organizational Competency Gap Analysis</CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  'Strategic Thinking',
                  'Leadership',
                  'Financial Acumen',
                  'Operational Excellence',
                  'Stakeholder Management',
                  'Digital Transformation'
                ].map(comp => {
                  const avg = totalEmployees === 0 ? 0 : Math.round(mockEmployees.reduce((s,e) => s + (e.competencies?.[comp] || 0), 0) / totalEmployees);
                  const target = 8;
                  const gap = Math.max(0, target - avg);
                  return (
                    <div key={comp} className="p-3 bg-slate-900 rounded-lg text-center flex flex-col items-center justify-center">
                      <p className="text-xs text-muted-foreground mb-2">{comp}</p>
                      <p className="text-xl font-semibold">{avg}/10</p>
                      {gap > 0 && <Badge variant="outline" className="text-xs mt-2">Gap: {gap}</Badge>}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== Employee ID single ===== */}
        <TabsContent value="employee-id">
          <Card>
            <CardHeader>
              <CardTitle>Employee ID — Single Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeIdForm onSubmit={(payload) => console.log('EmployeeIdForm submitted', payload)} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== Employee ID bulk ===== */}
        <TabsContent value="employee-id-bulk">
          <Card>
            <CardHeader>
              <CardTitle>Employee ID — Bulk Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Upload CSV/Excel with columns: empId, password, currentRole, department, status. Map columns in uploader and confirm.</p>
              <DataUpload uploadMode="bulk" onBack={() => setActiveTab('overview')} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== Data Upload (restored) ===== */}
        <TabsContent value="data-upload">
          <Card>
            <CardHeader>
              <CardTitle>Data Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Upload employee data or IDP spreadsheets. Map columns and import.</p>
              <DataUpload onBack={() => setActiveTab('overview')} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== Success Profiles (restored) ===== */}
        <TabsContent value="success-profiles">
          <Card>
            <CardHeader>
              <CardTitle>Success Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <SuccessProfileManagement onBack={() => setActiveTab('overview')} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default HRDashboard;