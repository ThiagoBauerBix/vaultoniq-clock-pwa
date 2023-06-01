import { List } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "./Title";
import { useCallback } from "react";
import { useStep } from "../../hooks/useStep";

export default function Header() {
  const navigate = useNavigate();
  const { headerInfo } = useStep();

  function handleLogout() {
    navigate("/login");
  }

  const activeStep = useCallback((stepName: string) => {
    if (window.location.pathname == stepName) {
      return "w-1/5 h-[2px] bg-blue-500";
    }
    return "w-1/5 h-[2px]";
  }, []);

  return (
    <header className="bg-black-primary text-white drop-shadow-2xl px-6">
      <div className="bg-black-primary">
        <div className="bg-black-primary flex flex-row items-center justify-between py-6">
          <HeaderTitle headerInfo={headerInfo} />
          <div className="bg-black-primary flex flex-row items-center gap-2">
            <List
              onClick={handleLogout}
              className="bg-black-primary inline mr-2 text-center cursor-pointer"
              color="#fff"
              weight="fill"
              size={28}
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-1 pb-2 bg-transparent">
          <div className={activeStep("/scan")}></div>
          <div className={activeStep("/timer")}></div>
          <div className={activeStep("/photos")}></div>
          <div className={activeStep("/notes")}></div>
          <div className={activeStep("/review")}></div>
        </div>
      </div>
    </header>
  );
}
