'use client';

import dynamic from 'next/dynamic'

const ASCIIText = dynamic(() => import('@/app/components/ascii-text'), {
  ssr: false,
})

export default function ASCII404() {
  return (
    <div className="relative w-full h-[300px]">
      <ASCIIText
        text="404"
        asciiFontSize={8}
        textFontSize={250}
        planeBaseHeight={10}
        enableWaves={true}
      />
    </div>
  )
}
