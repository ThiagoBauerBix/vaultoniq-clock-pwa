import { Scan, SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "./Title";
import { useCallback, useState } from "react";
import { useStep } from "../../hooks/useStep";
import { Modal } from "flowbite-react";

export default function Header() {
  const navigate = useNavigate();
  const { headerInfo } = useStep();
  const [ isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [ redirect, setRedirect] = useState<string>('')

  const activeStep = useCallback((stepName: string) => {
    if (window.location.pathname == stepName) {
      return "w-1/5 h-[5px] bg-blue-500";
    }
    return "w-1/5 h-[5px]";
  }, []);

  return (
    <>
      <header className="bg-black-primary text-white drop-shadow-2xl px-6">
        <div className="bg-black-primary">
          <div className="bg-black-primary flex flex-row items-center justify-between py-6">
            <HeaderTitle headerInfo={headerInfo} />
            <div className="bg-black-primary flex flex-row items-center gap-2">
              <Scan
                onClick={() => {
                  setIsModalOpen(true)
                  setRedirect('/scan')
                }}
                className="bg-black-primary inline mr-2 text-center cursor-pointer"
                color="#fff"
                size={28}
              />
              <SignOut
                onClick={() => {
                  setIsModalOpen(true)
                  setRedirect('/login')
                }}
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
      <Modal
          show={isModalOpen}
          size="2xl"
          popup={true}
          onClose={() => setIsModalOpen(false)}
        >
        <Modal.Body className="bg-gray-primary border-1 border-gray-500">
          <div className="space-y-4 p-2 text-white" >
            <div className="mt-2">  
              Proceeding will reset the timer, delete all notes and uploaded photos.
            </div>
            <div className="flex flex-row align-center justify-center gap-2">
              <button className="btn-primary mt-4 py-3 px-8 text-white" 
                onClick={() => setIsModalOpen(false)}>Cancel
              </button>
              <button className="btn-primary bg-red-500 mt-4 py-3 px-8 text-white" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate(redirect)
                  setIsModalOpen(false)
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
