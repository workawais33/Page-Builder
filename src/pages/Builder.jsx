import {
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  FileCode2,
  FormInput,
  Image,
  LayoutTemplate,
  Monitor,
  MousePointer2,
  Redo2,
  Save,
  Smartphone,
  Square,
  Tablet,
  Trash2,
  Type,
  Undo2,
  Video,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import BuilderCanvas from "../components/canvas/BuilderCanvas";
import LayersPanel from "../components/panels/LayersPanel";
import useBuilderState from "../hooks/useBuilderState";

const elements = [
  { name: "Text", type: "text", icon: Type },
  { name: "Image", type: "image", icon: Image },
  { name: "Button", type: "button", icon: MousePointer2 },
  { name: "Input", type: "input", icon: FormInput },
  { name: "Container", type: "container", icon: Square },
  { name: "Video", type: "video", icon: Video },
  { name: "Tabs", type: "tabs", icon: LayoutTemplate },
  { name: "Accordion", type: "accordion", icon: LayoutTemplate },
];

const elementNames = {
  text: "Text",
  image: "Image",
  button: "Button",
  input: "Input",
  container: "Container",
  video: "Video",
  tabs: "Tabs",
  accordion: "Accordion",
};

const viewportLabels = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
};

const viewportWidths = {
  desktop: "1440px",
  tablet: "768px",
  mobile: "390px",
};

const predefinedSections = {
  Hero: {
    type: "container",
    layout: "column",
    styles: {
      width: "100%",
      padding: "80px 40px",
      margin: "0px",
      gap: "20px",
      backgroundColor: "#f0fdfa",
      textAlign: "center",
    },
    children: [
      {
        type: "text",
        content: "Build Something Amazing",
        styles: {
          fontSize: "42px",
          fontWeight: "700",
          color: "#134e4a",
          padding: "0px",
          margin: "0px",
          textAlign: "center",
        },
      },
      {
        type: "text",
        content:
          "Create beautiful responsive pages with a simple visual builder.",
        styles: {
          fontSize: "18px",
          color: "#64748b",
          padding: "0px",
          margin: "0px",
          textAlign: "center",
        },
      },
      {
        type: "button",
        label: "Get Started",
        link: "#",
        styles: {
          fontSize: "16px",
          fontWeight: "500",
          color: "#ffffff",
          backgroundColor: "#0d9488",
          padding: "12px 24px",
          margin: "0px",
          textAlign: "center",
          borderRadius: "8px",
        },
      },
    ],
  },

  Features: {
    type: "container",
    layout: "grid",
    grid: {
      columns: 3,
      gap: "20px",
    },
    styles: {
      width: "100%",
      padding: "48px 32px",
      margin: "0px",
      gap: "20px",
    },
    children: [
      {
        type: "container",
        layout: "column",
        styles: {
          padding: "24px",
          margin: "0px",
          gap: "12px",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
        },
        children: [
          {
            type: "text",
            content: "Fast",
            styles: {
              fontSize: "22px",
              fontWeight: "600",
              color: "#0f172a",
              margin: "0px",
              padding: "0px",
            },
          },
          {
            type: "text",
            content: "Build pages quickly with visual controls.",
            styles: {
              fontSize: "15px",
              color: "#64748b",
              margin: "0px",
              padding: "0px",
            },
          },
        ],
      },
      {
        type: "container",
        layout: "column",
        styles: {
          padding: "24px",
          margin: "0px",
          gap: "12px",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
        },
        children: [
          {
            type: "text",
            content: "Responsive",
            styles: {
              fontSize: "22px",
              fontWeight: "600",
              color: "#0f172a",
              margin: "0px",
              padding: "0px",
            },
          },
          {
            type: "text",
            content: "Design for desktop, tablet and mobile.",
            styles: {
              fontSize: "15px",
              color: "#64748b",
              margin: "0px",
              padding: "0px",
            },
          },
        ],
      },
      {
        type: "container",
        layout: "column",
        styles: {
          padding: "24px",
          margin: "0px",
          gap: "12px",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
        },
        children: [
          {
            type: "text",
            content: "Flexible",
            styles: {
              fontSize: "22px",
              fontWeight: "600",
              color: "#0f172a",
              margin: "0px",
              padding: "0px",
            },
          },
          {
            type: "text",
            content: "Create nested layouts and reusable sections.",
            styles: {
              fontSize: "15px",
              color: "#64748b",
              margin: "0px",
              padding: "0px",
            },
          },
        ],
      },
    ],
  },

  Pricing: {
    type: "container",
    layout: "column",
    styles: {
      width: "100%",
      padding: "56px 32px",
      margin: "0px",
      gap: "18px",
      backgroundColor: "#f8fafc",
      textAlign: "center",
    },
    children: [
      {
        type: "text",
        content: "Simple Pricing",
        styles: {
          fontSize: "34px",
          fontWeight: "700",
          color: "#0f172a",
          margin: "0px",
          padding: "0px",
          textAlign: "center",
        },
      },
      {
        type: "text",
        content: "Choose the plan that fits your needs.",
        styles: {
          fontSize: "17px",
          color: "#64748b",
          margin: "0px",
          padding: "0px",
          textAlign: "center",
        },
      },
      {
        type: "container",
        layout: "grid",
        grid: {
          columns: 3,
          gap: "18px",
        },
        styles: {
          width: "100%",
          padding: "20px 0px",
          margin: "0px",
          gap: "18px",
        },
        children: [
          {
            type: "text",
            content: "$19 / month",
            styles: {
              fontSize: "24px",
              fontWeight: "600",
              color: "#0f766e",
              padding: "24px",
              margin: "0px",
              textAlign: "center",
              backgroundColor: "#ffffff",
            },
          },
          {
            type: "text",
            content: "$49 / month",
            styles: {
              fontSize: "24px",
              fontWeight: "600",
              color: "#0f766e",
              padding: "24px",
              margin: "0px",
              textAlign: "center",
              backgroundColor: "#ffffff",
            },
          },
          {
            type: "text",
            content: "$99 / month",
            styles: {
              fontSize: "24px",
              fontWeight: "600",
              color: "#0f766e",
              padding: "24px",
              margin: "0px",
              textAlign: "center",
              backgroundColor: "#ffffff",
            },
          },
        ],
      },
    ],
  },
};

