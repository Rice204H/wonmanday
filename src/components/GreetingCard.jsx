import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Heart, Share2, X } from "lucide-react";
import "../styles/greeting-card.css";
import TypewriterLetter from "./TypewriterLetter.jsx";

const DEFAULT_MESSAGE =
  "Chúc bạn một ngày 20/10 thật dịu dàng, ngập tràn niềm vui và những điều xinh đẹp. Cảm ơn bạn vì đã luôn là chính mình — một người phụ nữ đáng mến, mạnh mẽ và rạng rỡ theo cách rất riêng.\n\nMong bạn luôn được yêu thương, được lắng nghe, và có đủ bình yên để làm những điều mình thích. Hôm nay và cả những ngày sau, hãy dành một chút yêu thương cho chính mình nhé.";

function LetterFlower({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 144"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M49 137C47 108 47 83 52 54M49 111C35 101 24 96 18 79C34 79 44 91 49 111ZM49 96C61 83 74 75 83 76C79 91 64 97 49 101"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M53 52C37 53 29 44 32 37C35 30 43 34 47 40C39 25 46 16 52 19C59 21 57 33 54 40C63 26 73 28 74 35C75 42 62 49 55 50C70 46 78 52 74 58C69 64 58 57 53 52C45 66 35 66 34 59C33 53 45 49 53 52Z"
        fill="#e4bac2"
        stroke="#b96e7e"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="53" cy="48" r="4.2" fill="#c79766" />
    </svg>
  );
}

