import { CopyButton } from './copy-button'

export function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <div className="pre-wrapper group grid [&>*]:[grid-area:1/1]">
      <pre {...props}>{props.children}</pre>
      <CopyButton />
    </div>
  )
}
