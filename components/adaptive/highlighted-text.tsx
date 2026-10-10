/** Renders **bold** segments as highlighted concepts and `code` segments as inline code. */
export function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <mark key={i} className="rounded bg-primary/15 px-1 font-medium text-primary">
              {part.slice(2, -2)}
            </mark>
          )
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-accent">
              {part.slice(1, -1)}
            </code>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}
