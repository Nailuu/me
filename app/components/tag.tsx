export type TagColor = 'blue' | 'teal' | 'green' | 'amber' | 'orange' | 'rose' | 'purple' | 'indigo'

const palette: Record<TagColor, string> = {
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  teal: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  green: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  rose: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
}

const colorNames = Object.keys(palette) as TagColor[]

function hashTag(tag: string): TagColor {
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) | 0
  }
  return colorNames[Math.abs(hash) % colorNames.length]
}

export function Tag({
  tag,
  color,
  size = 'default',
}: {
  tag: string
  color?: string
  size?: 'sm' | 'default'
}) {
  const resolved = color && color in palette ? color as TagColor : hashTag(tag)
  const sizeClasses = size === 'sm'
    ? 'text-xs px-1.5 py-0.5'
    : 'text-sm px-2 py-0.5'

  return (
    <span className={`inline-block rounded-full font-medium ${sizeClasses} ${palette[resolved]}`}>
      {tag}
    </span>
  )
}
