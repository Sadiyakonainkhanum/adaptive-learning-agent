
import type { AnalysisResult } from '@/lib/adaptive/types'

const nodes = [
  { id: 'fn', x: 50, y: 150, label: 'Functions', state: 'mastered' },
  { id: 'it', x: 120, y: 60, label: 'Iteration', state: 'mastered' },
  { id: 'bc', x: 200, y: 140, label: 'Base cases', state: 'current' },
  { id: 'cs', x: 290, y: 70, label: 'Call stack', state: 'predicted' },
  { id: 'rc', x: 330, y: 175, label: 'Complexity', state: 'upcoming' },
  { id: 'dp', x: 410, y: 110, label: 'DP', state: 'upcoming' },
] as const

const edges: [string, string][] = [
  ['fn', 'it'],
  ['fn', 'bc'],
  ['it', 'bc'],
  ['bc', 'cs'],
  ['bc', 'rc'],
  ['cs', 'rc'],
  ['cs', 'dp'],
  ['rc', 'dp'],
]

const stateStyles = {
  mastered: { fill: 'var(--success)', ring: 'var(--success)' },
  current: { fill: 'var(--primary)', ring: 'var(--primary)' },
  predicted: { fill: 'var(--warning)', ring: 'var(--warning)' },
  upcoming: {
    fill: 'var(--muted-foreground)',
    ring: 'var(--border)',
  },
}

export function ConceptGraph({
  result,
}: {
  result: AnalysisResult | null
}) {
  const dynamicNodes = nodes.map((node) => {
    if (!result) return node

    if (node.id === 'bc') {
      return {
        ...node,
        state:
          result.understanding === 'good'
            ? ('mastered' as const)
            : ('current' as const),
      }
    }

    if (node.id === 'cs') {
      const isCallStackPredicted =
        result.predictedGap.concept
          .toLowerCase()
          .includes('call stack')

      return {
        ...node,
        state: isCallStackPredicted
          ? ('predicted' as const)
          : ('upcoming' as const),
      }
    }

    return node
  })

  const byId = Object.fromEntries(
    dynamicNodes.map((node) => [node.id, node]),
  )

  return (
    <svg
      viewBox="0 0 460 230"
      className="my-4 h-auto w-full"
      role="img"
      aria-label="Concept graph showing mastered, current, predicted-gap and upcoming recursion concepts"
    >
      {edges.map(([a, b]) => {
        const from = byId[a]
        const to = byId[b]
        const active =
          from.state !== 'upcoming' &&
          to.state !== 'upcoming'

        return (
          <line
            key={`${a}-${b}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={
              active
                ? 'var(--primary)'
                : 'oklch(1 0 0 / 0.12)'
            }
            strokeOpacity={active ? 0.55 : 1}
            strokeWidth={1.25}
            strokeDasharray={
              to.state === 'predicted' ? '4 4' : undefined
            }
          />
        )
      })}

      {dynamicNodes.map((node) => {
        const style = stateStyles[node.state]

        return (
          <g key={node.id}>
            {node.state === 'current' && (
              <circle
                cx={node.x}
                cy={node.y}
                r={18}
                fill="var(--primary)"
                opacity={0.15}
              >
                <animate
                  attributeName="r"
                  values="12;22;12"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.35;0;0.35"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            <circle
              cx={node.x}
              cy={node.y}
              r={9}
              fill="var(--background)"
              stroke={style.ring}
              strokeWidth={1.5}
              strokeDasharray={
                node.state === 'predicted' ? '3 2' : undefined
              }
            />

            <circle
              cx={node.x}
              cy={node.y}
              r={4}
              fill={style.fill}
            />

            <text
              x={node.x}
              y={node.y + 26}
              textAnchor="middle"
              className="fill-muted-foreground"
              style={{ fontSize: 11 }}
            >
              {node.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
