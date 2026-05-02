import Shell from './components/layout/Shell'

function App() {
  return (
    <Shell>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Dashboard
      </h1>
      <p className="text-sm text-gray-400 mt-1">
        Actions that need your attention.
      </p>
    </Shell>
  )
}

export default App