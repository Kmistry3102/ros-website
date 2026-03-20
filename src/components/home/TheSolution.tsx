import Container from "../ui/Container"

const Solution = [
  "One industry.", "One network.", "One system.", "One standard.", "One flow."
]

const TheSolution = () => {
  return (
    <div className="bg-black relative text-white">
      <Container className="space-y-4 flex flex-col items-start justify-center py-20 md:py-28">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase opacity-40">03 — THE SOLUTION</p>
        <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight leading-tight max-w-3xl">The operating system real estate never had.</h2>
        <p className="text-[24px] md:text-[28px] font-bold leading-snug opacity-90">Real estate. Finally. One.</p>
        <div className="flex flex-col gap-1 text-base opacity-60">
          {Solution.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default TheSolution