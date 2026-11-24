import { images, profile } from "@/lib/data";
import { Button, FadeUp, Line, RevealImage, SectionLabel, SplitWords } from "@/components/ui";

const pillars = [
  { k: "Philosophy", v: "Proactive quality management — preventing issues rather than reacting to them." },
  { k: "Work approach", v: "Effective communication, technical problem-solving and close collaboration with suppliers and teams." },
  { k: "Career focus", v: "Apparel quality control, factory audits, production monitoring and continuous improvement." },
];

export default function About() {
  return (
    <section id="about" className="on-light relative overflow-hidden bg-paper py-24 md:py-40">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <RevealImage src={images.about} alt="Md Ashkarul Azim, Quality Control Engineer" className="aspect-[4/5] w-full" sizes="(min-width:1024px) 40vw, 100vw" position="center 20%" />
          <FadeUp delay={0.3} className="label mt-4 flex items-center justify-between text-mute">
            <span>Quality Professional / Dhaka, Bangladesh</span>
            <span className="text-ink">(01)</span>
          </FadeUp>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <SectionLabel>About Me</SectionLabel>
          <SplitWords as="h2" text="COMMITTED TO *QUALITY* EXCELLENCE." hl="bg" className="display mb-10 mt-6 text-[clamp(2.4rem,6vw,5.6rem)]" />
          <div className="space-y-5 text-base leading-relaxed text-ink/80 md:text-lg">
            <FadeUp as="p">
              I am Md Ashkarul Azim, an apparel quality professional with experience in denim and non-denim garment inspection, production monitoring, factory audits, and quality assurance.
            </FadeUp>
            <FadeUp as="p" delay={0.08}>
              My professional journey has involved working with inspection services, apparel manufacturing, and quality teams to identify defects, maintain buyer requirements, and improve production quality.
            </FadeUp>
            <FadeUp as="p" delay={0.16}>
              I believe in proactive quality management, effective communication, technical problem-solving, and continuous improvement.
            </FadeUp>
          </div>

          <Line className="my-10" />
          <ul className="grid gap-6 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <FadeUp as="li" key={p.k} delay={i * 0.1}>
                <p className="label mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime ring-1 ring-black/30" aria-hidden="true" />
                  {p.k}
                </p>
                <p className="text-sm leading-relaxed text-mute">{p.v}</p>
              </FadeUp>
            ))}
          </ul>

          <FadeUp className="mt-10 flex flex-wrap gap-3">
            <Button href={profile.resume} external cursor="CV">
              Download CV
            </Button>
            <Button href="#contact" variant="outline">
              Let’s Connect
            </Button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
