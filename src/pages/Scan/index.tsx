import { useCallback, useEffect, useState } from "react";
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

  const fetchData = useCallback(async (url: string) => {
    console.log("url", url);

    const taskData = await fetch(url).then((res) => res.json());
    console.log(taskData);
  }, []);

  return (
    <div>
      <div>
        <QrReader
          onResult={(result, error) => {
            if (result) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setData(result?.text);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              fetchData(result?.text);
            }

            if (error) {
              // console.info(error);
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
