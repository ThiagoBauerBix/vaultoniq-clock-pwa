import { Camera, CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useStep } from "../../hooks/useStep";
import { useEffect } from "react";

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
      <section className="w-full mt-7 flex flex-row items-center justify-between gap-2">
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
        <button className="bg-blue-primary rounded-full p-5 flex flex-row items-center gap-2 justify-center text-white">
          <Camera
            className="bg-transparent"
            color="#fff"
            size={38}
            weight="fill"
          />
        </button>
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
