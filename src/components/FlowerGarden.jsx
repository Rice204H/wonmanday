import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import "../styles/garden.css";
import { assetUrl } from "../config/greeting.js";

const flowers = [
  {
    kind: "violet",
    name: "Hoa violet",
    meaning: "Một tình thương bền lâu",
    wish: "Mong bạn luôn được nâng niu bằng một tình thương dịu dàng và thủy chung. Như sắc violet nhỏ xinh, vẻ đẹp của bạn vẫn lặng lẽ tỏa sáng theo cách riêng mình.",
  },
  {
    kind: "tulip",
    name: "Tulip",
    meaning: "Một niềm vui mới",
    wish: "Chúc những ngày phía trước của bạn đầy nắng ấm, những điều mới mẻ và thật nhiều lý do để mỉm cười. Cứ nở rộ theo cách của riêng bạn nhé.",
  },
  {
    kind: "daisy",
    name: "Cúc họa mi",
    meaning: "Một khoảng bình yên",
    wish: "Chúc bạn có một trái tim an yên, một giấc ngủ thật ngon và những ngày bình thường cũng hóa đáng yêu. Bạn xứng đáng với mọi điều tốt đẹp.",
  },
];

function FlowerArt({ kind }) {
  const uniqueId = useId().replace(/:/g, "");
  const leafId = `${uniqueId}-leaf`;
  const violetId = `${uniqueId}-violet`;
  const violetLeafId = `${uniqueId}-violet-leaf`;
  const tulipId = `${uniqueId}-tulip`;
  const daisyId = `${uniqueId}-daisy`;

  return (
    <svg
      className={`garden-flower garden-flower--${kind}`}
      viewBox="0 0 280 330"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <path id={leafId} d="M0 0C-23-2-48-24-47-49C-20-49 3-28 0 0Z" />
        <path
          id={violetLeafId}
          d="M0 0C-17-9-44-18-43-37C-42-56-19-59-11-43C-6-61 20-60 26-41C33-20 13-7 0 0Z"
        />
        <radialGradient id={violetId} cx=".52" cy=".7" r=".8">
          <stop stopColor="#b7a1d4" />
          <stop offset=".55" stopColor="#8d74b6" />
          <stop offset="1" stopColor="#6e5495" />
        </radialGradient>
        <linearGradient
          id={tulipId}
          x1="105"
          y1="65"
          x2="169"
          y2="160"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f0c6bd" />
          <stop offset="1" stopColor="#c7828c" />
        </linearGradient>
        <radialGradient id={daisyId}>
          <stop stopColor="#dbb667" />
          <stop offset="1" stopColor="#b58e48" />
        </radialGradient>
      </defs>

      {kind === "violet" && (
        <g className="garden-plant garden-plant--violet">
          <path
            d="M140 287C148 242 126 182 141 121M138 226C157 211 176 191 181 165"
            stroke="#74866f"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M139 255C123 243 112 232 107 219"
            stroke="#839477"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <use
            href={`#${violetLeafId}`}
            transform="translate(130 243) rotate(-39) scale(.85 .79)"
            fill="#92a184"
          />
          <use
            href={`#${violetLeafId}`}
            transform="translate(146 258) rotate(87) scale(.88 .85)"
            fill="#758b70"
          />
          <path
            d="M126 237C114 226 105 216 103 208M149 251C162 237 174 226 180 214"
            stroke="#c0c8a8"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M117 228L101 224M113 222L117 208M160 239L177 236M165 234L162 220"
            stroke="#bac4a7"
            strokeWidth=".6"
            strokeLinecap="round"
          />
          <g transform="translate(181 161) rotate(25)">
            <path d="M-8 0C-18-14-5-28 6-21C20-13 11 3 0 7Z" fill="#9d88be" />
            <path
              d="M-8-13C-3-6 2-2 5 1"
              stroke="#c8b8dd"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path d="M-9-1L-7 8L1 10L10 0L2 4L-2-3L-3 4Z" fill="#839575" />
          </g>
          <g className="garden-flower-head garden-violet-head">
            <path
              d="M142 120C124 119 103 97 109 79C115 61 133 72 139 89C143 101 143 111 142 120Z"
              fill={`url(#${violetId})`}
            />
            <path
              d="M143 120C138 101 142 73 158 69C175 65 178 85 166 102C159 112 150 117 143 120Z"
              fill="#9175b7"
            />
            <path
              d="M142 121C123 103 99 99 92 112C84 129 108 140 126 132C134 129 139 126 142 121Z"
              fill="#a38bc3"
            />
            <path
              d="M143 121C156 104 182 98 190 110C202 127 181 141 164 134C153 130 148 126 143 121Z"
              fill="#8870ad"
            />
            <path
              d="M142 120C128 124 112 137 119 152C125 169 148 167 158 155C170 141 156 126 142 120Z"
              fill={`url(#${violetId})`}
            />
            <path
              d="M138 110C130 99 120 87 116 79M147 111C153 98 159 84 160 77M131 121C118 117 106 114 99 116M154 122C168 117 178 114 184 115M139 132C133 142 129 149 131 156M146 133C151 144 150 152 145 159"
              stroke="#614582"
              strokeWidth=".8"
              strokeOpacity=".5"
              strokeLinecap="round"
            />
            <path
              d="M134 125C133 136 138 146 142 149C149 143 153 133 149 125Z"
              fill="#eee6cf"
            />
            <path
              d="M137 129L139 139M142 128L143 143M147 129L146 139"
              stroke="#8e6bab"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d="M134 122C136 114 148 114 152 122C146 126 139 126 134 122Z"
              fill="#e8d19a"
            />
            <path
              d="M140 120C142 118 146 119 147 122"
              stroke="#fff2c9"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M111 91C114 84 119 84 123 88M151 83C154 77 160 75 164 78M98 121C104 127 113 129 121 126M126 151C131 158 139 160 145 156"
              stroke="#d2c3e3"
              strokeWidth="1.1"
              strokeOpacity=".65"
              strokeLinecap="round"
            />
          </g>
        </g>
      )}

      {kind === "tulip" && (
        <g className="garden-plant garden-plant--tulip">
          <path
            d="M139 288C134 238 147 191 141 149"
            stroke="#72876a"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          <path
            d="M138 267C109 247 95 209 101 172C126 194 137 227 138 267Z"
            fill="#8c9c78"
          />
          <path
            d="M142 253C143 219 159 184 183 168C186 207 166 239 142 253Z"
            fill="#748b69"
          />
          <path
            d="M137 261C126 226 117 204 105 181M145 244C160 219 171 197 179 179"
            stroke="#acb397"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path d="M140 161L130 145L153 143L145 163" fill="#71866a" />
          <g className="garden-flower-head garden-tulip-head">
            <path
              d="M107 81C121 64 136 62 142 60C154 67 167 69 178 86C184 120 172 152 143 157C111 151 101 118 107 81Z"
              fill={`url(#${tulipId})`}
            />
            <path
              d="M142 60C127 77 120 104 127 126C136 144 144 151 146 155C165 139 173 113 166 89C157 75 149 66 142 60Z"
              fill="#e7b0ad"
            />
            <path
              d="M106 81C120 91 128 112 132 127C138 142 144 150 146 156C119 155 101 133 103 108C103 95 105 88 106 81Z"
              fill="#d6939d"
            />
            <path
              d="M179 82C160 93 149 113 147 136L144 156C168 154 181 134 182 110C183 99 181 88 179 82Z"
              fill="#c37e8d"
            />
            <path
              d="M110 91C111 118 121 141 138 150M173 94C161 109 153 126 150 143M141 69C134 82 130 95 131 108"
              stroke="#f3cec2"
              strokeWidth="1.2"
              strokeOpacity=".65"
              strokeLinecap="round"
            />
          </g>
        </g>
      )}

      {kind === "daisy" && (
        <g className="garden-plant garden-plant--daisy">
          <path
            d="M139 287C147 246 133 192 142 132M141 220C158 206 174 191 184 164"
            stroke="#819174"
            strokeWidth="2.7"
            strokeLinecap="round"
          />
          <use
            href={`#${leafId}`}
            transform="translate(141 248) rotate(91) scale(.7 .63)"
            fill="#8e9d7b"
          />
          <use
            href={`#${leafId}`}
            transform="translate(138 215) rotate(-12) scale(.69 .52)"
            fill="#a1ac8c"
          />
          <path
            d="M137 239L121 219M148 241L170 222"
            stroke="#7d906f"
            strokeWidth=".8"
          />
          <g transform="translate(184 161) rotate(23)">
            <path d="M-10-3C-10-19 10-20 11-4C10 9-7 10-10-3Z" fill="#d5d6bc" />
            <path d="M-11-6L-7 7L0 9L7 7L12-5L3 1L-1-7L-3 1Z" fill="#8e9e7c" />
          </g>
          <g className="garden-flower-head garden-daisy-head">
            {Array.from({ length: 13 }, (_, index) => (
              <path
                key={index}
                d="M139 113C126 100 125 74 137 69C150 67 155 95 144 113Z"
                transform={`rotate(${index * (360 / 13)} 141 120)`}
                fill={index % 2 ? "#f5eee0" : "#fffcf2"}
                stroke="#dcd9c7"
                strokeWidth=".9"
              />
            ))}
            <circle cx="141" cy="120" r="18" fill={`url(#${daisyId})`} />
            <circle
              cx="141"
              cy="120"
              r="14"
              stroke="#e7ca84"
              strokeWidth="1"
              strokeDasharray="1 4"
            />
            <circle
              cx="141"
              cy="120"
              r="9"
              stroke="#f1d995"
              strokeWidth="1.3"
              strokeDasharray="1 4"
            />
            <circle cx="141" cy="120" r="4" fill="#d3aa59" />
          </g>
        </g>
      )}
    </svg>
  );
}

