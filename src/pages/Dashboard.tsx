import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useIdeas } from '@/contexts/IdeasContext';
import { Button } from '@/components/ui/button';
import {
  PlusCircle,
  TrendingUp,
  Lightbulb,
  BarChart3,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { ideas } = useIdeas();
  const navigate = useNavigate();

  const recentIdeas = ideas.slice(0, 3);
  const avgScore =
    ideas.length > 0
      ? Math.round(
          ideas.reduce((acc, idea) => acc + (idea.analysis?.feasibilityScore || 0), 0) /
            ideas.length
        )
      : 0;

  const stats = [
    {
      label: 'Total Ideas',
      value: ideas.length,
      icon: Lightbulb,
      color: 'text-chart-1',
      bg: 'bg-chart-1/10',
    },
    {
      label: 'Avg. Feasibility',
      value: `${avgScore}%`,
      icon: TrendingUp,
      color: 'text-chart-2',
      bg: 'bg-chart-2/10',
    },
    {
      label: 'Reports Generated',
      value: ideas.filter((i) => i.analysis).length,
      icon: BarChart3,
      color: 'text-chart-3',
      bg: 'bg-chart-3/10',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'Innovator'}!
          </h1>
          <p className="text-muted-foreground">
            Ready to validate your next big idea? Let's make it happen.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card p-6 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div
            className="glass-card-hover p-6 cursor-pointer group"
            onClick={() => navigate('/submit-idea')}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <PlusCircle className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                  Submit New Idea
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Get instant AI-powered feasibility analysis for your startup concept
                </p>
                <div className="flex items-center text-sm text-primary font-medium">
                  Start now
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="glass-card-hover p-6 cursor-pointer group"
            onClick={() => navigate('/idea-history')}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Sparkles className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
                  View Past Analyses
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Review and compare your previously submitted startup ideas
                </p>
                <div className="flex items-center text-sm text-accent font-medium">
                  Browse history
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Ideas */}
        {recentIdeas.length > 0 && (
          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Ideas</h2>
              <Button variant="ghost" onClick={() => navigate('/idea-history')}>
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {recentIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="glass-card p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/analysis/${idea.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{idea.title}</p>
                      <p className="text-sm text-muted-foreground">{idea.domain}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      {idea.analysis?.feasibilityScore}%
                    </p>
                    <p className="text-xs text-muted-foreground">Feasibility</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {ideas.length === 0 && (
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
        )}
      </div>
    </DashboardLayout>
  );
}
