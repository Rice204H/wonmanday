# Khu vườn yêu thương · 20/10

Website chúc mừng Ngày Phụ nữ Việt Nam, được xây dựng bằng **React + Vite**. Giao diện có lời chúc cá nhân hóa, hoa minh họa, khu vườn tím chuyển động nhẹ và nhạc piano do người xem chủ động bật.

## Chạy trên máy

Cần **Node.js từ 22.12 trở lên**; khuyến nghị **Node.js 24** cho Vite 8. Mở terminal trong thư mục dự án rồi chạy:

```sh
npm ci
npm run dev
```

Mở địa chỉ mà Vite hiển thị, kèm đường dẫn `/wonmanday/`. Các lệnh còn lại:

```sh
npm run build
npm run check
npm run preview
```

- `build`: tạo bản phát hành trong `dist/`.
- `check`: kiểm tra bản build; chạy sau `build`.
- `preview`: xem bản build trên máy tại địa chỉ được hiển thị.

## Cá nhân hóa lời chúc

Sửa `src/config/greeting.js`:

| Thuộc tính | Nội dung |
| --- | --- |
| `recipient` | Tên người nhận mặc định. |
| `sender` | Tên hoặc chữ ký người gửi. |
| `message` | Nội dung lời chúc. |
| `colors` | Các màu chính: `ink`, `sage`, `rose`, `paper`. |
| `audio` | Đường dẫn nhạc nền. |
| `heroImage` | Đường dẫn ảnh chính. |
| `backgroundImage` | Đường dẫn ảnh nền khu vườn tím. |
| `flowerImages` | Ảnh riêng cho `violet`, `tulip`, `daisy`. Để trống để dùng SVG mặc định. |

Đường dẫn tài nguyên tính từ `public/`, không thêm dấu `/` ở đầu. Ví dụ: `assets/images/violet-garden.webp`.

Có thể gửi cùng một trang cho từng người bằng tham số `to`:

```text
https://rice204h.github.io/wonmanday/?to=Lan
```

Tên trong `?to=Lan` thay cho người nhận mặc định. Giá trị này được xử lý như văn bản thuần, loại ký tự điều khiển và giới hạn 60 ký tự; không được diễn giải thành HTML.

## Tài nguyên

Các tài nguyên cần thiết được lưu sẵn trong dự án; không cần bổ sung ảnh, nhạc hoặc khóa dịch vụ để chạy trang.

- `public/assets/images/`: ảnh trang và ảnh khu vườn tím. Tranh tím được tạo bằng công cụ ImageGen tích hợp.
- Hoa SVG: minh họa gốc được tạo cho website.
- `public/assets/audio/garden-piano.wav`: bản nhạc piano tổng hợp gốc, dài 36 giây. Xem thông tin nguồn gốc trong `public/assets/audio/README.md`.

Ảnh `assets/images/violet-garden.webp` được tạo chuyển động nhẹ bằng CSS. Khi người xem bật chế độ giảm chuyển động (`prefers-reduced-motion`), nền hiển thị tĩnh.

Để thay nhạc, đặt một tệp MP3 mà bạn có quyền sử dụng vào `public/assets/audio/`, rồi đổi `audio` trong cấu hình. Nhạc chỉ phát sau thao tác bấm của người xem, theo chính sách trình duyệt; có nút phát/tạm dừng và thanh âm lượng.

Chia sẻ bằng tính năng chia sẻ của thiết bị và sao chép bằng clipboard phụ thuộc vào hỗ trợ của trình duyệt, thường cần HTTPS hoặc localhost. Nếu trình duyệt không cho phép, dùng liên kết hiển thị để sao chép thủ công.

## Đưa lên GitHub Pages

`vite.config.js` đã đặt `base: '/wonmanday/'` cho repository `Rice204H/wonmanday`. Các đường dẫn tài nguyên sử dụng cùng cấu hình này. Nếu đổi tên repository hoặc dùng tên miền riêng, cần điều chỉnh `base` tương ứng trước khi build lại.

Repository đã có remote `origin`. Để đưa phiên bản đầu tiên lên nhánh `main`, chạy từ thư mục dự án:

Nếu bạn giải nén tệp ZIP, trước tiên khởi tạo Git trong thư mục vừa giải nén (bỏ qua hai lệnh này khi dùng checkout đã có `.git`):

```sh
git init -b main
git remote add origin https://github.com/Rice204H/wonmanday.git
```

Sau đó đưa mã nguồn lên GitHub:

```sh
git branch -M main
git add .
git commit -m "Build Vietnamese Women's Day garden"
git push -u origin main
```

Trên GitHub, vào **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**. Workflow `.github/workflows/deploy.yml` tự cài dependencies, build, kiểm tra và gửi bản phát hành lên Pages khi có push vào `main`; cũng có thể chạy thủ công từ tab **Actions**.

Sau khi workflow triển khai hoàn tất thành công, địa chỉ dự kiến của website là **[https://rice204h.github.io/wonmanday/](https://rice204h.github.io/wonmanday/)**. Việc có mã nguồn và workflow trong repository chưa đồng nghĩa trang đã được triển khai.
