/** Personalize this file; paths below are relative to public/, without a leading slash. */
export const greeting = {
  recipient: "bạn",
  sender: "Một người luôn yêu thương bạn",
  message:
    "Nhân ngày Phụ nữ Việt Nam 20/10, chúc bạn luôn xinh đẹp theo cách riêng của mình, hạnh phúc, tự tin và luôn được yêu thương. Mong rằng mỗi ngày của bạn đều ngập tràn niềm vui, những điều tử tế và những khoảnh khắc đáng nhớ. Chúc bạn luôn tỏa sáng như những bông hoa đẹp nhất trong khu vườn cuộc đời!",
  colors: {
    ink: "#3f4353",
    sage: "#707a69",
    rose: "#9173ae",
    paper: "#faf8f5",
  },
  audio: "assets/audio/garden-piano.wav",
  heroImage: "assets/images/violet-garden.webp",
  backgroundImage: "assets/images/violet-garden.webp",
  // Leave empty to use the original SVG flowers, or supply paths relative to public/.
  flowerImages: { violet: "", tulip: "", daisy: "" },
};

export function getRecipient(search = window.location.search) {
  const value = new URLSearchParams(search).get("to");
  // Plain text only: React escapes output. Limit length and strip control characters.
  const cleaned = value
    ?.normalize("NFC")
    .replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, "")
    .trim();
  return cleaned
    ? Array.from(cleaned).slice(0, 60).join("")
    : greeting.recipient;
}

export function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, "")}`;
}
