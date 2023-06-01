import { useEffect } from "react";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";

export default function Notes() {
  const { setHeaderInfo } = useStep();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderInfo({
      title: "Add Notes",
      icon: "notes",
    });
  }, [setHeaderInfo]);
  return (
    <div>
      <h2 className="text-xl">notes page</h2>
      <div className="flex flex-row items-center justify-between mx-2">
        <button
          className="btn-primary bg-transparent p-4 flex flex-row items-center gap-2 justify-center text-white"
          onClick={() => navigate("/photos")}
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
          className="btn-primary px-16 py-4 mr-4 flex flex-row items-center gap-2 justify-center text-white"
          onClick={() => navigate("/review")}
        >
          Next
        </button>
      </div>
    </div>
  );
}
