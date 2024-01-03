import { ChangeEvent } from "react";
import { useStep } from "../../hooks/useStep";
import { getImgPreview } from "../../services/imagePreview";

export function MediaPicker() {
  const { previews, setPreviews, setImagesToSend } = useStep();

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    let fileSizeSum = 0
    if (!files) {
      return;
    }

    for(let i=0; i<files?.length; i++) {
      let objSize:any = 0 
      objSize = files?.item(i)?.size
      if(objSize >= 5000000) {
        alert('The size of a single image must be less than 5MB')
      } else {
        fileSizeSum += objSize
      }
    }

    if(fileSizeSum > 100000000) {
      alert('The sum of all images sizes must be less than 100MB')
    } else {
      setImagesToSend(files)
      const previewURLs = getImgPreview(files);
      setPreviews(previewURLs);
    }
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        id="media"
        name="carImage"
        accept="image/*"
        multiple
        className="invisible h-0 w-0"
      />
      <div className="flex flex-col items-center gap-4 py-2 px-4 mt-[-12px]">
        {previews?.map((item: string | undefined) => {
          return (
            <img
              key={item}
              src={item}
              alt=""
              className="aspect-video w-full h-full rounded-lg object-cover"
            />
          );
        })}
      </div>
    </>
  );
}
