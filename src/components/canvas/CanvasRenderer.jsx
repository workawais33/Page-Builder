import { useState } from "react";

const getVideoEmbedUrl = (url, provider) => {
  if (!url) return "";

  if (provider === "youtube") {
    if (url.includes("youtube.com/embed/")) return url;

    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split(/[?&]/)[0];
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (url.includes("youtube.com/watch")) {
      const id = new URL(url).searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    return url;
  }

  if (provider === "vimeo") {
    if (url.includes("player.vimeo.com/video/")) return url;

    if (url.includes("vimeo.com/")) {
      const id = url.split("vimeo.com/")[1]?.split(/[?&/]/)[0];
      return id ? `https://player.vimeo.com/video/${id}` : "";
    }

    return url;
  }

  return url;
};

const isVisible = (element, viewport) => {
  return element?.visibility?.[viewport] !== false;
};

const getContainerStyle = (element) => {
  const styles = element.styles || {};

  const containerStyle = {
    ...styles,
  };

  if (element.layout === "row") {
    containerStyle.display = "flex";
    containerStyle.flexDirection = "row";
    containerStyle.flexWrap = "wrap";
  }

  if (element.layout === "column") {
    containerStyle.display = "flex";
    containerStyle.flexDirection = "column";
  }

  if (element.layout === "grid") {
    const configuredColumns = Number(element.grid?.columns || 0);

    containerStyle.display = "grid";

    if (configuredColumns > 0) {
      containerStyle.gridTemplateColumns = `repeat(${configuredColumns}, minmax(0, 1fr))`;
    } else if (!containerStyle.gridTemplateColumns) {
      containerStyle.gridTemplateColumns =
        "repeat(2, minmax(0, 1fr))";
    }

    containerStyle.gap =
      element.grid?.gap ||
      styles.gap ||
      "16px";
  }

  return containerStyle;
};

function CanvasRenderer({
  element,
  selectedElementId,
  setSelectedElementId,
  viewport,
  previewMode = false,
  onDropElement,
  dropTargetId = null,
  onDropTargetChange,
}) {
  const [activeTab, setActiveTab] = useState(0);

  if (!element || !isVisible(element, viewport)) {
    return null;
  }

  const isSelected =
    !previewMode && selectedElementId === element.id;

  const isDropTarget =
    !previewMode && dropTargetId === element.id;

  const selectionStyle = isSelected
    ? {
        outline: "2px solid #0d9488",
        outlineOffset: "2px",
      }
    : {};

  const handleSelect = (event) => {
    if (previewMode) return;

    event.stopPropagation();
    setSelectedElementId(element.id);
  };

  const handleContainerDragOver = (event) => {
    const type = event.dataTransfer.getData("elementType");

    if (
      element.type !== "container" ||
      !type ||
      previewMode
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    event.dataTransfer.dropEffect = "copy";

    if (onDropTargetChange) {
      onDropTargetChange(element.id);
    }
  };

  const handleContainerDragLeave = (event) => {
    if (
      element.type !== "container" ||
      previewMode ||
      !onDropTargetChange
    ) {
      return;
    }

    const currentTarget = event.currentTarget;
    const relatedTarget = event.relatedTarget;

    if (
      relatedTarget &&
      currentTarget.contains(relatedTarget)
    ) {
      return;
    }

    onDropTargetChange(null);
  };

  const handleContainerDrop = (event) => {
    const type = event.dataTransfer.getData("elementType");

    if (
      element.type !== "container" ||
      !type ||
      previewMode
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (onDropElement) {
      onDropElement(type, element.id);
    }

    if (onDropTargetChange) {
      onDropTargetChange(null);
    }
  };

  const renderChildren = () => {
    if (!element.children?.length) {
      return (
        !previewMode &&
        element.type === "container" &&
        isDropTarget && (
          <div className="pointer-events-none rounded-lg border-2 border-dashed border-teal-300 bg-teal-50/70 px-4 py-5 text-center text-xs font-medium text-teal-700">
            Drop element here
          </div>
        )
      );
    }

    return element.children.map((child) => (
      <CanvasRenderer
        key={child.id}
        element={child}
        selectedElementId={selectedElementId}
        setSelectedElementId={setSelectedElementId}
        viewport={viewport}
        previewMode={previewMode}
        onDropElement={onDropElement}
        dropTargetId={dropTargetId}
        onDropTargetChange={onDropTargetChange}
      />
    ));
  };

  if (element.type === "text") {
    return (
      <div
        style={{
          ...element.styles,
          ...selectionStyle,
        }}
        onClick={handleSelect}
      >
        {element.content}
      </div>
    );
  }

  if (element.type === "image") {
    return (
      <img
        src={element.src}
        alt={element.alt || "Image"}
        loading="lazy"
        style={{
          ...element.styles,
          ...selectionStyle,
        }}
        onClick={handleSelect}
      />
    );
  }

  if (element.type === "button") {
    const handleButtonClick = (event) => {
      if (!previewMode) {
        event.preventDefault();
        handleSelect(event);
      }
    };

    return (
      <a
        href={element.link || "#"}
        style={{
          ...element.styles,
          ...selectionStyle,
          display: "inline-block",
          textDecoration: "none",
        }}
        onClick={handleButtonClick}
      >
        {element.label}
      </a>
    );
  }

  if (element.type === "input") {
    return (
      <input
        type="text"
        placeholder={element.placeholder || ""}
        readOnly={!previewMode}
        style={{
          width: "100%",
          ...element.styles,
          ...selectionStyle,
        }}
        onClick={handleSelect}
      />
    );
  }

  if (element.type === "container") {
    return (
      <div
        style={{
          ...getContainerStyle(element),
          ...selectionStyle,
          ...(isDropTarget
            ? {
                outline: "2px dashed #14b8a6",
                outlineOffset: "-2px",
              }
            : {}),
        }}
        onClick={handleSelect}
        onDragOver={handleContainerDragOver}
        onDragLeave={handleContainerDragLeave}
        onDrop={handleContainerDrop}
      >
        {renderChildren()}
      </div>
    );
  }

  if (element.type === "video") {
    const embedUrl = getVideoEmbedUrl(
      element.url,
      element.provider
    );

    if (!embedUrl) {
      return (
        <div
          style={{
            ...element.styles,
            ...selectionStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8fafc",
            color: "#94a3b8",
          }}
          onClick={handleSelect}
        >
          Add a video URL
        </div>
      );
    }

    return (
      <iframe
        src={embedUrl}
        title="Embedded video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          ...element.styles,
          ...selectionStyle,
          border: "0",
        }}
        onClick={handleSelect}
      />
    );
  }

  if (element.type === "tabs") {
    const items = element.items || [];
    const currentTab = items[activeTab] || items[0];

    return (
      <div
        style={{
          ...element.styles,
          ...selectionStyle,
        }}
        onClick={handleSelect}
      >
        <div className="flex flex-wrap border-b border-slate-200">
          {items.map((item, index) => (
            <button
              key={item.id || index}
              type="button"
              className={`cursor-pointer px-4 py-2 text-sm font-medium ${
                index === activeTab
                  ? "border-b-2 border-teal-600 text-teal-600"
                  : "text-slate-500"
              }`}
              onClick={(event) => {
                event.stopPropagation();
                setActiveTab(index);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="px-4 py-4 text-sm text-slate-700">
          {currentTab?.content || ""}
        </div>
      </div>
    );
  }

  if (element.type === "accordion") {
    return (
      <div
        style={{
          ...element.styles,
          ...selectionStyle,
        }}
        onClick={handleSelect}
      >
        {(element.items || []).map((item, index) => (
          <details
            key={item.id || index}
            className="border-b border-slate-200"
          >
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-slate-800">
              {item.title}
            </summary>

            <div className="px-4 pb-4 text-sm leading-6 text-slate-600">
              {item.content}
            </div>
          </details>
        ))}
      </div>
    );
  }

  return null;
}

export default CanvasRenderer;
