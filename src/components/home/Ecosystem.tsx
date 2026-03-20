import Container from "../ui/Container";
import {
  FiActivity,
  FiBookOpen,
  FiCalendar,
  FiDollarSign,
  FiGlobe,
  FiLayers,
  FiRepeat,
  FiSettings,
} from "react-icons/fi";

const ECOSYSTEM_ITEMS = [
  { key: "ros", label: "ROS", Icon: FiGlobe },
  { key: "standards", label: "Standards", Icon: FiBookOpen },
  { key: "capital", label: "Capital", Icon: FiDollarSign },
  { key: "exchange", label: "Exchange", Icon: FiRepeat },
  { key: "pulses", label: "Pulses", Icon: FiActivity },
  { key: "institute", label: "Institute", Icon: FiLayers },
  { key: "events", label: "Events", Icon: FiCalendar },
  { key: "operations", label: "Operations", Icon: FiSettings },
];

const Ecosystem = () => {
  return (
    <div className="bg-black relative text-white">
      <Container className="py-20 md:py-28 space-y-6">
        <div className="space-y-3">
          <h2 className="text-[32px] font-semibold tracking-tight leading-tight">Ecosystem</h2>
          <p className="text-[24px] font-medium opacity-80">Everything Connected Under One System</p>
          <p className="text-base opacity-70 max-w-3xl">The full stack of modules that power the real estate operating system — from standards and capital to operations and development.</p>
        </div>

        <div className="grid grid-cols-4 border-t border-white/10">
          {ECOSYSTEM_ITEMS.map((item) => {
            const Icon = item.Icon;
            return (
              <div
                key={item.key}
                className="flex items-center gap-3 px-6 h-19 md:h-21 border-r border-b border-white/10"
              >
                <Icon className="text-white/70" size={18} />
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Ecosystem;