import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Employee } from '../../lib/mockData';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

interface ManagerInputFormProps {
  employee: Employee;
  onBack: () => void;
  onSubmit: () => void;
}

export function ManagerInputForm({ employee, onBack, onSubmit }: ManagerInputFormProps) {
  const [formData, setFormData] = useState({
    qualityOfWork: employee.appraisalScores?.qualityOfWork || 3,
    dependability: employee.appraisalScores?.dependability || 3,
    initiative: employee.appraisalScores?.initiative || 3,
    collaboration: employee.appraisalScores?.collaboration || 3,
    leadership: employee.appraisalScores?.leadership || 3,
    potentialRating: '3',
    readinessLevel: employee.readinessLevel || '1 Year',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Appraisal input submitted successfully!');
    onSubmit();
  };

  const criteriaLabels: { [key: string]: string } = {
    qualityOfWork: 'Quality of Work',
    dependability: 'Dependability',
    initiative: 'Initiative & Innovation',
    collaboration: 'Collaboration & Teamwork',
    leadership: 'Leadership Potential',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1>Manager Appraisal Input</h1>
          <p className="text-muted-foreground mt-1">
            {employee.name} - {employee.title}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Performance Ratings */}
        <Card className="p-6">
          <h3 className="mb-6">Performance Ratings (1-5 Scale)</h3>
          <div className="space-y-6">
            {Object.entries(criteriaLabels).map(([key, label]) => (
              <div key={key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>{label}</Label>
                  <span className="text-sm px-3 py-1 rounded-full bg-blue-600">
                    {formData[key as keyof typeof formData]}
                  </span>
                </div>
                <Slider
                  value={[formData[key as keyof typeof formData] as number]}
                  onValueChange={(value : number[]) => setFormData({ ...formData, [key]: value[0] })}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 - Needs Improvement</span>
                  <span>3 - Meets Expectations</span>
                  <span>5 - Exceeds Expectations</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Potential & Readiness */}
        <Card className="p-6">
          <h3 className="mb-6">Potential & Readiness Assessment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Potential Rating</Label>
              <Select
                value={formData.potentialRating}
                onValueChange={(value : string) => setFormData({ ...formData, potentialRating: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Low Potential</SelectItem>
                  <SelectItem value="2">Medium Potential</SelectItem>
                  <SelectItem value="3">High Potential</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Employee's capacity for growth and advancement
              </p>
            </div>

            <div className="space-y-2">
              <Label>Readiness Level</Label>
              <Select
                value={formData.readinessLevel}
                onValueChange={(value : "Ready Now" | "1 Year" | "3 Years") => setFormData({ ...formData, readinessLevel: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ready Now">Ready Now</SelectItem>
                  <SelectItem value="1 Year">Ready in 1 Year</SelectItem>
                  <SelectItem value="3 Years">Ready in 3 Years</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Time required for target role readiness
              </p>
            </div>
          </div>
        </Card>

        {/* Key Strengths & Development Areas */}
        <Card className="p-6">
          <h3 className="mb-4">Additional Comments (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Key Strengths</Label>
              <textarea
                className="w-full min-h-[120px] p-3 rounded-lg bg-input border border-border"
                placeholder="List the employee's key strengths..."
              />
            </div>

            <div className="space-y-2">
              <Label>Development Areas</Label>
              <textarea
                className="w-full min-h-[120px] p-3 rounded-lg bg-input border border-border"
                placeholder="Areas for improvement and development..."
              />
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Submit Appraisal
          </Button>
        </div>
      </form>
    </div>
  );
}
