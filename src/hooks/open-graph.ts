import { useEffect, useState } from "react";

interface OpenGraphValues {
  title?: string;
  type?: string;
  url?: string;
  image?: string;
  description?: string;
  articlePublished?: string;
  articleModified?: string;
}

const useOpenGraph = (initialValues: OpenGraphValues) => {
  const [openGraph, setOpenGraph] = useState(initialValues);

  useEffect(() => {
    const headElement = document.querySelector("head");

    if (!headElement) {
      return;
    }

    setMetaElement(headElement, "og:title", openGraph.title);
    setMetaElement(headElement, "og:type", openGraph.type);
    setMetaElement(headElement, "og:url", openGraph.url);
    setMetaElement(headElement, "og:image", openGraph.image);
    setMetaElement(headElement, "og:description", openGraph.description);
    setMetaElement(
      headElement,
      "article:published_time",
      openGraph.articlePublished,
    );
    setMetaElement(
      headElement,
      "article:modified_time",
      openGraph.articleModified,
    );
  }, [openGraph]);

  return setOpenGraph;
};

const setMetaElement = (
  headElement: HTMLHeadElement,
  property: string,
  content?: string,
) => {
  const existingMetaElement = headElement.querySelector(
    `meta[property="${property}"]`,
  );

  if (existingMetaElement) {
    existingMetaElement.remove();
  }

  if (content) {
    const newMetaElement = document.createElement("meta");
    newMetaElement.setAttribute("property", property);
    newMetaElement.setAttribute("content", content);

    headElement.appendChild(newMetaElement);
  }
};

export default useOpenGraph;
