import { useEffect, useId, useRef, useState } from "react";
import {
  Music2,
  Pause,
  Play,
  SlidersHorizontal,
  Volume2,
  VolumeX,
} from "lucide-react";
import "../styles/music-player.css";

function resolveTrack(track) {
  if (/^(?:[a-z]+:)?\/\//i.test(track) || /^(?:data|blob):/i.test(track))
    return track;
  return `${import.meta.env.BASE_URL}${track.replace(/^\/+/, "")}`;
}

export default function MusicPlayer({
  track = "assets/audio/nhacmp3.mp3",
  autoPlay = true,
}) {
  const audioRef = useRef(null);
  const playerRef = useRef(null);
  const settingsRef = useRef(null);
  const previousVolume = useRef(0.3);
  const volumeRef = useRef(0.3);
  const autoStartPending = useRef(false);
  const cancelAutoStartRef = useRef(null);
  const volumeId = useId();
  const panelId = useId();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [error, setError] = useState("");
  const [awaitingGesture, setAwaitingGesture] = useState(false);
  const source = resolveTrack(track);

  useEffect(() => {
    const audio = audioRef.current;
    let cancelled = false;
    let attempting = false;
    audio.pause();
    audio.volume = volumeRef.current;
    setIsPlaying(false);
    setIsLoading(false);
    setError("");
    setAwaitingGesture(false);
    autoStartPending.current = autoPlay;

    function removeGestureListeners() {
      document.removeEventListener("click", onGesture, true);
      document.removeEventListener("touchend", onGesture, true);
      document.removeEventListener("keydown", onGesture, true);
    }
    function stopAutoStart() {
      autoStartPending.current = false;
      removeGestureListeners();
    }
    cancelAutoStartRef.current = stopAutoStart;

    async function tryAutoStart() {
      if (cancelled || attempting || !autoStartPending.current) return;
      attempting = true;
      try {
        // Call play inside the gesture handler, before any asynchronous work.
        await audio.play();
        if (cancelled || !autoStartPending.current) return;
        stopAutoStart();
        setAwaitingGesture(false);
      } catch (playError) {
        if (cancelled || !autoStartPending.current) return;
        if (playError.name === "NotAllowedError") {
          setAwaitingGesture(true);
        } else if (playError.name !== "AbortError") {
          stopAutoStart();
          setError("Chưa mở được nhạc. Bạn thử lại nhé.");
        }
      } finally {
        attempting = false;
      }
    }
    function onGesture(event) {
      // The player's own controls handle playback without a second auto-play call.
      if (!event.isTrusted || playerRef.current?.contains(event.target)) return;
      if (event.type === "keydown" &&
          (event.ctrlKey || event.metaKey || event.altKey ||
           ["Escape", "Tab", "Shift", "Control", "Alt", "Meta"].includes(event.key))) return;
      void tryAutoStart();
    }

    if (autoPlay) {
      document.addEventListener("click", onGesture, true);
      document.addEventListener("touchend", onGesture, { capture: true, passive: true });
      document.addEventListener("keydown", onGesture, true);
      void tryAutoStart();
    }
    return () => {
      cancelled = true;
      stopAutoStart();
      cancelAutoStartRef.current = null;
      audio.pause();
    };
  }, [source, autoPlay]);

  useEffect(() => {
    volumeRef.current = volume;
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!panelOpen) return undefined;
    function closeOutside(event) {
      if (!playerRef.current?.contains(event.target)) setPanelOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setPanelOpen(false);
        settingsRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [panelOpen]);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    // A deliberate pause must remain paused on subsequent page interactions.
    cancelAutoStartRef.current?.();
    setAwaitingGesture(false);
    setPanelOpen(true);
    if (!audio.paused) {
      audio.pause();
      setIsLoading(false);
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      if (audio.error) audio.load();
      await audio.play();
      setIsLoading(false);
    } catch (playError) {
      if (playError.name !== "AbortError") {
        setError("Chưa mở được nhạc. Bạn thử lại nhé.");
      }
      setIsLoading(false);
    }
  }

  function toggleMute() {
    if (volume > 0) {
      previousVolume.current = volume;
      setVolume(0);
    } else {
      setVolume(previousVolume.current || 0.3);
    }
  }

  const label = isLoading
    ? "Đang mở nhạc…"
    : error
      ? "Thử lại nhạc"
      : isPlaying
        ? "Đang phát"
        : awaitingGesture ? "Chạm để nghe" : "Bật nhạc";

  return (
    <aside
      ref={playerRef}
      className="music-player"
      aria-label="Nhạc nền khu vườn"
    >
      <audio
        ref={audioRef}
        src={source}
        loop
        preload={autoPlay ? "auto" : "none"}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onPlaying={() => setIsLoading(false)}
        onError={() => {
          cancelAutoStartRef.current?.();
          setAwaitingGesture(false);
          setIsPlaying(false);
          setIsLoading(false);
          setError("Chưa mở được nhạc. Bạn thử lại nhé.");
        }}
      />
      {panelOpen && (
        <div
          className="music-player__panel"
          id={panelId}
          role="region"
          aria-label="Điều chỉnh nhạc nền"
        >
          <div className="music-player__track">
            <span className="music-player__track-icon">
              <Music2 size={17} aria-hidden="true" />
            </span>
            <div>
              <strong>Một chút dịu dàng</strong>
              <span>Giai điệu dành riêng cho bạn</span>
            </div>
          </div>
          <div className="music-player__volume">
            <button
              type="button"
              onClick={toggleMute}
              className="music-player__mute"
              aria-label={volume === 0 ? "Bật tiếng nhạc" : "Tắt tiếng nhạc"}
            >
              {volume === 0 ? (
                <VolumeX size={18} aria-hidden="true" />
              ) : (
                <Volume2 size={18} aria-hidden="true" />
              )}
            </button>
            <label className="music-player__sr-only" htmlFor={volumeId}>
              Âm lượng nhạc
            </label>
            <input
              id={volumeId}
              type="range"
              min="0"
              max="100"
              step="1"
              value={Math.round(volume * 100)}
              onChange={(event) => setVolume(Number(event.target.value) / 100)}
              style={{ "--volume-level": `${volume * 100}%` }}
            />
            <span className="music-player__volume-value" aria-hidden="true">
              {Math.round(volume * 100)}%
            </span>
          </div>
          {error && (
            <p className="music-player__error" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
      <div className="music-player__pill">
        <button
          type="button"
          className={`music-player__toggle${isPlaying ? " is-playing" : ""}`}
          onClick={togglePlayback}
          aria-label={isPlaying ? "Tạm dừng nhạc nền" : "Phát nhạc nền"}
          aria-pressed={isPlaying}
          disabled={isLoading && !isPlaying}
        >
          <span className="music-player__note">
            <Music2 size={17} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <span>{label}</span>
          {isPlaying ? (
            <Pause size={13} fill="currentColor" aria-hidden="true" />
          ) : (
            <Play size={13} fill="currentColor" aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          className="music-player__settings"
          ref={settingsRef}
          onClick={() => setPanelOpen((open) => !open)}
          aria-label={
            panelOpen ? "Đóng điều chỉnh nhạc" : "Điều chỉnh âm lượng nhạc"
          }
          aria-expanded={panelOpen}
          aria-controls={panelId}
        >
          <SlidersHorizontal size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </div>
      <span className="music-player__sr-only" role="status" aria-live="polite">
        {isPlaying ? "Nhạc nền đang phát." : awaitingGesture
          ? "Chạm vào trang hoặc bấm Bật nhạc để nghe nhạc nền."
          : "Nhạc nền đang tạm dừng."}
      </span>
    </aside>
  );
}
