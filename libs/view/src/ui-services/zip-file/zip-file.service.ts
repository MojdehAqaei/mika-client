import { Injectable } from "@angular/core";
import { ClFile } from "@sadad/component-lib/src/models";
import * as JSZip from "jszip";

@Injectable()
export class ZipFileService {

  async createZip(files: ClFile[], generatedZipFileName = "files.zip") {
    //@ts-ignore
    const zip = new JSZip.default();
    files.forEach((file) => {
      zip.file(file.name!, file.base64File, { base64: true });
    });

    zip.generateAsync({ type: "blob" }).then((blob: Blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = generatedZipFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}
