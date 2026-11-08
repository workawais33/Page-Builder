import { LayoutTemplate } from "lucide-react";
import CanvasRenderer from "./CanvasRenderer";

const viewportConfig = {
  desktop: { label: "Desktop", width: "w-full", minHeight: "720px" },
  tablet: { label: "Tablet", width: "w-[768px] max-w-full", minHeight: "720px" },
  mobile: { label: "Mobile", width: "w-[390px] max-w-full", minHeight: "720px" },
};

function BuilderCanvas({
  page,
  onDropElement,
  selectedElementId,
  setSelectedElementId,
  viewport = "desktop",
  previewMode = false,
  dropTargetId = null,
  onDropTargetChange,
}) {
  const hasElements = page?.children?.length > 0;
  const currentViewport =
    viewportConfig[viewport] || viewportConfig.desktop;

  const handleDragOver = (event) => {
    if (previewMode) return;

    event.preventDefault();
    event.stopPropagation();

    event.dataTransfer.dropEffect = "copy";

    if (onDropTargetChange && dropTargetId) {
      onDropTargetChange(dropTargetId);
    }
  };

  const handleDragLeave = (event) => {
    if (
      event.currentTarget === event.target &&
      onDropTargetChange
    ) {
      onDropTargetChange(null);
    }
  };

  const handleDrop = (event) => {
    if (previewMode) return;

    event.preventDefault();
    event.stopPropagation();

    const type = event.dataTransfer.getData("elementType");

    if (!type) {
      if (onDropTargetChange) {
        onDropTargetChange(null);
      }
      return;
    }

    if (onDropElement) {
      onDropElement(type, dropTargetId || null);
    }

    if (onDropTargetChange) {
      onDropTargetChange(null);
    }
  };

  const handleCanvasClick = () => {
    if (!previewMode) {
      setSelectedElementId(null);
    }
  };

  return (
    <div className="flex w-full justify-center overflow-x-auto px-2 pb-8">
      <div
        className={`${currentViewport.width} overflow-hidden border border-slate-200 bg-white transition-all duration-300 ${
          previewMode ? "shadow-none" : "shadow-sm"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div
          className={`relative ${currentViewport.minHeight} ${
            previewMode
              ? "border-0"
              : "border-2 border-dashed border-slate-200"
          }`}
          onClick={handleCanvasClick}
        >
          {hasElements ? (
            <div
              className={`min-h-[720px] ${
                previewMode ? "p-0" : "p-8"
              }`}
            >
              {page.children.map((element) => (
                <CanvasRenderer
                  key={element.id}
                  element={element}
                  selectedElementId={selectedElementId}
                  setSelectedElementId={setSelectedElementId}
                  viewport={viewport}
                  previewMode={previewMode}
                  onDropElement={onDropElement}
                  dropTargetId={dropTargetId}
                  onDropTargetChange={onDropTargetChange}
                />
              ))}
            </div>
          ) : (
            <div
              className={`flex min-h-[720px] items-center justify-center px-6 ${
                !previewMode ? "bg-slate-50/40" : "bg-white"
              }`}
            >
              {!previewMode && (
                <div className="max-w-sm text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <LayoutTemplate size={25} />
                  </div>

                  <h1 className="text-xl font-semibold text-slate-800">
                    Start building your page
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Drag an element or a pre-designed section from the tools
                    panel onto the canvas.
                  </p>
                </div>
              )}
            </div>
          )}

          {!previewMode && dropTargetId && (
            <div className="pointer-events-none absolute inset-x-6 bottom-4 rounded-lg border-2 border-dashed border-teal-400 bg-teal-50/90 px-4 py-3 text-center text-sm font-medium text-teal-700 shadow-sm">
              Drop element into selected container
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuilderCanvas;

 