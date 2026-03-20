import Container from "../ui/Container";
import { FiCalendar, FiGrid, FiMap } from "react-icons/fi";

const EVENTS = [
  {
    key: "standards",
    Icon: FiGrid,
    title: "Standards updates",
    desc: "New certifications that keep the market consistent as it scales.",
  },
  {
    key: "capital",
    Icon: FiMap,
    title: "Capital milestones",
    desc: "Funding moments tracked with shared context and transparency.",
  },
  {
    key: "exchange",
    Icon: FiCalendar,
    title: "Exchange announcements",
    desc: "Opportunities and listings routed through the ROS network.",
  },
];

const Event = () => {
  return (
    <div className="bg-black relative text-white">
      <Container className="py-16 md:py-20 space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase opacity-40">
            07 — EVENTS
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Events that align the ecosystem.
          </h2>
          <p className="text-xs md:text-sm opacity-60 max-w-2xl">
            Everything stays in sync: updates, milestones, and announcements
            routed through a single operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EVENTS.map((e) => {
            const Icon = e.Icon;
            return (
              <div
                key={e.key}
                className="border border-white/10 bg-neutral-900 p-8 space-y-3"
              >
                <Icon className="text-white/70" size={20} />
                <div className="text-base font-bold">{e.title}</div>
                <div className="text-sm opacity-70 leading-relaxed">{e.desc}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Event;