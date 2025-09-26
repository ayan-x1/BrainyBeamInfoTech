import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle } from "lucide-react";
import DynamicForm from "@/components/DynamicForm";
import FormSubmissions from "@/components/FormSubmissions";

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'submissions'>('form');

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold gradient-text">Dynamic Form App</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => setCurrentView('form')}
              variant={currentView === 'form' ? 'default' : 'outline'}
              size="sm"
              className="flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Create Form
            </Button>
            <Button
              onClick={() => setCurrentView('submissions')}
              variant={currentView === 'submissions' ? 'default' : 'outline'}
              size="sm"
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              View Submissions
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      {currentView === 'form' ? <DynamicForm /> : <FormSubmissions />}
    </div>
  );
};

export default Index;
