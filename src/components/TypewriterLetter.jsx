import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, RotateCcw, SkipForward } from "lucide-react";

function splitCharacters(text) {
  const normalized = text.normalize("NFC");
  if (typeof Intl.Segmenter === "function") {
    return Array.from(
      new Intl.Segmenter("vi", { granularity: "grapheme" }).segment(normalized),
      ({ segment }) => segment,
    );
  }
  return Array.from(normalized);
}

function TypedText({ segment, shown }) {
  const count = Math.max(0, Math.min(shown - segment.start, segment.characters.length));
  const active = shown >= segment.start && count < segment.characters.length;
  return (
    <span className="letter-typewriter-text">
      {/* Reserve the complete text's space so the letter never jumps while typing. */}
      <span className="letter-typewriter-reserve" aria-hidden="true">{segment.text}</span>
      <span className="letter-typewriter-value" aria-hidden="true">
        {segment.characters.slice(0, count).join("")}
        {active && <span className="letter-typewriter-cursor" />}
      </span>
      <span className="letter-typewriter-sr-only">{segment.text}</span>
    </span>
  );
}

export default function TypewriterLetter({ name, message, sender, speed = 24 }) {
  const { segments, characters, total } = useMemo(() => {
    const lines = [
      `Gửi ${name},`,
      "bằng cả yêu thương.",
      ...message.split(/\n\s*\n/),
      "Thương mến,",
      sender,
    ];
    let start = 0;
    const segments = lines.map((text) => {
      const characters = splitCharacters(text);
      const segment = { text, characters, start };
      start += characters.length;
      return segment;
    });
    return { segments, characters: segments.flatMap((segment) => segment.characters), total: start };
  }, [name, message, sender]);
  const [shown, setShown] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? total : 0,
  );
  const [replay, setReplay] = useState(0);
  const timerRef = useRef(null);
  const characterDelay = Number.isFinite(speed) ? Math.max(12, Math.min(120, speed)) : 24;
  const complete = shown >= total;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let position = 0;
    let cancelled = false;
    const showAll = () => {
      cancelled = true;
      window.clearTimeout(timerRef.current);
      setShown(total);
    };
    const onMotionChange = (event) => { if (event.matches) showAll(); };
    media.addEventListener("change", onMotionChange);

    function typeNext() {
      if (cancelled) return;
      position += 1;
      setShown(position);
      if (position >= total) return;
      const last = characters[position - 1];
      const pause = /[.!?…]/u.test(last) ? 180 : /[,;:]/u.test(last) ? 85 : 0;
      timerRef.current = window.setTimeout(typeNext, characterDelay + pause);
    }

    if (media.matches) showAll();
    else {
      setShown(0);
      timerRef.current = window.setTimeout(typeNext, 450);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timerRef.current);
      media.removeEventListener("change", onMotionChange);
    };
  }, [characters, total, characterDelay, replay]);

  function toggleTyping() {
    window.clearTimeout(timerRef.current);
    if (complete) {
      setShown(0);
      setReplay((value) => value + 1);
    } else setShown(total);
  }

  return (
    <div className="letter-typewriter" data-typing-state={complete ? "complete" : "typing"}>
      <h2 id="greeting-dialog-heading">
        <TypedText segment={segments[0]} shown={shown} />
        <em><TypedText segment={segments[1]} shown={shown} /></em>
      </h2>
      <div id="greeting-dialog-message" className="greeting-message">
        {segments.slice(2, -2).map((segment, index) => (
          <p key={index}><TypedText segment={segment} shown={shown} /></p>
        ))}
      </div>
      <div className="greeting-signature">
        <TypedText segment={segments[segments.length - 2]} shown={shown} />
        <p><TypedText segment={segments[segments.length - 1]} shown={shown} /></p>
        <Heart size={15} strokeWidth={1.4} aria-hidden="true" />
      </div>
      <div className="letter-typewriter-controls">
        <button type="button" onClick={toggleTyping} className="letter-typewriter-toggle">
          {complete ? <RotateCcw size={13} aria-hidden="true" /> : <SkipForward size={14} aria-hidden="true" />}
          {complete ? "Xem lại hiệu ứng" : "Hiện toàn bộ lời chúc"}
        </button>
      </div>
    </div>
  );
}
