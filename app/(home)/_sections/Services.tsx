import { services } from "@/lib/data";
import { FadeUp, Line, SectionLabel, SplitWords } from "@/components/ui";

export default function Services() {
  return (
    <section id="contribution" className="on-light bg-paper py-24 md:py-40">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionLabel n="03">Professional Contribution</SectionLabel>
            <SplitWords as="h2" text="HOW I *CONTRIBUTE.*" hl="bg" className="display mt-6 text-[clamp(2.4rem,4.2vw,4.8rem)]" />
            <FadeUp className="mt-6 max-w-xs text-mute">
              <p>Areas of technical support I provide through my role in apparel quality control and inspection.</p>
            </FadeUp>
          </div>
        </div>
        <ul className="lg:col-span-8">
          {services.map((s) => (
            <li key={s.n} className="group">
              <Line />
              <FadeUp className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 py-8 transition-transform duration-500 md:grid-cols-[5rem_1fr_1.2fr] md:gap-x-10 md:py-10 md:hover:translate-x-2">
                <span className="display text-3xl text-mute transition-colors group-hover:text-ink md:text-4xl">{s.n}</span>
                <h3 className="display text-[clamp(1.35rem,2.6vw,2.2rem)] leading-[1.05]">{s.title}</h3>
                <p className="col-span-2 text-mute md:col-span-1">{s.text}</p>
              </FadeUp>
            </li>
          ))}
          <li>
            <Line />
          </li>
        </ul>
      </div>
    </section>
  );
}
