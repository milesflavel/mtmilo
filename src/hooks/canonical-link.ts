import { useEffect } from "react";

const useCanonicalLink = (canonicalLink: string) => {
  useEffect(() => {
    const headElement = document.querySelector("head");

    if (!headElement) {
      return;
    }

    const existingLinkElement = headElement.querySelector(
      'link[rel="canonical"]',
    );

    if (existingLinkElement) {
      existingLinkElement.remove();
    }

    if (canonicalLink) {
      const newLinkElement = document.createElement("link");
      newLinkElement.setAttribute("rel", "canonical");
      newLinkElement.setAttribute("href", canonicalLink);

      headElement.appendChild(newLinkElement);
    }
  }, [canonicalLink]);
};

export default useCanonicalLink;
