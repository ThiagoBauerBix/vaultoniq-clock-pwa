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
  const [previews, setPreviews] = useState<string[] | null>(null);
  const [notes, setNotes] = useState<string | null>("");
  const [time, setTime] = useState<number | null>(0);
  const [theme, setTheme] = useLocalStorage("theme", "light");

  function clearStates() {
    setTime(0);
    setNotes("");
    setPreviews(null);
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
        time,
        setTime,
        clearStates,
        theme,
        setTheme,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};
