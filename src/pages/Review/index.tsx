import { useEffect } from "react";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

export default function Review() {
  const { setHeaderInfo, previews, notes, clearStates } = useStep();
  const navigate = useNavigate();

  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      origin: "center",
      perView: 1.5,
    },
  });

  useEffect(() => {
    setHeaderInfo({
      title: "Review",
      icon: "review",
    });
  }, [setHeaderInfo]);

  return (
    <div>
      <div className="p-6 flex flex-col gap-8">
        <section>
          <span className="text-2xl font-semibold">Vehicle</span>
          <div className="bg-black-primary p-4 rounded-lg border border-1 border-gray-500 my-2">
            <span className="text-xl bg-transparent">
              2023 Nissan Pathfinder
            </span>
            <div className="flex flex-row items-center justify-between mt-4 bg-transparent">
              <p className="text-lg bg-transparent text-gray-400">silver</p>
              <p className="text-lg bg-transparent text-gray-400">
                RO # SF: 654145
              </p>
            </div>
          </div>
        </section>

        <section>
          <span className="text-2xl font-semibold">Time</span>
          <div className="bg-black-primary p-4 rounded-lg border border-1 border-gray-500 my-2">
            <p className="text-2xl bg-transparent font-extralight">02:46:58</p>
          </div>
        </section>

        <section>
          <span className="text-2xl font-semibold">Photos</span>
          <div
            ref={sliderRef}
            className="keen-slider bg-transparent flex flex-row items-center gap-4 p-2 ml-[-16px]"
          >
            {previews?.map((item: string | undefined) => (
              <img
                key={item}
                src={item}
                alt=""
                className="keen-slider__slide bg-transparent aspect-video w-2/3 h-2/3 rounded-lg object-cover"
              />
            ))}
          </div>
        </section>

        <section>
          <span className="text-2xl font-semibold">Notes</span>
          <div className="bg-black-primary p-2 rounded-lg border border-1 border-gray-500 my-2">
            <div className="text-lg bg-transparent">{notes}</div>
          </div>
        </section>
      </div>
      <div className="flex flex-row items-center justify-between mx-2 pb-6">
        <button
          className="btn-primary bg-transparent p-4 flex flex-row items-center gap-2 justify-center text-white"
          onClick={() => navigate("/notes")}
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
          onClick={() => {
            navigate("/scan");
            clearStates();
          }}
          className="btn-primary px-14 py-4 mr-4 flex flex-row items-center gap-2 justify-center text-white"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}
