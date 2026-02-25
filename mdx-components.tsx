import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import Image, { type ImageProps } from 'next/image'
import { highlight } from 'sugar-high'
import React from 'react'
import { Pre } from '@/app/components/pre'

function Table({
  data,
}: {
  data: { headers: string[]; rows: string[][] }
}) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? ''

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage({ alt, ...props }: ImageProps) {
  return <Image alt={alt} className="rounded-lg" {...props} />
}

function Code({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { children?: string }) {
  if (typeof children !== 'string') {
    return <code {...props}>{children}</code>
  }
  const isInline = !props.className?.includes('language-') && !children.includes('\n')
  if (isInline) {
    return <code {...props}>{children}</code>
  }
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level: number) {
  const Heading = ({ children }: { children?: React.ReactNode }) => {
    const slug = slugify(String(children ?? ''))
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }
  Heading.displayName = `Heading${level}`
  return Heading
}

export function useMDXComponents(): MDXComponents {
  return {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    Image: RoundedImage,
    a: CustomLink as MDXComponents['a'],
    pre: Pre as MDXComponents['pre'],
    code: Code as MDXComponents['code'],
    Table,
  }
}
