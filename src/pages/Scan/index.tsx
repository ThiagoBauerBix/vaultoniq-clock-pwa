import { useEffect, useState } from "react";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";

export default function Scan() {
  const { setHeaderInfo } = useStep();
  const navigate = useNavigate();
  const [data, setData] = useState("No result");

  useEffect(() => {
    setHeaderInfo({
      title: "Scan QR Code",
      icon: "qrcode",
    });
  }, [setHeaderInfo]);
  return (
    <div>
      <h2 className="text-xl">Scan page</h2>
      <div>
        <QrReader
          onResult={(result, error) => {
            if (result) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setData(result?.text);
            }

            if (error) {
              console.info(error);
            }
          }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          style={{ width: "100%" }}
        />
        <span>{data}</span>
      </div>
      <div className="flex flex-row items-center mt-[25vh]">
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