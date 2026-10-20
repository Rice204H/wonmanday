import { useState } from "react";
import { assetUrl } from "../config/greeting.js";

function VioletStem({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 130 230"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`violet-${className}`}>
          <stop stopColor="#c6afe1" />
          <stop offset="1" stopColor="#8563ac" />
        </radialGradient>
      </defs>
      <path
        d="M65 230Q55 157 65 73M63 196Q33 175 23 146M62 166Q89 146 99 117"
        stroke="#7c9470"
        strokeWidth="2"
      />
      <path
        d="M52 187Q12 189 17 153Q44 149 52 187M66 160Q111 160 108 125Q82 123 66 160"
        fill="#9eaf8b"
        fillOpacity=".8"
      />
      <g fill={`url(#violet-${className})`}>
        <path d="M65 69C42 69 31 52 36 40C43 26 61 34 65 53C58 28 70 14 81 22C93 30 82 51 71 59C88 40 107 44 105 58C103 73 85 76 73 71C99 74 100 93 85 98C72 102 64 83 64 76C61 97 40 104 33 89C27 76 49 66 65 69Z" />
      </g>
      <path d="M61 67L66 61L71 67L67 73Z" fill="#e5cf89" />
      <path
        d="M64 65L48 49M66 64L78 36M70 68L94 57M68 72L82 87M62 72L44 87"
        stroke="#71508d"
        strokeOpacity=".5"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export default function VioletBackground({ image }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="violet-background" aria-hidden="true">
      {!failed && (
        <img
          src={assetUrl(image)}
          className="violet-background-image"
          alt=""
          width="1536"
          height="1024"
          onError={() => setFailed(true)}
        />
      )}
      <div className="violet-background-wash" />
      <VioletStem className="violet-stem-left" />
      <VioletStem className="violet-stem-right" />
    </div>
  );
}
