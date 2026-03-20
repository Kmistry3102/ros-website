import { FiActivity, FiMapPin, FiUser } from "react-icons/fi"
import Container from "../ui/Container"
import { BsFillBuildingFill } from "react-icons/bs"
import { MdOutlineAttachMoney } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { LuMonitor } from "react-icons/lu";

export const PROBLEM_DATA = [
    {
        icon: FiUser,
        title: "People",
        subtitle: "Each person connects and operates differently.",
    },
    {
        icon: BsFillBuildingFill,
        title: "Assets",
        subtitle: "Every building built and operated without common standards.",
    },
    {
        icon: MdOutlineAttachMoney,
        title: "Capital",
        subtitle: "Capital has no clarity. No single system.",
    },
    {
        icon: HiOutlineOfficeBuilding,
        title: "Businesses",
        subtitle: "Every business runs independently. No connected data.",
    },
    {
        icon: FiMapPin,
        title: "Territory",
        subtitle: "No location intelligence.",
    },
    {
        icon: LuMonitor,
        title: "Desk",
        subtitle: "No transaction clarity.",
    },
    {
        icon: FiActivity,
        title: "Pulses",
        subtitle: "No live signals of the industry.",
    },
];

const TheProblem = () => {
    return (
        <div className="bg-white relative text-black">
            <Container className="space-y-4 flex flex-col items-start justify-center py-20 md:py-28">
                <p className="text-sm font-semibold tracking-[0.3em] uppercase opacity-40">
                    02 — THE PROBLEM
                </p>
                <h2 className="text-[28px] md:text-[36px] font-bold max-w-3xl">
                    The industry that shapes how people live and build has no system connecting it.
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">

                    {PROBLEM_DATA.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className=" p-6 md:p-8 border-r border-b border-gray-200 lg:nth-[3n]:border-r-0 lg:nth-[6n]:border-r-0 last:border-b-0  hover:bg-black hover:text-white transition-all duration-300 group"
                            >
                                <div className="space-y-3">

                                    {/* Icon */}
                                    <Icon className="text-black group-hover:text-white" />

                                    {/* Title */}
                                    <h3 className="text-lg font-bold">
                                        {item.title}
                                    </h3>

                                    {/* Subtitle */}
                                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/70 leading-relaxed">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </Container>
        </div>
    )
}

export default TheProblem