function createId(type) {
  return `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function cloneSection(section) {
  const cloned = structuredClone(section);

  const assignIds = (element) => {
    const nextElement = {
      ...element,
      id: createId(element.type),
      visibility: {
        desktop: true,
        tablet: true,
        mobile: true,
        ...(element.visibility || {}),
      },
    };

    if (nextElement.children?.length) {
      nextElement.children = nextElement.children.map(assignIds);
    }

    if (nextElement.items?.length) {
      nextElement.items = nextElement.items.map((item) => ({
        ...item,
        id: createId("item"),
      }));
    }

    return nextElement;
  };

  return assignIds(cloned);
}

function updateItem(items, itemId, updates) {
  return items.map((item) =>
    item.id === itemId
      ? {
          ...item,
          ...updates,
        }
      : item,
  );
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function styleObjectToCss(styles = {}) {
  return Object.entries(styles)
    .filter(
      ([, value]) =>
        value !== undefined && value !== null && value !== "",
    )
    .map(([property, value]) => {
      const cssProperty = property.replace(
        /[A-Z]/g,
        (match) => `-${match.toLowerCase()}`,
      );

      return `${cssProperty}:${value};`;
    })
    .join("");
}

function getVideoEmbedUrl(url, provider) {
  if (!url) {
    return "";
  }

  if (
    url.includes("youtube.com/embed/") ||
    url.includes("player.vimeo.com/video/")
  ) {
    return url;
  }

  if (provider === "youtube") {
    const youtubeMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/,
    );

    if (youtubeMatch?.[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
  }

  if (provider === "vimeo") {
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);

    if (vimeoMatch?.[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
  }

  return url;
}

function elementToExportHtml(element) {
  const className = `builder-${element.id}`;

  switch (element.type) {
    case "text":
      return `<div class="${className}">${escapeHtml(
        element.content || "",
      )}</div>`;

    case "image":
      return `<img class="${className}" src="${escapeHtml(
        element.src || "",
      )}" alt="${escapeHtml(element.alt || "")}" loading="lazy" />`;

    case "button":
      return `<a class="${className}" href="${escapeHtml(
        element.link || "#",
      )}">${escapeHtml(element.label || "")}</a>`;

    case "input":
      return `<input class="${className}" type="text" placeholder="${escapeHtml(
        element.placeholder || "",
      )}" />`;

    case "video":
      return `<iframe class="${className}" src="${escapeHtml(
        getVideoEmbedUrl(element.url, element.provider),
      )}" title="Video" loading="lazy" allowfullscreen></iframe>`;

    case "tabs":
      return `<div class="${className}">${(element.items || [])
        .map(
          (item) =>
            `<div class="builder-tab-item"><div class="builder-tab-label">${escapeHtml(
              item.label || "",
            )}</div><div class="builder-tab-content">${escapeHtml(
              item.content || "",
            )}</div></div>`,
        )
        .join("")}</div>`;

    case "accordion":
      return `<div class="${className}">${(element.items || [])
        .map(
          (item) =>
            `<details><summary>${escapeHtml(
              item.title || "",
            )}</summary><div>${escapeHtml(item.content || "")}</div></details>`,
        )
        .join("")}</div>`;

    case "container": {
      const layoutStyles =
        element.layout === "grid"
          ? `display:grid;grid-template-columns:repeat(${
              element.grid?.columns || 2
            },minmax(0,1fr));gap:${element.grid?.gap || "16px"};`
          : `display:flex;flex-direction:${
              element.layout === "row" ? "row" : "column"
            };gap:${element.styles?.gap || "16px"};`;

      return `<div class="${className}">${(element.children || [])
        .map(elementToExportHtml)
        .join("")}</div>`;
    }

    default:
      return "";
  }
}

