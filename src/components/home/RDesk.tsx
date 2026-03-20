import { BsFillMegaphoneFill } from "react-icons/bs";
import Container from "../ui/Container";
import {
  FiGrid,
  FiMessageSquare,
  FiMonitor,
  FiShield,
  FiUsers,
} from "react-icons/fi";

const DESK_ITEMS = [
  { key: "crm", label: "CRM", Icon: FiGrid },
  { key: "visitor", label: "Visitor Management", Icon: FiUsers },
  { key: "ehs", label: "EHS", Icon: FiShield },
  { key: "campaign", label: "Campaign", Icon: BsFillMegaphoneFill },
  { key: "feedback", label: "Feedback", Icon: FiMessageSquare },
  { key: "task", label: "Task", Icon: FiMonitor },
];

const RDesk = () => {
  return (
    <div className="bg-white relative text-black">
      <Container className="py-20 md:py-28 space-y-10">
        <div className="space-y-3">
          <h2 className="text-[32px] font-semibold tracking-tight leading-tight">R Desk</h2>
          <p className="text-[24px] font-medium opacity-80">
            Tools That Power the Ecosystem
          </p>
          <p className="text-base opacity-70 max-w-3xl">
            Everything needed to run and manage operations — in one unified
            system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {DESK_ITEMS.map((item) => {
            const Icon = item.Icon;
            return (
              <div
                key={item.key}
                className="border border-gray-200 px-8 py-8 min-h-22 flex items-center justify-center hover:bg-black transition-all duration-300 group"
              >
                <div className="flex flex-col items-center gap-3">
                  <Icon className="text-black/80 group-hover:text-white/80 transition-all duration-300" size={18} />
                  <span className="text-sm font-semibold group-hover:text-white transition-all duration-300">{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default RDesk;