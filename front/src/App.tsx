import Header from "./components/Header";
import Tracker from "./components/Tracker";

export const App = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <Tracker />
      </div>
    </div>
  );
};
