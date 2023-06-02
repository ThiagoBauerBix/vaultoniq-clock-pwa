import { ChangeEvent, SetStateAction, useState } from "react";

export function MediaPicker() {
  const [previews, setPreviews] = useState<string[] | null>(null);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previewURLs: SetStateAction<string[] | null> = [];

    for (let i = 0; i < files.length; i++) {
      previewURLs.push(URL.createObjectURL(files[i]));
    }

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
      <div className="flex flex-col items-center gap-2 p-2">
        {previews?.map((item) => (
          <img
            key={item}
            src={item}
            alt=""
            className="aspect-video w-full h-full rounded-lg object-cover"
          />
        ))}
      </div>
    </>
  );
}
