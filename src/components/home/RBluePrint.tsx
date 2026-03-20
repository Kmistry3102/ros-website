import Container from "../ui/Container";
import { FiBookOpen, FiDollarSign, FiSettings } from "react-icons/fi";

const FEATURES = [
  {
    key: "standards",
    icon: FiBookOpen,
    title: "Standards",
    desc: "Uniform rules for how real estate is built, verified, and operated.",
  },
  {
    key: "capital",
    icon: FiDollarSign,
    title: "Capital",
    desc: "Clear pathways for funding with shared visibility and confidence.",
  },
  {
    key: "operations",
    icon: FiSettings,
    title: "Operations",
    desc: "Connected workflows so teams can execute without friction.",
  },
];

const RBluePrint = () => {
  return (
    <div className="bg-white relative text-black">
      <Container className="py-16 md:py-20 space-y-8">
        <div className="space-y-3">
          <h2 className="text-[32px] font-semibold tracking-tight leading-tight">
            Real Estate
          </h2>
          <p className="text-[24px] font-medium text-muted-foreground">
            Smart Design for Better Living with BLUEPRINT
          </p>
          <p className="text-base text-muted-foreground max-w-3xl">Real estate building templates crafted for smart design and better living.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.key}
                className="border border-gray-100 bg-white p-8 space-y-3"
              >
                <Icon className="text-black/70" size={20} />
                <div className="text-base font-bold">{f.title}</div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {f.desc}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default RBluePrint;