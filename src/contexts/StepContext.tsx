import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type StepContextType = {
  steps: object[];
  headerTitle: string;
  setHeaderTitle: () => void;
};

type HeaderInfo = {
  title: string;
  icon: string;
};

export const StepContext = createContext<StepContextType | any>({});

export const StepProvider = ({ children }: any) => {
  const steps = [
    {
      icon: "qrcode",
      route: "/scan",
      title: "Scan QR Code",
    },
    {
      icon: "clock",
      route: "/timer",
      title: "Record Time",
    },
    {
      icon: "camera",
      route: "/photos",
      title: "Add Photos",
    },
    {
      icon: "note",
      route: "/notes",
      title: "Add Notes",
    },
    {
      icon: "review",
      route: "/review",
      title: "Review",
    },
  ];

  const [headerInfo, setHeaderInfo] = useState<HeaderInfo>({} as HeaderInfo);
  const [previews, setPreviews] = useLocalStorage("previews", []);
  const [imagesToSend, setImagesToSend] = useLocalStorage("imagesToSend", []);
  const [notes, setNotes] = useLocalStorage("notes", "");
  const [ previousTime, setPreviousTime ] = useLocalStorage("previousTime", 0);
  const [accTime, setAccTime] = useLocalStorage("accTime", 0);
  const [workSessionTime, setWorkSessionTime] = useLocalStorage("workSessionTime", 0);
  const [ timerWarningNotes, setTimerWarningNotes] = useLocalStorage("timerWarningNotes", '');
  const [ startedAt, setStartedAt] = useLocalStorage("startedAt", '');
  const [ finishedAt, setFinishedAt] = useLocalStorage("finishedAt", '');
  const [ taskId, setTaskId] = useLocalStorage("taskId", '');
  const [ carName, setCarName] = useLocalStorage("carName", '');
  const [ carBrand, setCarBrand] = useLocalStorage("carBrand", '');
  const [ carYear, setCarYear] = useLocalStorage("carYear", '');
  const [ roNumber, setRoNumber] = useLocalStorage("roNumber", '');

  const [ startTimerTimestamp, setStartTimerTimestamp ] = useLocalStorage("startTimerTimestamp", '');
  const [accSessionTime, setAccSessionTime] = useLocalStorage("accSessionTime", 0);

  function clearStates() {
    setWorkSessionTime(0);
    setPreviousTime(0);
    setAccTime(0);
    setNotes('');
    setPreviews(null);
    setWorkSessionTime(0);
    setTimerWarningNotes('');
    setStartedAt(null);
    setFinishedAt(null);
    setTaskId(null);
    setCarName(null);
    setCarBrand(null);
    setCarYear(null);
    setRoNumber(null);
    setImagesToSend(null);
    setStartTimerTimestamp(null)
    setAccSessionTime(null)
  }

  return (
    <StepContext.Provider
      value={{
        steps,
        headerInfo,
        setHeaderInfo,
        previews,
        setPreviews,
        notes,
        setNotes,
        accTime,
        setAccTime,
        clearStates,
        workSessionTime,
        setWorkSessionTime,
        timerWarningNotes,
        setTimerWarningNotes,
        startedAt,
        setStartedAt,
        finishedAt,
        setFinishedAt,
        taskId,
        setTaskId,
        carName,
        setCarName,
        carBrand,
        setCarBrand,
        carYear,
        setCarYear,
        roNumber,
        setRoNumber,
        previousTime, 
        setPreviousTime,
        imagesToSend, 
        setImagesToSend,
        startTimerTimestamp, 
        setStartTimerTimestamp,
        accSessionTime, 
        setAccSessionTime,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};
