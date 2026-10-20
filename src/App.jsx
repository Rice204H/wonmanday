import { useState } from "react";
import { Flower2, Heart, ArrowUpRight, Sparkles, Pause } from "lucide-react";
import LandingScreen from "./components/LandingScreen.jsx";
import FlowerGarden from "./components/FlowerGarden.jsx";
import GreetingCard from "./components/GreetingCard.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import FallingPetals from "./components/FallingPetals.jsx";
import { greeting, getRecipient } from "./config/greeting.js";

export default function App() {
  const [motionPaused, setMotionPaused] = useState(false);
  const recipient = getRecipient();
  const theme = Object.fromEntries(
    Object.entries(greeting.colors).map(([key, value]) => [`--${key}`, value]),
  );
  return (
    <div
      className={`site${motionPaused ? " motion-paused" : ""}`}
      style={theme}
    >
      <a href="#noi-dung" className="skip-link">
        Đến nội dung chính
      </a>
      <header className="site-header">
        <a
          href="#dau-trang"
          className="brand"
          aria-label="Khu vườn yêu thương — đầu trang"
        >
          <Flower2 size={27} strokeWidth={1.25} />
          <span>
            Khu vườn <em>yêu thương</em>
            <small>MỘT MÓN QUÀ NGÀY 20/10</small>
          </span>
        </a>
        <nav aria-label="Điều hướng chính">
          <a href="#khu-vuon">Khu vườn</a>
          <a href="#loi-chuc">Lời chúc</a>
          <a href="#loi-chuc" className="header-gift">
            Dành tặng bạn <Heart size={14} strokeWidth={1.5} />
          </a>
        </nav>
      </header>
      <main id="noi-dung">
        <LandingScreen
          recipient={recipient}
          heroImage={greeting.heroImage}
          backgroundImage={greeting.backgroundImage}
        />
        <div className="garden-ribbon" aria-hidden="true">
          <span>BẠN XỨNG ĐÁNG VỚI NHỮNG ĐIỀU ĐẸP ĐẼ</span>
          <Flower2 size={20} strokeWidth={1.2} />
          <span>HÔM NAY VÀ MỌI NGÀY</span>
          <Flower2 size={20} strokeWidth={1.2} />
          <span>YÊU THƯƠNG LUÔN Ở QUANH BẠN</span>
        </div>
        <FlowerGarden images={greeting.flowerImages} />
        <GreetingCard greeting={greeting} recipient={recipient} />
        <section className="closing-note" aria-label="Lời nhắn cuối">
          <Flower2 size={34} strokeWidth={1} />
          <p>
            Thế giới đẹp hơn,
            <br />
            vì có <em>bạn.</em>
          </p>
          <span>MONG BẠN LUÔN NỞ HOA THEO CÁCH CỦA RIÊNG MÌNH.</span>
          <a href="#dau-trang">
            Một lần nữa, chúc mừng 20/10 <ArrowUpRight size={15} />
          </a>
        </section>
      </main>
      <footer className="site-footer">
        <span>Khu vườn yêu thương</span>
        <p>
          Gói ghém bằng cả trái tim <Heart size={12} />
        </p>
        <a href="#dau-trang">Trở về đầu trang ↑</a>
      </footer>
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
