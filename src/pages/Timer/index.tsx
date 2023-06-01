import {
  ArrowCounterClockwise,
  CaretLeft,
  Play,
  Stop,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useStep } from "../../hooks/useStep";
import { useEffect } from "react";

export default function Timer() {
  const isActive = true;
  const isStop = true;
  const navigate = useNavigate();
  const { setHeaderInfo } = useStep();

  useEffect(() => {
    setHeaderInfo({
      title: "Record Time",
      icon: "clock",
    });
  }, [setHeaderInfo]);

  if (isStop) {
    const time = "02:46:58";
    return (
      <>
        <div className="h-full flex flex-col items-center place-content-center">
          <article className="flex flex-col items-center justify-center gap-4 mb-36 mt-56 w-full">
            <section>
              <div className="text-7xl">{time}</div>
            </section>
            <section className="w-full mt-7 flex flex-row gap-2">
              <button className="w-[35%] btn-primary bg-transparent p-4 flex flex-row items-center gap-2 justify-center text-white">
                <ArrowCounterClockwise
                  className="bg-transparent"
                  color="#fff"
                  size={22}
                  weight="fill"
                />
                Reset
              </button>
              <button className="w-[60%] btn-primary bg-green-gradient p-4 flex flex-row items-center gap-2 justify-center text-white">
                <Play
                  className="bg-transparent"
                  color="#fff"
                  size={18}
                  weight="fill"
                />
                start timer
              </button>
            </section>
          </article>
          <article className="w-full flex flex-row mt-32">
            <button
              onClick={() => navigate("/scan")}
              className="w-[35%] btn-primary bg-transparent p-4 flex flex-row items-center gap-2 justify-center text-white"
            >
              <CaretLeft
                className="bg-transparent"
                color="#fff"
                size={22}
                weight="fill"
              />
              Back
            </button>
            <button
              onClick={() => navigate("/photos")}
              className="w-[60%] btn-primary px-12 flex flex-row items-center gap-2 justify-center text-white"
            >
              Next
            </button>
          </article>
        </div>
      </>
    );
  }

  if (isActive) {
    const time = "02:46:58";
    return (
      <div className="h-full flex items-center place-content-center">
        <article className="flex flex-col items-center justify-center gap-4 mb-36 mt-56 w-full">
          <section>
            <div className="text-7xl">{time}</div>
          </section>
          <section className="w-full mt-7 flex flex-row gap-2">
            <button className="w-full mx-8 btn-primary bg-red-gradient p-4 flex flex-row items-center gap-2 justify-center text-white">
              <Stop
                className="bg-transparent"
                color="#fff"
                size={18}
                weight="fill"
              />
              stop timer
            </button>
          </section>
        </article>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center place-content-center">
      <article className="flex flex-col items-center justify-center gap-4 mb-36 mt-56 w-full">
        <section>
          <div className="text-7xl">00:00:00</div>
        </section>
        <section className="w-full mt-7 flex flex-row gap-2">
          <button className="w-full mx-8 btn-primary bg-green-gradient p-4 flex flex-row items-center gap-2 justify-center text-white">
            <Play
              className="bg-transparent"
              color="#fff"
              size={18}
              weight="fill"
            />
            start timer
          </button>
        </section>
      </article>
    </div>
  );
}
