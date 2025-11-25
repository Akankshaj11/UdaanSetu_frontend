// src/components/dashboard/SuccessProfileManagement.tsx
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
import { ArrowLeft, Plus, Edit, Trash2, Target, X } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Use the uploaded file path from conversation history.
 * The platform build will transform this local path into an accessible URL.
 */
const LOGO_PATH = '/mnt/data/669bd3f1-9bf0-43c9-b187-87433b4e58b0.png';

interface SuccessProfileManagementProps {
  onBack: () => void;
}

export function SuccessProfileManagement({ onBack }: SuccessProfileManagementProps) {
  const [profiles, setProfiles] = useState<SuccessProfile[]>(mockSuccessProfiles);
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
    // Initialize competencies to a default level (5)
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
      requiredCompetencies: { ...(profile.requiredCompetencies || {}) },
      functionalSkills: [...(profile.functionalSkills || [])],
      geographicalExperience: [...(profile.geographicalExperience || [])],
    });
    setShowDialog(true);
  };

  const handleDelete = (profileId: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== profileId));
    toast.success('Success profile deleted');
  };

  // clamp numeric input values and normalize
  const handleNumericInput = (value: string, min = 0, max = Infinity) => {
    const parsedValue = Number(value);
    if (Number.isNaN(parsedValue)) {
      return min;
    }
    return Math.min(Math.max(parsedValue, min), max);
  };

  const handleListInputChange = (
    value: string,
    field: 'functionalSkills' | 'geographicalExperience',
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
    const q = searchQuery.trim().toLowerCase();
    if (!q) return profiles;
    return profiles.filter((profile) => {
      const searchableText = [
        profile.roleTitle,
        profile.functionalSkills.join(' '),
        profile.geographicalExperience.join(' '),
      ]
        .join(' ')
        .toLowerCase();
      return searchableText.includes(q);
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

    // Competency validation (1 - 10)
    const invalidCompetency = (Object.entries(formData.requiredCompetencies) as [string, number][])
      .find(([, level]) => level < 1 || level > 10);
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

  // Responsive grid columns: 1 on small, 2 on md, 3 on lg
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} aria-label="Back" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3">
            <img src={LOGO_PATH} alt="logo" className="h-10 w-10 rounded-md object-contain" />
            <div>
              <h1 className="text-lg font-semibold">Success Profile Management</h1>
              <p className="text-sm text-muted-foreground">Define competency benchmarks for key leadership roles</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleCreateNew} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create New Profile
          </Button>
        </div>
      </div>

      {/* Info card */}
      <Card className="p-4 bg-blue-600/6 border-blue-600/30">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="mb-1 font-medium">What are Success Profiles?</h4>
            <p className="text-sm text-muted-foreground">
              Success Profiles define the competencies, skills, and experience required for key leadership roles.
              The AI recommendation engine uses these profiles to identify gaps and suggest development actions.
            </p>
          </div>
        </div>
      </Card>

      {/* Search & stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 md:max-w-md">
          <Label htmlFor="search-profiles" className="text-sm text-muted-foreground">Search by role, skill or geography</Label>
          <div className="relative mt-2">
            <Input
              id="search-profiles"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., CFO, Leadership, APAC"
              className="pr-10"
              aria-label="Search success profiles"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-slate-800"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredProfiles.length}</span> of <span className="font-medium text-foreground">{profiles.length}</span> profiles
        </div>
      </div>

      {/* Profiles grid */}
      {filteredProfiles.length === 0 ? (
        <Card className="p-6 text-center text-muted-foreground">No success profiles match your search.</Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <Card key={profile.id} className="p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-md font-semibold">{profile.roleTitle}</h3>
                  <p className="text-sm text-muted-foreground">Minimum Experience: <span className="font-medium">{profile.minimumExperience} yrs</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(profile)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(profile.id)} className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Competencies */}
              <div className="mb-3">
                <h4 className="text-sm mb-2">Required Competencies</h4>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(profile.requiredCompetencies).map(([name, level]) => (
                    <div key={name} className="flex items-center justify-between bg-muted rounded p-2">
                      <div className="text-sm truncate">{name}</div>
                      <Badge className="bg-blue-600 text-xs">{level}/10</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Geography */}
              <div className="flex gap-2 flex-wrap mb-2">
                {profile.functionalSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                ))}
              </div>

              <div className="flex gap-2 flex-wrap">
                {profile.geographicalExperience.map((geo) => (
                  <Badge key={geo} className="bg-green-600 text-xs">{geo}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog (create/edit) */}
      <Dialog open={showDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{editingProfile ? 'Edit Success Profile' : 'Create New Success Profile'}</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            {/* Left column: Basic info + lists */}
            <div className="space-y-4">
              <div>
                <Label>Role Title</Label>
                <Input
                  placeholder="e.g., General Manager, CFO"
                  value={formData.roleTitle}
                  onChange={(e) => setFormData((prev) => ({ ...prev, roleTitle: e.target.value }))}
                />
              </div>

              <div>
                <Label>Minimum Experience (years)</Label>
                <Input
                  type="number"
                  min={0}
                  value={formData.minimumExperience || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, minimumExperience: handleNumericInput(e.target.value, 0) }))
                  }
                />
                <p className="text-xs text-muted-foreground mt-1">Used to filter candidate readiness and shortlist matches.</p>
              </div>

              <div>
                <Label>Functional Skills (comma separated)</Label>
                <Input
                  value={formData.functionalSkills.join(', ')}
                  onChange={(e) => handleListInputChange(e.target.value, 'functionalSkills')}
                  placeholder="e.g., Operations, P&L, Team Leadership"
                />
              </div>

              <div>
                <Label>Geographical Experience (comma separated)</Label>
                <Input
                  value={formData.geographicalExperience.join(', ')}
                  onChange={(e) => handleListInputChange(e.target.value, 'geographicalExperience')}
                  placeholder="e.g., APAC, EMEA, India"
                />
              </div>
            </div>

            {/* Right column: Competencies grid */}
            <div>
              <Label>Required Competencies (1 - 10)</Label>
              <div className="grid grid-cols-1 gap-3 mt-2">
                {competencyOptions.map((competency) => (
                  <div key={competency} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="text-sm">{competency}</div>
                    </div>

                    <div className="w-28">
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        value={formData.requiredCompetencies[competency] ?? ''}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            requiredCompetencies: {
                              ...prev.requiredCompetencies,
                              [competency]: handleNumericInput(e.target.value, 1, 10),
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                Competency ratings help the recommendation engine score candidates against role benchmarks.
              </p>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => handleDialogClose(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              {editingProfile ? 'Update Profile' : 'Create Profile'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SuccessProfileManagement;
