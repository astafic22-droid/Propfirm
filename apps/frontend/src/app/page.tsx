import Link from 'next/link'
import { MotionConfig, motion } from 'framer-motion'

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="mx-auto max-w-7xl px-6 py-16">
        <section className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Trade with our capital, keep up to 90% profits</h1>
          <p className="mt-4 text-lg text-gray-600">Fast payouts. Trader-friendly rules. Real funding.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="#plans" className="rounded-md bg-brand px-6 py-3 text-white font-medium hover:bg-brand-dark">Start Challenge</Link>
            <Link href="/auth/register" className="rounded-md border px-6 py-3 font-medium border-gray-300">Sign Up</Link>
          </div>
        </section>

        <section className="mt-24 grid md:grid-cols-3 gap-8">
          {[
            { title: 'Instant Funding', desc: 'Prove consistency, access capital.' },
            { title: 'Risk Management', desc: 'Clear rules and fair limits.' },
            { title: 'Fast Payouts', desc: 'Withdraw profits quickly.' }
          ].map((f) => (
            <motion.div key={f.title} initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="rounded-lg border p-6">
              <h3 className="font-semibold text-xl">{f.title}</h3>
              <p className="mt-2 text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </section>

        <section id="plans" className="mt-24">
          <h2 className="text-2xl font-bold">Challenge Plans</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[10000, 50000, 100000].map((size) => (
              <div key={size} className="rounded-lg border p-6">
                <h3 className="text-xl font-semibold">${size.toLocaleString()} Account</h3>
                <p className="mt-2 text-gray-600">Two-phase evaluation. Reach target to get funded.</p>
                <Link href={`/challenge/start?size=${size}`} className="mt-4 inline-block rounded-md bg-gray-900 text-white px-4 py-2">Buy Challenge</Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </MotionConfig>
  )
}

