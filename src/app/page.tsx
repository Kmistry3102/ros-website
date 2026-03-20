import Event from "@/components/home/Event"
import RDesk from "@/components/home/RDesk"
import RLive from "@/components/home/RLive"
import Pulses from "@/components/home/Pulses"
import Outcomes from "@/components/home/Outcomes"
import Identity from "@/components/home/Identity"
import Ecosystem from "@/components/home/Ecosystem"
import RBluePrint from "@/components/home/RBluePrint"
import MainBanner from "@/components/home/MainBanner"
import TheProblem from "@/components/home/TheProblem"
import TheSolution from "@/components/home/TheSolution"
import RTerritories from "@/components/home/RTerritories"

const Home = () => {
  return (
    <div> 
      <MainBanner />
      <TheProblem />
      <TheSolution />
      <RTerritories />
      <RBluePrint />
      <Ecosystem />
      <Pulses />
      <Event />
      <Identity />
      <RDesk />
      <Outcomes />
      <RLive />
    </div>
  )
}

export default Home