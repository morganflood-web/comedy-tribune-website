export default function ContactPage() {
  return (
    <div style={{ backgroundColor: '#F5F0E8' }} className="min-h-screen pt-16 sm:pt-20">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-14">
        <div className="mb-10">
          <span className="font-inter text-xs font-medium tracking-widest uppercase text-[#5B9BD5] mb-3 block">
            Contact
          </span>
          <h1 className="font-barlow text-5xl sm:text-6xl font-extrabold italic text-[#1A1A1A] leading-tight">
            Get in Touch
          </h1>
        </div>

        <div className="space-y-6">
          <p className="font-serif-body text-lg text-[#1A1A1A] leading-[1.8]">
            For pitches, story tips, corrections, press inquiries, or anything else — email is the right door.
          </p>

          <div
            className="rounded p-8"
            style={{ backgroundColor: '#EDE8DF', border: '1px solid #D5CEBD' }}
          >
            <p className="font-inter text-xs font-medium tracking-widest uppercase text-[#666666] mb-2">
              General Contact
            </p>
            <a
              href="mailto:thecomedytribune@gmail.com"
              className="font-barlow text-3xl font-bold italic text-[#5B9BD5] hover:opacity-80 transition-opacity"
            >
              thecomedytribune@gmail.com
            </a>
          </div>

          <p className="font-inter text-sm text-[#666666] leading-relaxed">
            We read every email. We don&apos;t respond to every email. But if your pitch is good or your correction is right, we will get back to you.
          </p>
        </div>
      </div>
    </div>
  )
}
