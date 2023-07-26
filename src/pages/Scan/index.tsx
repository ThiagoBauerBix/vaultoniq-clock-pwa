import { useCallback, useEffect, useState } from "react";
import { useStep } from "../../hooks/useStep";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";

export default function Scan() {
  const { setHeaderInfo, setPreviousTime, setTaskId, setCarName, setCarBrand, setCarYear, setRoNumber, carBrand, carName, roNumber } = useStep();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();

  useEffect(() => {
    setHeaderInfo({
      title: "Scan QR Code",
      icon: "qrcode",
    });
  }, [setHeaderInfo]);

  const convertDateToInteger = (date: string) => {
    console.log('date:',date)
    if(date === null){
      return 0
    }
    try{
      let arr: Array<string> = date?.split(':')
      let seconds: number = (+arr[0]) * 60 * 60 + (+arr[1]) * 60 + (+arr[2]); 
      
      let milisseconds = seconds * 1000
  
      // console.log('milisseconds', milisseconds)
      return milisseconds
    } catch {
      console.log('error trying to convert date to integer')
    }
  }

  const fetchData = useCallback(async (url: string) => {
    console.log("url", url);

    const taskData = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' +`${localStorage.getItem('accessToken')}`
      },
    }).then((res) => res.json());

    console.log(taskData.tasks);
    setData(taskData.tasks)
    setCarName(taskData.car.model)
    setCarBrand(taskData.car.brand.name)
    setCarYear(taskData.car.year)
    setRoNumber(taskData['ro_number'])
    let taskInProgress = taskData.tasks.find((task: any) => task.progress_status === 'In Progress')
    if(taskInProgress != undefined) {
      setTaskId(taskInProgress.task_id)
      setPreviousTime(convertDateToInteger(taskInProgress.time_spent))
    } else {
      let taskPending = taskData.tasks.find((task: any) => task.progress_status === 'Pending')
      taskPending != undefined ? setTaskId(taskPending.task_id) && setPreviousTime(convertDateToInteger(taskPending.time_spent)) : alert('all tasks finished')
    }

  }, []);

  return (
    <div>
      <div>
        <QrReader
          facingMode="environment"
          onResult={(result, error) => {
            if (result) {
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
          style={{ width: "100%" }}
        />
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
              <td className="text-center" key={roNumber}>{roNumber}</td>
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
        {data && (
          <button
            className="w-full btn-primary mx-4 py-4 mr-4 flex flex-row items-center gap-2 justify-center text-white"
            onClick={() => navigate("/timer")}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
