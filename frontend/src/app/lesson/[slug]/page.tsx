"use client";
import Link from 'next/link';
import { useState, use } from 'react';

export default function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const title = slug === 'derivatives' ? 'Introduction to Derivatives' : 'Custom Lesson';
  
  const handleAnswer = async (isCorrect: boolean) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'student_123',
          topic: slug || 'calculus',
          difficulty: 0.6,
          isCorrect: isCorrect,
          timeSpent: Math.floor(Math.random() * 30) + 5
        }),
      });
      const data = await res.json();
      setFeedback(data.ai_analysis);
    } catch (err) {
      console.error(err);
      setFeedback({ ai_generated_feedback: "Error connecting to backend API. Make sure Node.js is running." });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 lg:p-12 relative overflow-hidden flex flex-col items-center">
       {/* Ambient Light */}
       <div className="absolute top-[0] right-[0] w-[60%] h-[50%] bg-purple-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-20 pointer-events-none"></div>

       <div className="w-full max-w-4xl relative z-10">
         <header className="flex justify-between items-center mb-8 animate-slide-in">
           <Link href="/dashboard" className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity">
             &larr; Back to Dashboard
           </Link>
           <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 font-bold rounded-full text-xs border border-indigo-500/20">
             Adaptive Mode: On
           </span>
         </header>

         <main className="glass-panel p-8 md:p-12 rounded-3xl animate-slide-in" style={{animationDelay: '0.1s'}}>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-8">{title}</h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
               <p className="text-xl mb-6">
                 Because you learned best with visual examples during the Functions module, 
                 we've customized this lesson on derivatives to rely heavily on graphs and tangent lines.
               </p>
               
               <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-8 shadow-inner overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <span className="text-slate-400 font-semibold">[Interactive Graph Visualization Placeholder]</span>
               </div>
            </div>

            <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-8 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full rotate-45 transform translate-x-16 -translate-y-16"></div>
               <h3 className="font-bold text-xl mb-4 relative z-10">Concept Check</h3>
               <p className="mb-6 opacity-90 relative z-10">If the tangent line to a curve is perfectly horizontal, what is the value of the derivative at that point?</p>
               
               {!feedback ? (
                 <div className="space-y-4 relative z-10">
                    <button onClick={() => handleAnswer(false)} disabled={loading} className="w-full text-left p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/50 transition-all font-semibold">
                      1
                    </button>
                    <button onClick={() => handleAnswer(true)} disabled={loading} className="w-full text-left p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/50 transition-all font-semibold relative overflow-hidden group">
                      <div className="absolute inset-0 bg-indigo-500/10 w-0 group-hover:w-full transition-all duration-300"></div>
                      <span className="relative z-10">0</span>
                    </button>
                    <button onClick={() => handleAnswer(false)} disabled={loading} className="w-full text-left p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/50 transition-all font-semibold">
                      Undefined
                    </button>
                 </div>
               ) : (
                 <div className="relative z-10 p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/30 shadow-inner animate-slide-in">
                    <h4 className="font-bold text-indigo-500 mb-4 flex items-center gap-2">
                       <span className="text-xl">✨</span> AI Tutor Response
                    </h4>
                    <p className="text-lg opacity-90 mb-4 font-medium">{feedback.ai_generated_feedback}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm opacity-70 font-semibold mb-6">
                       <span className="bg-black/10 dark:bg-white/10 px-3 py-1 rounded-full">New Difficulty: {(feedback.updated_difficulty * 100).toFixed(0)}%</span>
                       <span className="hidden sm:inline">|</span>
                       <span className="bg-black/10 dark:bg-white/10 px-3 py-1 rounded-full">Next module: {feedback.next_recommended_topic}</span>
                    </div>
                    <button onClick={() => setFeedback(null)} className="btn-primary w-full sm:w-auto">Try Another Question</button>
                 </div>
               )}
            </div>
         </main>
       </div>
    </div>
  );
}
