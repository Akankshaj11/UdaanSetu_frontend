// EmployeeDashboard.tsx
import React, { Component, ErrorInfo, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '../ui/dialog';
import { RadarChart } from '../shared/RadarChart';
import { ProgressChart } from '../shared/ProgressChart';
import {
  getEmployeeById,
  getActivitiesByEmployeeId,
  getSuccessProfileByRole,
  IDPActivity
} from '../../lib/mockData';
import {
  CheckCircle2,
  Circle,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  Users,
  Briefcase
} from 'lucide-react';
import { toast } from 'sonner';

interface EmployeeDashboardProps {
  employeeId: string;
}

/** ErrorBoundary to catch runtime render errors and show useful info */
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error?: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, info: ErrorInfo) {
    console.error('EmployeeDashboard ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <h3 className="text-red-600">Something went wrong rendering the Employee Dashboard.</h3>
          <pre className="mt-4 whitespace-pre-wrap text-sm bg-slate-50 p-3 rounded">{String(this.state.error)}</pre>
          <div className="mt-4">
            <Button onClick={() => window.location.reload()}>Reload</Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/** (Same safe api wrapper as before) */
const api = {
  async fetchEmployee(employeeId: string) {
    await new Promise((r) => setTimeout(r, 150));
    try {
      return getEmployeeById(employeeId);
    } catch (e) {
      console.error('fetchEmployee mock failed', e);
      return null;
    }
  },
  async fetchActivities(employeeId: string) {
    await new Promise((r) => setTimeout(r, 150));
    try {
      return (getActivitiesByEmployeeId(employeeId) || []).map((a) => ({ ...a }));
    } catch (e) {
      console.error('fetchActivities mock failed', e);
      return [];
    }
  },
  async markActivityComplete(activityId: string, payload: { remarks?: string; progress?: number }) {
    await new Promise((r) => setTimeout(r, 200));
    return { success: true, activityId, ...payload };
  },
  async updateRemark(activityId: string, payload: { remarks: string; progress?: number; status?: IDPActivity['status'] }) {
    await new Promise((r) => setTimeout(r, 200));
    return { success: true, activityId, ...payload };
  }
};

const sanitizeRemarks = (text: string, max = 1000) => {
  const t = (text || '').trim();
  return t.length > max ? t.slice(0, max) : t;
};

const formatDate = (iso?: string | null) => {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    const formatted = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const diffMs = d.getTime() - Date.now();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (days === 0) return `${formatted} (today)`;
    if (days > 0) return `${formatted} (in ${days}d)`;
    return `${formatted} (${Math.abs(days)}d overdue)`;
  } catch {
    return iso;
  }
};

export function EmployeeDashboard({ employeeId }: EmployeeDashboardProps) {
  const [employee, setEmployee] = useState<any>(() => {
    try { return getEmployeeById(employeeId); } catch { return null; }
  });
  const [activities, setActivities] = useState<IDPActivity[]>(() => {
    try { return getActivitiesByEmployeeId(employeeId) || []; } catch { return []; }
  });
  const [selectedActivity, setSelectedActivity] = useState<IDPActivity | null>(null);
  const [remarks, setRemarks] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<'all' | 'not_started' | 'in_progress' | 'completed'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    (async () => {
      try {
        console.log('[EmployeeDashboard] loading data for', employeeId);
        const [emp, acts] = await Promise.all([api.fetchEmployee(employeeId), api.fetchActivities(employeeId)]);
        if (!mounted) return;
        setEmployee(emp || null);
        setActivities(acts || []);
      } catch (err) {
        console.error('Failed to load employee dashboard data', err);
        toast.error('Failed to load data. Check console.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => { mounted = false; setSelectedActivity(null); setRemarks(''); };
  }, [employeeId]);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!employee) return <div className="p-6">Employee not found — check employeeId and mockData exports.</div>;

  const successProfile = (() => {
    try { return getSuccessProfileByRole(employee.targetRole); } catch (e) { console.warn('successProfile lookup failed', e); return null; }
  })();

  const getActivityIcon = useCallback((type: IDPActivity['type']) => {
    switch (type) {
      case 'training': return <BookOpen className="w-5 h-5" aria-hidden />;
      case 'rotation': return <TrendingUp className="w-5 h-5" aria-hidden />;
      case 'mentorship': return <Users className="w-5 h-5" aria-hidden />;
      case 'project': return <Briefcase className="w-5 h-5" aria-hidden />;
      default: return <Circle className="w-5 h-5" aria-hidden />;
    }
  }, []);

  const getActivityColor = useCallback((type: IDPActivity['type']) => {
    switch (type) {
      case 'training': return 'bg-blue-600';
      case 'rotation': return 'bg-purple-600';
      case 'mentorship': return 'bg-green-600';
      case 'project': return 'bg-orange-600';
      default: return 'bg-gray-400';
    }
  }, []);

  const getStatusBadge = useCallback((status: IDPActivity['status']) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-600">Completed</Badge>;
      case 'in_progress': return <Badge className="bg-blue-600">In Progress</Badge>;
      case 'not_started': return <Badge variant="outline">Not Started</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  }, []);

  const completedCount = useMemo(() => activities.filter(a => a.status === 'completed').length, [activities]);
  const inProgressCount = useMemo(() => activities.filter(a => a.status === 'in_progress').length, [activities]);

  const visibleActivities = useMemo(() => {
    return activities
      .filter(a => (filter === 'all' ? true : a.status === filter))
      .filter(a => (search ? (a.title + ' ' + (a.description || '')).toLowerCase().includes(search.toLowerCase()) : true))
      .sort((x, y) => {
        const dx = x.targetDate ? new Date(x.targetDate).getTime() : Infinity;
        const dy = y.targetDate ? new Date(y.targetDate).getTime() : Infinity;
        return dx - dy;
      });
  }, [activities, filter, search]);

  const optimisticUpdateActivity = (activityId: string, patch: Partial<IDPActivity>) => {
    setActivities(prev => prev.map(a => a.id === activityId ? { ...a, ...patch } : a));
  };

  const handleMarkComplete = useCallback(async () => {
    if (!selectedActivity) return;
    const id = selectedActivity.id;
    const sanitized = sanitizeRemarks(remarks, 1000);
    const previous = activities.find(a => a.id === id);
    if (!previous) return;
    optimisticUpdateActivity(id, { status: 'completed', progress: 100, remarks: sanitized });
    setSaving(true);
    try {
      const res = await api.markActivityComplete(id, { remarks: sanitized, progress: 100 });
      if (res?.success) {
        toast.success('Activity marked as completed!', {
          action: {
            label: 'Undo',
            onClick: () => setActivities(prev => prev.map(a => a.id === id ? previous : a))
          }
        });
      } else throw new Error('API returned failure');
    } catch (err) {
      setActivities(prev => prev.map(a => a.id === id ? previous : a));
      console.error(err);
      toast.error('Failed to mark complete. See console.');
    } finally {
      setSaving(false);
      setSelectedActivity(null);
      setRemarks('');
    }
  }, [selectedActivity, activities, remarks]);

  const handleAddRemark = useCallback(async (opts?: { progress?: number; status?: IDPActivity['status'] }) => {
    if (!selectedActivity) return;
    const id = selectedActivity.id;
    const sanitized = sanitizeRemarks(remarks, 1000);
    const previous = activities.find(a => a.id === id);
    if (!previous) return;
    const patch: Partial<IDPActivity> = { remarks: sanitized };
    if (typeof opts?.progress === 'number') patch.progress = opts.progress;
    if (opts?.status) patch.status = opts.status;
    optimisticUpdateActivity(id, patch);
    setSaving(true);
    try {
      const res = await api.updateRemark(id, { remarks: sanitized, progress: patch.progress, status: patch.status });
      if (res?.success) {
        toast.success('Update saved');
      } else throw new Error('API failure');
    } catch (err) {
      setActivities(prev => prev.map(a => a.id === id ? previous : a));
      console.error(err);
      toast.error('Failed to save. See console.');
    } finally {
      setSaving(false);
      setSelectedActivity(null);
      setRemarks('');
    }
  }, [selectedActivity, activities, remarks]);

  // If no activities at all, friendly CTA
  if (!visibleActivities.length) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Development Plan</h1>
            <p className="text-muted-foreground mt-1">{employee.title} → {employee.targetRole}</p>
          </div>
          <Badge className="bg-blue-600 text-lg px-4 py-2">{employee.readinessLevel}</Badge>
        </div>
        <Card className="p-6 text-center">
          <h3 className="text-lg font-semibold">No activities found</h3>
          <p className="text-sm text-muted-foreground">Request an IDP generation or contact HR.</p>
          <div className="mt-3"><Button onClick={() => toast('Request sent')}>Request IDP</Button></div>
        </Card>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6 p-6">
        {/* header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Development Plan</h1>
            <p className="text-muted-foreground mt-1">{employee.title} → {employee.targetRole}</p>
          </div>
          <Badge className="bg-blue-600 text-lg px-4 py-2">{employee.readinessLevel}</Badge>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6"><div className="flex items-center gap-3"><div className="p-3 rounded-lg bg-blue-600/20"><Target className="w-6 h-6 text-blue-500" /></div><div><p className="text-sm text-muted-foreground">Target Role</p><p className="mt-1">{employee.targetRole}</p></div></div></Card>
          <Card className="p-6"><div className="flex items-center gap-3"><div className="p-3 rounded-lg bg-green-600/20"><CheckCircle2 className="w-6 h-6 text-green-500" /></div><div><p className="text-sm text-muted-foreground">Completed Activities</p><p className="mt-1">{completedCount} / {activities.length}</p></div></div></Card>
          <Card className="p-6"><div className="flex items-center gap-3"><div className="p-3 rounded-lg bg-orange-600/20"><Clock className="w-6 h-6 text-orange-500" /></div><div><p className="text-sm text-muted-foreground">In Progress</p><p className="mt-1">{inProgressCount} Activities</p></div></div></Card>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col items-center justify-center" aria-live="polite">
            <h3 className="mb-4 text-lg font-semibold">Overall Progress</h3>
            {/* Guard ProgressChart with try/catch-like defensive rendering */}
            {typeof ProgressChart === 'function' ? (
              <ProgressChart progress={employee.overallProgress} />
            ) : (
              <div>ProgressChart not available</div>
            )}
            <p className="text-sm text-muted-foreground mt-4 text-center">Keep up the great work! You're on track to reach your goal.</p>
          </Card>

          <div className="lg:col-span-2">
            {successProfile && typeof RadarChart === 'function' ? (
              <RadarChart currentCompetencies={employee.competencies} targetCompetencies={successProfile.requiredCompetencies} title="Competency Gap Analysis" />
            ) : (
              <Card className="p-4">Competency data not available</Card>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <label className="text-sm text-muted-foreground mr-2">Filter</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="px-2 py-1 rounded border">
              <option value="all">All</option>
              <option value="not_started">Not started</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
            <input placeholder="Search activities..." value={search} onChange={(e) => setSearch(e.target.value)} className="ml-4 px-2 py-1 border rounded" />
          </div>
          <div className="text-sm text-muted-foreground">{visibleActivities.length} activities shown</div>
        </div>

        {/* Activities list */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">My Personalized IDP Activities</h2>
          <div className="grid grid-cols-1 gap-4">
            {visibleActivities.map(activity => (
              <Card key={activity.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`} aria-hidden>{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="mb-1 text-base font-semibold">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                      {getStatusBadge(activity.status)}
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm">{activity.progress}%</span>
                      </div>
                      <Progress value={activity.progress} className="h-2" aria-valuenow={activity.progress} />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" aria-hidden />
                        <span>Target: {formatDate(activity.targetDate)}</span>
                      </div>
                      <div className="flex gap-2">
                        {activity.status !== 'completed' && <Button size="sm" variant="outline" onClick={() => { setSelectedActivity(activity); setRemarks(activity.remarks || ''); }}>Update Status</Button>}
                        {activity.remarks && <Button size="sm" variant="ghost" onClick={() => { setSelectedActivity(activity); setRemarks(activity.remarks || ''); }}>View Remarks</Button>}
                      </div>
                    </div>

                    {activity.remarks && <div className="mt-3 p-3 bg-muted rounded-lg"><p className="text-sm text-muted-foreground"><span className="font-medium">Latest Update:</span> {activity.remarks}</p></div>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Dialog */}
        <Dialog open={!!selectedActivity} onOpenChange={(open) => { if (!open) setSelectedActivity(null); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedActivity?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{selectedActivity?.description}</p>
                <div className="flex items-center gap-2 mt-2"><span className="text-sm">Current Status:</span>{selectedActivity && getStatusBadge(selectedActivity.status)}</div>
              </div>

              <div className="space-y-2">
                <label className="text-sm">Add/Update Remarks</label>
                <Textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Share your progress..." rows={4} maxLength={1000} />
              </div>

              <div className="space-y-2">
                <label className="text-sm">Progress (%)</label>
                <input type="range" min={0} max={100} value={selectedActivity?.progress ?? 0} onChange={(e) => { if (!selectedActivity) return; const v = Number(e.target.value); setSelectedActivity({ ...selectedActivity, progress: v }); setRemarks((r) => r || `Progress updated to ${v}%`); }} />
                <div className="text-sm text-muted-foreground">Set progress and then Save Remarks to persist.</div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setSelectedActivity(null); setRemarks(''); }}>Cancel</Button>
              {selectedActivity?.status !== 'completed' && <Button onClick={async () => { await handleMarkComplete(); }} className="bg-green-600 hover:bg-green-700" disabled={saving}>{saving ? 'Saving...' : 'Mark as Completed'}</Button>}
              <Button onClick={async () => { const progress = selectedActivity?.progress; const status = progress === 100 ? 'completed' : selectedActivity?.status; await handleAddRemark({ progress, status }); }} className="bg-blue-600 hover:bg-blue-700" disabled={saving}>{saving ? 'Saving...' : 'Save Remarks'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ErrorBoundary>
  );
}
