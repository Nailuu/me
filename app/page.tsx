import { BlogPosts } from '@/app/components/posts'

export default function Home() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hey, I’m Julian
      </h1>
      <p className="mb-4">
        {`I’m a Full-Stack Developer working in FinTech in Luxembourg.`}
      </p>
      <p className="mb-4">
        {`This site is where I showcase the projects I’m most proud of and write about the technical problems I run into — whether it’s a tricky bug, an infrastructure headache, or something new I figured out along the way.`}
      </p>
      <p className="mb-4">
        {`It’s where I document what I learn — for future me, and for anyone facing the same issues. If something here saves you a few hours of debugging, even better.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
