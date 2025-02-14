import { useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

export const IFrame = ({ children, cssFiles }) => {
  const [contentRef, setContentRef] = useState(null);

  const handleLoad = () => {
    if (!contentRef?.contentWindow) return;
    const iframeHead = contentRef.contentWindow.document.head;
    cssFiles.forEach((cssFile) => {
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.href = cssFile;
      iframeHead.appendChild(linkElement);
    });
  };

  return (
    <iframe
      title="iframe"
      ref={setContentRef}
      onLoad={handleLoad}
      className="w-full h-[calc(100vh-13.6rem)]"
    >
      {contentRef && createPortal(children, contentRef.contentWindow.document.body)}
    </iframe>
  );
};

IFrame.propTypes = {
  children: PropTypes.node.isRequired,
  cssFiles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
