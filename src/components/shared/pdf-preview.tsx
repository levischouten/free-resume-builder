import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { pdf } from "@react-pdf/renderer";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Loader2Icon } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

function setWithinRange(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type PDFPreviewProps = {
  children: React.JSX.Element;
  width?: number;
};

export function PDFPreview(props: PDFPreviewProps) {
  const [file, setFile] = React.useState<Blob>();
  const [loading, setLoading] = React.useState(true);
  const [numPages, setNumPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [width, setWidth] = React.useState(450);

  const parentRef = React.useRef<HTMLDivElement>(null);
  const timeoutIdRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (parentRef.current) {
        setWidth(setWithinRange(parentRef.current.offsetWidth, 200, 450));
      }
    });

    if (parentRef.current) {
      setWidth(setWithinRange(parentRef.current.offsetWidth, 200, 450));
    }

    () => {
      removeEventListener("resize", () => {});
    };
  }, [parentRef]);

  React.useEffect(() => {
    if (!file) {
      pdf(props.children)
        .toBlob()
        .then((blob) => {
          setFile(blob);
        });

      return;
    }

    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      pdf(props.children)
        .toBlob()
        .then((blob) => {
          setFile(blob);
        });
    }, 1000);

    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.children]);

  return (
    <div ref={parentRef} className="w-full h-full">
      <div
        className={cn("flex w-full justify-center", {
          hidden: !loading,
        })}
      >
        <Loader2Icon className="mt-16 h-6 w-6 animate-spin" />
      </div>
      <div
        className={cn("flex flex-col items-center gap-4", {
          hidden: loading,
        })}
      >
        <Document
          file={file}
          loading={<Loader2Icon className="mt-16 h-6 w-6 animate-spin" />}
          key={width}
          onLoadSuccess={(document) => {
            setNumPages(document.numPages);
            setLoading(false);
          }}
          onLoadStart={() => {
            setLoading(true);
          }}
        >
          <Page
            pageNumber={currentPage}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={width}
          />
        </Document>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            disabled={currentPage === numPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
