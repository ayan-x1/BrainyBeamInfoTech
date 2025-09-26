import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RefreshCw, Calendar, User, Mail, FileText, Trash2, Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FormSubmission {
  id: string;
  name: string;
  email: string;
  dynamic_fields: Array<{
    label: string;
    value: string;
    type: string;
  }>;
  created_at: string;
}

const FormSubmissions = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Omit<FormSubmission, 'id' | 'created_at'>>({
    name: '',
    email: '',
    dynamic_fields: []
  });

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setSubmissions((data as unknown as FormSubmission[]) || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast({
        title: "Error",
        description: "Failed to load form submissions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setSubmissions(prev => prev.filter(sub => sub.id !== id));
      toast({
        title: "Success",
        description: "Submission deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting submission:", error);
      toast({
        title: "Error",
        description: "Failed to delete submission.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (submission: FormSubmission) => {
    setEditingId(submission.id);
    setEditForm({
      name: submission.name,
      email: submission.email,
      dynamic_fields: submission.dynamic_fields
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({
          name: editForm.name,
          email: editForm.email,
          dynamic_fields: editForm.dynamic_fields
        })
        .eq('id', editingId);

      if (error) {
        throw error;
      }

      setSubmissions(prev => 
        prev.map(sub => 
          sub.id === editingId 
            ? { ...sub, ...editForm }
            : sub
        )
      );

      setEditingId(null);
      toast({
        title: "Success",
        description: "Submission updated successfully.",
      });
    } catch (error) {
      console.error("Error updating submission:", error);
      toast({
        title: "Error",
        description: "Failed to update submission.",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', email: '', dynamic_fields: [] });
  };

  const updateDynamicField = (index: number, field: 'label' | 'value' | 'type', value: string) => {
    setEditForm(prev => ({
      ...prev,
      dynamic_fields: prev.dynamic_fields.map((df, i) => 
        i === index ? { ...df, [field]: value } : df
      )
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFieldTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'tel': return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'url': return 'bg-purple-500/10 text-purple-700 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <RefreshCw className="w-5 h-5 animate-spin" />
          Loading submissions...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Form Submissions</h1>
            <p className="text-muted-foreground mt-1">
              View all submitted form data ({submissions.length} submissions)
            </p>
          </div>
          <Button
            onClick={fetchSubmissions}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Submissions List */}
        {submissions.length === 0 ? (
          <Card className="p-12 text-center bg-card border-border">
            <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No submissions yet</h3>
            <p className="text-muted-foreground">
              Form submissions will appear here once users start submitting the form.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.id} className="p-6 bg-card border-border shadow-sm hover:shadow-md transition-all duration-normal">
                <div className="space-y-4">
                  {/* Header with basic info */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      {editingId === submission.id ? (
                        <>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            <Input
                              value={editForm.name}
                              onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                              className="max-w-xs"
                              placeholder="Name"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            <Input
                              type="email"
                              value={editForm.email}
                              onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                              className="max-w-xs"
                              placeholder="Email"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-foreground">{submission.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">{submission.email}</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(submission.created_at)}
                      </div>
                      {editingId === submission.id ? (
                        <div className="flex gap-1 ml-2">
                          <Button
                            onClick={handleUpdate}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            variant="outline"
                            size="sm"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-1 ml-2">
                          <Button
                            onClick={() => handleEdit(submission)}
                            variant="outline"
                            size="sm"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Submission</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this submission? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(submission.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Fields */}
                  {((editingId === submission.id && editForm.dynamic_fields.length > 0) || 
                    (editingId !== submission.id && submission.dynamic_fields && submission.dynamic_fields.length > 0)) && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-foreground">Additional Fields:</h4>
                      <div className="space-y-2">
                        {editingId === submission.id ? (
                          editForm.dynamic_fields.map((field, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-surface-elevated rounded-lg border border-border">
                              <select
                                value={field.type}
                                onChange={(e) => updateDynamicField(index, 'type', e.target.value)}
                                className="text-xs px-2 py-1 rounded border border-border bg-background"
                              >
                                <option value="text">text</option>
                                <option value="email">email</option>
                                <option value="tel">tel</option>
                                <option value="url">url</option>
                              </select>
                              <div className="flex-1 space-y-2">
                                <Input
                                  value={field.label}
                                  onChange={(e) => updateDynamicField(index, 'label', e.target.value)}
                                  className="text-sm"
                                  placeholder="Field label"
                                />
                                <Input
                                  value={field.value}
                                  onChange={(e) => updateDynamicField(index, 'value', e.target.value)}
                                  className="text-sm"
                                  placeholder="Field value"
                                />
                              </div>
                            </div>
                          ))
                        ) : (
                          submission.dynamic_fields.map((field, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-surface-elevated rounded-lg border border-border">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getFieldTypeColor(field.type)}`}
                              >
                                {field.type}
                              </Badge>
                              <div className="flex-1 space-y-1">
                                <div className="text-sm font-medium text-foreground">{field.label}</div>
                                <div className="text-sm text-muted-foreground break-words">{field.value}</div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSubmissions;