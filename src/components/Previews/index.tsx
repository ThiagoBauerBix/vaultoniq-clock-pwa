import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { useStep } from "../../hooks/useStep";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Camera } from "@phosphor-icons/react";

export default function Previews() {
    const { previews } = useStep();
    const [resendPreview, setResendPreview] = useState(false)
    const navigate = useNavigate();

    const [sliderRef] = useKeenSlider({
        mode: "free-snap",
        slides: {
          origin: "center",
          perView: 1.5,
        },
      });

      useEffect(() => {
        console.log(resendPreview)
      }, [resendPreview])

      const isPreviewAvailable = async () => {
        if(previews?.length > 0) {
            try {
                await axios.get(previews[0])
             }catch {
                 setResendPreview(true)
             }
        }
      }

      useEffect(() => {
        isPreviewAvailable()
      }, [])

      if(!resendPreview) { return (
            <>
                <div
                    ref={sliderRef}
                    className="keen-slider bg-transparent flex flex-row items-center gap-4 p-2 ml-[-16px]"
                >
                    {previews?.map((item: string | undefined) => (
                        <img
                            key={item}
                            src={item}
                            alt=""
                            className="keen-slider__slide bg-transparent aspect-video w-2/3 h-2/3 rounded-lg object-cover" />
                    ))}
                </div>
            </>
        ) } else {
            return (
                <> 
                    <span>Problem loading photos. To resubmit click here</span>
                    <div className="flex align-center justify-center items-center">
                        <button onClick={() => navigate("/photos")} className="flex align-center justify-center items-center">
                            <label
                                htmlFor="media"
                                className="bg-blue-primary rounded-full p-4 flex flex-row items-center gap-2 justify-center text-white mt-5"
                                >
                                <Camera
                                    className="bg-transparent self-center"
                                    color="#fff"
                                    size={38}
                                    weight="fill"
                                />
                            </label>
                        </button>
                    </div>
                    
                </>
            )
        }
    } 
