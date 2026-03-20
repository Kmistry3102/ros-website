import { FiArrowRight } from "react-icons/fi";
import LinkButton from "../ui/LinkButton";
import Container from "../ui/Container";

const RLive = () => {
  return (
    <div className="bg-white relative text-black">
      <Container className="flex flex-col items-center text-center py-16 md:py-20 space-y-4">
        <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight leading-[1.1]">
          ROS is live.
        </h2>
        <p className="text-[24px] md:text-[32px] font-bold tracking-tight opacity-80">
          Be the ones who shape it.
        </p>
        <div className="opacity-80 text-base">
          <p>We&apos;re in beta.</p>
          <p>
            Every person who joins now helps build the standard for the entire
            industry.
          </p>
        </div>

        <div className="mt-2">
          <LinkButton
            label="Join the Transformation"
            href="/signup"
            variant="primary"
            size="lg"
            rightIcon={<FiArrowRight />}
          />
        </div>
      </Container>
    </div >
  );
};

export default RLive;