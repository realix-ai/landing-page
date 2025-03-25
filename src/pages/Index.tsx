
import React, { useEffect, useState, useRef } from "react";
import RetroWindow from "@/components/RetroWindow";
import RetroButton from "@/components/RetroButton";
import { applyCRTEffect } from "@/utils/noise";
import { Terminal, AlertTriangle } from "lucide-react";

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
      <div className="w-full max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="font-pixel text-3xl md:text-5xl mb-1 text-retro-title-bar">{typedText || "WorksWise.ai"}</h1>
          {!typedText && <p className="font-dos text-lg">We deliver the real work.</p>}
          <div className="animate-blink inline-block ml-1">_</div>
        </header>
        
        <RetroWindow 
          title="SYSTEM MESSAGE" 
          className="mx-auto max-w-xl animate-scale-in"
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
                    <p>Analyzing financial statements from imanage...</p>
                    <p>Reviewing legal documents and doing legal research...</p>
                    <p>Checking regulatory compliance...</p>
                    <p className="text-green-900 font-bold">Report complete! (2.3 seconds)</p>
                  </div>
                  <p className="text-retro-text-dark">&gt; _</p>
                </div>
              </div>
              
              <div className="flex justify-center">
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
