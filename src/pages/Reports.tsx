import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useIdeas } from '@/contexts/IdeasContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Download,
  Eye,
  PlusCircle,
  Calendar,
  TrendingUp,
} from 'lucide-react';

export default function Reports() {
  const { ideas } = useIdeas();
  const navigate = useNavigate();

  const analyzedIdeas = ideas.filter((idea) => idea.analysis);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analysis Reports</h1>
            <p className="text-muted-foreground">
              Access detailed reports for all your analyzed startup ideas
            </p>
          </div>
        </div>

        {analyzedIdeas.length === 0 ? (
          <div className="glass-card p-12 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No reports yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Submit a startup idea to generate your first analysis report
            </p>
            <Button variant="gradient" size="lg" onClick={() => navigate('/submit-idea')}>
              <PlusCircle className="w-5 h-5 mr-2" />
              Submit an Idea
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyzedIdeas.map((idea, index) => (
              <div
                key={idea.id}
                className="glass-card-hover p-6 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="outline">{idea.domain}</Badge>
                </div>

                <h3 className="font-semibold mb-2 line-clamp-2">{idea.title}</h3>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {idea.analysis?.feasibilityScore}%
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/analysis/${idea.id}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
