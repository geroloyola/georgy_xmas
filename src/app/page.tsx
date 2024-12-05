import { ScrollVideo } from "./components/ScrollVideo/ScrollVIdeo";

export default function Home() {
  return (
    <div className="width-screen flex justify-center">
      <main className=" w-full">
        <ScrollVideo videoSrc="mp4/main-pine.mp4" totalFrames={171} folderPath="curtains/"/>
      </main>
    </div>
  );
}
