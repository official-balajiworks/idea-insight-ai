import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Shield,
  Sparkles,
  CheckCircle,
  BarChart3,
  Target,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced algorithms evaluate your startup idea across multiple dimensions',
  },
  {
    icon: BarChart3,
    title: 'Market Insights',
    description: 'Understand market readiness and competitive landscape instantly',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    description: 'Identify potential gaps and risks before they become problems',
  },
  {
    icon: Target,
    title: 'Actionable Recommendations',
    description: 'Get clear guidance on whether to proceed, improve, or pivot',
  },
];

import { Brain } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">IdeaAnalyzer</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button variant="gradient" onClick={() => navigate('/dashboard')}>
                Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button variant="gradient" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            AI-Powered Startup Validation
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            Validate Your <span className="gradient-text">Startup Ideas</span> Before You Invest
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Get instant AI-powered feasibility analysis, market insights, and actionable recommendations to make confident decisions about your startup concepts.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Button variant="gradient" size="lg" asChild>
              <Link to="/register">
                Start Analyzing Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto mt-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
            {[
              { value: '10K+', label: 'Ideas Analyzed' },
              { value: '85%', label: 'Accuracy Rate' },
              { value: '2min', label: 'Avg. Analysis Time' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Validate Ideas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI analyzes your startup concept across multiple dimensions to give you a comprehensive feasibility assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card-hover p-6 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get your startup idea analyzed in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Describe Your Idea',
                description: 'Enter your startup concept and select the domain',
                icon: Lightbulb,
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our AI evaluates feasibility, market, and risks',
                icon: Zap,
              },
              {
                step: '03',
                title: 'Get Recommendations',
                description: 'Receive actionable insights and clear guidance',
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <div key={item.step} className="relative animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="glass-card p-8 text-center h-full">
                  <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Validate Your Next Big Idea?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of entrepreneurs who use IdeaAnalyzer to make data-driven decisions about their startup concepts.
              </p>
              <Button variant="gradient" size="lg" asChild>
                <Link to="/register">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold">IdeaAnalyzer</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} IdeaAnalyzer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
