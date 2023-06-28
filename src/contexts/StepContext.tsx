import { createContext, useEffect, useState } from "react";
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
  const [notes, setNotes] = useLocalStorage("notes", "");
  const [accTime, setAccTime] = useLocalStorage("accTime", 0);
  const [workSessionTime, setWorkSessionTime] = useLocalStorage("workSessionTime", 0);
  const [ timerWarningNotes, setTimerWarningNotes] = useLocalStorage("timerWarningNotes", '');
  const [ startedAt, setStartedAt] = useLocalStorage("startTime", '');
  const [ finishedAt, setFinishedAt] = useLocalStorage("startTime", '');
  

  function clearStates() {
    setWorkSessionTime(0);
    setAccTime(0);
    setNotes("");
    setPreviews(null);
  }

  // useEffect(() => {}, []);

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
        setFinishedAt
      }}
    >
      {children}
    </StepContext.Provider>
  );
};
