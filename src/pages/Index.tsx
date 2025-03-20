import React, { useEffect, useState, useRef } from "react";
import RetroWindow from "@/components/RetroWindow";
import RetroButton from "@/components/RetroButton";
import { applyCRTEffect } from "@/utils/noise";
import { Terminal, AlertTriangle, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [bootSequence, setBootSequence] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const fullText = "WorksWise.ai - We deliver the real work.";
  
  // Typing effect
  useEffect(() => {
    if (bootStep < 4) return;
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, [bootStep]);
  
  // Boot sequence
  useEffect(() => {
    if (!bootSequence) return;
    
    const bootTimer = setTimeout(() => {
      if (bootStep < 4) {
        setBootStep(prev => prev + 1);
      } else {
        setBootSequence(false);
      }
    }, bootStep === 0 ? 1000 : 700);
    
    return () => clearTimeout(bootTimer);
  }, [bootSequence, bootStep]);
  
  // Apply CRT effect
  useEffect(() => {
    if (containerRef.current) {
      applyCRTEffect(containerRef.current);
    }
  }, []);

  // Boot sequence screen
  if (bootSequence) {
    return (
      <div 
        ref={containerRef}
        className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 font-dos p-4"
      >
        <div className="max-w-3xl w-full space-y-1">
          {bootStep >= 0 && (
            <div className="animate-fade-in">
              <span className="text-green-200">BIOS Version 1.0.12</span>
              <br />
              <span>Legal-Tech ROM v1.2.5 (c) 1987-2024</span>
            </div>
          )}
          
          {bootStep >= 1 && (
            <div className="animate-fade-in space-y-1 pt-4">
              <div>Memory Test: 640K OK</div>
              <div>Hard Disk 0: 20MB</div>
              <div className="text-yellow-300">Loading System...</div>
            </div>
          )}
          
          {bootStep >= 2 && (
            <div className="animate-fade-in pt-4">
              <div>Loading WorksWise.ai</div>
              <div className="w-full h-2 mt-1 retro-inset relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-700" 
                  style={{ width: bootStep >= 3 ? '100%' : '60%' }}
                ></div>
              </div>
            </div>
          )}
          
          {bootStep >= 3 && (
            <div className="animate-fade-in pt-4">
              <div className="text-green-300">System Ready</div>
              <div>Press any key to continue...</div>
            </div>
          )}
          
          <div className="animate-blink">_</div>
        </div>
      </div>
    );
  }

  // Main screen
  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-4"
    >
      <div className="w-full max-w-lg mx-auto">
        <header className="text-center mb-8">
          <h1 className="font-pixel text-3xl md:text-5xl mb-1 text-retro-title-bar">{typedText || "WorksWise.ai"}</h1>
          {!typedText && <p className="font-dos text-lg">We deliver the real work.</p>}
          <div className="animate-blink inline-block ml-1">_</div>
        </header>
        
        <RetroWindow 
          title="SYSTEM MESSAGE" 
          className="mx-auto max-w-md animate-scale-in"
        >
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="text-yellow-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="font-bold mb-2">ATTENTION!</h2>
                <p className="font-dos">
                  An AI has been detected that can help legal professionals complete their work more efficiently.
                </p>
              </div>
            </div>
            
            <div className="retro-inset p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Terminal size={16} />
                <span className="font-bold">WorksWise.ai v1.0</span>
              </div>

              <div className="bg-retro-window border border-retro-button-shadow p-2 mb-3">
                <div className="font-dos text-sm">
                  <p className="text-retro-text-dark mb-1">&gt; Generate a due diligence report for Company A</p>
                  <div className="pl-2 mb-1 text-green-700">
                    <p>Working...</p>
                    <p>Analyzing financial statements...</p>
                    <p>Reviewing legal documents...</p>
                    <p>Checking regulatory compliance...</p>
                    <p className="text-green-900 font-bold">Report complete! (2.3 seconds)</p>
                  </div>
                  <p className="text-retro-text-dark">&gt; _</p>
                </div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <RetroButton className="w-full flex items-center justify-center space-x-2 mb-2">
                    <FileText size={16} />
                    <span>Open Document</span>
                  </RetroButton>
                </DialogTrigger>
                <DialogContent className="retro-window p-0 border-0 bg-transparent">
                  <RetroWindow title="Company A - Due Diligence Report" width="100%" height="auto">
                    <div className="font-dos text-sm max-h-80 overflow-y-auto">
                      <h3 className="font-bold mb-2 text-center underline">CONFIDENTIAL</h3>
                      <h2 className="font-bold mb-3 text-center">COMPANY A - DUE DILIGENCE REPORT</h2>
                      
                      <p className="mb-2">EXECUTIVE SUMMARY:</p>
                      <p className="mb-3 pl-2">Company A demonstrates strong financial standing with minimal legal liabilities. Recommend proceeding with acquisition.</p>
                      
                      <p className="mb-2">KEY FINDINGS:</p>
                      <ul className="list-disc pl-6 mb-3 space-y-1">
                        <li>Revenue growth of 32% YoY</li>
                        <li>Clean regulatory history</li>
                        <li>2 pending patents, 5 registered trademarks</li>
                        <li>No significant litigation history</li>
                        <li>Compliant with industry regulations</li>
                      </ul>
                      
                      <p className="mb-2">RISK ASSESSMENT:</p>
                      <p className="mb-4 pl-2">Overall Risk: LOW</p>
                      
                      <div className="text-center text-xs">
                        <p>Generated by WorksWise.ai on 08/01/2024</p>
                        <p>Time to generate: 2.3 seconds</p>
                      </div>
                    </div>
                  </RetroWindow>
                </DialogContent>
              </Dialog>
              
              <div className="flex justify-between flex-wrap gap-3">
                <RetroButton variant="default">Explore Features</RetroButton>
                <RetroButton variant="primary">Try Free Demo</RetroButton>
              </div>
            </div>
            
            <div className="flex justify-between pt-2">
              <RetroButton>Sign In</RetroButton>
              <RetroButton>Sign Up</RetroButton>
            </div>
          </div>
        </RetroWindow>
        
        <footer className="text-center mt-8 font-dos text-xs">
          <p>© 1987-2024 WorksWise.ai Systems Inc.</p>
          <p className="text-retro-window-dark mt-1">Memory Available: 638K of 640K</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
