import {
  SiDotnet,
  SiAngular,
  SiNextdotjs,
  SiPostgresql,
  SiSpringboot,
  SiDocker,
  SiPython,
  SiLangchain,
  SiGo,
  SiCplusplus,
} from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'
import type { IconType } from 'react-icons'

function ClaudeCodeIcon({ size = 24 }: { size?: number }) {
  return (
    <svg height={size} width={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z" fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}

type Tech = {
  name: string
  icon: IconType | typeof ClaudeCodeIcon
  color: string
  darkColor?: string
}

const techs: Tech[] = [
  { name: 'C# / .NET', icon: SiDotnet, color: '#512BD4' },
  { name: 'Angular', icon: SiAngular, color: '#DD0031' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#171717', darkColor: '#ffffff' },
  { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Claude Code', icon: ClaudeCodeIcon, color: '#D97757' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'LangChain', icon: SiLangchain, color: '#1C3C3C' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Azure', icon: VscAzure, color: '#0078D4' },
  { name: 'Go', icon: SiGo, color: '#00ADD8' },
  { name: 'C/C++', icon: SiCplusplus, color: '#00599C' },
]

export function TechStack() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 justify-items-center">
      {techs.map((tech) => {
        const Icon = tech.icon
        return (
          <div
            key={tech.name}
            className="group flex flex-col items-center gap-1.5 transition-transform hover:scale-105"
          >
            <span
              style={{ '--brand-color': tech.color, '--brand-color-dark': tech.darkColor ?? tech.color } as React.CSSProperties}
              className="text-neutral-400 transition-colors duration-200 group-hover:[color:var(--brand-color)] dark:group-hover:[color:var(--brand-color-dark)]"
            >
              <Icon size={24} />
            </span>
            <span className="text-xs text-neutral-500">{tech.name}</span>
          </div>
        )
      })}
    </div>
  )
}
