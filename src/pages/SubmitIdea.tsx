import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useIdeas } from '@/contexts/IdeasContext';
import { IdeaDomain } from '@/types';
import { useToast } from '@/hooks/use-toast';
import {
  Lightbulb,
  Send,
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  Loader2,
} from 'lucide-react';

const domains: IdeaDomain[] = [
  'AI',
  'Health',
  'FinTech',
  'EdTech',
  'AgriTech',
  'E-commerce',
  'Others',
];

const domainIcons: Record<IdeaDomain, string> = {
  AI: '🤖',
  Health: '🏥',
  FinTech: '💰',
  EdTech: '📚',
  AgriTech: '🌾',
  'E-commerce': '🛒',
  Others: '💡',
};

export default function SubmitIdea() {
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState<IdeaDomain | ''>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { submitIdea } = useIdeas();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      toast({
        title: 'Description required',
        description: 'Please describe your startup idea.',
        variant: 'destructive',
      });
      return;
    }

    if (!domain) {
      toast({
        title: 'Domain required',
        description: 'Please select a domain for your idea.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const newIdea = await submitIdea(description, domain);
      toast({
        title: 'Analysis complete!',
        description: 'Your startup idea has been analyzed.',
      });
      navigate(`/analysis/${newIdea.id}`);
    } catch (error) {
      toast({
        title: 'Analysis failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Submit New Idea</h1>
          <p className="text-muted-foreground">
            Describe your startup concept and let our AI analyze its feasibility
          </p>
        </div>

        {/* Analysis Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Brain, label: 'Market Analysis', desc: 'Evaluate market readiness' },
            { icon: Target, label: 'Risk Assessment', desc: 'Identify potential gaps' },
            { icon: TrendingUp, label: 'Recommendations', desc: 'Actionable insights' },
          ].map((item, index) => (
            <div
              key={item.label}
              className="glass-card p-4 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-medium mb-1">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="glass-card p-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="domain" className="text-base font-medium">
                  Select Domain
                </Label>
                <Select value={domain} onValueChange={(value) => setDomain(value as IdeaDomain)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose your startup domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((d) => (
                      <SelectItem key={d} value={d}>
                        <span className="flex items-center gap-2">
                          <span>{domainIcons[d]}</span>
                          <span>{d}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-base font-medium">
                  Describe Your Idea
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your startup idea in detail. Include the problem you're solving, your target audience, and how your solution works..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  {description.length}/1000 characters
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full"
            disabled={isAnalyzing || !description.trim() || !domain}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Analyze Feasibility
              </>
            )}
          </Button>
        </form>

        {/* Loading State */}
        {isAnalyzing && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="glass-card p-8 max-w-md text-center animate-scale-in">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyzing Your Idea</h3>
              <p className="text-muted-foreground mb-6">
                Our AI is evaluating market potential, identifying risks, and generating recommendations...
              </p>
              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
