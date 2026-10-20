import { useRef, useState } from "react";
import { ArrowUpRight, Flower2, Heart, Sparkles } from "lucide-react";
import { assetUrl } from "../config/greeting.js";
import VioletBackground from "./VioletBackground.jsx";

export default function LandingScreen({
  recipient,
  heroImage,
  backgroundImage,
  onExplore,
}) {
  const art = useRef(null);
  const [imageError, setImageError] = useState(false);
  function moveGarden(event) {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)")
        .matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    art.current?.style.setProperty(
      "--parallax-x",
      `${((event.clientX - rect.left) / rect.width - 0.5) * 12}px`,
    );
    art.current?.style.setProperty(
      "--parallax-y",
      `${((event.clientY - rect.top) / rect.height - 0.5) * 8}px`,
    );
  }
  function resetGarden() {
    art.current?.style.setProperty("--parallax-x", "0px");
    art.current?.style.setProperty("--parallax-y", "0px");
  }
  return (
    <section
      id="dau-trang"
      className="landing"
      aria-labelledby="hero-title"
      onPointerMove={moveGarden}
      onPointerLeave={resetGarden}
    >
      <VioletBackground image={backgroundImage} />
      <div className="hero-copy">
        <div className="hero-eyebrow">
          <span /> NGÀY PHỤ NỮ VIỆT NAM{" "}
          <span className="eyebrow-year">20.10</span>
        </div>
        <h1 id="hero-title">
          Dành cho những
          <br />
          <em>bông hoa</em>
          <br />
          tuyệt vời nhất.
        </h1>
        <p className="hero-description">
          Chúc mừng ngày Phụ nữ Việt Nam 20/10.
          <br />
          Gửi ngàn yêu thương đến{" "}
          {recipient === "bạn" ? "những bông hoa tuyệt vời nhất" : recipient} —
          <br className="desktop-br" /> những người làm thế giới này dịu dàng
          hơn.
        </p>
        <button type="button" className="primary-button" onClick={onExplore}>
          Khám phá khu vườn <ArrowUpRight size={18} strokeWidth={1.5} />
        </button>
        <div className="hero-footnote">
          <span className="tiny-flower">
            <Flower2 size={18} strokeWidth={1.25} />
          </span>
          <span>Một khu vườn nhỏ. Ngàn điều yêu thương.</span>
        </div>
      </div>
      <div className="hero-visual" ref={art}>
        <div className="arch-outline" />
        <div
          className={`hero-image-frame ${imageError ? "image-fallback" : ""}`}
        >
          {!imageError && (
            <img
              className="hero-image"
              src={assetUrl(heroImage)}
              alt="Vườn hoa violet tím dịu dàng chuyển động trong nắng sớm"
              width="1536"
              height="1024"
              fetchPriority="high"
              onError={() => setImageError(true)}
            />
          )}
          {imageError && (
            <div
              className="fallback-botanical"
              aria-label="Khu vườn hoa minh họa"
            >
              <Flower2 size={145} strokeWidth={0.65} />
              <Flower2 size={105} strokeWidth={0.65} />
              <Flower2 size={125} strokeWidth={0.65} />
            </div>
          )}
          <div className="hero-glow" />
          <span className="firefly firefly-one" />
          <span className="firefly firefly-two" />
          <span className="firefly firefly-three" />
        </div>
        <div className="date-stamp">
          <span>HAPPY</span>
          <strong>
            20<span>/</span>10
          </strong>
          <span>VIETNAMESE WOMEN’S DAY</span>
          <Flower2 size={22} strokeWidth={1} />
        </div>
        <div className="floating-note">
          <span>
            <Heart size={17} strokeWidth={1.3} />
          </span>
          <div>
            Bạn xứng đáng<em>được yêu thương.</em>
          </div>
        </div>
        <div className="hero-caption">
          <span>THE GARDEN OF HAPPINESS</span>
          <Sparkles size={14} strokeWidth={1} />
        </div>
        <svg className="hero-sprig" viewBox="0 0 100 180" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="1.1">
            <path d="M45 174Q69 85 43 5M49 143Q0 116 11 91Q44 97 49 143M53 112Q98 80 88 62Q60 68 53 112M52 78Q18 55 23 34Q48 40 52 78M48 45Q70 20 63 6Q43 22 48 45" />
          </g>
        </svg>
      </div>
      <span className="hero-side-label" aria-hidden="true">
        A LITTLE LOVE, JUST FOR YOU
      </span>
    </section>
  );
}
