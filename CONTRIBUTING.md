# Contributing To VFuture / Hướng Dẫn Đóng Góp Cho VFuture

**English:** VFuture is a private, proprietary repository owned by Veltrix Media Group. Contributions are limited to authorized employees, approved contractors, and partners working under an active agreement.

**Tiếng Việt:** VFuture là repository riêng tư, thuộc quyền sở hữu của Veltrix Media Group. Việc đóng góp chỉ dành cho nhân sự được ủy quyền, contractor đã được phê duyệt, và đối tác đang có thỏa thuận hợp lệ.

**English:** By contributing, you acknowledge the confidentiality and license obligations described in [LICENSE](LICENSE).

**Tiếng Việt:** Khi đóng góp, bạn xác nhận rằng mình hiểu và chấp nhận các nghĩa vụ về bảo mật và giấy phép được nêu trong [LICENSE](LICENSE).

## Who May Contribute / Ai Có Thể Đóng Góp

| English | Tiếng Việt |
| --- | --- |
| Veltrix Media Group team members | Thành viên của Veltrix Media Group |
| Approved contractors with repository access | Contractor đã được phê duyệt và có quyền truy cập repository |
| Licensed or delegated partners working within a signed agreement | Đối tác được cấp phép hoặc được ủy quyền trong phạm vi một thỏa thuận đã ký |

**English:** You must not contribute, review, copy, or redistribute material from this repository if you are not explicitly authorized to do so.

**Tiếng Việt:** Bạn không được đóng góp, review, sao chép hoặc phân phối bất kỳ tài liệu nào từ repository này nếu chưa được cấp quyền rõ ràng.

## Contribution Workflow / Quy Trình Đóng Góp

| Step | English | Tiếng Việt |
| --- | --- | --- |
| 1 | Sync from the latest `master` branch before starting work. | Đồng bộ từ nhánh `master` mới nhất trước khi bắt đầu. |
| 2 | Create a focused branch from `master`. | Tạo một nhánh riêng, rõ mục đích, từ `master`. |
| 3 | Make the smallest change that fully solves the issue. | Thực hiện thay đổi nhỏ nhất nhưng giải quyết trọn vẹn vấn đề. |
| 4 | Run the required verification commands locally. | Chạy đầy đủ lệnh xác minh cần thiết ở local. |
| 5 | Update documentation, schema files, or env references when affected. | Cập nhật tài liệu, schema hoặc biến môi trường nếu thay đổi có liên quan. |
| 6 | Open a pull request with enough context for review. | Tạo pull request với đầy đủ bối cảnh để review. |
| 7 | Merge only after review approval and successful checks. | Chỉ merge sau khi được phê duyệt và các bước kiểm tra đều đạt. |

## Local Development Baseline / Chuẩn Môi Trường Local

Before opening a pull request, make sure you can:

Trước khi mở pull request, hãy đảm bảo bạn có thể:

- install dependencies with `npm install`  
  cài đặt phụ thuộc bằng `npm install`
- configure `.env.local`  
  cấu hình `.env.local`
- apply `supabase/schema.sql` to a working Supabase project  
  áp dụng `supabase/schema.sql` cho một project Supabase đang hoạt động
- run the application with `npm run dev`  
  chạy ứng dụng bằng `npm run dev`
- pass the required verification commands  
  vượt qua các lệnh kiểm tra bắt buộc

Recommended local toolchain:

Bộ công cụ local được khuyến nghị:

- Node.js 20 LTS or newer  
  Node.js 20 LTS trở lên
- npm 10 or newer  
  npm 10 trở lên

## Branch Naming / Quy Ước Đặt Tên Nhánh

Use short, descriptive branch names with one of the following prefixes.

Sử dụng tên nhánh ngắn gọn, rõ nghĩa với một trong các tiền tố sau.

| Prefix | English | Tiếng Việt |
| --- | --- | --- |
| `feature/` | New feature work | Phát triển tính năng mới |
| `fix/` | Bug fix work | Sửa lỗi |
| `hotfix/` | Production fix | Sửa gấp cho production |
| `refactor/` | Structural improvement | Cải tổ cấu trúc |
| `docs/` | Documentation update | Cập nhật tài liệu |
| `chore/` | Maintenance work | Công việc bảo trì |

Examples:

- `feature/admin-stream-sync`
- `fix/news-slug-validation`
- `docs/readme-bilingual`

## Commit Message Format / Định Dạng Commit

Use concise, imperative commit messages.

Sử dụng commit message ngắn gọn, dạng mệnh lệnh.

```text
<type>: <summary>
```

Preferred types / Nhóm type nên dùng:

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `chore`
- `perf`

Examples:

```text
feat: add admin stream status sync endpoint
fix: sanitize gallery tags before persistence
docs: add bilingual project documentation
```

## Engineering Standards / Tiêu Chuẩn Kỹ Thuật

