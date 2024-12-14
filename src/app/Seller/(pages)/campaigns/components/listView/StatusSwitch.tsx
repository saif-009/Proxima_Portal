// StatusSwitch.js
import React from 'react'
import { useTheme } from 'next-themes'

const StatusSwitch = ({ value, onChange }:any) => {
  const { theme } = useTheme()
 
  if (value !== 'ACTIVE' && value !== 'PAUSED') {
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>{value}</span>;
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onChange(value === 'ACTIVE' ? 'PAUSED' : 'ACTIVE')}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          value === 'ACTIVE'
            ? theme === 'dark' ? 'bg-green-600' : 'bg-green-300'
            : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value === 'ACTIVE' ? 'translate-x-5' : 'translate-x-1'
          }`}
              />
      </button>
      <span className={value === 'ACTIVE' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
        {value}
      </span>
    </div>
  );
}

export default StatusSwitch