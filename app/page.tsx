import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Header / Title Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Accountability Court
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Please select your portal to continue.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid gap-6 mt-8">
          <Link 
            href="/facilitator/login"
            className="group relative flex items-center justify-center w-full px-8 py-4 text-lg font-semibold text-white transition-all duration-200 transform bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="relative">Facilitator Access</span>
          </Link>

          <Link 
            href="/participant/login"
            className="group relative flex items-center justify-center w-full px-8 py-4 text-lg font-semibold text-slate-700 dark:text-slate-200 transition-all duration-200 transform bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-400 hover:scale-[1.02] hover:shadow-md"
          >
            <span className="relative">Participant Access</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="pt-8 text-sm text-slate-500 dark:text-slate-500">
          &copy; {new Date().getFullYear()} Accountability Court System
        </div>
      </div>
    </main>
  );
}
