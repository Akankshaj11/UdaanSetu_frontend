import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RadarChart } from '../shared/RadarChart';
import { ProgressChart } from '../shared/ProgressChart';
import { Employee, getActivitiesByEmployeeId, getSuccessProfileByRole } from '../../lib/mockData';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, User, Target, TrendingUp, BookOpen, Users, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

interface EmployeeDetailViewProps {
  employee: Employee;
  onBack: () => void;
}

export function EmployeeDetailView({ employee, onBack }: EmployeeDetailViewProps) {
  const activities = getActivitiesByEmployeeId(employee.id);
  const successProfile = getSuccessProfileByRole(employee.targetRole);
  const [comments, setComments] = useState('');

  const handleApprove = () => {
    toast.success(`IDP approved for ${employee.name}. Employee will be notified.`);
    onBack();
  };

  const handleSendBack = () => {
    if (!comments.trim()) {
      toast.error('Please provide comments for revision');
      return;
    }
    toast.success(`Revision request sent to manager for ${employee.name}`);
    onBack();
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
          <h1>Employee Profile & IDP Review</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive view and final approval
          </p>
        </div>
        <Badge className={
          employee.idpStatus === 'committee_approved' ? 'bg-green-600' :
          employee.idpStatus === 'manager_approved' ? 'bg-blue-600' :
          employee.idpStatus === 'pending_revision' ? 'bg-orange-600' :
          'bg-gray-600'
        }>
          {employee.idpStatus === 'committee_approved' ? 'Committee Approved' :
           employee.idpStatus === 'manager_approved' ? 'Awaiting Committee Review' :
           employee.idpStatus === 'pending_revision' ? 'Pending Revision' :
           'Draft'}
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="profile">Profile & Gaps</TabsTrigger>
          <TabsTrigger value="idp">AI-Recommended IDP</TabsTrigger>
        </TabsList>

        {/* Tab 1: Profile & Gaps */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          {/* Employee Overview */}
          <Card className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl">
                {employee.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="mb-1">{employee.name}</h2>
                <p className="text-muted-foreground mb-4">{employee.title} | {employee.department}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Performance</p>
                    <p className="mt-1">{employee.nineBoxPosition.performance}/3</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Potential</p>
                    <p className="mt-1">{employee.nineBoxPosition.potential}/3</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Readiness</p>
                    <Badge className="mt-1 bg-blue-600">{employee.readinessLevel}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Target Role</p>
                    <p className="mt-1">{employee.targetRole}</p>
                  </div>
                </div>
              </div>

              {/* Progress Circle */}
              <div>
                <ProgressChart progress={employee.overallProgress} size={120} />
              </div>
            </div>
          </Card>

          {/* Appraisal Scores */}
          <Card className="p-6">
            <h3 className="mb-4">Manager Appraisal Scores</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Quality of Work</p>
                <p className="text-2xl">{employee.appraisalScores.qualityOfWork}/5</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Dependability</p>
                <p className="text-2xl">{employee.appraisalScores.dependability}/5</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Initiative</p>
                <p className="text-2xl">{employee.appraisalScores.initiative}/5</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Collaboration</p>
                <p className="text-2xl">{employee.appraisalScores.collaboration}/5</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Leadership</p>
                <p className="text-2xl">{employee.appraisalScores.leadership}/5</p>
              </div>
            </div>
          </Card>

          {/* Competency Radar Chart */}
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
                      <Badge variant="outline" className={gap > 3 ? 'border-red-500 text-red-500' : 'border-yellow-500 text-yellow-500'}>
                        Gap: {gap}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Current: {currentLevel}</span>
                      <span>→</span>
                      <span>Target: {targetLevel}</span>
                    </div>
                    <div className="mt-2 w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(currentLevel / targetLevel) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Tab 2: AI-Recommended IDP */}
        <TabsContent value="idp" className="space-y-6 mt-6">
          {/* IDP Activities */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              AI-Recommended Development Plan
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              The following activities have been personalized based on competency gaps, career trajectory, and organizational needs.
            </p>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background">
                    <span className="text-sm">{index + 1}</span>
                  </div>
                  <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="mb-1">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                      <Badge className={`${getActivityColor(activity.type)} capitalize`}>
                        {activity.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="text-muted-foreground">Target: {new Date(activity.targetDate).toLocaleDateString()}</span>
                      <span className="text-muted-foreground">•</span>
                      <span>Status: {activity.status.replace('_', ' ')}</span>
                      <span className="text-muted-foreground">•</span>
                      <span>Progress: {activity.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Success Profile Requirements */}
          {successProfile && (
            <Card className="p-6">
              <h3 className="mb-4">Target Role: {successProfile.roleTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-3">Required Functional Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {successProfile.functionalSkills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-3">Geographical Experience</h4>
                  <div className="flex flex-wrap gap-2">
                    {successProfile.geographicalExperience.map((geo) => (
                      <Badge key={geo} className="bg-green-600">
                        {geo}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Minimum Experience Required: <span className="text-foreground">{successProfile.minimumExperience} years</span>
                </p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Committee Comments & Actions */}
      {employee.idpStatus === 'manager_approved' && (
        <Card className="p-6">
          <h3 className="mb-4">Committee Review</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm">Committee Comments</label>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add comments for the employee or manager..."
                rows={4}
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onBack}>
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={handleSendBack}
                className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Send Back for Revision
              </Button>
              <Button
                onClick={handleApprove}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve IDP
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* View Only Mode for Approved IDPs */}
      {employee.idpStatus === 'committee_approved' && (
        <Card className="p-6 bg-green-600/10 border-green-600/30">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <div>
              <h4>IDP Approved</h4>
              <p className="text-sm text-muted-foreground mt-1">
                This IDP has been approved by the committee and is now active.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
