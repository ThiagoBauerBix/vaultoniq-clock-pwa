import { useEffect, useState } from "react";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import "keen-slider/keen-slider.min.css";
import WorkSessionApi from "../../services/WorkSessionApi";

import Previews from "../../components/Previews";

export default function Review() {
  const { setHeaderInfo, notes, clearStates, workSessionTime, startedAt, finishedAt, timerWarningNotes, taskId, carName, carBrand, carYear, roNumber, imagesToSend} = useStep();
  const [submitObject, setSubmitObject ] = useState({})
  const [isTaskFinished, setIsTaskFinished ] = useState(false)
  const navigate = useNavigate();

  let formData = new FormData()

  useEffect(() => {
    setHeaderInfo({
      title: "Review",
      icon: "review",
    });
  }, [setHeaderInfo]);

  useEffect(() => {
    setSubmitObject({
      started_at: startedAt,
      finished_at: finishedAt,
      time_spent: convertIntToDate(workSessionTime),
      notes: notes,
      reason: timerWarningNotes,
      is_task_finished: isTaskFinished,
    })
  }, [isTaskFinished]);

  const convertIntToDate = (num: number) => {
    let hours = ("0" + Math.floor((num / 3600000) % 60)).slice(-2)
    let minutes = ("0" + Math.floor((num / 60000) % 60)).slice(-2)
    let seconds = ("0" + Math.floor((num / 1000) % 60)).slice(-2)
    return hours + ':' + minutes + ':' + seconds
  }

  const handleSubmit = () => {
    for(let i=0; i<=imagesToSend.length; i++) {
      if(imagesToSend[i] != undefined) {
        formData.append('images', imagesToSend[i])
      }
    }
    WorkSessionApi.postWorkSession(taskId, submitObject)
      .then(() => WorkSessionApi.postPreviews(taskId, formData))
  }

  return (
    <form id="form">
      <div className="p-6 flex flex-col gap-8">
        <section>
          <span className="text-2xl font-semibold">Vehicle</span>
          <div className="bg-black-primary p-4 rounded-lg border border-1 border-gray-500 my-2">
            <span className="text-xl bg-transparent">
              {carBrand} {carName}
            </span>
            <div className="flex flex-row items-center justify-between mt-4 bg-transparent">
              <p className="text-lg bg-transparent text-gray-400">{carYear}</p>
              <p className="text-lg bg-transparent text-gray-400">{roNumber}</p>
            </div>
          </div>
        </section>

        <section>
          <span className="text-2xl font-semibold">Work Session Time</span>
          <div className="bg-black-primary p-4 rounded-lg border border-1 border-gray-500 my-2">
            <p className="text-2xl bg-transparent font-extralight">{convertIntToDate(workSessionTime)}</p>
          </div>
        </section>

        <section>
          <span className="text-2xl font-semibold">Photos</span>
          <div className="mt-2 items-center">
            <Previews/>
          </div>
        </section>
        <section>
          <span className="text-2xl font-semibold">Notes</span>
          <div className="bg-black-primary p-2 rounded-lg border border-1 border-gray-500 my-2">
            <div className="text-lg bg-transparent">{notes}</div>
          </div>
        </section>
        <section>
          <span className="text-2xl font-semibold">Task Finished?</span>

          <input
            className="float-right mr-2 h-3.5 w-8 appearance-none 
            rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none 
            before:absolute before:h-3.5 before:w-3.5 before:rounded-full 
            before:bg-transparent before:content-[''] after:absolute after:z-[2] 
            after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none 
            after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] checked:bg-green-500 checked:after:-mt-[3px] checked:after:ml-[1.0625rem]  checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary  checked:after:transition-[background-color_0.2s,transform_0.2s] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] mt-3"
            type="checkbox"
            role="switch"
            id={'isTaskFinished'}
            checked={isTaskFinished}
            onChange={() => setIsTaskFinished((prevState) => !prevState)}
          />
          </section>
      </div>
      <div className="flex flex-row items-center justify-between mx-2 pb-6 mt-5">
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
            handleSubmit();
            navigate("/scan");
            clearStates();
          }}
          className="btn-primary px-14 py-4 mr-4 flex flex-row items-center gap-2 justify-center text-white"
          type="submit"
        >
          Submit Report
        </button>
      </div>
    </form>
  );
}
