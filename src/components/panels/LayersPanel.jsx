import { useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ChevronDown,
  ChevronRight,
  FormInput,
  Image,
  Layers3,
  MousePointer2,
  Square,
  Type,
  Video,
} from "lucide-react";

const elements = [
  { type: "text", name: "Text", icon: Type },
  { type: "image", name: "Image", icon: Image },
  { type: "button", name: "Button", icon: MousePointer2 },
  { type: "input", name: "Input", icon: FormInput },
  { type: "container", name: "Container", icon: Square },
  { type: "video", name: "Video", icon: Video },
  { type: "tabs", name: "Tabs", icon: Layers3 },
  { type: "accordion", name: "Accordion", icon: ChevronDown },
];

function LayersPanel({
  page,
  selectedElementId,
  setSelectedElementId,
  showLayers,
  setShowLayers,
  handleLayerDragStart,
  handleLayerDrop,
  handleLayerDropOnPage,
  draggedLayerId,
  dropTargetLayerId,
  setDropTargetLayerId,
}) {
  const scrollRef = useRef(null);

  const layerRows = useMemo(() => {
    const rows = [];

    const walk = (items = [], depth = 0, parentId = null) => {
      items.forEach((element) => {
        rows.push({
          element,
          depth,
          parentId,
        });

        if (element.children?.length) {
          walk(element.children, depth + 1, element.id);
        }
      });
    };

    walk(page?.children || []);

    return rows;
  }, [page]);

  const virtualizer = useVirtualizer({
    count: layerRows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 32,
    overscan: 8,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const getElementIcon = (type) => {
    return elements.find((item) => item.type === type)?.icon || Square;
  };

  const getElementName = (element) => {
    if (element.type === "text") {
      return element.content || "Text";
    }

    if (element.type === "button") {
      return element.label || "Button";
    }

    if (element.type === "input") {
      return element.placeholder || "Input";
    }

    if (element.type === "container") {
      return element.layout
        ? `${element.layout.charAt(0).toUpperCase()}${element.layout.slice(1)} Container`
        : "Container";
    }

    return (
      elements.find((item) => item.type === element.type)?.name ||
      element.type
    );
  };

  return (
    <section
      className={`shrink-0 border-t border-slate-200 bg-white ${
        showLayers ? "h-48" : "h-12"
      }`}
    >
      <div className="flex h-12 items-center justify-between border-b border-slate-200 px-4">
        <button
          type="button"
          onClick={() => setShowLayers((value) => !value)}
          className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700"
        >
          {showLayers ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}

          <Layers3 size={16} />

          <span>Layers / Structure</span>

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
            {layerRows.length}
          </span>
        </button>
      </div>

      {showLayers && (
        <div
          ref={scrollRef}
          className="h-[calc(100%-3rem)] overflow-y-auto px-4 py-2"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleLayerDropOnPage}
        >
          {layerRows.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              Empty Canvas
            </div>
          ) : (
            <div
              className="relative w-full"
              style={{
                height: `${virtualizer.getTotalSize()}px`,
              }}
            >
              {virtualItems.map((virtualRow) => {
                const { element, depth } = layerRows[virtualRow.index];
                const Icon = getElementIcon(element.type);
                const isSelected = selectedElementId === element.id;
                const isDropTarget = dropTargetLayerId === element.id;
                const childCount = element.children?.length || 0;

                return (
                  <div
                    key={element.id}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    className="absolute left-0 top-0 w-full"
                    style={{
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <div
                      draggable
                      onDragStart={(event) =>
                        handleLayerDragStart(event, element.id)
                      }
                      onDragOver={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setDropTargetLayerId(element.id);
                      }}
                      onDragLeave={(event) => {
                        event.stopPropagation();
                        if (dropTargetLayerId === element.id) {
                          setDropTargetLayerId(null);
                        }
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        handleLayerDrop(event, element.id);
                      }}
                      onClick={() => setSelectedElementId(element.id)}
                      className={`flex h-8 cursor-pointer items-center gap-2 rounded-md border px-2 text-sm transition ${
                        isSelected
                          ? "border-teal-200 bg-teal-50 text-teal-700"
                          : isDropTarget
                            ? "border-teal-300 bg-teal-50 text-slate-700 ring-2 ring-teal-100"
                            : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50"
                      }`}
                      style={{
                        paddingLeft: `${8 + depth * 22}px`,
                      }}
                    >
                      {childCount > 0 ? (
                        <ChevronDown
                          size={13}
                          className="shrink-0 text-slate-400"
                        />
                      ) : (
                        <span className="w-[13px] shrink-0" />
                      )}

                      <Icon size={15} className="shrink-0" />

                      <span className="min-w-0 flex-1 truncate">
                        {getElementName(element)}
                      </span>

                      {childCount > 0 && (
                        <span className="shrink-0 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                          {childCount}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default LayersPanel;