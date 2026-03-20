import Container from "../ui/Container";

const RTerritories = () => {
  return (
    <div className="bg-black relative text-white">
      <Container className="py-20 md:py-28 space-y-8">
        <div className="space-y-3">
          <h2 className="text-[32px] font-semibold tracking-tight leading-tight">
            R Territories
          </h2>
          <p className="text-[24px] font-medium opacity-80">City-Level Ecosystem Presence · <span className="font-bold">12 Territories</span></p>
          <p className="text-base opacity-70 max-w-3xl">
            R OS operates at the city level — each territory is a self-sustaining ecosystem with local stakeholders, assets, events, and opportunities.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default RTerritories;