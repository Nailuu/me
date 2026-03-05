'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  function handleToggle() {
    setSpinning(true)
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    setTimeout(() => setSpinning(false), 500)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleToggle}
          className="group w-9 h-9 flex items-center justify-center rounded-md transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Toggle theme"
        >
          <div
            className={`relative transition-transform duration-500 ease-in-out ${spinning ? 'rotate-[360deg]' : 'rotate-0'}`}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-current group-hover:text-yellow-500" />
            <Moon className="absolute inset-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-current group-hover:text-slate-400" />
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
      </TooltipContent>
    </Tooltip>
  )
}
