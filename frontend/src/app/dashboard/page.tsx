import Link from 'next/link';

export default function Dashboard() {
  const currentLevel = 0.6; // Mock level
  const courses = [
    { id: '1', title: 'Advanced Algebra', progress: 85, color: 'from-blue-400 to-blue-600' },
    { id: '2', title: 'Probability Theory', progress: 42, color: 'from-purple-400 to-purple-600' },
    { id: '3', title: 'Calculus Fundamentals', progress: 10, color: 'from-indigo-400 to-indigo-600' },
  ];

  return (
    <div className="min-h-screen p-8 lg:p-12 relative overflow-hidden">
       {/* Ambient Light */}
       <div className="absolute top-[0] left-[50%] -translate-x-1/2 w-[80%] h-[30%] bg-blue-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-20 pointer-events-none"></div>
       
       <header className="flex justify-between items-center mb-16 relative z-10 animate-slide-in">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
            Welcome back, Student
          </h1>
          <div className="flex items-center gap-4">
             <div className="glass-panel px-4 py-2 rounded-full font-semibold text-sm">
                AI Readiness: {(currentLevel * 100).toFixed(0)}%
             </div>
             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg border-2 border-white/20"></div>
          </div>
       </header>

       <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {/* Main Learning Hub */}
          <section className="lg:col-span-2 space-y-8">
             <div className="glass-panel p-8 rounded-3xl animate-slide-in" style={{animationDelay: '0.1s'}}>
                <h2 className="text-2xl font-bold mb-4">Recommended Next Step</h2>
                <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                   <div className="flex justify-between items-start mb-6 relative z-10">
                      <div>
                         <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 block">AI MATCH: 98%</span>
                         <h3 className="text-xl font-bold">Introduction to Derivatives</h3>
                      </div>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20">Medium Difficulty</span>
                   </div>
                   <p className="text-slate-300 mb-6 text-sm relative z-10">Based on your recent struggles with limits, the AI engine has custom-generated a visual approach to derivatives.</p>
                   <Link href="/lesson/derivatives" className="btn-primary w-full text-center block relative z-10">Start Lesson</Link>
                </div>
             </div>

             <h2 className="text-2xl font-bold mt-12 mb-6">Your Learning Paths</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((c, i) => (
                  <div key={c.id} className="glass-panel p-6 rounded-2xl card-hover animate-slide-in" style={{animationDelay: `${0.2 + (i * 0.1)}s`}}>
                     <h3 className="font-bold text-lg mb-4">{c.title}</h3>
                     <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-3 mb-2 overflow-hidden">
                        <div className={`bg-gradient-to-r ${c.color} h-3 rounded-full`} style={{ width: `${c.progress}%` }}></div>
                     </div>
                     <p className="text-right text-sm font-semibold opacity-70">{c.progress}% Mastery</p>
                  </div>
                ))}
             </div>
          </section>

          {/* AI Insights Sidebar */}
          <aside className="glass-panel p-8 rounded-3xl h-fit animate-slide-in" style={{animationDelay: '0.3s'}}>
             <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-indigo-500 text-2xl">✨</span> AI Insights
             </h2>
             <ul className="space-y-6">
                <li className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 card-hover">
                   <h4 className="font-bold text-indigo-600 dark:text-indigo-400 text-sm mb-1">Knowledge Gap Detected</h4>
                   <p className="text-sm opacity-80">You answered 3 consecutive geometry questions incorrectly. Difficulty has been reduced by 15%.</p>
                </li>
                <li className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 card-hover">
                   <h4 className="font-bold text-purple-600 dark:text-purple-400 text-sm mb-1">Learning Velocity</h4>
                   <p className="text-sm opacity-80">Your processing speed on algebraic equations is top 10%. Generating advanced problem sets.</p>
                </li>
             </ul>
          </aside>
       </main>
    </div>
  );
}
