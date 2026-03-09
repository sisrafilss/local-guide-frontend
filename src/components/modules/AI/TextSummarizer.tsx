'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Copy, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';
import { summarizeText } from '@/services/ai/ai.service';
import { toast } from 'sonner';

/**
 * TextSummarizer Component
 * 
 * Allows users to input long text and get an AI-generated summary.
 * Features: Character counter, clear button, copy summary button, loading states.
 */
const TextSummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const MAX_CHARS = 5000;

  const handleSummarize = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setSummary('');

    try {
      const result = await summarizeText(inputText);

      if (result.success) {
        setSummary(result.summary);
        toast.success("Summary generated successfully!");
      } else {
        const errorMsg = result.error ? `${result.message}: ${result.error}` : (result.message || "Failed to generate summary. Please try again.");
        setError(errorMsg);
        toast.error(result.message || "Failed to generate summary.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setSummary('');
    setError(null);
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success("Summary copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <Card className="border-2 border-primary/10 shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <CardTitle className="text-2xl font-bold tracking-tight">AI Text Summarizer</CardTitle>
          </div>
          <CardDescription className="text-base">
            Paste your long text below and let our AI distill it into a concise summary.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Area */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <Label htmlFor="input-text" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Input Text
              </Label>
              <span className={`text-xs font-medium ${inputText.length > MAX_CHARS ? 'text-destructive' : 'text-muted-foreground'}`}>
                {inputText.length} / {MAX_CHARS} characters
              </span>
            </div>
            
            <Textarea
              id="input-text"
              placeholder="Paste your long paragraph here..."
              className="min-h-[250px] resize-y text-base leading-relaxed p-4 bg-muted/30 focus-visible:ring-primary/30"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleSummarize} 
              disabled={isLoading || !inputText.trim() || inputText.length > MAX_CHARS}
              className="px-8 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Summarize
                </>
              )}
            </Button>

            <Button 
              variant="outline" 
              onClick={handleClear} 
              disabled={isLoading || !inputText}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/5"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          {/* Summary Display Area */}
          {summary && (
            <div className="space-y-3 pt-4 border-t border-border animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold text-primary uppercase tracking-wider">
                  AI Generated Summary
                </Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCopy}
                  className="h-8 gap-1.5 text-xs font-medium"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy Summary
                    </>
                  )}
                </Button>
              </div>
              
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/10 prose prose-sm dark:prose-invert max-w-none shadow-inner">
                <p className="text-base leading-relaxed italic text-foreground/90">
                  {summary}
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="bg-muted/30 py-3 text-[10px] text-center justify-center text-muted-foreground uppercase tracking-widest font-bold border-t border-border/50">
          Powered by Advanced AI Engine
        </CardFooter>
      </Card>
      
      {/* Tips Section */}
      {!summary && !isLoading && (
        <div className="grid md:grid-cols-3 gap-4 text-center">
            {[
                { title: "Concise", desc: "Get the main points in seconds." },
                { title: "Smart", desc: "Maintains context and central themes." },
                { title: "Fast", desc: "Powered by high-performance models." }
            ].map((tip, i) => (
                <div key={i} className="p-4 rounded-lg border border-border/50 bg-card/50">
                    <h4 className="text-sm font-bold text-foreground mb-1">{tip.title}</h4>
                    <p className="text-xs text-muted-foreground">{tip.desc}</p>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TextSummarizer;
