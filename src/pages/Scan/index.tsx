import { useEffect } from "react";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";

export default function Scan() {
  const { setHeaderInfo } = useStep();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderInfo({
      title: "Scan QR Code",
      icon: "qrcode",
    });
  }, [setHeaderInfo]);
  return (
    <div>
      <h2 className="text-xl">Scan page</h2>
      <div className="flex flex-row items-center mt-[75vh]">
        <button
          className="w-full btn-primary mx-4 py-4 mr-4 flex flex-row items-center gap-2 justify-center text-white"
          onClick={() => navigate("/timer")}
        >
          Next
        </button>
      </div>
    </div>
  );
}