function collectExportCss(element, rules = []) {
  const className = `builder-${element.id}`;

  rules.push(`.${className}{${styleObjectToCss(element.styles)}}`);

  if (element.type === "container") {
    if (element.layout === "grid") {
      rules.push(
        `.${className}{display:grid;grid-template-columns:repeat(${
          element.grid?.columns || 2
        },minmax(0,1fr));gap:${element.grid?.gap || "16px"};}`,
      );
    } else {
      rules.push(
        `.${className}{display:flex;flex-direction:${
          element.layout === "row" ? "row" : "column"
        };gap:${element.styles?.gap || "16px"};}`,
      );
    }
  }

  if (element.type === "button") {
    rules.push(
      `.${className}{display:inline-block;text-decoration:none;}`,
    );
  }

  if (element.type === "image") {
    rules.push(`.${className}{max-width:100%;height:auto;}`);
  }

  if (element.type === "video") {
    rules.push(`.${className}{max-width:100%;border:0;}`);
  }

  if (element.visibility?.mobile === false) {
    rules.push(
      `@media (max-width:767px){.${className}{display:none!important;}}`,
    );
  }

  if (element.visibility?.tablet === false) {
    rules.push(
      `@media (min-width:768px) and (max-width:1023px){.${className}{display:none!important;}}`,
    );
  }

  if (element.visibility?.desktop === false) {
    rules.push(
      `@media (min-width:1024px){.${className}{display:none!important;}}`,
    );
  }

  if (element.children?.length) {
    element.children.forEach((child) =>
      collectExportCss(child, rules),
    );
  }

  return rules;
}

function buildExportFiles(page) {
  const html = (page.children || [])
    .map(elementToExportHtml)
    .join("\n");

  const rules = [];

  (page.children || []).forEach((element) => {
    collectExportCss(element, rules);
  });

  const css = `
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  min-width: 320px;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
}

img,
iframe {
  max-width: 100%;
}

.builder-tab-item {
  margin-bottom: 12px;
}

.builder-tab-label {
  padding: 10px 12px;
  background: #f1f5f9;
  font-weight: 600;
}

.builder-tab-content {
  padding: 12px;
  color: #64748b;
}

details {
  margin-bottom: 8px;
  border: 1px solid #e2e8f0;
}

summary {
  cursor: pointer;
  padding: 12px;
  font-weight: 600;
}

${rules.join("\n")}
`;

  return {
    html,
    css,
  };
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(url);
}

