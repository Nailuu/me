import { BlogPosts } from '@/app/components/posts'
import { ProjectPosts } from '@/app/components/projects'
import { TechStack } from '@/app/components/tech-stack'

export default function Home() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hey, I'm Julian
      </h1>
      <p className="mb-4">
        {`I'm a Full-Stack Developer working in Luxembourg, and a former 42 student.`}
      </p>
      <p className="mb-4">
        {`This site is where I showcase the projects I'm most proud of and write about the technical problems I run into, whether it's a tricky bug, an infrastructure headache, or something new I figured out along the way.`}
      </p>
      <p className="mb-4">
        {`It's where I document what I learn, for future me and for anyone facing the same issues. If something here saves you a few hours of debugging, even better.`}
      </p>
      <div className="my-8">
        <h2 className="font-semibold text-xl mb-4 tracking-tighter">Tech Stack</h2>
        <TechStack />
      </div>
      <div className="my-8">
        <h2 className="font-semibold text-xl mb-4 tracking-tighter">Projects</h2>
        <ProjectPosts />
      </div>
      <div className="my-8">
        <h2 className="font-semibold text-xl mb-4 tracking-tighter">Blog</h2>
        <BlogPosts />
      </div>
    </section>
  )
}
