import React, { useMemo, useState, useCallback } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { mockSuccessProfiles, SuccessProfile } from '../../lib/mockData';
import { ArrowLeft, Plus, Edit, Trash2, Target } from 'lucide-react';
import { toast } from 'sonner';

const LOGO_PATH = '/mnt/data/669bd3f1-9bf0-43c9-b187-87433b4e58b0.png';

interface SuccessProfileManagementProps {
  onBack: () => void;
}

export function SuccessProfileManagement({ onBack }: SuccessProfileManagementProps) {
  const [profiles, setProfiles] = useState<SuccessProfile[]>(mockSuccessProfiles);
  const [showDialog, setShowDialog] = useState(false);
  const [editingProfile, setEditingProfile] = useState<SuccessProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const competencyOptions = useMemo(
    () => [
      'Strategic Thinking',
      'Leadership',
      'Financial Acumen',
      'Operational Excellence',
      'Stakeholder Management',
      'Digital Transformation',
    ],
    []
  );

  const createEmptyProfile = useCallback((): SuccessProfile => ({
    id: '',
    roleTitle: '',
    minimumExperience: 0,
    requiredCompetencies: competencyOptions.reduce<Record<string, number>>((acc, competency) => {
      acc[competency] = 5;
      return acc;
    }, {}),
    functionalSkills: [],
    geographicalExperience: [],
  }), [competencyOptions]);

  const [formData, setFormData] = useState<SuccessProfile>(createEmptyProfile());

  const handleDialogClose = (isOpen: boolean) => {
    setShowDialog(isOpen);
    if (!isOpen) {
      setEditingProfile(null);
      setFormData(createEmptyProfile());
    }
  };

  const handleCreateNew = () => {
    setEditingProfile(null);
    setFormData(createEmptyProfile());
    setShowDialog(true);
  };

  const handleEdit = (profile: SuccessProfile) => {
    setEditingProfile(profile);
    setFormData({
      ...profile,
      requiredCompetencies: { ...profile.requiredCompetencies },
      functionalSkills: [...profile.functionalSkills],
      geographicalExperience: [...profile.geographicalExperience],
    });
    setShowDialog(true);
  };

  const handleDelete = (profileId: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== profileId));
    toast.success('Success profile deleted');
  };

  const handleNumericInput = (value: string, min = 0, max = Infinity): number => {
    const parsedValue = Number(value);
    if (Number.isNaN(parsedValue)) {
      return min;
    }
    return Math.min(Math.max(parsedValue, min), max);
  };

  const handleListInputChange = (
    value: string,
    field: 'functionalSkills' | 'geographicalExperience'
  ) => {
    const parsed = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    setFormData((prev) => ({
      ...prev,
      [field]: parsed,
    }));
  };

  const filteredProfiles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return profiles;
    }

    return profiles.filter((profile) => {
      const searchableText = [
        profile.roleTitle,
        profile.functionalSkills.join(' '),
        profile.geographicalExperience.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [profiles, searchQuery]);

  const handleSave = () => {
    if (!formData.roleTitle.trim()) {
      toast.error('Role title is required');
      return;
    }
    if (formData.minimumExperience <= 0) {
      toast.error('Minimum experience should be greater than 0');
      return;
    }

    const invalidCompetency = (
      Object.entries(formData.requiredCompetencies) as [string, number][]
    ).find(([, level]) => level < 1 || level > 10);

    if (invalidCompetency) {
      toast.error(`Competency rating for ${invalidCompetency[0]} must be between 1 and 10.`);
      return;
    }

    const payload: SuccessProfile = {
      ...formData,
      id: editingProfile ? editingProfile.id : `sp-${Date.now()}`,
    };

    if (editingProfile) {
      setProfiles((prev) => prev.map((p) => (p.id === editingProfile.id ? payload : p)));
      toast.success('Success profile updated');
    } else {
      setProfiles((prev) => [payload, ...prev]);
      toast.success('Success profile created');
    }

    handleDialogClose(false);
  };

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-12 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Success Profile Management</h1>
            <p className="text-muted-foreground mt-1">
              Define competency benchmarks for key leadership roles
            </p>
          </div>
        </div>
        <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create New Profile
        </Button>
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-blue-600/10 border-blue-600/30 mb-8">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="mb-2 font-medium">What are Success Profiles?</h4>
            <p className="text-sm text-muted-foreground">
              Success Profiles define the competencies, skills, and experience required for key
              leadership roles. The AI recommendation engine uses these profiles to identify gaps
              and suggest personalized development activities.
            </p>
          </div>
        </div>
      </Card>

      {/* Search + Success Profiles List */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="w-full md:max-w-sm">
            <Label htmlFor="search-profiles" className="text-sm text-muted-foreground">
              Search by role, skill, or geography
            </Label>
            <Input
              id="search-profiles"
              placeholder="e.g., CFO, Leadership, APAC"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="mt-1"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Showing {filteredProfiles.length} of {profiles.length} profiles
          </div>
        </div>

        {filteredProfiles.length === 0 && (
          <Card className="p-6 text-center text-muted-foreground">
            No success profiles match your search.
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <Card key={profile.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{profile.roleTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    Minimum Experience: {profile.minimumExperience} years
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(profile)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(profile.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Required Competencies */}
              <div className="mb-6">
                <h4 className="mb-3 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                  Required Competencies
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(profile.requiredCompetencies).map(([competency, level]) => (
                    <div
                      key={competency}
                      className="flex items-center justify-between p-3 bg-muted/50 hover:bg-muted rounded-lg border"
                    >
                      <span className="text-sm font-medium text-foreground">{competency}</span>
                      <Badge className="bg-blue-600 text-white px-2 py-1">
                        {level}/10
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Functional Skills */}
              {profile.functionalSkills.length > 0 && (
                <div className="mb-6">
                  <h4 className="mb-3 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                    Functional Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.functionalSkills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Geographical Experience */}
              {profile.geographicalExperience.length > 0 && (
                <div>
                  <h4 className="mb-3 font-medium text-sm uppercase tracking-wider text-muted-foreground">
                    Geographical Experience
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.geographicalExperience.map((geo) => (
                      <Badge key={geo} className="bg-green-600 text-white text-xs px-2 py-1">
                        {geo}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog (create/edit) */}
      <Dialog open={showDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingProfile ? 'Edit Success Profile' : 'Create New Success Profile'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Role Title *</Label>
                <Input
                  placeholder="e.g., General Manager, CFO, Director"
                  value={formData.roleTitle}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      roleTitle: event.target.value,
                    }))
                  }
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Minimum Experience (years) *</Label>
                <Input
                  type="number"
                  placeholder="15"
                  min="1"
                  value={formData.minimumExperience || ''}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      minimumExperience: handleNumericInput(event.target.value, 1),
                    }))
                  }
                  className="h-11"
                />
              </div>
            </div>

            {/* Required Competencies */}
            <div className="space-y-3">
              <Label className="text-sm font-medium block mb-3">
                Required Competencies (Scale: 1-10) *
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {competencyOptions.map((competency) => (
                  <div key={competency} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
                    <Label className="flex-1 text-sm font-medium m-0">{competency}</Label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      className="w-20 h-11"
                      value={formData.requiredCompetencies[competency]?.toString() || ''}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          requiredCompetencies: {
                            ...prev.requiredCompetencies,
                            [competency]: handleNumericInput(event.target.value, 1, 10),
                          },
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Functional Skills */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Functional Skills (comma separated)</Label>
              <Input
                placeholder="e.g., Operations Management, P&L Management, Team Leadership"
                value={formData.functionalSkills.join(', ')}
                onChange={(event) => handleListInputChange(event.target.value, 'functionalSkills')}
                className="h-11"
              />
            </div>

            {/* Geographical Experience */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Geographical Experience (comma separated)</Label>
              <Input
                placeholder="e.g., North America, APAC, Europe"
                value={formData.geographicalExperience.join(', ')}
                onChange={(event) =>
                  handleListInputChange(event.target.value, 'geographicalExperience')
                }
                className="h-11"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleDialogClose(false)}
              className="h-11 px-8"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              className="bg-blue-600 hover:bg-blue-700 h-11 px-8"
            >
              {editingProfile ? 'Update Profile' : 'Create Profile'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}