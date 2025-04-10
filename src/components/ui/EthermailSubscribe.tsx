/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    setStyle: () => void;
  }
}

const EthermailSubscribe = () => {
  useEffect(() => {
    window.setStyle = function () {
      const element = document.querySelector("ethermail-subscribe");
      if (element && element.shadowRoot) {
        const style = document.createElement("style");
        style.textContent = `
          .input-web2 {
            color: black !important;
            border-radius: 8px 0 0 8px !important;
            font-size: 16px !important;
            padding: 8px 10px !important;
          }

          .ethermailLogo {
            width: 24px;
            height: 24px;
          }

          .input-web2::placeholder {
            font-size: 14px !important;
          }

          button.subscribe {
            background-color: #C8BAFD !important;
            color: black !important;
            width: fit-content !important;
            border-radius: 0 8px 8px 0 !important;
            padding: 10px 20px !important;
            font-size: 14px !important;
            height: full !important;
            border: 0px !important;
            margin-left: 0px !important;
          }

          .ethermail-md-modal-title{
            font-weight: bold !important;
          }

          .ethermail-md-subscribe-button, .ethermail-cw-connect-button {
            background-color: #C8BAFD !important;
            color: black !important;
            border-radius: 8px !important;
            overflow: hidden !important;
            font-weight: 600 !important;
            border: 1px solid black  !important;
          }

          .ethermail-cw-button-text {
            color: black !important;
            font-weight: 600 !important;
          }

          .ethermail-cw-check-signature h3 {
            font-weight: bold !important;
            color: black !important;
          }

          .md-form-group-label {
            border-color: gray !important;
          }

          .md-form-group-label:focus-within span, .md-form-group-label input:not(:placeholder-shown) + span, .md-form-group-label textarea:not(:placeholder-shown) + span {
            color: black !important;
          }
        `;
        element.shadowRoot.appendChild(style);
      }
    };
  }, []);

  useEffect(() => {
    (function ({ ...args }) {
      if (!document.getElementById("ethermail-sdk-script")) {
        const p = document.createElement("script");
        p.id = "ethermail-sdk-script";
        p.src = "https://cdn-email.ethermail.io/sdk/v2/ethermail.js";
        document.body.appendChild(p);
        p.setAttribute("a", args.afid);
        p.setAttribute("b", args.communityAlias);
        p.setAttribute("c", args.features);
      }
    })({
      afid: "67353ab1f14dc512c8f225ef",
      communityAlias: "si3",
      features: ["subscribe"],
    });

    const addCustomContent = () => {
      const targetDiv = document.getElementById(
        "ethermail-md-success-modal-content",
      );

      if (targetDiv) {
        if (!document.getElementById("custom-modal-content")) {
          const newDiv = document.createElement("div");
          newDiv.id = "custom-modal-content";
          newDiv.innerHTML = `
            <div id="subscription-footer">
              <svg class="subscribe-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM20 6L12 11L4 6V18H20V6ZM4 6V6.01V6Z" fill="white"/>
              </svg>
              <p class="subscribe-text">Thanks for Subscribing.</p>
              <span class="subscribe-emoji">🙌</span>
            </div>`;
          targetDiv.appendChild(newDiv);
        }
      }
    };

    if (!document.getElementById("custom-modal-styles")) {
      const styleTag = document.createElement("style");
      styleTag.id = "custom-modal-styles";
      styleTag.textContent = `
        #subscription-footer {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #A060FC;
          color: white;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 999px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          font-weight: bold;
          transition: opacity 0.5s ease-in-out;
        }
        .subscribe-icon {
          width: 24px;
          height: 24px;
          fill: white;
        }
        .subscribe-emoji {
          font-size: 18px;
        }
        .subscribe-text {
          font-size: 14px;
          margin: 0;
        }
      `;
      document.head.appendChild(styleTag);
    }

    addCustomContent();

    const observer = new MutationObserver(() => addCustomContent());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex w-full max-w-md items-center overflow-hidden">
      <ethermail-subscribe
        widget="677f0f8f690e56d4d9800180"
        theme="light"
        on-mounted="setStyle"
        input="auto"
        wallet-connect-project-id="82b9193221afcff90a3e7b1d94e67505"
        rpc='{"http": "https://eth-mainnet.g.alchemy.com/v2/xrSkES28Vk2dzciw2ufA7ZE-UNjmnwpK"}'
      ></ethermail-subscribe>
    </div>
  );
};

export default EthermailSubscribe;
