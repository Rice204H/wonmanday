# Khu vườn yêu thương · 20/10

Website chúc mừng Ngày Phụ nữ Việt Nam, được xây dựng bằng **React + Vite**. Giao diện có lời chúc cá nhân hóa với hiệu ứng gõ từng ký tự, hoa minh họa, khu vườn tím chuyển động nhẹ và nhạc nền tùy chỉnh.

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

Trang gồm bốn màn hình: chào mừng → khu vườn → thiệp → lời nhắn cuối. Bấm “Khám phá khu vườn”, mở lá thư bên dưới các bông hoa, rồi chọn “Giữ lại một nụ cười” trong thiệp để tiếp tục; không cần cuộn trang hay thanh điều hướng riêng. Nút Quay lại của trình duyệt và các liên kết có `#khu-vuon`, `#loi-chuc` vẫn hoạt động. Nhạc giữ nguyên khi chuyển màn hình. Với lời chúc quá dài hoặc khi phóng to chữ, nội dung thiệp mở có thể cuộn bên trong để không mất chữ.

Sửa `src/config/greeting.js`:

| Thuộc tính        | Nội dung                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `recipient`       | Tên người nhận mặc định.                                                                                                       |
| `sender`          | Tên hoặc chữ ký người gửi.                                                                                                     |
| `message`         | Nội dung lời chúc.                                                                                                             |
| `colors`          | Các màu chính: `ink`, `sage`, `rose`, `paper`.                                                                                 |
| `audio`           | Đường dẫn nhạc nền.                                                                                                            |
| `autoPlayMusic`   | `true`: thử tự phát khi mở trang; nếu bị trình duyệt chặn thì phát sau lần chạm/bấm đầu tiên. `false`: chỉ phát bằng nút nhạc. |
| `typingSpeed`     | Tốc độ gõ lời chúc, tính bằng mili giây mỗi ký tự. Số lớn hơn sẽ gõ chậm hơn.                                                  |
| `heroImage`       | Đường dẫn ảnh chính.                                                                                                           |
| `backgroundImage` | Đường dẫn ảnh nền khu vườn tím.                                                                                                |
| `flowerImages`    | Ảnh riêng cho `violet`, `tulip`, `daisy`. Để trống để dùng SVG mặc định.                                                       |

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
- `public/assets/audio/nhacmp3.mp3`: file nhạc tùy chỉnh hiện được sử dụng. Đường dẫn cấu hình phải khớp tên và đuôi file.

Ảnh `assets/images/violet-garden.webp` được tạo chuyển động nhẹ bằng CSS. Khi người xem bật chế độ giảm chuyển động (`prefers-reduced-motion`), nền hiển thị tĩnh.

Để thay nhạc, đặt một tệp MP3 mà bạn có quyền sử dụng vào `public/assets/audio/`, rồi đổi `audio` trong cấu hình cho khớp chính xác tên và đuôi tệp. Khi `autoPlayMusic: true`, trang thử phát nhạc ở âm lượng 30% ngay khi mở. Nếu trình duyệt chặn tự phát có âm thanh, nhạc bắt đầu sau lần chạm/bấm hoặc phím tương tác đầu tiên. Nút phát/tạm dừng và thanh âm lượng luôn khả dụng; sau khi người xem chủ động tạm dừng, các lần bấm tiếp theo không tự bật lại nhạc.

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
