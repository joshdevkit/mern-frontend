"use client";
import { useEffect } from "react";

interface TitleProps {
  children: string | string[];
  description?: string;
}

const Title = ({ children, description }: TitleProps) => {
  useEffect(() => {
    // Set the document title
    const pageTitle = Array.isArray(children) ? children.join("") : children;
    document.title = pageTitle || "";

    // Set or update the meta description
    if (description) {
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        (metaDescription as HTMLMetaElement).name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }
  }, [children, description]);

  return null;
};

export default Title;
