import { useEffect, useState } from "react";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import "keen-slider/keen-slider.min.css";
import WorkSessionApi from "../../services/WorkSessionApi";

import Previews from "../../components/Previews";
import { Modal } from "flowbite-react";

export default function Review() {
  const { setHeaderInfo, notes, clearStates, workSessionTime, startedAt, finishedAt, timerWarningNotes, taskId, carName, carBrand, carYear, roNumber, imagesToSend} = useStep();
  const [submitObject, setSubmitObject ] = useState({})
  const [isTaskFinished, setIsTaskFinished ] = useState(false)
  const navigate = useNavigate();

  const [ errorBox, setErrorBox ] = useState(false) 
  const [ successBox, setSuccessBox ] = useState(false)
  const [ loadingBox, setLoadingBox ] = useState(false)

  const [ isModalOpen, setIsModalOpen] = useState<boolean>(false)

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErrorBox(false)
    setLoadingBox(true)
    
    for(let i=0; i<=imagesToSend?.length; i++) {
      if(imagesToSend[i] != undefined) {
        formData.append('images', imagesToSend[i])
      }
    }
    WorkSessionApi.postWorkSession(taskId, submitObject)
      .then(() => WorkSessionApi.postPreviews(taskId, formData))
      .then(() => setLoadingBox(false))
      .then(() => setSuccessBox(true))
      .then(() => clearStates())
      .then(() => setTimeout(() => navigate("/scan"), 5000) )
      .catch(() => {
        setErrorBox(true)
        setLoadingBox(false)
      })
        
  }

  return (
    <>
    <form id="form">
      <div className="p-6 flex flex-col gap-8">
        {successBox && 
          <div role="alert">
            <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2 text-sm">
              Done
            </div>
            <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700 text-sm">
                <p className="bg-green-100 text-green-700 ">Updated successfully!</p>
            </div>
          </div>
          }
          {errorBox && 
            <div role="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 text-sm">
                Error
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700 text-sm">
                <p className="bg-red-100 text-red-700 ">Error while submitting work session</p>
              </div>
            </div>
          } 
          {loadingBox && 
            <div role="alert">
              <div className="bg-yellow-500 text-white font-bold rounded-t px-4 py-2 text-sm">
                Almost there
              </div>
              <div className="border border-t-0 border-yellow-400 rounded-b bg-yellow-100 px-4 py-3 text-yellow-700 text-sm">
                <p className="bg-yellow-100 text-yellow-700 ">Please wait while submitting work session</p>
              </div>
            </div>
          } 
        <section>
          <span className="text-2xl font-semibold">Vehicle</span>
          <div className="p-4 rounded-lg border border-1 border-gray-500 my-2">
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
          <div className="p-4 rounded-lg border border-1 border-gray-500 my-2">
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
          <div className=" p-2 rounded-lg border border-1 border-gray-500 my-2">
            <textarea id="notes-textarea" className="text-lg bg-transparent w-full border-0" defaultValue={notes} onChange={(e) => setSubmitObject({...submitObject, notes: e.target.value})}></textarea>
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
          onClick={(e) => {
            e.preventDefault()
            setIsModalOpen(true);
          }}
          className="btn-primary px-14 py-4 mr-4 flex flex-row items-center gap-2 justify-center text-white"
          type="submit"
        >
          Submit Report
        </button>
      </div>
    </form>
    <Modal
      show={isModalOpen}
      size="2xl"
      popup={true}
      onClose={() => setIsModalOpen(false)}
      >
      <Modal.Body className="bg-gray-primary border-t-[1px] border-gray-500">
        <div className="space-y-4 p-2 text-white" >
          <div className="mt-2">  
            After submitting you can't redo or undo this job.
          </div>
          <div className="flex flex-row align-center justify-center gap-2">
            <button className="btn-primary mt-4 py-3 px-8 text-white" 
              onClick={() => setIsModalOpen(false)}>Cancel
            </button>
            <button className="btn-primary bg-red-500 mt-4 py-3 px-8 text-white" 
              onClick={(e) => {
                setIsModalOpen(false)
                handleSubmit(e)
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    </>
  );
}
