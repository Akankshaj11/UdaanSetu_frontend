import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { RadarChart } from '../shared/RadarChart';
import { Employee, getActivitiesByEmployeeId, getSuccessProfileByRole } from '../../lib/mockData';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, BookOpen, Users, TrendingUp, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

interface IDPApprovalProps {
  employee: Employee;
  onBack: () => void;
  onApprove: () => void;
}

export function IDPApproval({ employee, onBack, onApprove }: IDPApprovalProps) {
  const activities = getActivitiesByEmployeeId(employee.id);
  const successProfile = getSuccessProfileByRole(employee.targetRole);
  const [comments, setComments] = useState('');

  const handleApprove = () => {
    toast.success(`IDP approved for ${employee.name}. Sent to committee for final approval.`);
    onApprove();
  };

  const handleRequestRevision = () => {
    if (!comments.trim()) {
      toast.error('Please provide comments for revision');
      return;
    }
    toast.success(`Revision request sent to ${employee.name}`);
    onApprove();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'training': return <BookOpen className="w-5 h-5" />;
      case 'rotation': return <TrendingUp className="w-5 h-5" />;
      case 'mentorship': return <Users className="w-5 h-5" />;
      case 'project': return <Briefcase className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'training': return 'bg-blue-600';
      case 'rotation': return 'bg-purple-600';
      case 'mentorship': return 'bg-green-600';
      case 'project': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1>IDP Review & Approval</h1>
          <p className="text-muted-foreground mt-1">
            {employee.name} - {employee.title} → {employee.targetRole}
          </p>
        </div>
        <Badge className="bg-blue-600">
          {employee.readinessLevel}
        </Badge>
      </div>

      {/* Employee Profile Summary */}
      <Card className="p-6">
        <h3 className="mb-4">Employee Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Current Position</p>
            <p className="mt-1">{employee.title}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Department</p>
            <p className="mt-1">{employee.department}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Target Role</p>
            <p className="mt-1">{employee.targetRole}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div>
            <p className="text-sm text-muted-foreground">Performance Rating</p>
            <p className="mt-1">{employee.nineBoxPosition.performance}/3</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Potential Rating</p>
            <p className="mt-1">{employee.nineBoxPosition.potential}/3</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">9-Box Position</p>
            <Badge className="mt-1 bg-green-600">High Performer / High Potential</Badge>
          </div>
        </div>
      </Card>

      {/* Competency Gap Analysis */}
      {successProfile && (
        <RadarChart
          currentCompetencies={employee.competencies}
          targetCompetencies={successProfile.requiredCompetencies}
          title="Competency Gap Analysis"
        />
      )}

      {/* Identified Gaps */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          AI-Identified Development Gaps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {successProfile && Object.entries(successProfile.requiredCompetencies).map(([competency, targetLevel]) => {
            const currentLevel = employee.competencies[competency] || 0;
            const gap = targetLevel - currentLevel;
            
            if (gap <= 0) return null;
            
            return (
              <div key={competency} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span>{competency}</span>
                  <Badge variant="outline">Gap: {gap}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Current: {currentLevel}</span>
                  <span>→</span>
                  <span>Target: {targetLevel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* AI-Recommended IDP Activities */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-500" />
          AI-Recommended Development Activities
        </h3>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="mb-1">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <Badge className={`${getActivityColor(activity.type)} capitalize`}>
                    {activity.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span>Target Date: {new Date(activity.targetDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Manager Comments */}
      <Card className="p-6">
        <h3 className="mb-4">Manager Comments</h3>
        <Textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Add your comments, recommendations, or concerns about this IDP..."
          rows={4}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground mt-2">
          These comments will be shared with the HR committee and the employee if revisions are requested.
        </p>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pb-6">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={handleRequestRevision}
          className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Request Revision
        </Button>
        <Button
          onClick={handleApprove}
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Approve & Send to Committee
        </Button>
      </div>
    </div>
  );
}
