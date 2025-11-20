


import React, { useMemo, useState } from 'react';
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
import { mockSuccessProfiles, SuccessProfile } from '../../lib/mockData';
import { ArrowLeft, Plus, Edit, Trash2, Target } from 'lucide-react';
import { toast } from 'sonner';

interface SuccessProfileManagementProps {
  onBack: () => void;
}

export function SuccessProfileManagement({ onBack }: SuccessProfileManagementProps) {
  const [profiles, setProfiles] = useState(mockSuccessProfiles);
  const [showDialog, setShowDialog] = useState(false);
  const [editingProfile, setEditingProfile] = useState<SuccessProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Use useMemo for constant options
  const competencyOptions = useMemo(
    () => [
      'Strategic Thinking',
      'Leadership',
      'Financial Acumen',
      'Operational Excellence',
      'Stakeholder Management',
      'Digital Transformation',
    ],
    [],
  );

  const createEmptyProfile = (): SuccessProfile => ({
    id: '',
    roleTitle: '',
    minimumExperience: 0,
    // Initialize all competencies to a default level, e.g., 5
    requiredCompetencies: competencyOptions.reduce<Record<string, number>>((acc, competency) => {
      acc[competency] = 5;
      return acc;
    }, {}),
    functionalSkills: [],
    geographicalExperience: [],
  });

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
      // Ensure we deep copy the competencies object and skills/geo arrays
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

  // FIX: Enforce bounds for numeric inputs (specifically for competencies 1-10)
  const handleNumericInput = (value: string, min = 0, max = Infinity) => {
    const parsedValue = Number(value);
    // If not a number, return the minimum valid number (or 0 for experience)
    if (Number.isNaN(parsedValue)) {
      return min;
    }
    // Clamp the value between min and max
    return Math.min(Math.max(parsedValue, min), max);
  };

  const handleListInputChange = (
    value: string,
    field: 'functionalSkills' | 'geographicalExperience',
  ) => {
    const parsed = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean); // Filter out empty strings
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
    // Basic validation
    if (!formData.roleTitle.trim()) {
      toast.error('Role title is required');
      return;
    }

    if (formData.minimumExperience <= 0) {
      toast.error('Minimum experience should be greater than 0');
      return;
    }

    // FIX: Competency validation
    const invalidCompetency = (
      Object.entries(formData.requiredCompetencies) as [string, number][]
    ).find(([, level]) => level < 1 || level > 10);

    if (invalidCompetency) {
      toast.error(
        `Competency rating for ${invalidCompetency[0]} must be between 1 and 10.`,
      );
      return;
    }

    const payload: SuccessProfile = {
      ...formData,
      // Ensure unique ID for new profiles
      id: editingProfile ? editingProfile.id : `sp-${Date.now()}`,
    };

    if (editingProfile) {
      setProfiles((prev) =>
        prev.map((profile) => (profile.id === editingProfile.id ? payload : profile)),
      );
      toast.success('Success profile updated');
    } else {
      setProfiles((prev) => [...prev, payload]);
      toast.success('Success profile created');
    }

    handleDialogClose(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1>Success Profile Management</h1>
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
      <Card className="p-6 bg-blue-600/10 border-blue-600/30">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="mb-2">What are Success Profiles?</h4>
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

        <div className="grid grid-cols-1 gap-6">
          {filteredProfiles.map((profile) => (
          <Card key={profile.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="mb-1">{profile.roleTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  Minimum Experience: {profile.minimumExperience} years
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(profile)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(profile.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Required Competencies */}
            <div className="mb-4">
              <h4 className="mb-3">Required Competencies</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.keys(profile.requiredCompetencies).map((competency) => {
                  const level = profile.requiredCompetencies[competency];
                  return (
                    <div
                      key={competency}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <span className="text-sm">{competency}</span>
                      <Badge className="bg-blue-600">
                        {level}/10
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Functional Skills */}
            <div className="mb-4">
              <h4 className="mb-3">Functional Skills</h4>
              <div className="flex flex-wrap gap-2">
                {profile.functionalSkills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Geographical Experience */}
            <div>
              <h4 className="mb-3">Geographical Experience</h4>
              <div className="flex flex-wrap gap-2">
                {profile.geographicalExperience.map((geo) => (
                  <Badge key={geo} className="bg-green-600">
                    {geo}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
          ))}
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProfile ? 'Edit Success Profile' : 'Create New Success Profile'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Role Title</Label>
                <Input
                  placeholder="e.g., General Manager, CFO, Director"
                  value={formData.roleTitle}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      roleTitle: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Minimum Experience (years)</Label>
                <Input
                  type="number"
                  placeholder="15"
                  // Added min attribute for better UX/mobile keyboard
                  min="0"
                  value={formData.minimumExperience || ''}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      // Pass min=0, as experience can't be negative, but 0 is acceptable on init.
                      minimumExperience: handleNumericInput(event.target.value, 0),
                    }))
                  }
                />
              </div>
            </div>

            {/* Required Competencies */}
            <div className="space-y-3">
              <Label>Required Competencies (Scale: 1-10)</Label>
              <div className="grid grid-cols-2 gap-4">
                {/* Improvement: Use the memoized competencyOptions array */}
                {competencyOptions.map((competency) => (
                  <div key={competency} className="flex items-center gap-3">
                    <Label className="flex-1 text-sm">{competency}</Label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      className="w-20"
                      value={formData.requiredCompetencies[competency] || ''}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          requiredCompetencies: {
                            ...prev.requiredCompetencies,
                            // Pass min=1, max=10 for competency levels
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
              <Label>Functional Skills (comma separated)</Label>
              <Input
                placeholder="e.g., Operations Management, P&L Management, Team Leadership"
                value={formData.functionalSkills.join(', ')}
                onChange={(event) =>
                  handleListInputChange(event.target.value, 'functionalSkills')
                }
              />
            </div>

            {/* Geographical Experience */}
            <div className="space-y-2">
              <Label>Geographical Experience (comma separated)</Label>
              <Input
                placeholder="e.g., North, South, West, East"
                value={formData.geographicalExperience.join(', ')}
                onChange={(event) =>
                  handleListInputChange(event.target.value, 'geographicalExperience')
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => handleDialogClose(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              {editingProfile ? 'Update Profile' : 'Create Profile'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}