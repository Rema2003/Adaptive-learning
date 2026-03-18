import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse-soft"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse-soft" style={{animationDelay: '1.5s'}}></div>

      <div className="glass-panel p-12 rounded-3xl z-10 max-w-4xl w-full text-center animate-slide-in">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
          Adaptive AI Learning
        </h1>
        <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-2xl mx-auto">
          Experience an educational platform that dynamically adjusts to your unique learning patterns. No two paths are the same.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/dashboard" className="btn-primary text-lg">
            Enter Student Dashboard
          </Link>
          <a href="#features" className="px-6 py-3 rounded-xl font-bold transition-all duration-300 text-foreground border border-gray-400 hover:bg-black/10 dark:hover:bg-white/10">
            Learn More
          </a>
        </div>
      </div>
      
      {/* Decorative floating cards */}
      <div className="absolute top-[10%] right-[2%] xl:right-[10%] z-20 glass-panel p-6 rounded-2xl hidden lg:block animate-slide-in card-hover shadow-2xl border-white/40 dark:border-white/10" style={{animationDelay: '0.2s'}}>
         <h3 className="font-bold text-indigo-500 dark:text-indigo-400 mb-2 flex items-center gap-2"><span className="text-lg">⚙️</span> Algorithm Active</h3>
         <p className="text-sm opacity-80">Adjusting difficulty: +10%</p>
      </div>
      
      <div className="absolute bottom-[15%] left-[2%] xl:left-[10%] z-20 glass-panel p-6 rounded-2xl hidden lg:block animate-slide-in card-hover shadow-2xl border-white/40 dark:border-white/10" style={{animationDelay: '0.4s'}}>
         <h3 className="font-bold text-purple-500 dark:text-purple-400 mb-2 flex items-center gap-2"><span className="text-lg">🧠</span> Concept Mastery</h3>
         <p className="text-sm opacity-80">Algebra: 85% | Geometry: 42%</p>
      </div>
    </main>
  );
}
