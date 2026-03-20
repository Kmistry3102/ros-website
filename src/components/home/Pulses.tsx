import Container from "../ui/Container";
import { FiActivity, FiTrendingUp, FiWifi } from "react-icons/fi";

const PULSE_STATS = [
  {
    key: "live",
    Icon: FiActivity,
    label: "Live signals",
    value: "Realtime",
  },
  {
    key: "trust",
    Icon: FiTrendingUp,
    label: "Trust signals",
    value: "Verified",
  },
  {
    key: "network",
    Icon: FiWifi,
    label: "Network health",
    value: "Connected",
  },
];

const Pulses = () => {
  return (
    <div className="bg-black relative text-white">
      <Container className="py-16 md:py-20 space-y-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase opacity-40">
            08 — PULSES
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Pulses that show what the ecosystem is doing.
          </h2>
          <p className="text-xs md:text-sm opacity-60 max-w-2xl">
            Turn activity into insight so teams can react faster and improve
            outcomes across the full real estate lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PULSE_STATS.map((s) => {
            const Icon = s.Icon;
            return (
              <div
                key={s.key}
                className="border border-white/10 bg-neutral-900 p-8 space-y-3"
              >
                <Icon className="text-white/70" size={20} />
                <div className="text-sm font-semibold opacity-90">
                  {s.label}
                </div>
                <div className="text-3xl font-bold">{s.value}</div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Pulses;