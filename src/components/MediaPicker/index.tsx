import { ChangeEvent } from "react";
import { useStep } from "../../hooks/useStep";
import { getImgPreview } from "../../services/imagePreview";

export function MediaPicker() {
  const { previews, setPreviews } = useStep();

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previewURLs = getImgPreview(files);
    console.log(JSON.stringify(files));
    setPreviews(previewURLs);
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
