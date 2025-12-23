import React from 'react';

interface FeasibilityGaugeProps {
  score: number;
}

export default function FeasibilityGauge({ score }: FeasibilityGaugeProps) {
  const circumference = 2 * Math.PI * 85;
  const strokeDashoffset = circumference - (score / 100) * circumference * 0.75;

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getGradientId = (score: number) => {
    if (score >= 75) return 'gaugeGradientSuccess';
    if (score >= 50) return 'gaugeGradientWarning';
    return 'gaugeGradientDanger';
  };

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="gaugeGradientSuccess" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(175, 70%, 35%)" />
            <stop offset="100%" stopColor="hsl(152, 60%, 42%)" />
          </linearGradient>
          <linearGradient id="gaugeGradientWarning" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(38, 92%, 50%)" />
            <stop offset="100%" stopColor="hsl(15, 85%, 55%)" />
          </linearGradient>
          <linearGradient id="gaugeGradientDanger" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(0, 72%, 55%)" />
            <stop offset="100%" stopColor="hsl(0, 72%, 45%)" />
          </linearGradient>
        </defs>
        
        {/* Background arc */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          transform="rotate(135, 100, 100)"
        />
        
        {/* Progress arc */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke={`url(#${getGradientId(score)})`}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(135, 100, 100)"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Score display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-5xl font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-sm text-muted-foreground font-medium">out of 100</span>
      </div>
    </div>
  );
}
