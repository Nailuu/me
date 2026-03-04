import { ImageResponse } from 'next/og'
import { tagColors, resolveTagColor } from '@/app/components/tag-colors'

type TagParam = { n: string; c?: string }

export async function GET(request: Request) {
  const url = new URL(request.url)
  const title = url.searchParams.get('title') || 'Unknown'

  let tags: TagParam[] = []
  const tagsParam = url.searchParams.get('tags')
  if (tagsParam) {
    try {
      const parsed = JSON.parse(tagsParam)
      if (Array.isArray(parsed)) {
        tags = parsed.filter((t: TagParam) => typeof t.n === 'string')
      }
    } catch {}
  }

  const fontData = await fetch(
    'https://fonts.googleapis.com/css2?family=Onest:wght@700&display=swap'
  )
    .then((res) => res.text())
    .then((css) => {
      const match = css.match(/src: url\((.+?)\) format/)
      return match ? fetch(match[1]).then((res) => res.arrayBuffer()) : null
    })

  return new ImageResponse(
    (
      <div
        tw="flex w-full h-full relative"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1028 40%, #2d1b4e 60%, #0a0a0a 100%)',
          fontFamily: 'Onest',
        }}
      >
        {/* Icon watermark */}
        <div
          tw="absolute flex items-center justify-center"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.12,
          }}
        >
          <svg width="520" height="524" viewBox="0 0 86 87" fill="none">
            <defs>
              <linearGradient
                id="paint0"
                x1="59.3"
                y1="12.0446"
                x2="33.3395"
                y2="68.9002"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#e8d5ff" />
                <stop offset="1" stop-color="#7c4dbd" />
              </linearGradient>
              <linearGradient
                id="paint2"
                x1="30.8096"
                y1="65"
                x2="27.3096"
                y2="74.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#9b72cf" />
                <stop offset="0.443024" stop-color="#6b3fa0" />
                <stop offset="1" stop-color="#3d1f6d" />
              </linearGradient>
            </defs>
            <path
              d="M59.3 12.0446L57.6596 82.9992L6.00003 58.91L59.3 12.0446Z"
              fill="url(#paint0)"
            />
            <path
              d="M57.6596 82.9992C56.6093 85.2517 44.4048 81.2319 30.1394 74.5799C15.874 67.9278 4.94974 61.1624 6.00007 58.91C7.05039 56.6576 19.6775 59.771 33.9429 66.4231C48.2083 73.0751 58.7099 80.7468 57.6596 82.9992Z"
              fill="url(#paint2)"
            />
          </svg>
        </div>

        {/* Content */}
        <div tw="flex flex-col justify-end w-full h-full p-16">
          <h1
            tw="text-6xl text-white tracking-tight"
            style={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            {title}
          </h1>
          <div tw="flex items-center justify-between mt-4">
            <div tw="text-2xl" style={{ color: 'rgba(255,255,255,0.5)' }}>
              nailu.dev
            </div>
            {tags.length > 0 && (
              <div tw="flex flex-wrap justify-end" style={{ gap: 10 }}>
                {tags.map((t) => {
                  const color = resolveTagColor(t.n, t.c)
                  const c = tagColors[color]
                  return (
                    <span
                      key={t.n}
                      tw="text-lg font-medium px-4 py-1.5"
                      style={{
                        backgroundColor: c.darkBg,
                        color: c.darkText,
                        borderRadius: 9999,
                      }}
                    >
                      {t.n}
                    </span>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      ...(fontData && {
        fonts: [
          {
            name: 'Onest',
            data: fontData,
            weight: 700,
            style: 'normal' as const,
          },
        ],
      }),
    }
  )
}