function ConfigurableFlower({ kind, image }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [image]);
  return image && !failed ? (
    <img
      className="garden-custom-flower"
      src={assetUrl(image)}
      alt=""
      loading="lazy"
      width="280"
      height="330"
      onError={() => setFailed(true)}
    />
  ) : (
    <FlowerArt kind={kind} />
  );
}

export default function FlowerGarden({ images = {} }) {
  const [selectedFlower, setSelectedFlower] = useState(null);
  const flowerButtons = useRef([]);
  const gardenId = useId().replace(/:/g, "");

  const closeWish = () => {
    flowerButtons.current[selectedFlower]?.focus();
    setSelectedFlower(null);
  };

  useEffect(() => {
    if (selectedFlower === null) return undefined;

    const handleEscape = (event) => {
      if (event.key !== "Escape") return;
      flowerButtons.current[selectedFlower]?.focus();
      setSelectedFlower(null);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedFlower]);

  return (
    <section
      className="flower-garden"
      id="khu-vuon"
      aria-labelledby={`${gardenId}-title`}
    >
      <div className="garden-inner">
        <header className="garden-intro">
          <span className="garden-eyebrow">NHỮNG ĐIỀU DỊU DÀNG</span>
          <h2 id={`${gardenId}-title`}>
            Mỗi bông hoa, <em>một lời thương.</em>
          </h2>
          <p>Chạm vào một bông hoa để nhận điều bất ngờ dành cho bạn.</p>
        </header>

        <div className="garden-specimens">
          {flowers.map((flower, index) => {
            const isSelected = selectedFlower === index;
            const wishId = `${gardenId}-wish-${flower.kind}`;

            return (
              <article
                className={`garden-specimen${isSelected ? " is-selected" : ""}`}
                key={flower.kind}
              >
                <button
                  ref={(button) => {
                    flowerButtons.current[index] = button;
                  }}
                  className="garden-flower-button"
                  type="button"
                  aria-label={`Nhận lời chúc từ ${flower.name.toLowerCase()}`}
                  aria-expanded={isSelected}
                  aria-controls={wishId}
                  onClick={() => setSelectedFlower(isSelected ? null : index)}
                >
                  <div className="garden-artwork">
                    <ConfigurableFlower
                      kind={flower.kind}
                      image={images[flower.kind]}
                    />
                  </div>
                  <span className="garden-specimen-caption">
                    <span className="garden-flower-number">0{index + 1}</span>
                    <span className="garden-flower-details">
                      <span className="garden-flower-name">{flower.name}</span>
                      <span className="garden-flower-meaning">
                        {flower.meaning}
                      </span>
                    </span>
                    <span className="garden-flower-arrow">
                      <ArrowUpRight size={18} strokeWidth={1.4} />
                    </span>
                  </span>
                </button>
                <div
                  id={wishId}
                  className="garden-wish-region"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {isSelected && (
                    <div className="garden-wish">
                      <button
                        className="garden-wish-close"
                        type="button"
                        aria-label="Đóng lời chúc"
                        onClick={closeWish}
                      >
                        <X size={15} strokeWidth={1.5} />
                      </button>
                      <span className="garden-wish-label">
                        GỬI BẠN MỘT LỜI THƯƠNG
                      </span>
                      <p>{flower.wish}</p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <p className="garden-footnote">
          <span aria-hidden="true" /> Một khu vườn nhỏ, dành riêng cho bạn{" "}
          <span aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
