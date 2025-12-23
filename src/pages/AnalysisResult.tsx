import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useIdeas } from '@/contexts/IdeasContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Target,
  Lightbulb,
  BarChart3,
  Shield,
  ArrowUpRight,
} from 'lucide-react';
import FeasibilityGauge from '@/components/charts/FeasibilityGauge';
import MarketRadarChart from '@/components/charts/MarketRadarChart';
import RiskBarChart from '@/components/charts/RiskBarChart';

export default function AnalysisResult() {
  const { id } = useParams<{ id: string }>();
  const { getIdea } = useIdeas();
  const navigate = useNavigate();

  const idea = getIdea(id || '');

  if (!idea || !idea.analysis) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="glass-card p-12 text-center">
            <h2 className="text-xl font-semibold mb-2">Analysis not found</h2>
            <p className="text-muted-foreground mb-6">
              The requested analysis could not be found.
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const { analysis } = idea;

  const getRecommendationConfig = (rec: string) => {
    switch (rec) {
      case 'Proceed':
        return {
          icon: CheckCircle,
          color: 'text-success',
          bg: 'bg-success/10',
          border: 'border-success/30',
          text: 'Strong potential - Consider moving forward',
        };
      case 'Improve':
        return {
          icon: TrendingUp,
          color: 'text-warning',
          bg: 'bg-warning/10',
          border: 'border-warning/30',
          text: 'Needs refinement - Address identified gaps',
        };
      case 'Pivot':
        return {
          icon: XCircle,
          color: 'text-destructive',
          bg: 'bg-destructive/10',
          border: 'border-destructive/30',
          text: 'Consider alternative approach',
        };
      default:
        return {
          icon: Target,
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          border: 'border-border',
          text: 'Analysis pending',
        };
    }
  };

  const getMarketBadgeVariant = (readiness: string) => {
    switch (readiness) {
      case 'Ready':
        return 'default';
      case 'Emerging':
        return 'secondary';
      case 'Early':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const recConfig = getRecommendationConfig(analysis.recommendation);
  const RecIcon = recConfig.icon;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">{idea.title}</h1>
            <div className="flex items-center gap-3">
              <Badge variant="outline">{idea.domain}</Badge>
              <span className="text-sm text-muted-foreground">
                Analyzed on {new Date(idea.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Main Score & Recommendation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Feasibility Score */}
          <div className="glass-card p-6 animate-slide-up">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Feasibility Score
            </h2>
            <div className="flex items-center justify-center py-4">
              <FeasibilityGauge score={analysis.feasibilityScore} />
            </div>
          </div>

          {/* AI Recommendation */}
          <div
            className={`glass-card p-6 border-2 ${recConfig.border} animate-slide-up`}
            style={{ animationDelay: '100ms' }}
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              AI Recommendation
            </h2>
            <div className={`p-6 rounded-xl ${recConfig.bg} mb-4`}>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl ${recConfig.bg} flex items-center justify-center`}>
                  <RecIcon className={`w-8 h-8 ${recConfig.color}`} />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${recConfig.color}`}>
                    {analysis.recommendation}
                  </h3>
                  <p className="text-sm text-muted-foreground">{recConfig.text}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{analysis.summary}</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Market Readiness */}
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Market Readiness</h3>
            <div className="flex items-center justify-between">
              <Badge variant={getMarketBadgeVariant(analysis.marketReadiness)} className="text-base px-4 py-2">
                {analysis.marketReadiness}
              </Badge>
              <ArrowUpRight className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Research Maturity */}
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '250ms' }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Research Maturity</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{analysis.researchMaturity}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-chart-1 to-chart-5 transition-all duration-1000"
                  style={{ width: `${analysis.researchMaturity}%` }}
                />
              </div>
            </div>
          </div>

          {/* Risk Level */}
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Identified Risks</h3>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-warning" />
              <span className="text-2xl font-bold">{analysis.risks.length}</span>
              <span className="text-muted-foreground">risk factors</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '350ms' }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Market Analysis
            </h3>
            <MarketRadarChart />
          </div>

          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Risk Distribution
            </h3>
            <RiskBarChart />
          </div>
        </div>

        {/* Risks & Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risks */}
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '450ms' }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Risk Identification
            </h3>
            <div className="space-y-3">
              {analysis.risks.map((risk) => (
                <div
                  key={risk.id}
                  className={`p-4 rounded-lg border ${
                    risk.severity === 'High'
                      ? 'bg-destructive/5 border-destructive/20'
                      : risk.severity === 'Medium'
                      ? 'bg-warning/5 border-warning/20'
                      : 'bg-muted border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{risk.title}</h4>
                    <Badge
                      variant={
                        risk.severity === 'High'
                          ? 'destructive'
                          : risk.severity === 'Medium'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {risk.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{risk.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gaps */}
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-chart-2" />
              Identified Gaps
            </h3>
            <div className="space-y-3">
              {analysis.gaps.map((gap, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <div className="w-6 h-6 rounded-full bg-chart-2/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-chart-2">{index + 1}</span>
                  </div>
                  <p className="text-sm">{gap}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <Button variant="outline" onClick={() => navigate('/submit-idea')}>
            <Lightbulb className="w-4 h-4 mr-2" />
            Submit Another Idea
          </Button>
          <Button variant="gradient" onClick={() => navigate('/idea-history')}>
            View All Ideas
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
