import { createContext, useState } from "react";

type StepContextType = {
  steps: any;
  headerTitle: string;
  setHeaderTitle: any;
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

  return (
    <StepContext.Provider
      value={{
        steps,
        headerInfo,
        setHeaderInfo,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};
