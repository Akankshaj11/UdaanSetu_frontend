import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { NineBoxMatrix } from '../shared/NineBoxMatrix';
import { mockEmployees, Employee } from '../../lib/mockData';
import { 
  Users, ClipboardCheck, Clock, TrendingUp, FileText, ChevronRight, BarChart3, Home, Upload, Star, List, 
  Eye, CheckCircle, XCircle, Brain, Target, BarChart, Zap, Star as StarIcon, Award, User, Calendar, FileText as FileTextIcon 
} from 'lucide-react';
import { DataUpload } from './DataUpload';
import { SuccessProfileManagement } from './SuccessProfileManagement';
import { EmployeeDetailView } from './EmployeeDetailView';
import logo from "../../images/logo1.png"; 


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

type View = 'overview' | 'data-upload' | 'success-profiles' | 'idp-requests' | 'employee-detail';
type Tab = 'profile' | 'gaps' | 'idp';

interface EmployeeDetailViewProps {
  employee: Employee;
  onBack: () => void;
}

function EmployeeDetailView({ employee, onBack }: EmployeeDetailViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'committee_approved':
        return <Badge className="bg-green-600"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case 'manager_approved':
        return <Badge className="bg-orange-600"><Clock className="w-3 h-3 mr-1" /> Pending Review</Badge>;
      default:
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" /> Manager Review</Badge>;
    }
  };

  const aiRecommendedActions = [
    { action: 'Complete Leadership 360 Assessment', priority: 'High', impact: 85 },
    { action: 'Strategic Thinking Workshop', priority: 'Medium', impact: 72 },
    { action: 'Cross-functional Project Leadership', priority: 'High', impact: 92 },
    { action: 'Executive Presentation Skills', priority: 'Low', impact: 65 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back
            </Button>
            <div className="flex items-center space-x-1">
              <Button variant={activeTab === 'profile' ? 'default' : 'ghost'} onClick={() => setActiveTab('profile')} className="gap-2">
                <User className="w-4 h-4" />
                Profile
              </Button>
              <Button variant={activeTab === 'gaps' ? 'default' : 'ghost'} onClick={() => setActiveTab('gaps')} className="gap-2">
                <Target className="w-4 h-4" />
                Gaps
              </Button>
              <Button variant={activeTab === 'idp' ? 'default' : 'ghost'} onClick={() => setActiveTab('idp')} className="gap-2">
                <Brain className="w-4 h-4" />
                AI IDP
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Profile Header */}
        <Card className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
            <div className="flex flex-col items-center lg:flex-row lg:items-center gap-6 w-full lg:w-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold mb-1">{employee.name}</h1>
                <p className="text-xl text-muted-foreground mb-2">{employee.title}</p>
                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(employee.idpStatus)}
                  <Badge variant="secondary" className="text-lg">
                    {employee.readinessLevel}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-auto flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="flex-1 sm:flex-none">
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{employee.overallProgress}%</div>
                  <div className="text-sm text-muted-foreground">Development Progress</div>
                </div>
                <div className="w-full bg-secondary rounded-full h-3 mt-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" 
                    style={{ width: `${employee.overallProgress}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{employee.nineBoxPosition.performance}/9</div>
                <div className="text-sm text-muted-foreground">Performance</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{employee.nineBoxPosition.potential}/9</div>
                <div className="text-sm text-muted-foreground">Potential</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile & Gaps Tab */}
          {activeTab === 'profile' && (
            <>
              <Card className="lg:col-span-2 p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile & Success Factors
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Target Role</h4>
                    <Badge className="bg-blue-600 text-lg px-4 py-2">{employee.targetRole}</Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Current Tenure</h4>
                    <p className="text-2xl font-bold">3.2 years</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Department</h4>
                    <p className="text-lg">{employee.department || 'Engineering'}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Manager</h4>
                    <p className="text-lg">Sarah Johnson</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Nine Box Position
                </h3>
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <div className="text-3xl font-bold text-white">
                      {employee.nineBoxPosition.performance}<br />
                      <span className="text-sm">Perf</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-1">{employee.nineBoxPosition.potential}/9 Potential</div>
                  <p className="text-muted-foreground">High potential, solid performer</p>
                </div>
              </Card>
            </>
          )}

          {/* Competency Gaps Tab */}
          {activeTab === 'gaps' && (
            <>
              <Card className="lg:col-span-2 p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BarChart className="w-5 h-5" />
                  Competency Gap Analysis
                </h3>
                <div className="space-y-4">
                  {Object.entries(employee.competencies).map(([skill, score]) => {
                    const target = 8;
                    const gap = Math.max(0, target - score);
                    return (
                      <div key={skill} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{skill}</p>
                          <p className="text-sm text-muted-foreground">{score}/10</p>
                        </div>
                        <div className="text-right">
                          <div className="w-20 bg-secondary rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${score >= target ? 'bg-green-600' : 'bg-orange-600'}`}
                              style={{ width: `${(score / 10) * 100}%` }}
                            />
                          </div>
                          {gap > 0 && (
                            <Badge variant="outline" className="text-xs mt-1">Gap: {gap}</Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">Priority Gaps</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <span className="font-medium">Strategic Thinking</span>
                    <Badge className="bg-orange-600">Gap: 2</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <span className="font-medium">Stakeholder Management</span>
                    <Badge className="bg-orange-600">Gap: 1</Badge>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* AI-Recommended IDP Tab */}
          {activeTab === 'idp' && (
            <>
              <Card className="lg:col-span-2 p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI-Recommended IDP
                </h3>
                <div className="space-y-4">
                  {aiRecommendedActions.map((action, index) => (
                    <div key={index} className="p-4 border rounded-xl hover:shadow-md transition-all bg-gradient-to-r from-blue-50 to-indigo-50">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{action.action}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={`bg-${action.priority === 'High' ? 'red' : action.priority === 'Medium' ? 'orange' : 'green'}-600`}>
                            {action.priority}
                          </Badge>
                          <div className="text-right">
                            <div className="font-bold text-lg">{action.impact}%</div>
                            <div className="text-xs text-muted-foreground">Impact</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Recommended by AI Coach</span>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Calendar className="w-3 h-3" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start gap-2" variant="outline">
                    <FileTextIcon className="w-4 h-4" />
                    Approve IDP
                  </Button>
                  <Button className="w-full justify-start gap-2" variant="outline">
                    <FileTextIcon className="w-4 h-4" />
                    Request Changes
                  </Button>
                  <Button className="w-full justify-start gap-2" variant="outline">
                    <StarIcon className="w-4 h-4" />
                    Promote to Ready Now
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function HRDashboard() {
  const [currentView, setCurrentView] = useState<View>('overview');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ performance: number; potential: number } | null>(null);

  const totalEmployees = mockEmployees.length;
  const pendingApprovals = mockEmployees.filter(emp => emp.idpStatus === 'manager_approved').length;
  const approvedIDPs = mockEmployees.filter(emp => emp.idpStatus === 'committee_approved').length;
  const avgReadiness = Math.round(mockEmployees.reduce((sum, emp) => sum + emp.overallProgress, 0) / totalEmployees);

  const handleCellClick = (performance: number, potential: number) => {
    setSelectedCell({ performance, potential });
  };

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setCurrentView('employee-detail');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
    setSelectedEmployee(null);
    setSelectedCell(null);
  };

  // Navigation handler
  const handleNavClick = (view: View) => {
    setCurrentView(view);
    setSelectedEmployee(null);
    setSelectedCell(null);
  };

  // Views are handled in the main JSX below via conditional rendering.

  const employeesInSelectedCell = selectedCell
    ? mockEmployees.filter(
        (emp) =>
          emp.nineBoxPosition.performance === selectedCell.performance &&
          emp.nineBoxPosition.potential === selectedCell.potential
      )
    : [];

  // Get all IDP requests (all employees)
  const allIDPRequests = mockEmployees;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">HR Committee Dashboard</h1>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant={currentView === 'overview' ? 'default' : 'ghost'}
                onClick={() => handleNavClick('overview')}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                Overview
              </Button>
              <Button
                variant={currentView === 'data-upload' ? 'default' : 'ghost'}
                onClick={() => handleNavClick('data-upload')}
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Data
              </Button>
              <Button
                variant={currentView === 'success-profiles' ? 'default' : 'ghost'}
                onClick={() => handleNavClick('success-profiles')}
                className="gap-2"
              >
                <Star className="w-4 h-4" />
                Success Profiles
              </Button>
              <Button
                variant={currentView === 'idp-requests' ? 'default' : 'ghost'}
                onClick={() => handleNavClick('idp-requests')}
                className="gap-2"
              >
                <List className="w-4 h-4" />
                IDP Requests
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Overview Dashboard */}
        {currentView === 'overview' && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-blue-600/20">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Pipeline</p>
                    <p className="text-2xl mt-1">{totalEmployees}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-orange-600/20">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Awaiting Review</p>
                    <p className="text-2xl mt-1">{pendingApprovals}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-green-600/20">
                    <ClipboardCheck className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Approved IDPs</p>
                    <p className="text-2xl mt-1">{approvedIDPs}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-purple-600/20">
                    <TrendingUp className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Readiness</p>
                    <p className="text-2xl mt-1">{avgReadiness}%</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 9-Box Matrix */}
              <div className="lg:col-span-2">
                <NineBoxMatrix
                  employees={mockEmployees}
                  onCellClick={handleCellClick}
                  selectedCell={selectedCell}
                />
              </div>

              {/* Approval Queue */}
              <Card className="p-6">
                <h3 className="mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  IDPs Awaiting Review
                </h3>
                <div className="space-y-3">
                  {mockEmployees
                    .filter((emp) => emp.idpStatus === 'manager_approved')
                    .map((emp) => (
                      <div
                        key={emp.id}
                        className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                        onClick={() => handleEmployeeClick(emp)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p>{emp.name}</p>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                        <p className="text-sm text-muted-foreground">{emp.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-blue-600 text-xs">
                            → {emp.targetRole}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {emp.readinessLevel}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  {mockEmployees.filter((emp) => emp.idpStatus === 'manager_approved').length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No pending approvals
                    </p>
                  )}
                </div>
              </Card>
            </div>

            {/* Selected Cell Details */}
            {selectedCell && employeesInSelectedCell.length > 0 && (
              <Card className="p-6">
                <h3 className="mb-4">
                  Employees in Selected Cell ({employeesInSelectedCell.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {employeesInSelectedCell.map((emp) => (
                    <div
                      key={emp.id}
                      className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                      onClick={() => handleEmployeeClick(emp)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p>{emp.name}</p>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{emp.title}</p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-600 text-xs">
                          → {emp.targetRole}
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{emp.overallProgress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                            <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${emp.overallProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Organizational Gap Analysis */}
            <Card className="p-6">
              <h3 className="mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Organizational Competency Gap Analysis
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {['Strategic Thinking', 'Leadership', 'Financial Acumen', 'Operational Excellence', 'Stakeholder Management', 'Digital Transformation'].map((competency) => {
                  const avgScore = Math.round(
                    mockEmployees.reduce((sum, emp) => sum + (emp.competencies[competency] || 0), 0) / totalEmployees
                  );
                  const targetScore = 8;
                  const gap = Math.max(0, targetScore - avgScore);
                  
                  return (
                    <div key={competency} className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm mb-2">{competency}</p>
                      <p className="text-2xl mb-1">{avgScore}/10</p>
                      {gap > 0 && (
                        <Badge variant="outline" className="text-xs">
                          Gap: {gap}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </>
        )}

        {/* IDP Requests tab with scrollable table */}
        {currentView === 'idp-requests' && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">IDP Requests ({allIDPRequests.length})</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{pendingApprovals} awaiting review</span>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left text-sm font-medium text-muted-foreground first:rounded-l-lg last:rounded-r-lg">Employee</th>
                      <th className="h-12 px-4 text-left text-sm font-medium text-muted-foreground">Title</th>
                      <th className="h-12 px-4 text-left text-sm font-medium text-muted-foreground">Target Role</th>
                      <th className="h-12 px-4 text-left text-sm font-medium text-muted-foreground">Readiness</th>
                      <th className="h-12 px-4 text-left text-sm font-medium text-muted-foreground">Progress</th>
                      <th className="h-12 px-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="h-12 px-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {allIDPRequests.map((emp) => (
                      <tr 
                        key={emp.id} 
                        className="hover:bg-muted/50 transition-colors cursor-pointer h-14"
                        onClick={() => handleEmployeeClick(emp)}
                      >
                        <td className="px-4 py-3 font-medium">{emp.name}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{emp.title}</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-blue-600/90 text-xs">{emp.targetRole}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-xs">{emp.readinessLevel}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-secondary rounded-full h-2">
                                <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${emp.overallProgress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{emp.overallProgress}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {emp.idpStatus === 'committee_approved' && (
                            <Badge className="bg-green-600 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approved
                            </Badge>
                          )}
                          {emp.idpStatus === 'manager_approved' && (
                            <Badge className="bg-orange-600 text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending Review
                            </Badge>
                          )}
                          {emp.idpStatus === 'draft' && (
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              Manager Review
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEmployeeClick(emp);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {allIDPRequests.length === 0 && (
                      <tr>
                        <td colSpan={7} className="h-24 text-center py-12">
                          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No IDP requests found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}