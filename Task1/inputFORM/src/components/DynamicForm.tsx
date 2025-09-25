import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Send, User, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DynamicField {
  id: string;
  label: string;
  value: string;
  error?: string;
  type: "text" | "email" | "tel" | "url";
}

interface FormData {
  name: string;
  email: string;
  dynamicFields: DynamicField[];
}

const DynamicForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    dynamicFields: []
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fieldIdCounter = useRef(0);

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string, type: string = "text") => {
    if (!value.trim()) {
      return `${name} is required`;
    }
    
    if (type === "email" && !validateEmail(value)) {
      return "Please enter a valid email address";
    }
    
    if (type === "url" && value && !value.match(/^https?:\/\/.+/)) {
      return "Please enter a valid URL (starting with http:// or https://)";
    }
    
    return "";
  };

  // Add new dynamic field
  const addDynamicField = () => {
    const newField: DynamicField = {
      id: `field-${fieldIdCounter.current++}`,
      label: `Field ${formData.dynamicFields.length + 1}`,
      value: "",
      type: "text"
    };
    
    setFormData(prev => ({
      ...prev,
      dynamicFields: [...prev.dynamicFields, newField]
    }));
  };

  // Remove dynamic field
  const removeDynamicField = (fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      dynamicFields: prev.dynamicFields.filter(field => field.id !== fieldId)
    }));
    
    // Remove any error for this field
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldId];
      return newErrors;
    });
  };

  // Update field value and clear error
  const updateField = (fieldType: "static" | "dynamic", fieldKey: string, value: string, type?: DynamicField["type"]) => {
    if (fieldType === "static") {
      setFormData(prev => ({ ...prev, [fieldKey]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        dynamicFields: prev.dynamicFields.map(field =>
          field.id === fieldKey ? { ...field, value, ...(type && { type }) } : field
        )
      }));
    }
    
    // Clear error for this field
    if (errors[fieldKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldKey];
        return newErrors;
      });
    }
  };

  // Update field label
  const updateFieldLabel = (fieldId: string, label: string) => {
    setFormData(prev => ({
      ...prev,
      dynamicFields: prev.dynamicFields.map(field =>
        field.id === fieldId ? { ...field, label } : field
      )
    }));
  };

  // Update field type
  const updateFieldType = (fieldId: string, type: DynamicField["type"]) => {
    setFormData(prev => ({
      ...prev,
      dynamicFields: prev.dynamicFields.map(field =>
        field.id === fieldId ? { ...field, type } : field
      )
    }));
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Validate static fields
    const nameError = validateField("Name", formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateField("Email", formData.email, "email");
    if (emailError) newErrors.email = emailError;
    
    // Validate dynamic fields
    formData.dynamicFields.forEach(field => {
      const error = validateField(field.label, field.value, field.type);
      if (error) newErrors[field.id] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below and try again.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        dynamic_fields: formData.dynamicFields.map(field => ({
          label: field.label,
          value: field.value,
          type: field.type
        }))
      };
      
      const { error } = await supabase
        .from('form_submissions')
        .insert(submissionData);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success!",
        description: "Your form has been submitted successfully.",
        className: "pulse-success",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        dynamicFields: []
      });
      
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl p-8 bg-card border-border shadow-lg">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold gradient-text">Dynamic Form Builder</h1>
            <p className="text-muted-foreground">
              Create flexible forms with customizable fields
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Static Fields */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Required Information</h2>
              
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("static", "name", e.target.value)}
                  className={`transition-all duration-normal ${
                    errors.name 
                      ? "border-destructive shadow-[0_0_0_1px_hsl(var(--destructive))] shake" 
                      : "shadow-form hover:shadow-form-focus focus:shadow-form-focus"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-foreground">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("static", "email", e.target.value)}
                  className={`transition-all duration-normal ${
                    errors.email 
                      ? "border-destructive shadow-[0_0_0_1px_hsl(var(--destructive))] shake" 
                      : "shadow-form hover:shadow-form-focus focus:shadow-form-focus"
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Dynamic Fields Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Additional Fields</h2>
                <Button
                  type="button"
                  onClick={addDynamicField}
                  size="sm"
                  className="bg-primary hover:bg-primary-hover text-primary-foreground transition-all duration-normal hover:scale-105 shadow-md"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Field
                </Button>
              </div>

              {/* Dynamic Fields */}
              <div className="space-y-4">
                {formData.dynamicFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="form-field-enter bg-surface-elevated border border-border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor={`label-${field.id}`} className="text-sm text-muted-foreground">
                            Field Label
                          </Label>
                          <Input
                            id={`label-${field.id}`}
                            value={field.label}
                            onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                            className="bg-input border-border"
                            placeholder="Enter field label"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`type-${field.id}`} className="text-sm text-muted-foreground">
                            Field Type
                          </Label>
                          <select
                            id={`type-${field.id}`}
                            value={field.type}
                            onChange={(e) => updateFieldType(field.id, e.target.value as DynamicField["type"])}
                            className="w-full h-10 px-3 py-2 bg-input border border-border rounded-md text-foreground focus:ring-2 focus:ring-ring focus:border-ring"
                          >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="tel">Phone</option>
                            <option value="url">URL</option>
                          </select>
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={() => removeDynamicField(field.id)}
                        variant="outline"
                        size="sm"
                        className="ml-3 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-normal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={field.id} className="text-foreground">
                        {field.label}
                      </Label>
                      <Input
                        id={field.id}
                        type={field.type}
                        value={field.value}
                        onChange={(e) => updateField("dynamic", field.id, e.target.value)}
                        className={`transition-all duration-normal ${
                          errors[field.id] 
                            ? "border-destructive shadow-[0_0_0_1px_hsl(var(--destructive))] shake" 
                            : "shadow-form hover:shadow-form-focus focus:shadow-form-focus"
                        }`}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                      {errors[field.id] && (
                        <p className="text-sm text-destructive">
                          {errors[field.id]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {formData.dynamicFields.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No additional fields added yet.</p>
                  <p className="text-xs mt-1">Click "Add Field" to create custom inputs.</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-6 text-lg font-semibold transition-all duration-normal hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Submit Form
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default DynamicForm;