import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const MobileResumeViewer = ({ resumeUrl }) => {
  return (
    <div>
      <Document file={resumeUrl}>
        <Page pageNumber={1} width={200} />
      </Document>
    </div>
  );
};

export default MobileResumeViewer;

