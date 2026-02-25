import { CopyButton } from './copy-button'

export function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <div className="pre-wrapper relative group">
      <pre {...props}>{props.children}</pre>
      <CopyButton />
    </div>
  )
}
