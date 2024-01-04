import {
  WarningCircle,
  Play,
  Stop,
  XCircle,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useStep } from "../../hooks/useStep";
import { useEffect, useState } from "react";
import Modal from 'react-modal';

export default function Timer() {
  const [ isActive, setIsActive ] = useState(false);
  const [ isPaused, setIsPaused ] = useState(false);
  const navigate = useNavigate();
  const { setHeaderInfo, previousTime, accTime, setAccTime, workSessionTime, 
    setWorkSessionTime, timerWarningNotes, setTimerWarningNotes, setStartedAt, setFinishedAt,
    startTimerTimestamp, setStartTimerTimestamp, accSessionTime, setAccSessionTime} = useStep();
  const [ time, setTime ] = useState(workSessionTime);
  const [ isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    setHeaderInfo({
      title: "Record Time",
      icon: "clock",
    });
  }, [setHeaderInfo]);

  // useEffect(() => {
  //   WorkSessionApi.getWorkSession(task_id, worksession_id).then((res) => {
  //     let hms = res.data.time_spent.split(':');
  //     let mls = ((+hms[0]) * 3600 + (+hms[1]) * 60 + (+hms[2])) * 1000; 
  //     setPreviousTime(mls)
  //   })
  // }, []);

  useEffect(() => {
    let interval: any = null;
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        const timeNow:any = new Date()
        console.log('starttimetimestamp', startTimerTimestamp, timeNow)
        const rightTime = timeNow - startTimerTimestamp
        console.log('rightTime', rightTime)
        setTime(accSessionTime + rightTime);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const  getDate = () => {
    let data = new Date();
    let day = String(data.getDate()).padStart(2, '0');
    let month = String(data.getMonth() + 1).padStart(2, '0');
    let year = data.getFullYear();
    let hour = data.getHours()
    let minutes = data.getMinutes()
    let seconds = data.getSeconds()
    let offset = data.getTimezoneOffset()
    let offsetHours = String(Math.abs(Math.floor(offset/60)));
    let offsetMins = String(Math.abs(offset%60));
    let formattedOffset;
    if (parseInt(offsetHours) < 10) offsetHours = '0' + offsetHours;
    if (parseInt(offsetMins) < 10) offsetMins = '0' + offsetMins;
    if (offset < 0) {
      formattedOffset = '+' + offsetHours + ':' + offsetMins;
    } else if (offset > 0) {
      formattedOffset = '-' + offsetHours + ':' + offsetMins;
    } else if (offset === 0) {
    formattedOffset = 'Z';
    }
    let dateNow = year + '-' + month + '-' + day + 'T' + hour + ':' + minutes + ':' + seconds + formattedOffset;
    return dateNow
  }

  const handleStart = () => {
    setStartTimerTimestamp(new Date())
    if(time === 0) setStartedAt(getDate())
    setIsActive(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    setAccSessionTime(time)
    setFinishedAt(getDate())
    setIsActive(false);
    setIsPaused(true);
    setWorkSessionTime(time)
    setAccTime(previousTime + time)
  };

  const handleReport = () => {
    Modal.setAppElement('#root');
    setIsModalOpen(true)
  };

  const handleConfirmReport = () => {
    setIsModalOpen(false)
  };

  const handleCancelReport = () => {
    setTimerWarningNotes('')
    setIsModalOpen(false)
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#31333B'
    },
  };

  if (isPaused) {
    return (
      <>
        <div className="h-full flex flex-col items-center place-content-center">
          <article className="flex flex-col items-center justify-center gap-4">
            <Modal isOpen={isModalOpen} style={customStyles} >
              <section className="text-3xl justify-center mb-3">
                <span >Request modification?</span>
              </section>
              <section>
              <textarea
                className="border border-1 border-gray-400 bg-gray-primary rounded-xl py-6 px-4"
                cols={35}
                rows={8}
                value={timerWarningNotes}
                onChange={(e) => setTimerWarningNotes(e.target.value)}
              />
              </section>
              <section className="w-full mt-7 flex flex-row-reverse">
                <button 
                  className="w-[40%] btn-primary bg-green-gradient p-4 flex flex-row items-center gap-2 justify-center text-white"
                  onClick={handleConfirmReport}>
                  Confirm
                </button>
                <button 
                  className="w-[35%] btn-primary bg-transparent p-4 flex flex-row items-center gap-2 justify-center text-white"
                  onClick={(handleCancelReport)}>
                  <XCircle   
                    className="bg-transparent"
                    color="#fff"
                    size={22}
                    weight="fill"
                  />
                  Cancel
                </button>
              </section>
            </Modal>
          </article>
          <article className="flex flex-col items-center justify-center gap-4 w-full">
            <section>
              <span className="text-3xl justify-center">Total work time</span>
            </section>
            <section>
              <div className="text-2xl">
                <span className="digits">
                  {("0" + Math.floor((accTime / 3600000) % 60)).slice(-2)}:
                </span>
                <span className="digits">
                  {("0" + Math.floor((accTime / 60000) % 60)).slice(-2)}:
                </span>
                <span className="digits">
                  {("0" + Math.floor((accTime / 1000) % 60)).slice(-2)}
                </span> 
              </div>
            </section>
          </article>
          <article className="flex flex-col items-center justify-center gap-4 mt-40 w-full">
            <section>
              <span className="text-3xl justify-center">Work session time</span>
            </section>
            <section>
              <div className="text-7xl">
                <span className="digits">
                  {("0" + Math.floor((workSessionTime / 3600000) % 60)).slice(-2)}:
                </span>
                <span className="digits">
                  {("0" + Math.floor((workSessionTime / 60000) % 60)).slice(-2)}:
                </span>
                <span className="digits">
                  {("0" + Math.floor((workSessionTime / 1000) % 60)).slice(-2)}
                </span>
              </div>
            </section>
            <section className="w-full mt-7 flex flex-row gap-2">
              <button 
                className="w-[35%] btn-primary bg-transparent p-4 flex flex-row items-center gap-2 justify-center text-white"
                onClick={handleReport}>
                <WarningCircle  
                  className="bg-transparent"
                  color="#fff"
                  size={22}
                  weight="fill"
                />
                Report
              </button>
              <button 
                className="w-[60%] btn-primary bg-green-gradient p-4 flex flex-row items-center gap-2 justify-center text-white"
                onClick={handleStart}>
                <Play
                  className="bg-transparent"
                  color="#fff"
                  size={18}
                  weight="fill"
                />
                start timer
              </button>
            </section>
          </article>
          <article className="w-full flex flex-row items-center justify-center absolute inset-x-0 bottom-5">
            <button
              onClick={() => navigate("/photos")}
              className="w-[60%] btn-primary px-8 py-4 flex flex-row items-center gap-2 justify-center text-white"
            > 
              Next
            </button>
          </article>
        </div>
      </>
    );
  }

  if (isActive) {
    return (
      <div className="h-full flex items-center place-content-center" >
        <article className="flex flex-col items-center justify-center gap-4 mb-36 mt-56 w-full">
          <section>
            <div className="text-7xl">
              <span className="digits">
                {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
              </span>
              <span className="digits">
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
              </span>
              <span className="digits">
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
              </span>
            </div>
          </section>
          <section className="w-full mt-7 flex flex-row gap-2">
            <button 
              className="w-full mx-8 btn-primary bg-red-gradient p-4 flex flex-row items-center gap-2 justify-center text-white" 
              onClick={handleStop}>
              <Stop
                className="bg-transparent"
                color="#fff"
                size={18}
                weight="fill"
              />
              stop timer
            </button>
          </section>
        </article>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center place-content-center">
      <article className="flex flex-col items-center justify-center gap-4 mb-36 mt-56 w-full">
        <section>
          <div className="text-7xl">
            <span className="digits">
              {("0" + Math.floor((workSessionTime / 3600000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
              {("0" + Math.floor((workSessionTime / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
              {("0" + Math.floor((workSessionTime / 1000) % 60)).slice(-2)}
            </span>
          </div>
        </section>
        <section className="w-full mt-7 flex flex-row gap-2">
          <button 
            className="w-full mx-8 btn-primary bg-green-gradient p-4 flex flex-row items-center gap-2 justify-center text-white" 
            onClick={handleStart}>
            <Play
              className="bg-transparent"
              color="#fff"
              size={18}
              weight="fill"
            />
            start timer
          </button>
        </section>
        {workSessionTime !=0 && <article className="w-full flex flex-row items-center justify-center absolute inset-x-0 bottom-5">
            <button
              onClick={() => navigate("/photos")}
              className="w-[60%] btn-primary px-8 py-4 flex flex-row items-center gap-2 justify-center text-white"
            >
              Next
            </button>
          </article>}
      </article>
    </div>
  );
}
