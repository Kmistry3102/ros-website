import Container from "../ui/Container";
import { FiBriefcase, FiMapPin, FiUser } from "react-icons/fi";

const IDENTITY_CARDS = [
  {
    key: "id",
    label: "ID",
    subtitle: "I buy, own, or live in real estate",
    Icon: FiUser,
    highlighted: true,
  },
  {
    key: "rid",
    label: "RID",
    subtitle: "I work in real estate",
    Icon: FiUser,
  },
  {
    key: "org",
    label: "ORG ID",
    subtitle: "I run a real estate business",
    Icon: FiBriefcase,
  },
  {
    key: "asset",
    label: "ASSET ID",
    subtitle: "I own land or property",
    Icon: FiMapPin,
  },
];

const Identity = () => {
  return (
    <div className="bg-black relative text-white">
      <Container className="py-16 md:py-20 space-y-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase opacity-40">
            09 — IDENTITY
          </p>
          <h2 className="text-2xl md:text-[36px] font-bold leading-tight max-w-3xl">
            Your identity in the real estate ecosystem.
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
            One identity. Seamless access to everything. Standards rise when
            the ecosystem connects. R is the connection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 divide-x divide-gray-200">
          {IDENTITY_CARDS.map((card) => {
            const Icon = card.Icon;
            return (
              <div
                key={card.key}
                className="px-8 py-12 flex flex-col items-center justify-center text-center min-h-45"
              >
                <Icon
                  className={card.highlighted ? "text-white" : "text-black/70"}
                  size={20}
                />
                <div className="mt-3 text-sm font-bold">{card.label}</div>
                <div
                  className={[
                    "mt-3 text-xs leading-relaxed",
                    card.highlighted ? "text-white/80" : "text-gray-600",
                  ].join(" ")}
                >
                  {card.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Identity;