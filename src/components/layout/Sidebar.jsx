import { NAV_ITEMS, SOURCES } from '../../data/navigation'

export function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-around px-2 py-2 z-50 md:hidden">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`
            relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl
            min-w-[44px] min-h-[44px] transition-colors
            ${activeTab === item.id
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-gray-400 dark:text-gray-500'
            }
          `}
        >
          {/* Dot indicator */}
          {activeTab === item.id && (
            <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400" />
          )}
          <span className="text-xs font-medium mt-1">{item.label.split(' ')[0]}</span>
          {item.badge && (
            <span className="absolute top-1 right-2 text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </nav>
  )
}

export default function Sidebar({ activeTab, onTabChange }) {
  return (
    <div className="flex flex-col h-full">

      <div className="p-3 flex-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2 mt-1">
          Workspace
        </p>

        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`
              w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm
              transition-colors mb-0.5 text-left font-medium
              ${activeTab === item.id
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }
            `}
          >
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-1.5 py-0.5 rounded-full font-semibold">
                {item.badge}
              </span>
            )}
          </button>
        ))}

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2 mt-5">
          Sources
        </p>

        {SOURCES.map((src) => (
          <div
            key={src.id}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 mb-0.5"
          >
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
              src.connected ? 'bg-emerald-400' : 'bg-gray-300'
            }`} />
            <span className={src.connected ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'}>
              {src.label}
            </span>
            {!src.connected && (
              <span className="ml-auto text-xs text-indigo-500 font-medium cursor-pointer hover:underline">
                Connect
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-semibold text-indigo-700 dark:text-indigo-300 flex-shrink-0">
            SS
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate">Sritam Sarkar</p>
            <p className="text-xs text-gray-400 truncate">Frontend Lead</p>
          </div>
        </div>
      </div>

    </div>
  )
}