import ASCII404 from '@/app/components/ascii-404'

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center py-16">
      <div className="mb-8 w-full">
        <ASCII404 />
      </div>
      <p className="text-muted-foreground text-center">
        This page doesn&apos;t exist. Maybe it was moved, or maybe it never was.
      </p>
    </section>
  )
}
