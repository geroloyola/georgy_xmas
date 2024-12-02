import { Card } from "./components/Card/Card";
import { ScrollVideo } from "./components/ScrollVideo/ScrollVIdeo";
import { Typewriter } from "./components/Typewriter/Typewriter";

export default function Home() {
  return (
    <div className="width-screen flex justify-center">
      <main className="max-w-[80rem] w-full">
        <ScrollVideo totalFrames={171} folderPath="curtains/"/>
      </main>
    </div>
  );
}
