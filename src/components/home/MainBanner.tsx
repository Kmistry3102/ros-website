import { FiArrowRight } from "react-icons/fi"
import Container from "../ui/Container"
import LinkButton from "../ui/LinkButton"

const MainBanner = () => {
    return (
        <div className="bg-black relative text-white">
            <Container className="space-y-4 flex flex-col items-start justify-center h-screen">
                <p className="text-sm font-semibold tracking-[0.3em] uppercase opacity-40">ROS · BETA · 2026</p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">The Real Estate <br /> Operating System</h1>
                <p className="text-lg md:text-xl opacity-70 max-w-2xl leading-relaxed">Unifying the entire real estate ecosystem. <br /> One industry. One network. One system. One standard. One flow.</p>
                <div>
                    <LinkButton label="Enter ROS" rightIcon={<FiArrowRight />} href="/signup" variant="secondary"size="lg" />
                </div>
            </Container>
        </div>
    )
}

export default MainBanner