export type TagColor = 'blue' | 'teal' | 'green' | 'amber' | 'orange' | 'rose' | 'purple' | 'indigo'

export const tagColors: Record<TagColor, { bg: string; text: string; darkBg: string; darkText: string }> = {
  blue:   { bg: '#dbeafe', text: '#1e40af', darkBg: 'rgba(30,58,138,0.4)',  darkText: '#93c5fd' },
  teal:   { bg: '#ccfbf1', text: '#115e59', darkBg: 'rgba(19,78,74,0.4)',   darkText: '#5eead4' },
  green:  { bg: '#dcfce7', text: '#166534', darkBg: 'rgba(20,83,45,0.4)',   darkText: '#86efac' },
  amber:  { bg: '#fef3c7', text: '#92400e', darkBg: 'rgba(120,53,15,0.4)',  darkText: '#fcd34d' },
  orange: { bg: '#ffedd5', text: '#9a3412', darkBg: 'rgba(124,45,18,0.4)',  darkText: '#fdba74' },
  rose:   { bg: '#ffe4e6', text: '#9f1239', darkBg: 'rgba(136,19,55,0.4)', darkText: '#fda4af' },
  purple: { bg: '#f3e8ff', text: '#6b21a8', darkBg: 'rgba(88,28,135,0.4)', darkText: '#d8b4fe' },
  indigo: { bg: '#e0e7ff', text: '#3730a3', darkBg: 'rgba(49,46,129,0.4)', darkText: '#a5b4fc' },
}

export const colorNames = Object.keys(tagColors) as TagColor[]

export function hashTagColor(tag: string): TagColor {
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) | 0
  }
  return colorNames[Math.abs(hash) % colorNames.length]
}

export function resolveTagColor(tag: string, color?: string): TagColor {
  return color && color in tagColors ? (color as TagColor) : hashTagColor(tag)
}
