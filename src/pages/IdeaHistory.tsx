import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useIdeas } from '@/contexts/IdeasContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Lightbulb,
  Eye,
  Calendar,
  TrendingUp,
  PlusCircle,
} from 'lucide-react';

export default function IdeaHistory() {
  const { ideas } = useIdeas();
  const navigate = useNavigate();

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score: number) => {
    if (score >= 75) return 'bg-success/10';
    if (score >= 50) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold mb-2">Idea History</h1>
            <p className="text-muted-foreground">
              Review all your submitted startup ideas and their analysis results
            </p>
          </div>
          <Button variant="gradient" onClick={() => navigate('/submit-idea')}>
            <PlusCircle className="w-4 h-4 mr-2" />
            New Idea
          </Button>
        </div>

        {ideas.length === 0 ? (
          <div className="glass-card p-12 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No ideas yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Submit your first startup idea and get instant AI-powered feasibility analysis
            </p>
            <Button variant="gradient" size="lg" onClick={() => navigate('/submit-idea')}>
              <PlusCircle className="w-5 h-5 mr-2" />
              Submit Your First Idea
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop Table */}
            <div className="hidden lg:block glass-card overflow-hidden animate-slide-up">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-muted-foreground">Idea</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Domain</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Date</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Score</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Status</th>
                    <th className="text-right p-4 font-semibold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ideas.map((idea, index) => (
                    <tr
                      key={idea.id}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Lightbulb className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium line-clamp-1">{idea.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{idea.domain}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(idea.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getScoreBg(idea.analysis?.feasibilityScore || 0)}`}>
                          <TrendingUp className={`w-4 h-4 ${getScoreColor(idea.analysis?.feasibilityScore || 0)}`} />
                          <span className={`font-bold ${getScoreColor(idea.analysis?.feasibilityScore || 0)}`}>
                            {idea.analysis?.feasibilityScore}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            idea.analysis?.recommendation === 'Proceed'
                              ? 'default'
                              : idea.analysis?.recommendation === 'Improve'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {idea.analysis?.recommendation}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/analysis/${idea.id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Report
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {ideas.map((idea, index) => (
                <div
                  key={idea.id}
                  className="glass-card p-4 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">{idea.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{idea.domain}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${getScoreBg(idea.analysis?.feasibilityScore || 0)}`}>
                      <span className={`font-bold ${getScoreColor(idea.analysis?.feasibilityScore || 0)}`}>
                        {idea.analysis?.feasibilityScore}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/analysis/${idea.id}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
