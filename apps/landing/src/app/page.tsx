import Hero from "../business/components/Hero";
import About from "../business/components/About";
import Team from "../business/components/Team";
import Feedback from "../business/components/Feedback";

export default function Page() {
  return (
    <div className="container max-w-container px-4 mx-auto flex flex-col items-center justify-center">
      <Hero />
      <About />
      <Team />
      <Feedback />
    </div>
  );
}
