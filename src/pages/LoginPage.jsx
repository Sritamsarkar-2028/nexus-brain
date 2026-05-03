export default function LoginPage({ onLogin }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="2.5" fill="white"/>
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Nexus Brain</h1>
          <p className="text-xs text-gray-400">Your AI second brain</p>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">

        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
          Welcome back
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Connect your workspace and let Nexus do the thinking.
        </p>

        {/* Google Sign in */}
        <button
          onClick={onLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.440 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 text-xs text-gray-400 bg-white dark:bg-gray-900">
              what you get
            </span>
          </div>
        </div>

        {/* Features */}
        {[
          'Proactive nudges before every meeting',
          'Actions ranked by urgency automatically',
          'Zero manual tagging — AI links everything',
        ].map((feature) => (
          <div key={feature} className="flex items-center gap-2.5 mb-3">
            <div className="w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center flex-shrink-0">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1 4l2 2 4-4" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{feature}</span>
          </div>
        ))}

      </div>

      <p className="text-xs text-gray-400 mt-6 text-center max-w-xs">
        By continuing you agree to our Terms of Service. We never sell your data.
      </p>

    </div>
  )
}