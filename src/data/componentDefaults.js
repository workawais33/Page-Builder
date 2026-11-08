export const componentDefaults = {
  text: {
    type: "text",
    content: "Your text here",
    visibility: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    styles: {
      fontSize: "16px",
      color: "#1e293b",
      padding: "0px",
      margin: "0px",
      textAlign: "left",
    },
  },

  image: {
    type: "image",
    src: "https://placehold.co/600x400",
    alt: "Image",
    visibility: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    styles: {
      width: "100%",
      height: "auto",
      padding: "0px",
      margin: "0px",
    },
  },

  button: {
    type: "button",
    label: "Get Started",
    link: "#",
    visibility: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    styles: {
      fontSize: "16px",
      color: "#ffffff",
      backgroundColor: "#0d9488",
      padding: "12px 20px",
      margin: "0px",
      textAlign: "center",
    },
  },

  input: {
    type: "input",
    placeholder: "Enter your text",
    visibility: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    styles: {
      fontSize: "16px",
      color: "#1e293b",
      backgroundColor: "#ffffff",
      padding: "10px 12px",
      margin: "0px",
    },
  },

  container: {
    type: "container",
    layout: "column",
    visibility: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    styles: {
      width: "100%",
      padding: "20px",
      margin: "0px",
      gap: "16px",
    },
    children: [],
  },

  video: {
    type: "video",
    provider: "youtube",
    url: "",
    visibility: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    styles: {
      width: "100%",
      height: "400px",
      margin: "0px",
    },
  },

  tabs: {
    type: "tabs",
    items: [
      {
        id: "tab-1",
        label: "Tab 1",
        content: "Tab content",
      },
    ],
    visibility: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    styles: {
      margin: "0px",
      padding: "0px",
    },
  },

  accordion: {
    type: "accordion",
    items: [
      {
        id: "accordion-1",
        title: "Accordion Item",
        content: "Accordion content",
      },
    ],
    visibility: {
      desktop: true,
      tablet: true,
      mobile: true,
    },
    styles: {
      margin: "0px",
      padding: "0px",
    },
  },
};
