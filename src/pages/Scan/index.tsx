import { useCallback, useEffect, useState } from "react";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

export default function Scan() {
  const { setHeaderInfo, setPreviousTime, setTaskId, setCarName, setCarBrand, setCarYear, setRoNumber, carBrand, carName, roNumber, clearStates } = useStep();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [alertBox, setAlertBox] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);

  const {refreshToken, setAccessToken, accessToken, setRefreshToken} = useAuth();

  const refresh_token = useCallback(async () => {
    if(loading == false) {
      setLoading(true)
      try {
        const response = await api.post("/auth/token/refresh/", {
          refresh: refreshToken || localStorage.getItem("refreshToken"),
        });
        setAccessToken(response.data.access);
        localStorage.setItem("accessToken", response.data.access);
        setRefreshToken(response.data.refresh);
        localStorage.setItem("refreshToken", response.data.refresh);
        api.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
        navigate('/scan')
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
      setLoading(false)
    }
  }, [refreshToken, setAccessToken]);

  useEffect(() => {
    setHeaderInfo({
      title: "Scan QR Code",
      icon: "qrcode",
    });
  }, [setHeaderInfo]);

  const convertDateToInteger = (date: string) => {
    if(date === null){
      return 0
    }
    try{
      let arr: Array<string> = date?.split(':')
      let seconds: number = (+arr[0]) * 60 * 60 + (+arr[1]) * 60 + (+arr[2]); 
      
      let milisseconds = seconds * 1000
        return milisseconds
    } catch (error) {
      console.log(error)
    }
  }

  const fetchData = useCallback(async (url: string) => {
    if(loading == false) {
      setLoading(true)
      try {
        const taskData = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' +`${localStorage.getItem('accessToken')}`
          },
        }).then((res) => res.json())

        if(taskData.code && taskData.code == 'token_not_valid') {
          refresh_token().then(() => setLoading(false)).then(() => fetchData(url));
          return;
        }

        setData(taskData.tasks)
        setCarName(taskData.car.model)
        setCarBrand(taskData.car.brand.name)
        setCarYear(taskData.car.year)
        setRoNumber(taskData['ro_number'])
        let taskInProgress = taskData.tasks.find((task: any) => task.progress_status === 'In Progress')
        if(taskInProgress != undefined) {
          setTaskId(taskInProgress.task_id)
          setPreviousTime(convertDateToInteger(taskInProgress.time_spent))
          setAlertBox(false)
        } else {
          let taskPending = taskData.tasks.find((task: any) => task.progress_status === 'Pending')
          if(taskPending != undefined){
            setTaskId(taskPending.task_id);
            setPreviousTime(convertDateToInteger(taskPending.time_spent))
            setAlertBox(false)
          } else setAlertBox(true)
        }
        setLoading(false)
      } catch (error) {
        console.log('error', error)
      }
    }
  }, []);

  return (
    <div>
      <div>
        <QrReader
          constraints={{facingMode: "environment"}}
          onResult={(result, error) => {
            if (result) {
              clearStates();
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              fetchData(result?.text);
            }
            if (error) {
              // console.info(error);
            }
          }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          style={{ width: "100%"}}
          className={"relative m-auto left-0 right-0 top-0"}
        />
        <div className={'border-dashed border-red-500 border-4 absolute left-1/2 transform -translate-x-1/2 bg-transparent top-[20%] min-[370px]:top-[25%] min-[390px]:top-[18%] min-[540px]:top-[30%]'} style={{width: '80%', height: '30%' }}></div>
      </div>
      {data && (
        <div>
          <table className=" w-full align-center items-center place-content-center justify-center border-separate mb-5">
            <thead>
              <tr>
                <th>Car</th>
                <th>RO Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td className="text-center" key={carBrand}>{carBrand} {carName}</td>
              <td className="text-center" key={`${Math.random()}${roNumber}`}>{roNumber}</td>
              </tr>
            </tbody>
          </table>
          <table className=" w-full align-center items-center place-content-center justify-center border-separate">
            <thead>
              <tr >
                <th>Task</th>
                <th>Step</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody key={'t-body'}>
              {data?.map((task: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="text-center" key={task.id}>{task['task_id']}</td>
                  <td className="text-center" key={`${task.step['name']}${index}`}>{task.step['name']}</td>
                  <td className="text-center" key={`${task['progress_status']}${index}`}>{task['progress_status']}</td>
                </tr>
              )
              })}
            </tbody>
          </table>
        </div>
        )}
      <div className="flex flex-row items-center mt-10">
        {data?.length > 0 && !alertBox && (
          <button
            className="w-full btn-primary mx-4 py-4 mr-4 flex flex-row items-center gap-2 justify-center text-white"
            onClick={() => navigate("/timer")}
          >
            Next
          </button>
        )}
        {alertBox && 
          <div role="alert" className="items-center top-20 fixed w-full p-2">
              <div className="bg-green-600 text-white font-bold rounded-t px-4 py-2 text-sm">
                  Warning
              </div>
              <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700 text-sm">
                All tasks finished. None assigned.
              </div>
          </div>
        }
      </div>
      <button className="btn-primary" onClick={(e)=> {
        localStorage.setItem('accessToken','anythingpf')
      }}>
        eu
      </button>
    </div>
  );
}
