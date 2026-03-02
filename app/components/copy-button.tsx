'use client'

import { useRef, useState, useEffect } from 'react'
import { toast } from 'sonner'

export function CopyButton() {
  const ref = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [singleLine, setSingleLine] = useState(false)

  useEffect(() => {
    const pre = ref.current?.closest('.pre-wrapper')?.querySelector('pre')
    if (pre) {
      setSingleLine(!(pre.textContent ?? '').includes('\n'))
    }
  }, [])

  function onClick() {
    const pre = ref.current?.closest('.pre-wrapper')?.querySelector('pre')
    if (!pre) return
    navigator.clipboard.writeText(pre.textContent ?? '')
    setCopied(true)
    toast.success('Copied to clipboard', {
      duration: 2000,
      classNames: { icon: 'text-green-500' },
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      ref={ref}
      className={`pointer-events-none flex justify-end pr-2 ${
        singleLine ? 'items-center' : 'items-start pt-2'
      }`}
    >
      <button
        onClick={onClick}
        aria-label="Copy code"
        className="copy-button pointer-events-auto rounded-md p-1 bg-neutral-200/60 dark:bg-neutral-700/60 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-500"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-600 dark:text-neutral-400"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  )
}
