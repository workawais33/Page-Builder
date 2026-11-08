import { useState } from "react";
import { initialPage } from "../data/initialPage";
import { componentDefaults } from "../data/componentDefaults";

function createElement(type) {
  const defaults = componentDefaults[type];

  if (!defaults) {
    return null;
  }

  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...structuredClone(defaults),
  };
}

function createPreparedElement(element) {
  if (!element) {
    return null;
  }

  return {
    ...structuredClone(element),
    id:
      element.id ||
      `element-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  };
}

function findElement(elements, elementId) {
  for (const element of elements) {
    if (element.id === elementId) {
      return element;
    }

    if (element.children?.length) {
      const foundElement = findElement(element.children, elementId);

      if (foundElement) {
        return foundElement;
      }
    }
  }

  return null;
}

function containsElement(element, elementId) {
  if (!element?.children?.length) {
    return false;
  }

  return element.children.some(
    (child) =>
      child.id === elementId || containsElement(child, elementId),
  );
}

function removeElement(elements, elementId) {
  let removedElement = null;

  const nextElements = [];

  for (const element of elements) {
    if (element.id === elementId) {
      removedElement = element;
      continue;
    }

    if (element.children?.length) {
      const result = removeElement(element.children, elementId);

      if (result.removedElement) {
        removedElement = result.removedElement;

        nextElements.push({
          ...element,
          children: result.elements,
        });

        continue;
      }
    }

    nextElements.push(element);
  }

  return {
    elements: nextElements,
    removedElement,
  };
}

function insertElement(elements, parentId, element, index = null) {
  if (!parentId) {
    const nextElements = [...elements];

    if (typeof index === "number") {
      const safeIndex = Math.max(
        0,
        Math.min(index, nextElements.length),
      );

      nextElements.splice(safeIndex, 0, element);
    } else {
      nextElements.push(element);
    }

    return {
      elements: nextElements,
      inserted: true,
    };
  }

  let inserted = false;

  const nextElements = elements.map((currentElement) => {
    if (
      currentElement.id === parentId &&
      currentElement.type === "container"
    ) {
      const children = [...(currentElement.children || [])];

      if (typeof index === "number") {
        const safeIndex = Math.max(
          0,
          Math.min(index, children.length),
        );

        children.splice(safeIndex, 0, element);
      } else {
        children.push(element);
      }

      inserted = true;

      return {
        ...currentElement,
        children,
      };
    }

    if (currentElement.children?.length && !inserted) {
      const result = insertElement(
        currentElement.children,
        parentId,
        element,
        index,
      );

      if (result.inserted) {
        inserted = true;

        return {
          ...currentElement,
          children: result.elements,
        };
      }
    }

    return currentElement;
  });

  return {
    elements: nextElements,
    inserted,
  };
}

function updateElements(elements, elementId, updates) {
  return elements.map((element) => {
    if (element.id === elementId) {
      return {
        ...element,
        ...updates,
      };
    }

    if (element.children?.length) {
      return {
        ...element,
        children: updateElements(element.children, elementId, updates),
      };
    }

    return element;
  });
}

function findParentInfo(elements, elementId, parentId = null) {
  for (let index = 0; index < elements.length; index += 1) {
    const element = elements[index];

    if (element.id === elementId) {
      return {
        parentId,
        index,
        parentType: parentId
          ? findElement(elements, parentId)?.type || null
          : null,
      };
    }

    if (element.children?.length) {
      const result = findParentInfo(
        element.children,
        elementId,
        element.id,
      );

      if (result) {
        return result;
      }
    }
  }

  return null;
}

function useBuilderState() {
  const [history, setHistory] = useState(() => ({
    past: [],
    present: structuredClone(initialPage),
    future: [],
  }));

  const [selectedElementId, setSelectedElementId] = useState(null);
  const [templates, setTemplates] = useState([]);

  const page = history.present;

  const commitPage = (nextPage) => {
    setHistory((currentHistory) => ({
      past: [
        ...currentHistory.past,
        structuredClone(currentHistory.present),
      ],
      present: structuredClone(nextPage),
      future: [],
    }));
  };

  const addElement = (type, parentId = null, index = null) => {
    const newElement = createElement(type);

    if (!newElement) {
      return null;
    }

    let insertedElement = null;

    setHistory((currentHistory) => {
      const result = insertElement(
        currentHistory.present.children,
        parentId,
        newElement,
        index,
      );

      if (!result.inserted) {
        return currentHistory;
      }

      insertedElement = newElement;

      return {
        past: [
          ...currentHistory.past,
          structuredClone(currentHistory.present),
        ],
        present: {
          ...structuredClone(currentHistory.present),
          children: result.elements,
        },
        future: [],
      };
    });

    if (insertedElement) {
      setSelectedElementId(insertedElement.id);
    }

    return insertedElement;
  };

  const addPreparedElement = (
    element,
    parentId = null,
    index = null,
  ) => {
    const preparedElement = createPreparedElement(element);

    if (!preparedElement) {
      return null;
    }

    let insertedElement = null;

    setHistory((currentHistory) => {
      const result = insertElement(
        currentHistory.present.children,
        parentId,
        preparedElement,
        index,
      );

      if (!result.inserted) {
        return currentHistory;
      }

      insertedElement = preparedElement;

      return {
        past: [
          ...currentHistory.past,
          structuredClone(currentHistory.present),
        ],
        present: {
          ...structuredClone(currentHistory.present),
          children: result.elements,
        },
        future: [],
      };
    });

    if (insertedElement) {
      setSelectedElementId(insertedElement.id);
    }

    return insertedElement;
  };

  const getElementById = (elementId) => {
    return findElement(page.children, elementId);
  };

  const getParentInfo = (elementId) => {
    return findParentInfo(page.children, elementId);
  };

  const updateElement = (elementId, updates) => {
    setHistory((currentHistory) => {
      const existingElement = findElement(
        currentHistory.present.children,
        elementId,
      );

      if (!existingElement) {
        return currentHistory;
      }

      const nextPage = {
        ...structuredClone(currentHistory.present),
        children: updateElements(
          currentHistory.present.children,
          elementId,
          updates,
        ),
      };

      return {
        past: [
          ...currentHistory.past,
          structuredClone(currentHistory.present),
        ],
        present: nextPage,
        future: [],
      };
    });
  };

  const deleteElement = (elementId) => {
    let wasDeleted = false;

    setHistory((currentHistory) => {
      const result = removeElement(
        currentHistory.present.children,
        elementId,
      );

      if (!result.removedElement) {
        return currentHistory;
      }

      wasDeleted = true;

      return {
        past: [
          ...currentHistory.past,
          structuredClone(currentHistory.present),
        ],
        present: {
          ...structuredClone(currentHistory.present),
          children: result.elements,
        },
        future: [],
      };
    });

    if (wasDeleted) {
      setSelectedElementId((currentId) =>
        currentId === elementId ? null : currentId,
      );
    }
  };

  const moveElement = (
    elementId,
    parentId = null,
    index = null,
  ) => {
    setHistory((currentHistory) => {
      const currentPage = currentHistory.present;
      const element = findElement(
        currentPage.children,
        elementId,
      );

      if (!element) {
        return currentHistory;
      }

      if (parentId === elementId) {
        return currentHistory;
      }

      if (parentId && containsElement(element, parentId)) {
        return currentHistory;
      }

      if (parentId) {
        const targetParent = findElement(
          currentPage.children,
          parentId,
        );

        if (!targetParent || targetParent.type !== "container") {
          return currentHistory;
        }
      }

      const sourceInfo = findParentInfo(
        currentPage.children,
        elementId,
      );

      if (!sourceInfo) {
        return currentHistory;
      }

      if (
        sourceInfo.parentId === parentId &&
        typeof index === "number" &&
        sourceInfo.index === index
      ) {
        return currentHistory;
      }

      const removalResult = removeElement(
        currentPage.children,
        elementId,
      );

      if (!removalResult.removedElement) {
        return currentHistory;
      }

      let targetIndex = index;

      if (
        sourceInfo.parentId === parentId &&
        typeof targetIndex === "number" &&
        sourceInfo.index < targetIndex
      ) {
        targetIndex -= 1;
      }

      const insertionResult = insertElement(
        removalResult.elements,
        parentId,
        removalResult.removedElement,
        targetIndex,
      );

      if (!insertionResult.inserted) {
        return currentHistory;
      }

      return {
        past: [
          ...currentHistory.past,
          structuredClone(currentPage),
        ],
        present: {
          ...structuredClone(currentPage),
          children: insertionResult.elements,
        },
        future: [],
      };
    });

    setSelectedElementId(elementId);
  };

  const reorderElement = (
    elementId,
    targetParentId = null,
    targetIndex = 0,
  ) => {
    moveElement(
      elementId,
      targetParentId,
      targetIndex,
    );
  };

  const undo = () => {
    setHistory((currentHistory) => {
      if (!currentHistory.past.length) {
        return currentHistory;
      }

      const previousPage =
        currentHistory.past[currentHistory.past.length - 1];

      return {
        past: currentHistory.past.slice(0, -1),
        present: structuredClone(previousPage),
        future: [
          structuredClone(currentHistory.present),
          ...currentHistory.future,
        ],
      };
    });
  };

  const redo = () => {
    setHistory((currentHistory) => {
      if (!currentHistory.future.length) {
        return currentHistory;
      }

      const nextPage = currentHistory.future[0];

      return {
        past: [
          ...currentHistory.past,
          structuredClone(currentHistory.present),
        ],
        present: structuredClone(nextPage),
        future: currentHistory.future.slice(1),
      };
    });
  };

  const saveTemplate = (name) => {
    const trimmedName = name?.trim();

    if (!trimmedName) {
      return null;
    }

    const template = {
      id: `template-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
      name: trimmedName,
      page: structuredClone(page),
      createdAt: new Date().toISOString(),
    };

    setTemplates((currentTemplates) => [
      ...currentTemplates,
      template,
    ]);

    return template;
  };

  const loadTemplate = (template) => {
    if (!template?.page) {
      return;
    }

    const nextPage = structuredClone(template.page);

    commitPage(nextPage);
    setSelectedElementId(null);
  };

  const deleteTemplate = (templateId) => {
    setTemplates((currentTemplates) =>
      currentTemplates.filter(
        (template) => template.id !== templateId,
      ),
    );
  };

  const resetPage = () => {
    commitPage(structuredClone(initialPage));
    setSelectedElementId(null);
  };

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  return {
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
    reorderElement,
    undo,
    redo,
    canUndo,
    canRedo,
    past: history.past,
    future: history.future,
    templates,
    saveTemplate,
    loadTemplate,
    deleteTemplate,
    resetPage,
  };
}

export default useBuilderState;
