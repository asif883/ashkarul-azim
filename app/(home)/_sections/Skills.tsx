import { skills } from "@/lib/data";
import { FadeUp, Line, SectionLabel, SplitWords } from "@/components/ui";

function Group({ title, items, n }: { title: string; items: string[]; n: string }) {
  return (
    <FadeUp className="mb-14">
      <p className="label mb-4 flex items-center gap-3">
        <span className="text-mute">{n}</span> {title}
      </p>
      <Line />
      <ul>
        {items.map((it) => (
          <li key={it} className="group flex items-center gap-4 border-b border-line py-3.5 transition-transform duration-500 hover:translate-x-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink transition-colors group-hover:bg-lime group-hover:ring-1 group-hover:ring-ink" aria-hidden="true" />
            <span className="display text-[clamp(1.05rem,1.8vw,1.5rem)] normal-case tracking-tight">{it}</span>
          </li>
        ))}
      </ul>
    </FadeUp>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="on-light bg-white py-24 md:py-40">
      <div className="wrap">
        <SectionLabel n="07">Skills &amp; Professional Capabilities</SectionLabel>
        <SplitWords as="h2" text="THE SKILLS BEHIND THE *WORK.*" hl="bg" className="display mb-16 mt-6 max-w-5xl text-[clamp(2.4rem,7vw,7rem)] md:mb-24" />
        <div className="grid gap-x-20 lg:grid-cols-2">
          <div>
            <Group n="A" title="Technical Expertise" items={skills.technical} />
          </div>
          <div>
            <Group n="B" title="Professional Skills" items={skills.professional} />
            <Group n="C" title="Software Skills" items={skills.software} />
            <FadeUp>
              <p className="label mb-4 flex items-center gap-3">
                <span className="text-mute">D</span> Languages
              </p>
              <Line />
              <ul>
                {skills.languages.map(([l, lv]) => (
                  <li key={l} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-3.5">
                    <span className="display text-[clamp(1.05rem,1.8vw,1.5rem)] normal-case tracking-tight">{l}</span>
                    <span className="label text-mute">{lv}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