function Builder() {
  const {
    page,
    selectedElementId,
    setSelectedElementId,
    getElementById,
    getParentInfo,
    addElement,
    addPreparedElement,
    updateElement,
    deleteElement,
    moveElement,
    undo,
    redo,
    canUndo,
    canRedo,
    templates,
    saveTemplate,
    loadTemplate,
    deleteTemplate,
  } = useBuilderState();

  const [viewport, setViewport] = useState("desktop");
  const [previewMode, setPreviewMode] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [showLayers, setShowLayers] = useState(true);
  const [exportFormat, setExportFormat] = useState("html");
  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const [draggedLayerId, setDraggedLayerId] = useState(null);
  const [dropTargetLayerId, setDropTargetLayerId] = useState(null);

  const selectedElement = selectedElementId
    ? getElementById(selectedElementId)
    : null;

  const exportFiles = useMemo(
    () => buildExportFiles(page),
    [page],
  );

  const embedHtml =
    '<iframe src="YOUR-PUBLISHED-PAGE-URL" style="width:100%;min-height:600px;border:0;" loading="lazy"></iframe>';

  const embedScript = `<div id="page-builder-root"></div>
<script>
(function () {
  const root = document.getElementById("page-builder-root");
  const iframe = document.createElement("iframe");
  iframe.src = "YOUR-PUBLISHED-PAGE-URL";
  iframe.style.width = "100%";
  iframe.style.minHeight = "600px";
  iframe.style.border = "0";
  iframe.loading = "lazy";
  root.appendChild(iframe);
})();
</script>`;

  const handleAddElement = (type, parentId = null) => {
    addElement(type, parentId);
  };

  const handleDragStart = (event, type) => {
    event.dataTransfer.setData("elementType", type);
    event.dataTransfer.effectAllowed = "copy";
  };

  const handleDropElement = (type, parentId = null) => {
    addElement(type, parentId);
  };

  const handleUpdateElement = (updates) => {
    if (!selectedElementId) {
      return;
    }

    updateElement(selectedElementId, updates);
  };

  const handleFieldChange = (field, value) => {
    handleUpdateElement({
      [field]: value,
    });
  };

  const handleStyleChange = (property, value) => {
    if (!selectedElement) {
      return;
    }

    handleUpdateElement({
      styles: {
        ...(selectedElement.styles || {}),
        [property]: value,
      },
    });
  };

  const handleVisibilityChange = (device, value) => {
    if (!selectedElement) {
      return;
    }

    handleUpdateElement({
      visibility: {
        desktop: true,
        tablet: true,
        mobile: true,
        ...(selectedElement.visibility || {}),
        [device]: value,
      },
    });
  };

  const handleContainerLayoutChange = (layout) => {
    if (!selectedElement || selectedElement.type !== "container") {
      return;
    }

    handleUpdateElement({
      layout,
      grid:
        layout === "grid"
          ? {
              columns: selectedElement.grid?.columns || 2,
              rows: selectedElement.grid?.rows || "auto",
              gap: selectedElement.grid?.gap || "16px",
            }
          : selectedElement.grid,
    });
  };

  const handleGridColumnsChange = (columns) => {
    if (!selectedElement) {
      return;
    }

    handleUpdateElement({
      grid: {
        columns: Number(columns),
        rows: selectedElement.grid?.rows || "auto",
        gap: selectedElement.grid?.gap || "16px",
      },
    });
  };

  const handleGridGapChange = (value) => {
    if (!selectedElement) {
      return;
    }

    handleUpdateElement({
      grid: {
        columns: selectedElement.grid?.columns || 2,
        rows: selectedElement.grid?.rows || "auto",
        gap: value,
      },
    });
  };

  const handleTabItemChange = (itemId, field, value) => {
    if (!selectedElement) {
      return;
    }

    handleUpdateElement({
      items: updateItem(selectedElement.items || [], itemId, {
        [field]: value,
      }),
    });
  };

  const handleAccordionItemChange = (itemId, field, value) => {
    if (!selectedElement) {
      return;
    }

    handleUpdateElement({
      items: updateItem(selectedElement.items || [], itemId, {
        [field]: value,
      }),
    });
  };

  const handleAddTab = () => {
    if (!selectedElement || selectedElement.type !== "tabs") {
      return;
    }

    handleUpdateElement({
      items: [
        ...(selectedElement.items || []),
        {
          id: createId("tab"),
          label: `Tab ${(selectedElement.items || []).length + 1}`,
          content: "Tab content",
        },
      ],
    });
  };

  const handleAddAccordionItem = () => {
    if (!selectedElement || selectedElement.type !== "accordion") {
      return;
    }

    handleUpdateElement({
      items: [
        ...(selectedElement.items || []),
        {
          id: createId("accordion"),
          title: `Accordion Item ${
            (selectedElement.items || []).length + 1
          }`,
          content: "Accordion content",
        },
      ],
    });
  };

  const handleDeleteSelected = () => {
    if (!selectedElementId) {
      return;
    }

    deleteElement(selectedElementId);
  };

  const handleLayerDragStart = (event, elementId) => {
    event.stopPropagation();
    setDraggedLayerId(elementId);
    event.dataTransfer.setData("layerId", elementId);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleLayerDrop = (event, targetElementId) => {
    event.preventDefault();
    event.stopPropagation();

    const sourceId =
      draggedLayerId || event.dataTransfer.getData("layerId");

    if (!sourceId || sourceId === targetElementId) {
      setDraggedLayerId(null);
      setDropTargetLayerId(null);
      return;
    }

    const sourceElement = getElementById(sourceId);
    const targetElement = getElementById(targetElementId);

    if (!sourceElement || !targetElement) {
      setDraggedLayerId(null);
      setDropTargetLayerId(null);
      return;
    }

    const sourceParentInfo = getParentInfo(sourceId);

    if (!sourceParentInfo) {
      setDraggedLayerId(null);
      setDropTargetLayerId(null);
      return;
    }

    if (targetElement.type === "container") {
      const targetChildren = targetElement.children || [];

      moveElement(
        sourceId,
        targetElement.id,
        targetChildren.length,
      );
    } else {
      const targetParentInfo = getParentInfo(targetElementId);

      if (!targetParentInfo) {
        setDraggedLayerId(null);
        setDropTargetLayerId(null);
        return;
      }

      moveElement(
        sourceId,
        targetParentInfo.parentId,
        targetParentInfo.index,
      );
    }

    setDraggedLayerId(null);
    setDropTargetLayerId(null);
  };

  const handleLayerDropOnPage = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const sourceId =
      draggedLayerId || event.dataTransfer.getData("layerId");

    if (!sourceId) {
      return;
    }

    moveElement(sourceId, null);

    setDraggedLayerId(null);
    setDropTargetLayerId(null);
  };

  const handleSaveTemplate = () => {
    const template = saveTemplate(templateName);

    if (!template) {
      return;
    }

    setTemplateName("");
    setShowSaveTemplate(false);
  };

  const handleAddSection = (sectionName) => {
    const section = predefinedSections[sectionName];

    if (!section || !addPreparedElement) {
      return;
    }

    const preparedSection = cloneSection(section);
    const createdElement = addPreparedElement(preparedSection);

    if (createdElement?.id) {
      setSelectedElementId(createdElement.id);
    }
  };

  const handleDownloadHtml = () => {
    const htmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Page Builder Export</title>
<link rel="stylesheet" href="styles.css" />
</head>
<body>
${exportFiles.html}
</body>
</html>`;

    downloadFile("page.html", htmlDocument, "text/html");
  };

  const handleDownloadCss = () => {
    downloadFile("styles.css", exportFiles.css, "text/css");
  };

  const renderConfigurationFields = () => {
    if (!selectedElement) {
      return null;
    }

    switch (selectedElement.type) {
      case "text":
        return (
          <textarea
            value={selectedElement.content || ""}
            onChange={(event) =>
              handleFieldChange("content", event.target.value)
            }
            rows={5}
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          />
        );

      case "button":
        return (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Button Label
              </label>
              <input
                value={selectedElement.label || ""}
                onChange={(event) =>
                  handleFieldChange("label", event.target.value)
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Link
              </label>
              <input
                value={selectedElement.link || ""}
                onChange={(event) =>
                  handleFieldChange("link", event.target.value)
                }
                placeholder="https://example.com"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
              />
            </div>
          </div>
        );

      case "image":
        return (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Image URL
              </label>
              <input
                value={selectedElement.src || ""}
                onChange={(event) =>
                  handleFieldChange("src", event.target.value)
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Alt Text
              </label>
              <input
                value={selectedElement.alt || ""}
                onChange={(event) =>
                  handleFieldChange("alt", event.target.value)
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
              />
            </div>
          </div>
        );

      case "video":
        return (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Provider
              </label>
              <select
                value={selectedElement.provider || "youtube"}
                onChange={(event) =>
                  handleFieldChange("provider", event.target.value)
                }
                className="w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
              >
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Video URL
              </label>
              <input
                value={selectedElement.url || ""}
                onChange={(event) =>
                  handleFieldChange("url", event.target.value)
                }
                placeholder="https://youtube.com/watch?v=..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
              />
            </div>
          </div>
        );

      case "input":
        return (
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Placeholder
            </label>
            <input
              value={selectedElement.placeholder || ""}
              onChange={(event) =>
                handleFieldChange("placeholder", event.target.value)
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
            />
          </div>
        );

      case "container":
        return (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Layout
              </label>
              <select
                value={selectedElement.layout || "column"}
                onChange={(event) =>
                  handleContainerLayoutChange(event.target.value)
                }
                className="w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
              >
                <option value="row">Row</option>
                <option value="column">Column</option>
                <option value="grid">Grid</option>
              </select>
            </div>

            {selectedElement.layout === "grid" && (
              <>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Grid Columns
                  </label>
                  <select
                    value={selectedElement.grid?.columns || 2}
                    onChange={(event) =>
                      handleGridColumnsChange(event.target.value)
                    }
                    className="w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                  >
                    <option value="1">1 Column</option>
                    <option value="2">2 Columns</option>
                    <option value="3">3 Columns</option>
                    <option value="4">4 Columns</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Grid Gap
                  </label>
                  <input
                    value={selectedElement.grid?.gap || "16px"}
                    onChange={(event) =>
                      handleGridGapChange(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                  />
                </div>
              </>
            )}

            <button
              onClick={() => handleAddElement("text", selectedElement.id)}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2.5 text-sm font-medium text-teal-700 hover:bg-teal-100"
            >
              <Type size={15} />
              Add Child Text
            </button>
          </div>
        );

      case "tabs":
        return (
          <div className="space-y-4">
            {(selectedElement.items || []).map((item, index) => (
              <div
                key={item.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <p className="mb-3 text-xs font-semibold text-slate-500">
                  Tab {index + 1}
                </p>

                <input
                  value={item.label || ""}
                  onChange={(event) =>
                    handleTabItemChange(
                      item.id,
                      "label",
                      event.target.value,
                    )
                  }
                  className="mb-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500"
                />

                <textarea
                  value={item.content || ""}
                  onChange={(event) =>
                    handleTabItemChange(
                      item.id,
                      "content",
                      event.target.value,
                    )
                  }
                  rows={3}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500"
                />
              </div>
            ))}

            <button
              onClick={handleAddTab}
              className="w-full cursor-pointer rounded-lg border border-teal-200 bg-teal-50 px-3 py-2.5 text-sm font-medium text-teal-700 hover:bg-teal-100"
            >
              + Add Tab
            </button>
          </div>
        );

      case "accordion":
        return (
          <div className="space-y-4">
            {(selectedElement.items || []).map((item, index) => (
              <div
                key={item.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <p className="mb-3 text-xs font-semibold text-slate-500">
                  Item {index + 1}
                </p>

                <input
                  value={item.title || ""}
                  onChange={(event) =>
                    handleAccordionItemChange(
                      item.id,
                      "title",
                      event.target.value,
                    )
                  }
                  className="mb-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500"
                />

                <textarea
                  value={item.content || ""}
                  onChange={(event) =>
                    handleAccordionItemChange(
                      item.id,
                      "content",
                      event.target.value,
                    )
                  }
                  rows={3}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500"
                />
              </div>
            ))}

            <button
              onClick={handleAddAccordionItem}
              className="w-full cursor-pointer rounded-lg border border-teal-200 bg-teal-50 px-3 py-2.5 text-sm font-medium text-teal-700 hover:bg-teal-100"
            >
              + Add Accordion Item
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const styles = selectedElement?.styles || {};

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {!previewMode && (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5">
          <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white">
    <img
      src="https://cdn-icons-png.flaticon.com/512/13304/13304398.png"
      alt="PageBuilder"
      className="h-full w-full object-cover"
    />
  </div>

  <span className="text-lg font-bold tracking-tight text-teal-600">
    PageBuilder
  </span>
</div>

            <div className="h-6 w-px bg-slate-200" />

            <button className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
              Untitled Page
              <ChevronDown size={15} />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={undo}
              disabled={!canUndo}
              className="cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Undo2 size={18} />
            </button>

            <button
              onClick={redo}
              disabled={!canRedo}
              className="cursor-pointer rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Redo2 size={18} />
            </button>

            <div className="mx-2 h-6 w-px bg-slate-200" />

            {Object.entries(viewportLabels).map(([key, label]) => {
              const Icon =
                key === "desktop"
                  ? Monitor
                  : key === "tablet"
                    ? Tablet
                    : Smartphone;

              return (
                <button
                  key={key}
                  onClick={() => setViewport(key)}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    viewport === key
                      ? "bg-teal-50 text-teal-700"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={17} />
                  <span className="hidden xl:inline">{label}</span>
                </button>
              );
            })}

            <div className="mx-2 h-6 w-px bg-slate-200" />

            <button
              onClick={() => setPreviewMode(true)}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <Eye size={17} />
              Preview
            </button>

            <button
              onClick={() => setShowExport(true)}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
            >
              <Download size={17} />
              Export
            </button>
          </div>
        </header>
      )}

      {previewMode && (
        <div className="fixed right-5 top-5 z-50">
          <button
            onClick={() => setPreviewMode(false)}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-slate-800"
          >
            <EyeOff size={17} />
            Exit Preview
          </button>
        </div>
      )}

      <div
        className={
          previewMode
            ? "min-h-screen"
            : "flex h-[calc(100vh-4rem)] flex-col overflow-hidden"
        }
      >
        <div
          className={
            previewMode ? "min-h-screen" : "flex min-h-0 flex-1"
          }
        >
          {!previewMode && (
            <aside className="w-60 shrink-0 overflow-y-auto border-r border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-4 py-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Tools
                </p>
              </div>

              <div className="p-3">
                <div className="mb-5">
                  <h2 className="mb-3 text-xs font-semibold text-slate-700">
                    Elements
                  </h2>

                  <div className="space-y-1">
                    {elements.map(({ name, type, icon: Icon }) => (
                      <button
                        key={name}
                        draggable
                        onDragStart={(event) =>
                          handleDragStart(event, type)
                        }
                        onClick={() => handleAddElement(type)}
                        className="group flex w-full cursor-grab items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-teal-50 hover:text-teal-700 active:cursor-grabbing"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 shadow-sm group-hover:border-teal-200 group-hover:text-teal-600">
                          <Icon size={16} />
                        </span>
                        <span className="font-medium">{name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <h2 className="mb-3 text-xs font-semibold text-slate-700">
                    Sections
                  </h2>

                  <div className="space-y-1">
                    {Object.keys(predefinedSections).map((section) => (
                      <button
                        key={section}
                        onClick={() => handleAddSection(section)}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                      >
                        <LayoutTemplate size={16} />
                        <span className="font-medium">{section}</span>
                        <ChevronRight
                          size={14}
                          className="ml-auto text-slate-300"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <h2 className="mb-3 text-xs font-semibold text-slate-700">
                    Templates
                  </h2>

                  <button
                    onClick={() => setShowTemplates(true)}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                  >
                    <LayoutTemplate size={16} />
                    Saved Templates
                  </button>

                  <button
                    onClick={() => setShowSaveTemplate(true)}
                    className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                  >
                    <Save size={16} />
                    Save Current
                  </button>
                </div>
              </div>
            </aside>
          )}

          <main
            className={
              previewMode
                ? "min-w-0 flex-1 overflow-auto bg-white"
                : "min-w-0 flex-1 overflow-auto bg-slate-100"
            }
          >
            <div
              className={
                previewMode
                  ? "flex min-h-full flex-col items-center"
                  : "flex min-h-full flex-col items-center px-8 py-8"
              }
            >
              {!previewMode && (
                <div className="mb-5 flex w-full max-w-6xl items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                      Canvas
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {viewportLabels[viewport]} viewport ·{" "}
                      {viewportWidths[viewport]}
                    </p>
                  </div>
                </div>
              )}

              <BuilderCanvas
                page={page}
                onDropElement={handleDropElement}
                selectedElementId={selectedElementId}
                setSelectedElementId={setSelectedElementId}
                viewport={viewport}
                previewMode={previewMode}
                dropTargetId={dropTargetLayerId}
                onDropTargetChange={setDropTargetLayerId}
              />
            </div>
          </main>

          {!previewMode && (
            <aside className="w-80 shrink-0 overflow-y-auto border-l border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-5 py-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Design
                </p>
              </div>

              <div className="p-5">
                {selectedElement ? (
                  <>
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Selected
                        </p>
                        <p className="mt-1 text-base font-semibold text-slate-800">
                          {elementNames[selectedElement.type]}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedElementId(null)}
                        className="cursor-pointer rounded-lg px-2 py-1 text-xs font-medium text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        Clear
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Content
                        </p>
                        {renderConfigurationFields()}
                      </div>

                      <div className="border-t border-slate-100 pt-5">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Responsive Visibility
                        </p>

                        <div className="space-y-2">
                          {Object.entries(viewportLabels).map(
                            ([device, label]) => (
                              <label
                                key={device}
                                className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5"
                              >
                                <span className="text-sm font-medium text-slate-600">
                                  {label}
                                </span>

                                <input
                                  type="checkbox"
                                  checked={
                                    selectedElement.visibility?.[device] !==
                                    false
                                  }
                                  onChange={(event) =>
                                    handleVisibilityChange(
                                      device,
                                      event.target.checked,
                                    )
                                  }
                                  className="h-4 w-4 cursor-pointer accent-teal-600"
                                />
                              </label>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-5">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Typography
                        </p>

                        <div className="space-y-4">
                          <div>
                            <label className="mb-2 block text-xs font-medium text-slate-600">
                              Font Size
                            </label>
                            <input
                              value={styles.fontSize || ""}
                              onChange={(event) =>
                                handleStyleChange(
                                  "fontSize",
                                  event.target.value,
                                )
                              }
                              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-medium text-slate-600">
                              Font Weight
                            </label>
                            <select
                              value={styles.fontWeight || "400"}
                              onChange={(event) =>
                                handleStyleChange(
                                  "fontWeight",
                                  event.target.value,
                                )
                              }
                              className="w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                            >
                              <option value="400">Regular</option>
                              <option value="500">Medium</option>
                              <option value="600">Semi Bold</option>
                              <option value="700">Bold</option>
                            </select>
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-medium text-slate-600">
                              Text Color
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={styles.color || "#334155"}
                                onChange={(event) =>
                                  handleStyleChange(
                                    "color",
                                    event.target.value,
                                  )
                                }
                                className="h-10 w-11 cursor-pointer rounded-lg border border-slate-200 p-1"
                              />
                              <input
                                value={styles.color || ""}
                                onChange={(event) =>
                                  handleStyleChange(
                                    "color",
                                    event.target.value,
                                  )
                                }
                                className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-medium text-slate-600">
                              Background
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={
                                  styles.backgroundColor &&
                                  styles.backgroundColor !== "transparent"
                                    ? styles.backgroundColor
                                    : "#ffffff"
                                }
                                onChange={(event) =>
                                  handleStyleChange(
                                    "backgroundColor",
                                    event.target.value,
                                  )
                                }
                                className="h-10 w-11 cursor-pointer rounded-lg border border-slate-200 p-1"
                              />
                              <input
                                value={styles.backgroundColor || ""}
                                onChange={(event) =>
                                  handleStyleChange(
                                    "backgroundColor",
                                    event.target.value,
                                  )
                                }
                                className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-medium text-slate-600">
                              Text Alignment
                            </label>
                            <select
                              value={styles.textAlign || "left"}
                              onChange={(event) =>
                                handleStyleChange(
                                  "textAlign",
                                  event.target.value,
                                )
                              }
                              className="w-full cursor-pointer rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                            >
                              <option value="left">Left</option>
                              <option value="center">Center</option>
                              <option value="right">Right</option>
                              <option value="justify">Justify</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-5">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Spacing
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                          <input
                            value={styles.padding || ""}
                            onChange={(event) =>
                              handleStyleChange(
                                "padding",
                                event.target.value,
                              )
                            }
                            placeholder="Padding"
                            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                          />

                          <input
                            value={styles.margin || ""}
                            onChange={(event) =>
                              handleStyleChange(
                                "margin",
                                event.target.value,
                              )
                            }
                            placeholder="Margin"
                            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleDeleteSelected}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                        Delete Element
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-700">
                      No element selected
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Select an element on the canvas or from Layers to edit
                      its properties.
                    </p>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>

        {!previewMode && (
          <LayersPanel
            page={page}
            selectedElementId={selectedElementId}
            setSelectedElementId={setSelectedElementId}
            showLayers={showLayers}
            setShowLayers={setShowLayers}
            handleLayerDragStart={handleLayerDragStart}
            handleLayerDrop={handleLayerDrop}
            handleLayerDropOnPage={handleLayerDropOnPage}
            draggedLayerId={draggedLayerId}
            dropTargetLayerId={dropTargetLayerId}
            setDropTargetLayerId={setDropTargetLayerId}
          />
        )}
      </div>

      {showTemplates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-5">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-slate-800">
                  Saved Templates
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Load a previously saved page design.
                </p>
              </div>

              <button
                onClick={() => setShowTemplates(false)}
                className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-5">
              {templates.length ? (
                <div className="space-y-2">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center gap-3 rounded-lg border border-slate-200 p-3"
                    >
                      <LayoutTemplate
                        size={18}
                        className="text-teal-600"
                      />

                      <span className="flex-1 text-sm font-medium text-slate-700">
                        {template.name}
                      </span>

                      <button
                        onClick={() => {
                          loadTemplate(template);
                          setShowTemplates(false);
                        }}
                        className="cursor-pointer rounded-lg bg-teal-50 px-3 py-2 text-xs font-medium text-teal-700 hover:bg-teal-100"
                      >
                        Load
                      </button>

                      <button
                        onClick={() => deleteTemplate(template.id)}
                        className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <LayoutTemplate
                    size={25}
                    className="mx-auto text-slate-300"
                  />
                  <p className="mt-3 text-sm font-medium text-slate-600">
                    No saved templates
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showSaveTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-5">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 className="text-base font-semibold text-slate-800">
                Save Template
              </h2>

              <button
                onClick={() => setShowSaveTemplate(false)}
                className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Template Name
              </label>

              <input
                autoFocus
                value={templateName}
                onChange={(event) => setTemplateName(event.target.value)}
                placeholder="My Landing Page"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
              />

              <button
                onClick={handleSaveTemplate}
                disabled={!templateName.trim()}
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Save size={16} />
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}

      {showExport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-5">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-slate-800">
                  Export Page
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Export HTML, CSS or embed code.
                </p>
              </div>

              <button
                onClick={() => setShowExport(false)}
                className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex border-b border-slate-200 px-5">
              <button
                onClick={() => {
                  setExportFormat("html");
                  setShowEmbedCode(false);
                }}
                className={`cursor-pointer border-b-2 px-4 py-3 text-sm font-medium ${
                  exportFormat === "html" && !showEmbedCode
                    ? "border-teal-600 text-teal-700"
                    : "border-transparent text-slate-500"
                }`}
              >
                HTML
              </button>

              <button
                onClick={() => {
                  setExportFormat("css");
                  setShowEmbedCode(false);
                }}
                className={`cursor-pointer border-b-2 px-4 py-3 text-sm font-medium ${
                  exportFormat === "css" && !showEmbedCode
                    ? "border-teal-600 text-teal-700"
                    : "border-transparent text-slate-500"
                }`}
              >
                CSS
              </button>

              <button
                onClick={() => setShowEmbedCode(true)}
                className={`cursor-pointer border-b-2 px-4 py-3 text-sm font-medium ${
                  showEmbedCode
                    ? "border-teal-600 text-teal-700"
                    : "border-transparent text-slate-500"
                }`}
              >
                Embed
              </button>
            </div>

            <div className="p-5">
              {showEmbedCode ? (
                <div className="space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-600">
                        iframe
                      </p>

                      <button
                        onClick={() =>
                          navigator.clipboard?.writeText(embedHtml)
                        }
                        className="cursor-pointer text-xs font-medium text-teal-600"
                      >
                        Copy
                      </button>
                    </div>

                    <textarea
                      readOnly
                      value={embedHtml}
                      rows={4}
                      className="w-full resize-none rounded-lg border border-slate-200 bg-slate-950 p-3 font-mono text-xs text-slate-100 outline-none"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-600">
                        script
                      </p>

                      <button
                        onClick={() =>
                          navigator.clipboard?.writeText(embedScript)
                        }
                        className="cursor-pointer text-xs font-medium text-teal-600"
                      >
                        Copy
                      </button>
                    </div>

                    <textarea
                      readOnly
                      value={embedScript}
                      rows={8}
                      className="w-full resize-none rounded-lg border border-slate-200 bg-slate-950 p-3 font-mono text-xs text-slate-100 outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCode2 size={17} className="text-teal-600" />
                      <span className="text-sm font-semibold text-slate-700">
                        {exportFormat === "html"
                          ? "HTML Output"
                          : "CSS Output"}
                      </span>
                    </div>

                    <button
                      onClick={
                        exportFormat === "html"
                          ? handleDownloadHtml
                          : handleDownloadCss
                      }
                      className="flex cursor-pointer items-center gap-2 rounded-lg bg-teal-600 px-3 py-2 text-xs font-medium text-white hover:bg-teal-700"
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </div>

                  <textarea
                    readOnly
                    value={
                      exportFormat === "html"
                        ? exportFiles.html
                        : exportFiles.css
                    }
                    rows={16}
                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-950 p-4 font-mono text-xs leading-5 text-slate-100 outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Builder;