export default function GreetingCard({ greeting, recipient, onContinue }) {
  const name = recipient?.trim() || greeting?.recipient?.trim() || "bạn";
  const sender = greeting?.sender?.trim() || "Một người luôn yêu thương bạn";
  const message = greeting?.message?.trim() || DEFAULT_MESSAGE;
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [manualUrl, setManualUrl] = useState("");
  const [sharing, setSharing] = useState(false);
  const envelopeRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const timerRef = useRef(null);
  const sharingRef = useRef(false);
  const returnFocusRef = useRef(null);
  const dialogOpenRef = useRef(false);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const closeDialog = useCallback(() => {
    dialogOpenRef.current = false;
    setDialogOpen(false);
  }, []);

  const openLetter = useCallback(() => {
    if (timerRef.current !== null || dialogOpenRef.current) return;
    returnFocusRef.current = document.activeElement;
    setShareStatus("");
    setManualUrl("");
    const revealDialog = () => {
      timerRef.current = null;
      dialogOpenRef.current = true;
      setDialogOpen(true);
    };
    if (envelopeOpen) {
      revealDialog();
      return;
    }
    setEnvelopeOpen(true);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    timerRef.current = window.setTimeout(
      revealDialog,
      reducedMotion ? 30 : 760,
    );
  }, [envelopeOpen]);

  useEffect(() => {
    if (!dialogOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
      }
      if (event.key !== "Tab") return;
      const focusable = [
        ...(dialogRef.current?.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]',
        ) || []),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first) {
        event.preventDefault();
        dialogRef.current?.focus();
      } else if (
        event.shiftKey &&
        (document.activeElement === first ||
          !dialogRef.current?.contains(document.activeElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !dialogRef.current?.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };
    const onFocusIn = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target))
        closeRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      const target = returnFocusRef.current;
      if (target instanceof HTMLElement && target.isConnected) target.focus();
      else envelopeRef.current?.focus();
    };
  }, [dialogOpen, closeDialog]);

  const shareGreeting = useCallback(async () => {
    if (sharingRef.current) return;
    sharingRef.current = true;
    setSharing(true);
    setManualUrl("");
    setShareStatus("");
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("to", name);
    const shareUrl = url.toString();
    try {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Gửi bạn một ngày 20/10 thật đẹp",
            text: `Một lời chúc dịu dàng dành cho ${name}.`,
            url: shareUrl,
          });
          setShareStatus("Cảm ơn bạn đã lan tỏa yêu thương.");
          return;
        } catch (error) {
          if (error.name === "AbortError") return;
        }
      }
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus(
        "Đã sao chép liên kết. Bạn có thể gửi đến người mình yêu quý.",
      );
    } catch {
      setShareStatus(
        "Chưa thể sao chép tự động. Bạn có thể chọn và sao chép liên kết bên dưới.",
      );
      setManualUrl(shareUrl);
    } finally {
      sharingRef.current = false;
      setSharing(false);
    }
  }, [name]);

  return (
    <>
      <section
        className="greeting-section"
        id="loi-chuc"
        aria-labelledby="greeting-heading"
      >
        <div className="greeting-inner">
          <div className="greeting-intro">
            <p className="greeting-eyebrow">
              <span /> MỘT CHÚT YÊU THƯƠNG
            </p>
            <h2 id="greeting-heading">
              Có một lời chúc,
              <br />
              <em>dành riêng cho bạn.</em>
            </h2>
            <p className="greeting-description">
              Đôi khi, những điều nhỏ bé lại làm nên một ngày thật đẹp. Một
              chiếc thiệp, vài dòng chân thành — và rất nhiều yêu thương.
            </p>
            <button
              type="button"
              className="greeting-text-link"
              onClick={openLetter}
            >
              {envelopeOpen ? "Đọc lại lời chúc" : "Mở một chút yêu thương"}{" "}
              <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <div className="greeting-envelope-scene">
            <span
              className="greeting-orbit greeting-orbit-one"
              aria-hidden="true"
            />
            <span
              className="greeting-orbit greeting-orbit-two"
              aria-hidden="true"
            />
            <span className="greeting-envelope-note" aria-hidden="true">
              một lời thương, gửi đến bạn
            </span>
            <button
              ref={envelopeRef}
              className={`greeting-envelope ${envelopeOpen ? "is-open" : ""}`}
              onClick={openLetter}
              type="button"
              aria-label={
                envelopeOpen
                  ? "Đọc lại lời chúc dành cho bạn"
                  : "Mở phong thư và đọc lời chúc dành cho bạn"
              }
              aria-haspopup="dialog"
            >
              <span className="greeting-envelope-back" />
              <span className="greeting-envelope-letter" aria-hidden="true">
                <span className="greeting-letter-mini-label">Gửi {name},</span>
                <span className="greeting-letter-mini-title">
                  Bạn xứng đáng
                  <br />
                  với mọi điều đẹp đẽ.
                </span>
                <span className="greeting-letter-mini-line" />
                <LetterFlower className="greeting-letter-mini-flower" />
              </span>
              <span className="greeting-envelope-pocket" />
              <span className="greeting-envelope-flap" />
              <span className="greeting-wax-seal">
                <Heart size={22} strokeWidth={1.3} aria-hidden="true" />
              </span>
            </button>
            <p className="greeting-envelope-hint">
              {envelopeOpen
                ? "Một lời chúc luôn ở đây, dành cho bạn."
                : "Chạm nhẹ để mở thiệp"}
            </p>
            <LetterFlower className="greeting-scene-flower" />
          </div>
        </div>
      </section>
      {dialogOpen &&
        createPortal(
          <div
            className="greeting-modal-backdrop"
            style={Object.fromEntries(
              Object.entries(greeting?.colors || {}).map(([key, value]) => [
                `--${key}`,
                value,
              ]),
            )}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeDialog();
            }}
          >
            <div
              className="greeting-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="greeting-dialog-heading"
              aria-describedby="greeting-dialog-message"
              ref={dialogRef}
              tabIndex={-1}
            >
              <button
                className="greeting-close"
                type="button"
                ref={closeRef}
                onClick={closeDialog}
                aria-label="Đóng lời chúc"
              >
                <X size={21} strokeWidth={1.5} />
              </button>
              <div className="greeting-modal-content">
                <div className="greeting-modal-topline">
                  <span>20 / 10</span>
                  <span>DÀNH RIÊNG CHO BẠN</span>
                </div>
                <div className="greeting-modal-flower-wrap">
                  <LetterFlower className="greeting-modal-flower" />
                </div>
                <p className="greeting-modal-kicker">MỘT NGÀY THẬT ĐẸP</p>
                <TypewriterLetter name={name} message={message} sender={sender} speed={greeting?.typingSpeed} />
                <div className="greeting-modal-actions">
                  <button
                    className="greeting-share-button"
                    type="button"
                    onClick={shareGreeting}
                    disabled={sharing}
                  >
                    <Share2 size={16} strokeWidth={1.6} aria-hidden="true" />
                    {sharing ? "Đang mở chia sẻ…" : "Gửi yêu thương"}
                  </button>
                  <button
                    className="greeting-keep-button"
                    type="button"
                    onClick={() => {
                      closeDialog();
                      onContinue?.();
                    }}
                  >
                    Giữ lại một nụ cười{" "}
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div
                  className="greeting-share-feedback"
                  role="status"
                  aria-live="polite"
                >
                  {shareStatus}
                </div>
                {manualUrl && (
                  <label className="greeting-manual-link">
                    Liên kết lời chúc
                    <input
                      type="text"
                      value={manualUrl}
                      readOnly
                      onFocus={(event) => event.target.select()}
                      onClick={(event) => event.currentTarget.select()}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