### General Standards / Tiêu Chuẩn Chung

| English | Tiếng Việt |
| --- | --- |
| Follow the current Next.js App Router structure and existing project conventions. | Tuân thủ cấu trúc Next.js App Router và convention hiện có của dự án. |
| Keep TypeScript strictness intact. Do not weaken compiler settings to land a change. | Giữ nguyên mức độ nghiêm ngặt của TypeScript. Không được hạ chuẩn compiler để dễ merge code. |
| Prefer shared utilities and domain services over duplicated logic. | Ưu tiên utility và service dùng chung thay vì lặp lại logic. |
| Keep public and admin behavior aligned with the current role model: `editor`, `admin`, `senior_admin`. | Đảm bảo hành vi của public và admin phù hợp với hệ vai trò hiện tại: `editor`, `admin`, `senior_admin`. |
| Avoid dead code, placeholder branches, and commented-out production logic. | Tránh dead code, nhánh giả lập và logic production bị comment lại. |

### API And Backend Standards / Tiêu Chuẩn API Và Backend

For new or modified route handlers:

Với route handler mới hoặc đã sửa:

- validate payloads with Zod  
  xác thực payload bằng Zod
- apply rate limiting where the endpoint is user-facing or admin-facing  
  áp dụng giới hạn tốc độ cho endpoint public hoặc admin
- enforce role-aware auth for admin endpoints  
  ép buộc xác thực theo vai trò với endpoint admin
- sanitize user-provided strings or rich text before persistence  
  làm sạch string hoặc rich text trước khi lưu
- log security-sensitive or admin-impacting actions when appropriate  
  ghi log những hành động nhạy cảm về bảo mật hoặc ảnh hưởng admin khi cần

### Data And Schema Standards / Tiêu Chuẩn Dữ Liệu Và Schema

If your change affects persisted data:

Nếu thay đổi của bạn tác động đến dữ liệu lưu trữ:

- update [`supabase/schema.sql`](supabase/schema.sql)  
  cập nhật [`supabase/schema.sql`](supabase/schema.sql)
- update [`supabase/seed-data.sql`](supabase/seed-data.sql) if seed behavior changes  
  cập nhật [`supabase/seed-data.sql`](supabase/seed-data.sql) nếu dữ liệu seed thay đổi
- document new environment variables in `README.md`  
  ghi chú biến môi trường mới trong `README.md`
- document operational changes in the relevant guide if deployment steps change  
  bổ sung tài liệu vận hành nếu quy trình triển khai thay đổi

**English:** Not every module has its own table. Invitations and streams are currently stored as settings-backed JSON values, so changes in those areas should preserve backward compatibility or include a clear migration plan.

**Tiếng Việt:** Không phải module nào cũng có bảng riêng. Invitations và streams hiện đang được lưu trong settings dưới dạng JSON, vì vậy thay đổi ở hai khu vực này cần giữ tương thích ngược hoặc phải có kế hoạch migration rõ ràng.

### Frontend Standards / Tiêu Chuẩn Frontend

| English | Tiếng Việt |
| --- | --- |
| Reuse shared UI primitives under `src/components/ui` where possible. | Tái sử dụng các UI primitive dùng chung trong `src/components/ui` khi có thể. |
| Preserve both desktop and mobile behavior. | Bảo toàn hành vi trên cả desktop và mobile. |
| If you change public navigation or route structure, review `sitemap.ts`, `robots.ts`, metadata, and localized aliases. | Nếu thay đổi điều hướng hoặc cấu trúc route công khai, cần rà soát `sitemap.ts`, `robots.ts`, metadata và các alias đã bản địa hóa. |
| If you modify rich text rendering or media behavior, verify both editor and viewer paths. | Nếu thay đổi render rich text hoặc media, cần test cả đường editor và viewer. |

## Verification Requirements / Yêu Cầu Xác Minh

Every pull request must, at minimum, pass:

Mỗi pull request tối thiểu phải vượt qua:

```bash
npm run lint
npm run typecheck
npm run build
```

**English:** The repository does not currently ship a dedicated automated unit or integration test suite. Do not claim broader automated test coverage unless you actually added and ran it.

**Tiếng Việt:** Repository hiện tại chưa có bộ test unit hoặc integration tự động riêng. Không nên khẳng định độ phủ test tự động rộng hơn nếu bạn chưa thực sự thêm và chạy nó.

**English:** When your change touches auth, Supabase, storage, email, stream sync, or middleware behavior, include manual smoke-test notes in the pull request description.

**Tiếng Việt:** Nếu thay đổi của bạn ảnh hưởng đến auth, Supabase, storage, email, stream sync hoặc middleware, hãy bổ sung ghi chú smoke-test thủ công trong mô tả pull request.

## Pull Request Expectations / Yêu Cầu Đối Với Pull Request

Every pull request should include:

Mỗi pull request nên có:

