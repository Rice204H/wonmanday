import { useEffect, useRef, useState } from "react";
import {
  Flower2,
  ArrowUpRight,
  Sparkles,
  Pause,
} from "lucide-react";
import LandingScreen from "./components/LandingScreen.jsx";
import FlowerGarden from "./components/FlowerGarden.jsx";
import GreetingCard from "./components/GreetingCard.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import FallingPetals from "./components/FallingPetals.jsx";
import { greeting, getRecipient } from "./config/greeting.js";

const screens = [
  { id: "dau-trang", title: "Chào mừng" },
  { id: "khu-vuon", title: "Khu vườn" },
  { id: "loi-chuc", title: "Thiệp yêu thương" },
  { id: "loi-nhan", title: "Lời nhắn cuối" },
];

function screenFromLocation() {
  const index = screens.findIndex(
    (screen) => `#${screen.id}` === window.location.hash,
  );
  return index < 0 ? 0 : index;
}

export default function App() {
  const [motionPaused, setMotionPaused] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(screenFromLocation);
  const mainRef = useRef(null);
  const previousScreen = useRef(currentScreen);
  const recipient = getRecipient();
  const theme = Object.fromEntries(
    Object.entries(greeting.colors).map(([key, value]) => [`--${key}`, value]),
  );

  useEffect(() => {
    const onHistoryChange = () => setCurrentScreen(screenFromLocation());
    window.addEventListener("popstate", onHistoryChange);
    window.addEventListener("hashchange", onHistoryChange);
    return () => {
      window.removeEventListener("popstate", onHistoryChange);
      window.removeEventListener("hashchange", onHistoryChange);
    };
  }, []);

  useEffect(() => {
    if (previousScreen.current !== currentScreen) {
      mainRef.current?.focus({ preventScroll: true });
      previousScreen.current = currentScreen;
    }
  }, [currentScreen]);

  function goToScreen(index) {
    if (index === currentScreen || index < 0 || index >= screens.length) return;
    const url = new URL(window.location.href);
    url.hash = screens[index].id;
    window.history.pushState(null, "", url);
    setCurrentScreen(index);
  }

  return (
    <div
      className={`site journey-site${motionPaused ? " motion-paused" : ""}`}
      style={theme}
    >
      <button
        type="button"
        className="skip-link"
        onClick={() => mainRef.current?.focus({ preventScroll: true })}
      >
        Đến nội dung chính
      </button>
      <header className="site-header">
        <button
          type="button"
          onClick={() => goToScreen(0)}
          className="brand"
          aria-label="Khu vườn yêu thương — đầu trang"
        >
          <Flower2 size={27} strokeWidth={1.25} />
          <span>
            Khu vườn <em>yêu thương</em>
            <small>MỘT MÓN QUÀ NGÀY 20/10</small>
          </span>
        </button>
      </header>
      <main
        id="noi-dung"
        className="journey-stage"
        ref={mainRef}
        tabIndex={-1}
        aria-label={`Màn hình ${currentScreen + 1}: ${screens[currentScreen].title}`}
      >
        <div
          className="journey-screen"
          key={currentScreen}
          data-screen={screens[currentScreen].id}
        >
          {currentScreen === 0 && (
            <LandingScreen
              recipient={recipient}
              heroImage={greeting.heroImage}
              backgroundImage={greeting.backgroundImage}
              onExplore={() => goToScreen(1)}
            />
          )}
          {currentScreen === 1 && (
            <FlowerGarden
              images={greeting.flowerImages}
              onContinue={() => goToScreen(2)}
            />
          )}
          {currentScreen === 2 && (
            <GreetingCard
              greeting={greeting}
              recipient={recipient}
              onContinue={() => goToScreen(3)}
            />
          )}
          {currentScreen === 3 && (
            <section
              className="closing-note"
              id="loi-nhan"
              aria-label="Lời nhắn cuối"
            >
              <Flower2 size={34} strokeWidth={1} />
              <p>
                Thế giới đẹp hơn,
                <br />
                vì có <em>bạn.</em>
              </p>
              <span>MONG BẠN LUÔN NỞ HOA THEO CÁCH CỦA RIÊNG MÌNH.</span>
              <button
                type="button"
                className="closing-restart"
                onClick={() => goToScreen(0)}
              >
                Một lần nữa, chúc mừng 20/10 <ArrowUpRight size={15} />
              </button>
            </section>
          )}
        </div>
      </main>
      <div className="journey-controls-space" aria-hidden="true">
        <span>GÓI GHÉM BẰNG CẢ TRÁI TIM</span>
      </div>
      <span className="journey-sr-only" role="status" aria-live="polite">
        Màn hình {currentScreen + 1} trên 4: {screens[currentScreen].title}
      </span>
      <MusicPlayer track={greeting.audio} autoPlay={greeting.autoPlayMusic} />
      <button
        type="button"
        className="motion-control"
        onClick={() => setMotionPaused((paused) => !paused)}
        aria-pressed={motionPaused}
        aria-label={
          motionPaused
            ? "Bật chuyển động hoa violet"
            : "Tạm dừng chuyển động hoa violet"
        }
      >
        {motionPaused ? <Sparkles size={14} /> : <Pause size={13} />}
        <span>{motionPaused ? "Bật hiệu ứng" : "Dừng hiệu ứng"}</span>
      </button>
      <FallingPetals />
    </div>
  );
}
