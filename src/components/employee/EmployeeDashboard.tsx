import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { RadarChart } from '../shared/RadarChart';
import { ProgressChart } from '../shared/ProgressChart';
import { getEmployeeById, getActivitiesByEmployeeId, getSuccessProfileByRole, IDPActivity } from '../../lib/mockData';
import { CheckCircle2, Circle, Clock, Target, TrendingUp, BookOpen, Users, Briefcase } from 'lucide-react';
import { toast } from 'sonner';


interface EmployeeDashboardProps {
  employeeId: string;
}

export function EmployeeDashboard({ employeeId }: EmployeeDashboardProps) {
  const employee = getEmployeeById(employeeId);
  const [activities, setActivities] = useState(getActivitiesByEmployeeId(employeeId));
  const [selectedActivity, setSelectedActivity] = useState<IDPActivity | null>(null);
  const [remarks, setRemarks] = useState('');

  if (!employee) return <div>Employee not found</div>;

  const successProfile = getSuccessProfileByRole(employee.targetRole);

  const getActivityIcon = (type: IDPActivity['type']) => {
    switch (type) {
      case 'training': return <BookOpen className="w-5 h-5" />;
      case 'rotation': return <TrendingUp className="w-5 h-5" />;
      case 'mentorship': return <Users className="w-5 h-5" />;
      case 'project': return <Briefcase className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: IDPActivity['type']) => {
    switch (type) {
      case 'training': return 'bg-blue-600';
      case 'rotation': return 'bg-purple-600';
      case 'mentorship': return 'bg-green-600';
      case 'project': return 'bg-orange-600';
    }
  };

  const getStatusBadge = (status: IDPActivity['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-600">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-600">In Progress</Badge>;
      case 'not_started':
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const handleMarkComplete = () => {
    if (!selectedActivity) return;
    
    setActivities(prev => prev.map(act => 
      act.id === selectedActivity.id 
        ? { ...act, status: 'completed' as const, progress: 100, remarks: remarks || act.remarks }
        : act
    ));
    
    toast.success('Activity marked as completed!');
    setSelectedActivity(null);
    setRemarks('');
  };

  const handleAddRemark = () => {
    if (!selectedActivity) return;
    
    setActivities(prev => prev.map(act => 
      act.id === selectedActivity.id 
        ? { ...act, remarks: remarks || act.remarks }
        : act
    ));
    
    toast.success('Remark added successfully!');
    setSelectedActivity(null);
    setRemarks('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1>My Development Plan</h1>
          <p className="text-muted-foreground mt-1">
            {employee.title} → {employee.targetRole}
          </p>
        </div>
        <Badge className="bg-blue-600 text-lg px-4 py-2">
          {employee.readinessLevel}
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-600/20">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Target Role</p>
              <p className="mt-1">{employee.targetRole}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-600/20">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed Activities</p>
              <p className="mt-1">
                {activities.filter(a => a.status === 'completed').length} / {activities.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-orange-600/20">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="mt-1">
                {activities.filter(a => a.status === 'in_progress').length} Activities
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Chart */}
        <Card className="p-6 flex flex-col items-center justify-center">
          <h3 className="mb-4">Overall Progress</h3>
          <ProgressChart progress={employee.overallProgress} />
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Keep up the great work! You're on track to reach your goal.
          </p>
        </Card>

        {/* Competency Radar */}
        <div className="lg:col-span-2">
          {successProfile && (
            <RadarChart
              currentCompetencies={employee.competencies}
              targetCompetencies={successProfile.requiredCompetencies}
              title="Competency Gap Analysis"
            />
          )}
        </div>
      </div>

      {/* IDP Activities */}
      <div>
        <h2 className="mb-4">My Personalized IDP Activities</h2>
        <div className="grid grid-cols-1 gap-4">
          {activities.map((activity) => (
            <Card key={activity.id} className="p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="mb-1">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    {getStatusBadge(activity.status)}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm">{activity.progress}%</span>
                    </div>
                    <Progress value={activity.progress} className="h-2" />
                  </div>

                  {/* Target Date */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Target: {new Date(activity.targetDate).toLocaleDateString()}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {activity.status !== 'completed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedActivity(activity);
                            setRemarks(activity.remarks || '');
                          }}
                        >
                          Update Status
                        </Button>
                      )}
                      {activity.remarks && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedActivity(activity);
                            setRemarks(activity.remarks || '');
                          }}
                        >
                          View Remarks
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Remarks Preview */}
                  {activity.remarks && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Latest Update:</span> {activity.remarks}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Update Dialog */}
      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedActivity?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{selectedActivity?.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">Current Status:</span>
                {selectedActivity && getStatusBadge(selectedActivity.status)}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Add/Update Remarks</label>
              <Textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Share your progress, challenges, or learnings..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedActivity(null)}>
              Cancel
            </Button>
            {selectedActivity?.status !== 'completed' && (
              <Button onClick={handleMarkComplete} className="bg-green-600 hover:bg-green-700">
                Mark as Completed
              </Button>
            )}
            <Button onClick={handleAddRemark} className="bg-blue-600 hover:bg-blue-700">
              Save Remarks
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
