export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#FFFFFF' }} className="min-h-screen pt-16 sm:pt-20">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-14">
        {/* Header */}
        <div className="mb-10">
          <span className="font-inter text-xs font-medium tracking-widest uppercase text-[#5B9BD5] mb-3 block">
            About
          </span>
          <h1 className="font-barlow text-5xl sm:text-6xl font-extrabold italic text-[#1A1A1A] leading-tight">
            What This Is
          </h1>
        </div>

        {/* Pull quote */}
        <blockquote
          className="font-barlow text-3xl font-extrabold italic text-[#1A1A1A] my-8 py-2"
          style={{ borderLeft: '4px solid #5B9BD5', paddingLeft: '1.5rem' }}
        >
          "Comedy history deserves the same seriousness as music or film history."
        </blockquote>

        {/* Body */}
        <div className="space-y-6">
          <p className="font-serif-body text-lg text-[#1A1A1A] leading-[1.8]">
            The Comedy Tribune is a publication for people who think seriously about comedy — its history, its business, and the people who built the art form. Think The Ringer meets Rolling Stone, but for comedy. Written by people who actually live in it.
          </p>

          <p className="font-serif-body text-lg text-[#1A1A1A] leading-[1.8]">
            This isn&apos;t a fan site. It&apos;s a publication with a point of view. We have opinions about who matters, why certain comedians changed the game, and what&apos;s criminally underrated. We distinguish confirmed fact from inference. We source our claims. We take the craft seriously.
          </p>

          <h2 className="font-barlow text-3xl font-extrabold italic text-[#1A1A1A] mt-10 mb-4">
            The Documentary Series
          </h2>

          <p className="font-serif-body text-lg text-[#1A1A1A] leading-[1.8]">
            Alongside the written publication, The Comedy Tribune produces a YouTube documentary series under Macaw Studios. Each episode is 10–15 minutes. Each one focuses on a figure or moment that shaped the trajectory of comedy. No fluff. Just the story and why it matters.
          </p>

          <p className="font-serif-body text-lg text-[#1A1A1A] leading-[1.8]">
            Our first episode — <strong>EP01: John Candy — &ldquo;The Man Who Couldn&apos;t Say No&rdquo;</strong> — is currently in production. It tells the story of one of the most beloved comedic performers of his generation and the system that made him: Second City Toronto, SCTV, and the relentless pace that defined his career and shortened his life.
          </p>

          <h2 className="font-barlow text-3xl font-extrabold italic text-[#1A1A1A] mt-10 mb-4">
            Who Contributes
          </h2>

          <p className="font-serif-body text-lg text-[#1A1A1A] leading-[1.8]">
            The Comedy Tribune is produced under Macaw Studios. We work with writers, researchers, and comedians who bring insider knowledge to the coverage. If you have a story worth telling or expertise in comedy history, get in touch.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-14 pt-8 border-t border-[#E5E5E5]">
          <p className="font-inter text-sm text-[#666666]">
            Questions, pitches, or feedback:{' '}
            <a
              href="mailto:thecomedytribune@gmail.com"
              className="text-[#5B9BD5] hover:opacity-80 transition-opacity"
            >
              thecomedytribune@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
