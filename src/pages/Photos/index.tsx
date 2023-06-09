import { Camera, CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useStep } from "../../hooks/useStep";
import { useEffect } from "react";
import { MediaPicker } from "../../components/MediaPicker";

export default function Photos() {
  const navigate = useNavigate();
  const { setHeaderInfo } = useStep();

  useEffect(() => {
    setHeaderInfo({
      title: "Add Photos",
      icon: "camera",
    });
  }, [setHeaderInfo]);

  return (
    <div>
      <MediaPicker />
      <section className="w-full mt-2 flex flex-row items-center justify-between gap-2">
        <button
          onClick={() => navigate("/timer")}
          className="btn-primary bg-transparent p-4 flex flex-row items-center gap-2 justify-center text-white"
        >
          <CaretLeft
            className="bg-transparent"
            color="#fff"
            size={22}
            weight="fill"
          />
          Back
        </button>
        <label
          htmlFor="media"
          className="bg-blue-primary rounded-full p-4 flex flex-row items-center gap-2 justify-center text-white"
        >
          <Camera
            className="bg-transparent self-center"
            color="#fff"
            size={38}
            weight="fill"
          />
        </label>
        <button
          onClick={() => navigate("/notes")}
          className="btn-primary px-8 py-4 mr-4 flex flex-row items-center gap-2 justify-center text-white"
        >
          Next
        </button>
      </section>
    </div>
  );
}
