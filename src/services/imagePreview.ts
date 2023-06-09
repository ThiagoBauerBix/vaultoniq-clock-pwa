import { SetStateAction } from "react";

export function getImgPreview(files: any){
  const previewURLs: SetStateAction<string[] | null> = [];

  for (let i = 0; i < files.length; i++) {
    previewURLs.push(URL.createObjectURL(files[i]));
  }

  return previewURLs
}