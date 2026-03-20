import Container from "../ui/Container";

const OUTCOMES = [
  { n: "01", text: "Trust is increasing." },
  { n: "02", text: "Resources are becoming accessible." },
  { n: "03", text: "New people are joining the network." },
  { n: "04", text: "The industry is transforming." },
  { n: "05", text: "City standards are rising." },
  { n: "06", text: "Quality of life is increasing." },
];

const Outcomes = () => {
  return (
    <div className="bg-black relative text-white">
      <Container className="py-20 md:py-28 space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase opacity-40">
            11 — OUTCOMES
          </p>
          <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight leading-tight max-w-2xl">
            What happens when the ecosystem
            <br />
            connects.
          </h2>
        </div>

        <div className="border-t border-white/10">
          {OUTCOMES.map((item) => (
            <div
              key={item.n}
              className=" border-white/10 flex items-baseline gap-6 border-b py-6 hover:pl-4 transition-all duration-300"
            >
              <div className="text-sm font-bold opacity-40 w-8 shrink-0">
                {item.n}
              </div>
              <p className="text-base md:text-lg font-semibold opacity-90">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Outcomes;