- a clear title  
  tiêu đề rõ ràng
- a concise summary of what changed and why  
  tóm tắt ngắn gọn đã thay đổi gì và vì sao
- screenshots or recordings for user-facing UI changes  
  ảnh chụp hoặc video nếu thay đổi giao diện
- verification results  
  kết quả kiểm tra
- notes about schema, environment, deployment, or operational impact  
  ghi chú nếu tác động đến schema, env, deploy hoặc vận hành
- follow-up items if the work is intentionally partial  
  các mục cần làm tiếp nếu đây là thay đổi có ý tách thành nhiều phần

Prefer small, reviewable pull requests over large mixed-purpose changes.

Nên ưu tiên pull request nhỏ, dễ review, thay vì một pull request lớn gồm nhiều mục đích.

## Definition Of Done / Định Nghĩa Hoàn Tất

A change is not complete until all of the following are true:

Một thay đổi chưa được xem là hoàn tất cho đến khi tất cả điều sau đúng:

- the implementation is finished  
  implementation đã xong
- verification has been run and recorded  
  đã chạy và ghi lại kết quả xác minh
- documentation has been updated if needed  
  tài liệu đã được cập nhật nếu cần
- schema or environment changes are documented  
  thay đổi schema hoặc env đã được ghi chú
- no secrets, build artifacts, or local environment files are committed  
  không có secret, artifact build hoặc file môi trường local bị commit

## Secrets And Security / Secret Và Bảo Mật

Do not commit or expose:

Không commit hoặc để lộ:

- `.env.local`
- private API keys  
  API key riêng tư
- Supabase service-role keys  
  service-role key của Supabase
- credentials, tokens, or exported user data  
  thông tin đăng nhập, token hoặc dữ liệu người dùng đã xuất ra

If you add a new environment variable:

Nếu bạn thêm một biến môi trường mới:

- update `.env.example` when appropriate  
  cập nhật `.env.example` khi phù hợp
- document it in `README.md`  
  bổ sung vào `README.md`
- describe whether it is required, optional, server-only, or public  
  ghi rõ nó là bắt buộc, tùy chọn, chỉ server hay public

Report suspected vulnerabilities privately. Do not open public issues for security-sensitive details.

Hãy báo cáo lỗ hổng bảo mật theo kênh riêng. Không mở issue công khai cho thông tin nhạy cảm.

Security contact / Liên hệ bảo mật:

- `security@veltrixmediagroup.com`

General repository or licensing contact / Liên hệ chung về repository hoặc giấy phép:

- `contact@veltrixmediagroup.com`

## Confidentiality / Tính Bảo Mật

**English:** This repository contains confidential business and technical material. By contributing, you agree to keep source code and internal documentation confidential, avoid sharing implementation details outside authorized channels, protect local copies, and report accidental exposure immediately.

**Tiếng Việt:** Repository này chứa tài liệu kinh doanh và kỹ thuật mang tính bảo mật. Khi đóng góp, bạn đồng ý giữ bí mật mã nguồn và tài liệu nội bộ, không chia sẻ chi tiết implementation ra ngoài kênh được phép, bảo vệ bản sao local và báo cáo ngay nếu có rò rỉ ngoài ý muốn.

## Unauthorized Access / Truy Cập Không Được Phép

If you believe you have obtained access in error:

Nếu bạn cho rằng mình đang có quyền truy cập do nhầm lẫn:

1. Stop using the repository immediately.  
   Dừng sử dụng repository ngay lập tức.
2. Do not copy, clone, archive, or share any files.  
   Không sao chép, clone, lưu trữ hoặc chia sẻ bất kỳ tệp nào.
3. Notify `security@veltrixmediagroup.com`.  
   Thông báo cho `security@veltrixmediagroup.com`.
4. Remove any unauthorized local copies unless legal retention is required.  
   Xóa mọi bản sao local không được phép, trừ khi pháp lý yêu cầu phải giữ.

Unauthorized access or redistribution may result in access revocation, contractual remedies, or legal action.

Truy cập hoặc phân phối trái phép có thể dẫn đến việc thu hồi quyền truy cập, biện pháp xử lý theo hợp đồng hoặc hành động pháp lý.

## License Reminder / Nhắc Lại Về Giấy Phép

**English:** Contributions are made to a proprietary codebase and do not convert the project into open-source software. Ownership, use rights, and redistribution remain governed by [LICENSE](LICENSE) and any applicable agreements with Veltrix Media Group.

**Tiếng Việt:** Mọi đóng góp đều được thực hiện trên một codebase độc quyền và không biến dự án thành mã nguồn mở. Quyền sở hữu, quyền sử dụng và quyền phân phối vẫn được điều chỉnh bởi [LICENSE](LICENSE) và các thỏa thuận liên quan với Veltrix Media Group.

Last updated / Cập nhật lần cuối: March 28, 2026
