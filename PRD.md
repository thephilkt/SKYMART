# Product Requirements Document (PRD)

## SKYMART

| รายการ | รายละเอียด |
|---|---|
| ชื่อโครงการ | SKYMART |
| ประเภทผลิตภัณฑ์ | Responsive Web Application สำหรับซื้อและขายสินค้าทั่วไป |
| เวอร์ชันเอกสาร | 1.0 (Initial Draft) |
| วันที่จัดทำ | 2 ตุลาคม 2026 |
| สถานะ | Draft — รอยืนยัน Business Requirements |
| ผู้ใช้งานหลัก | ผู้ซื้อ/ผู้ขาย (User), ผู้ดูแลระบบ (Admin) |

---

## 1. Executive Summary

ผลิตภัณฑ์นี้คือแพลตฟอร์ม Marketplace สำหรับซื้อและขายสินค้าทั่วไป มีรูปแบบการใช้งานใกล้เคียงแพลตฟอร์มอย่าง Shopee แต่ใช้แนวทางการออกแบบที่สะอาด เรียบง่าย พรีเมียม และให้ความสำคัญกับรายละเอียดของประสบการณ์ใช้งานในลักษณะเดียวกับผลิตภัณฑ์ดิจิทัลของ Apple

ระบบรองรับผู้ใช้งาน 2 Role ได้แก่:

1. **User** — บัญชีเดียวสามารถทำหน้าที่ทั้งผู้ซื้อและผู้ขาย สามารถค้นหาและซื้อสินค้า ลงขายสินค้า จัดการตะกร้า ชำระเงิน ติดตามคำสั่งซื้อ ดูประวัติ และจัดการรายการขายของตนเอง
2. **Admin** — ดูแลระบบหลังบ้าน ตรวจสอบภาพรวมธุรกิจ จัดการผู้ใช้ สินค้า หมวดหมู่ คำสั่งซื้อ การชำระเงิน โปรโมชัน เนื้อหา และรายงาน

เป้าหมายของ MVP คือทำให้กระบวนการหลักตั้งแต่ “ค้นหาสินค้า → สั่งซื้อ → ชำระเงิน → ผู้ขายจัดส่ง → ผู้ซื้อได้รับสินค้า → คำสั่งซื้อเสร็จสมบูรณ์” ทำงานได้ครบถ้วน ปลอดภัย และใช้งานง่ายทั้งบนมือถือและเดสก์ท็อป

---

## 2. Background / Problem Statement

ผู้ซื้อออนไลน์ต้องการค้นหา เปรียบเทียบ และซื้อสินค้าจากผู้ขายหลายรายได้อย่างสะดวก ขณะที่ผู้ขายต้องการช่องทางลงสินค้า จัดการสต็อก และติดตามคำสั่งซื้อโดยไม่ต้องสร้างร้านค้าออนไลน์เอง ระบบจึงต้องเป็นตัวกลางที่ลดความซับซ้อนของทั้งสองฝั่ง พร้อมมีเครื่องมือให้ Admin ควบคุมคุณภาพสินค้า ผู้ใช้งาน คำสั่งซื้อ และธุรกรรม

ปัญหาที่ผลิตภัณฑ์ต้องแก้ ได้แก่:

- ผู้ซื้อค้นหาสินค้าที่ตรงความต้องการได้ยากเมื่อข้อมูลสินค้าไม่เป็นมาตรฐาน
- ขั้นตอนการซื้อและชำระเงินที่ซับซ้อนทำให้ผู้ใช้ละทิ้งตะกร้า
- ผู้ขายขาดเครื่องมือจัดการสินค้า สต็อก และคำสั่งซื้อที่ใช้งานง่าย
- ผู้ซื้อและผู้ขายขาดความชัดเจนเกี่ยวกับสถานะคำสั่งซื้อ
- Admin ต้องมีข้อมูลภาพรวมและเครื่องมือจัดการเหตุผิดปกติจากจุดเดียว
- Marketplace ต้องสร้างความน่าเชื่อถือผ่านข้อมูลสินค้า รีวิว สถานะการชำระเงิน และประวัติคำสั่งซื้อที่ตรวจสอบได้

---

## 3. Product Vision

สร้าง Marketplace ที่ทำให้การซื้อและขายสินค้าทั่วไป “ง่าย ชัดเจน และน่าเชื่อถือ” โดยนำความครบถ้วนของแพลตฟอร์ม E-commerce มารวมกับประสบการณ์ใช้งานที่เรียบหรู ลดสิ่งรบกวน และเน้นสินค้าเป็นศูนย์กลาง

### 3.1 Design Principles

- **Simple first:** ผู้ใช้เข้าใจสิ่งที่ต้องทำได้ทันที ลดขั้นตอนและข้อความที่ไม่จำเป็น
- **Product focused:** ใช้ภาพสินค้า ข้อมูลสำคัญ ราคา และ CTA เป็นองค์ประกอบหลัก
- **Clear feedback:** ทุก Action ต้องมีสถานะตอบกลับ เช่น Loading, Success, Error และ Empty state
- **Trust by design:** แสดงข้อมูลร้านค้า รีวิว ราคา ค่าจัดส่ง และสถานะคำสั่งซื้ออย่างโปร่งใส
- **Consistent:** รูปแบบ Component, Navigation, Typography และ Interaction ต้องสม่ำเสมอทั้งระบบ
- **Accessible:** รองรับ Keyboard, Screen reader, Contrast และ Responsive layout

---

## 4. Goals and Success Metrics

### 4.1 Business Goals

- เปิดช่องทางให้ผู้ใช้สามารถซื้อและขายสินค้าในระบบเดียวกัน
- เพิ่มจำนวนคำสั่งซื้อที่ชำระเงินสำเร็จ
- ลดอัตราการละทิ้งตะกร้าและขั้นตอน Checkout
- ทำให้ผู้ขายจัดการสินค้าและคำสั่งซื้อได้ด้วยตนเอง
- ทำให้ Admin ตรวจสอบและแก้ไขปัญหาการซื้อขายได้อย่างรวดเร็ว
- วางโครงสร้างระบบให้รองรับการเพิ่ม Payment, Shipping และ Promotion ในอนาคต

### 4.2 Product KPIs

ค่าตัวเลขเป้าหมายควรกำหนดอีกครั้งหลังมี Baseline จากการใช้งานจริง

| KPI | นิยาม | เป้าหมายเบื้องต้นหลังเปิดใช้งาน 3 เดือน |
|---|---|---:|
| Visitor-to-signup conversion | ผู้สมัครสมาชิก / ผู้เยี่ยมชมไม่ซ้ำ | ≥ 5% |
| Product-to-cart conversion | Session ที่เพิ่มสินค้า / Session ที่ดูสินค้า | ≥ 8% |
| Checkout completion rate | คำสั่งซื้อที่ชำระสำเร็จ / ผู้เริ่ม Checkout | ≥ 65% |
| Cart abandonment rate | ตะกร้าที่ไม่จบด้วยคำสั่งซื้อ / ตะกร้าที่มีสินค้า | ≤ 70% |
| Payment success rate | ธุรกรรมสำเร็จ / ความพยายามชำระเงิน | ≥ 95% (ไม่รวมผู้ใช้ยกเลิก) |
| Order cancellation rate | คำสั่งซื้อที่ถูกยกเลิก / คำสั่งซื้อทั้งหมด | ≤ 10% |
| On-time shipment rate | ออเดอร์ที่ผู้ขายส่งภายใน SLA / ออเดอร์ที่ต้องจัดส่ง | ≥ 90% |
| Admin resolution time | เวลาเฉลี่ยในการแก้คำร้อง/ข้อพิพาท | กำหนดหลังออกแบบ Support Process |

### 4.3 User Success Criteria

- ผู้ซื้อค้นหาและสั่งซื้อสินค้าได้โดยไม่ต้องขอความช่วยเหลือ
- ผู้ซื้อเห็นยอดชำระทั้งหมดก่อนยืนยันคำสั่งซื้อ
- ผู้ขายลงสินค้าและอัปเดตสต็อกได้อย่างถูกต้อง
- ผู้ขายทราบว่าต้องดำเนินการอะไรกับแต่ละคำสั่งซื้อ
- Admin ตรวจสอบย้อนหลังได้ว่าใครเปลี่ยนสถานะหรือข้อมูลสำคัญเมื่อใด

---

## 5. Scope and Assumptions

### 5.1 Assumptions

1. ระบบเป็น **Multi-vendor Marketplace** ผู้ขายหลายรายสามารถลงสินค้าได้
2. มีเพียง 2 Role ตาม Requirement คือ `User` และ `Admin`
3. `User` บัญชีเดียวสามารถเป็นทั้งผู้ซื้อและผู้ขาย โดยฟังก์ชันผู้ขายจะเปิดใช้หลังกรอกข้อมูลร้านค้าที่จำเป็น
4. สินค้าเป็นสินค้าทั่วไปที่จับต้องได้และต้องจัดส่ง ไม่รวมสินค้าดิจิทัล บริการ หรือการจองใน MVP
5. MVP รองรับหนึ่งประเทศ หนึ่งสกุลเงิน และหนึ่งภาษาหลักก่อน โดยค่าเริ่มต้นเสนอเป็นประเทศไทย ภาษาไทย และเงินบาท (THB)
6. Checkout สามารถมีสินค้าจากหลายร้าน แต่ระบบต้องแยก Sub-order ตามร้านเพื่อให้แต่ละผู้ขายจัดการเฉพาะรายการของตน
7. Payment และ Shipping เชื่อมต่อผ่านผู้ให้บริการภายนอก รายชื่อ Provider ต้องยืนยันในขั้น Technical Design
8. Admin เป็นเจ้าหน้าที่ภายในและไม่เปิดให้สมัครเอง
9. การคืนเงินต้องอ้างอิงสถานะจาก Payment Provider และต้องมี Audit log
10. รูปแบบ Commission, Settlement และการโอนเงินให้ผู้ขายยังเป็นประเด็นที่ต้องยืนยันก่อน Production

### 5.2 MVP — In Scope

- สมัครสมาชิก เข้าสู่ระบบ ออกจากระบบ และลืมรหัสผ่าน
- โปรไฟล์ผู้ใช้ ที่อยู่จัดส่ง และข้อมูลร้านค้า
- หน้าหลัก หมวดหมู่ ค้นหา Filter และ Sort
- รายละเอียดสินค้า รูปภาพ ตัวเลือกสินค้า ราคา สต็อก และรีวิว
- Wishlist
- ตะกร้าสินค้าและ Checkout
- คูปองพื้นฐาน
- Payment integration อย่างน้อย 1 ช่องทาง
- สร้างคำสั่งซื้อ แยกคำสั่งซื้อตามร้าน และติดตามสถานะ
- ประวัติการซื้อและรายละเอียดคำสั่งซื้อ
- Seller Center ภายใต้ Role User: จัดการร้าน สินค้า สต็อก และคำสั่งขาย
- รีวิวสินค้าเมื่อคำสั่งซื้อสำเร็จ
- การแจ้งเตือนในระบบและอีเมลสำหรับเหตุการณ์สำคัญ
- Admin Dashboard และการจัดการผู้ใช้ สินค้า หมวดหมู่ คำสั่งซื้อ Payment คูปอง รีวิว และ Banner
- Audit log สำหรับการกระทำสำคัญของ Admin

### 5.3 Out of Scope for MVP

- Live commerce, Livestream และ Flash sale แบบ Real-time
- Chat ระหว่างผู้ซื้อและผู้ขายแบบ Real-time
- ระบบประมูลสินค้า
- Subscription และ Membership แบบเสียเงิน
- Loyalty point / Coin / Gamification
- Cross-border, Multi-currency และ Multi-language
- ระบบคลังสินค้าและ Fulfillment ของแพลตฟอร์ม
- AI recommendation ขั้นสูงหรือ Dynamic pricing
- Native mobile application
- Social login หลาย Provider (สามารถเพิ่มภายหลัง)
- Affiliate และ Referral program
- การขายสินค้าดิจิทัล บริการ หรือการจอง

---

## 6. User Roles and Permissions

### 6.1 Guest (สถานะก่อนเข้าสู่ระบบ ไม่ถือเป็น Role ในฐานข้อมูล)

Guest สามารถดูหน้า Public ค้นหา ดูรายละเอียดสินค้าและร้านค้าได้ แต่ต้องเข้าสู่ระบบเมื่อต้องการเพิ่ม Wishlist, Checkout, ซื้อสินค้า, รีวิว หรือลงขายสินค้า

### 6.2 User

User มีสอง Context ภายใต้บัญชีเดียว:

- **Buyer context:** ซื้อสินค้า จัดการตะกร้า ชำระเงิน ติดตามและรีวิวคำสั่งซื้อ
- **Seller context:** สร้างร้าน ลงสินค้า จัดการสต็อก รับและดำเนินการคำสั่งขาย

หลักการ Permission สำคัญ:

- User อ่าน/แก้ไขได้เฉพาะข้อมูลส่วนตัว ที่อยู่ ร้านค้า และสินค้าของตน
- ผู้ขายเห็นเฉพาะรายการย่อยของร้านตนเอง ไม่เห็นข้อมูลสินค้าหรือยอดขายของร้านอื่น
- ผู้ขายไม่สามารถแก้ราคา จำนวน หรือรายการสินค้าในคำสั่งซื้อที่ถูกสร้างแล้ว
- ผู้ซื้อรีวิวได้เฉพาะสินค้าที่ซื้อและคำสั่งซื้ออยู่ในสถานะที่อนุญาต
- User ไม่สามารถเรียกใช้ Admin APIs หรือเข้าหน้า `/admin/*`

### 6.3 Admin

Admin เข้าถึงระบบหลังบ้านเพื่อดูแล Marketplace โดยใช้หลัก Least Privilege แม้ MVP จะมี Admin Role เดียว แต่ควรออกแบบโครงสร้างให้รองรับ Permission ย่อยในอนาคต เช่น Super Admin, Operations, Catalog, Finance และ Support

### 6.4 Access Matrix

| Module / Page | Guest | User | Admin |
|---|:---:|:---:|:---:|
| หน้าแรก / หมวดหมู่ / ค้นหา | ดู | ดู | ดู |
| รายละเอียดสินค้า / ร้านค้า | ดู | ดู | ดู |
| Wishlist | ต้องเข้าสู่ระบบ | จัดการของตนเอง | ไม่จำเป็นในหลังบ้าน |
| ตะกร้า / Checkout | เพิ่มตะกร้าแบบชั่วคราวได้ | ใช้งานครบ | ไม่ใช้ในหลังบ้าน |
| ชำระเงิน | ไม่ได้ | ของตนเอง | ตรวจสอบสถานะ |
| ประวัติการซื้อ | ไม่ได้ | ของตนเอง | ดูทั้งหมดตามสิทธิ์ |
| รีวิวสินค้า | อ่าน | สร้าง/แก้ไขของตนตามเงื่อนไข | ซ่อน/ลบ/Moderate |
| โปรไฟล์ / ที่อยู่ | ไม่ได้ | ของตนเอง | ตรวจสอบ/ระงับบัญชี |
| Seller Center | ไม่ได้ | ร้านและข้อมูลของตน | ตรวจสอบทั้งหมด |
| สินค้า / สต็อกฝั่งผู้ขาย | ไม่ได้ | CRUD ของตน | ดู/อนุมัติ/ซ่อน/แก้สถานะ |
| คำสั่งขาย | ไม่ได้ | เฉพาะ Sub-order ของร้านตน | ดูและจัดการทั้งหมด |
| Admin Dashboard | ไม่ได้ | ไม่ได้ | ได้ |
| จัดการหมวดหมู่ / Banner / คูปองระบบ | ไม่ได้ | ไม่ได้ | CRUD |
| Audit log / Reports | ไม่ได้ | ไม่ได้ | ดู/ส่งออกตามสิทธิ์ |

---

## 7. Personas

### 7.1 Buyer — ผู้ซื้อทั่วไป

- ใช้มือถือเป็นหลัก ต้องการค้นหาและเปรียบเทียบสินค้าอย่างรวดเร็ว
- ให้ความสำคัญกับราคา ค่าจัดส่ง รีวิว ความน่าเชื่อถือ และวันได้รับสินค้า
- ต้องการ Checkout สั้นและเห็นค่าใช้จ่ายทั้งหมดก่อนชำระ
- ต้องการติดตามคำสั่งซื้อและเข้าถึงประวัติย้อนหลังได้ง่าย

### 7.2 Seller — ผู้ขายรายย่อย (อยู่ภายใต้ User Role)

- ต้องการเริ่มขายโดยไม่ต้องมีความรู้ด้านเทคนิค
- ต้องการลงสินค้า ใส่รูป ราคา ตัวเลือก และสต็อกได้ง่าย
- ต้องการเห็นเฉพาะออเดอร์ที่ต้องดำเนินการและ Deadline ที่ชัดเจน
- ต้องการข้อมูลยอดขายและสถานะการจ่ายเงินที่ตรวจสอบได้

### 7.3 Marketplace Admin

- ต้องการภาพรวม GMV, Orders, Users, Products และปัญหาที่ต้องดำเนินการ
- ต้องสามารถค้นหาคำสั่งซื้อหรือผู้ใช้จากข้อมูลสำคัญได้เร็ว
- ต้องการระงับสินค้า/ผู้ใช้ที่ผิดนโยบายโดยไม่ลบหลักฐาน
- ต้องการ Audit trail และ Export ข้อมูลเพื่อการตรวจสอบ

---

## 8. Information Architecture / Sitemap

### 8.1 Public Storefront

- `/` หน้าแรก
- `/search` ผลการค้นหา
- `/categories` หมวดหมู่ทั้งหมด
- `/category/:slug` หน้าหมวดหมู่
- `/product/:slug` รายละเอียดสินค้า
- `/shop/:slug` หน้าร้านค้า
- `/promotions` โปรโมชัน
- `/help` ศูนย์ช่วยเหลือ
- `/terms`, `/privacy`, `/seller-policy`, `/return-policy`

### 8.2 Authentication

- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`
- `/verify-email`

### 8.3 User — Buyer Area

- `/cart`
- `/checkout`
- `/checkout/payment`
- `/checkout/result`
- `/account/profile`
- `/account/addresses`
- `/account/orders`
- `/account/orders/:orderId`
- `/account/wishlist`
- `/account/reviews`
- `/account/notifications`
- `/account/security`

### 8.4 User — Seller Center

- `/seller/onboarding`
- `/seller/dashboard`
- `/seller/shop`
- `/seller/products`
- `/seller/products/new`
- `/seller/products/:productId/edit`
- `/seller/orders`
- `/seller/orders/:subOrderId`
- `/seller/inventory`
- `/seller/promotions`
- `/seller/finance`
- `/seller/settings`

### 8.5 Admin Back Office

- `/admin/login`
- `/admin/dashboard`
- `/admin/users`
- `/admin/users/:userId`
- `/admin/sellers`
- `/admin/products`
- `/admin/categories`
- `/admin/orders`
- `/admin/orders/:orderId`
- `/admin/payments`
- `/admin/refunds`
- `/admin/promotions`
- `/admin/reviews`
- `/admin/content`
- `/admin/reports`
- `/admin/audit-logs`
- `/admin/settings`

---

## 9. Functional Requirements

ลำดับความสำคัญใช้ MoSCoW: `Must`, `Should`, `Could`, `Won't (MVP)`

### 9.1 Authentication and Account

| ID | Requirement | Priority |
|---|---|---|
| AUTH-01 | สมัครสมาชิกด้วยอีเมล เบอร์โทรศัพท์ หรือวิธีที่ Business ยืนยัน | Must |
| AUTH-02 | ตรวจสอบรูปแบบอีเมล/เบอร์โทรและป้องกันข้อมูลซ้ำ | Must |
| AUTH-03 | ยืนยันตัวตนด้วย Email verification หรือ OTP ตามช่องทางสมัคร | Must |
| AUTH-04 | เข้าสู่ระบบ ออกจากระบบ และคง Session อย่างปลอดภัย | Must |
| AUTH-05 | ลืมรหัสผ่านและตั้งรหัสผ่านใหม่ด้วย Token ที่หมดอายุได้ | Must |
| AUTH-06 | จำกัดความถี่การ Login/OTP และล็อกชั่วคราวเมื่อผิดซ้ำ | Must |
| AUTH-07 | User แก้ไขชื่อ รูปโปรไฟล์ เบอร์โทร และข้อมูลพื้นฐานของตนได้ | Must |
| AUTH-08 | User จัดการที่อยู่หลายรายการและตั้งค่าเริ่มต้นได้ | Must |
| AUTH-09 | User เปลี่ยนรหัสผ่านและออกจากทุกอุปกรณ์ได้ | Should |
| AUTH-10 | Admin ระงับ/เปิดใช้งานบัญชีโดยต้องระบุเหตุผล | Must |

### 9.2 Homepage and Discovery

| ID | Requirement | Priority |
|---|---|---|
| DISC-01 | หน้าแรกแสดง Hero banner, หมวดหมู่, สินค้าแนะนำ, สินค้าขายดี และโปรโมชัน | Must |
| DISC-02 | Admin จัดลำดับและกำหนดช่วงเวลาแสดง Banner/Section ได้ | Should |
| DISC-03 | Search ด้วยชื่อสินค้า คำอธิบาย SKU หมวดหมู่ และชื่อร้าน | Must |
| DISC-04 | Search แนะนำคำค้นและสินค้าขณะพิมพ์ | Should |
| DISC-05 | Filter ตามหมวดหมู่ ช่วงราคา คะแนน ร้านค้า และสถานะมีสินค้า | Must |
| DISC-06 | Sort ตามความเกี่ยวข้อง ล่าสุด ราคาต่ำ-สูง ราคาสูง-ต่ำ และยอดขาย | Must |
| DISC-07 | รองรับ Pagination หรือ Infinite scroll โดย URL/State ย้อนกลับได้ | Must |
| DISC-08 | Product card แสดงรูป ชื่อ ราคา ส่วนลด คะแนน ยอดขาย และร้านค้า | Must |
| DISC-09 | เมื่อไม่พบผลลัพธ์ ต้องแนะนำการแก้คำค้นหรือสินค้าใกล้เคียง | Should |

### 9.3 Product Detail

| ID | Requirement | Priority |
|---|---|---|
| PDP-01 | แสดงรูปหลายภาพและขยายดูรายละเอียดได้ | Must |
| PDP-02 | แสดงชื่อ ราคา ราคาก่อนลด ส่วนลด สต็อก และสถานะพร้อมขาย | Must |
| PDP-03 | รองรับ Variant เช่น สี/ขนาด โดยแต่ละ Variant มี SKU ราคาและสต็อกได้ | Must |
| PDP-04 | แสดงรายละเอียด คุณลักษณะ หมวดหมู่ น้ำหนัก และข้อมูลจัดส่ง | Must |
| PDP-05 | User เลือก Variant/จำนวนก่อนเพิ่มตะกร้าหรือซื้อทันที | Must |
| PDP-06 | ห้ามเลือกจำนวนเกินสต็อกหรือข้อจำกัดต่อคำสั่งซื้อ | Must |
| PDP-07 | แสดงข้อมูลร้านค้า คะแนนร้าน และลิงก์ไปหน้าร้าน | Must |
| PDP-08 | แสดงคะแนนเฉลี่ย รีวิว และรูปจากรีวิว | Must |
| PDP-09 | แสดงสินค้าที่เกี่ยวข้องโดยใช้หมวดหมู่/Tag ใน MVP | Should |
| PDP-10 | User เพิ่ม/ลบ Wishlist ได้ | Must |

### 9.4 Cart

| ID | Requirement | Priority |
|---|---|---|
| CART-01 | เพิ่มสินค้า/Variant พร้อมจำนวนลงตะกร้าได้ | Must |
| CART-02 | ตะกร้าจัดกลุ่มสินค้าตามร้านค้า | Must |
| CART-03 | ปรับจำนวน ลบ หรือเลือกเฉพาะบางรายการเพื่อ Checkout ได้ | Must |
| CART-04 | ตรวจราคา โปรโมชัน และสต็อกล่าสุดก่อนเข้าสู่ Checkout | Must |
| CART-05 | แจ้งรายการที่ราคาเปลี่ยน หมดสต็อก หรือไม่พร้อมขาย | Must |
| CART-06 | คำนวณ Subtotal, Discount และยอดประมาณการแบบ Real-time | Must |
| CART-07 | Guest cart ถูกเก็บชั่วคราวและ Merge อย่างเหมาะสมหลัง Login | Should |
| CART-08 | ตะกร้าคงอยู่ข้าม Session สำหรับ User | Must |

### 9.5 Checkout and Payment

| ID | Requirement | Priority |
|---|---|---|
| CHK-01 | Checkout ต้องให้เลือก/เพิ่มที่อยู่จัดส่ง | Must |
| CHK-02 | เลือกวิธีจัดส่งแยกตามร้านเมื่อจำเป็น | Must |
| CHK-03 | แสดงสินค้า ราคา ส่วนลด ค่าจัดส่ง และยอดสุทธิก่อนยืนยัน | Must |
| CHK-04 | ใส่คูปองและตรวจเงื่อนไข เช่น วันหมดอายุ ยอดขั้นต่ำ ร้าน/หมวดหมู่ | Must |
| CHK-05 | เลือกช่องทางชำระเงินอย่างน้อย 1 ช่องทาง | Must |
| CHK-06 | ระบบสร้าง Order number ที่ไม่ซ้ำและ Sub-order แยกตามร้าน | Must |
| CHK-07 | กันสต็อกเมื่อเริ่มชำระเป็นเวลาที่กำหนด และคืนสต็อกเมื่อหมดเวลา/ล้มเหลว | Must |
| CHK-08 | Payment callback/webhook ต้องตรวจลายเซ็นและประมวลผลแบบ Idempotent | Must |
| CHK-09 | ห้ามเชื่อถือสถานะสำเร็จจากหน้า Client เพียงอย่างเดียว | Must |
| CHK-10 | แสดงผลสำเร็จ/รอดำเนินการ/ล้มเหลว พร้อม Next action | Must |
| CHK-11 | รองรับการ Retry payment โดยไม่สร้างยอดซ้ำ | Should |
| CHK-12 | ส่งใบยืนยันคำสั่งซื้อและหลักฐานการชำระทาง In-app/Email | Must |

### 9.6 Order Management — Buyer

| ID | Requirement | Priority |
|---|---|---|
| BUY-ORD-01 | แสดงรายการคำสั่งซื้อ แยกแท็บตามสถานะ | Must |
| BUY-ORD-02 | ค้นหาด้วย Order number ชื่อสินค้า หรือชื่อร้าน | Should |
| BUY-ORD-03 | รายละเอียดแสดงสินค้า ที่อยู่ Payment summary สถานะ และ Timeline | Must |
| BUY-ORD-04 | ผู้ซื้อยกเลิกได้เฉพาะสถานะที่กำหนด พร้อมเลือกเหตุผล | Must |
| BUY-ORD-05 | ผู้ซื้อยืนยันรับสินค้าได้หลังมีสถานะจัดส่งแล้ว | Must |
| BUY-ORD-06 | ระบบปิดคำสั่งซื้ออัตโนมัติหลังส่งสำเร็จครบช่วงเวลาที่กำหนด | Should |
| BUY-ORD-07 | ผู้ซื้อร้องขอคืนสินค้า/คืนเงินได้ภายใน Policy | Should |
| BUY-ORD-08 | ผู้ซื้อสั่งซื้อซ้ำจากรายการเดิมได้ โดยตรวจราคาและสต็อกใหม่ | Could |

### 9.7 Seller Onboarding and Shop

| ID | Requirement | Priority |
|---|---|---|
| SELL-01 | User เปิดใช้งานร้านด้วยชื่อร้าน Slug โลโก้ รายละเอียด ที่อยู่รับสินค้า/คืนสินค้า และข้อมูลติดต่อ | Must |
| SELL-02 | ระบบตรวจชื่อ/Slug ร้านไม่ให้ซ้ำ | Must |
| SELL-03 | เก็บข้อมูลยืนยันตัวตนและข้อมูลรับเงินตามข้อกำหนด Business/กฎหมาย | Must ก่อน Production |
| SELL-04 | ร้านมีสถานะ Draft, Pending review, Active, Suspended, Rejected | Must |
| SELL-05 | ผู้ขายแก้ข้อมูลร้านได้ โดยข้อมูลสำคัญอาจต้องตรวจซ้ำ | Should |
| SELL-06 | Admin อนุมัติ ปฏิเสธ หรือระงับร้านพร้อมเหตุผล | Must |

### 9.8 Seller Product and Inventory Management

| ID | Requirement | Priority |
|---|---|---|
| CAT-01 | ผู้ขายสร้าง Draft สินค้าพร้อมชื่อ หมวดหมู่ รายละเอียด ราคา รูป และสต็อก | Must |
| CAT-02 | รองรับ Variant และ SKU ไม่ซ้ำภายในร้าน | Must |
| CAT-03 | อัปโหลดรูปหลายรูป กำหนดรูปหลัก จัดลำดับ และลบรูปได้ | Must |
| CAT-04 | ตรวจชนิด ขนาด และจำนวนไฟล์ พร้อมบีบอัด/สร้าง Thumbnail | Must |
| CAT-05 | สินค้ามีสถานะ Draft, Pending review, Active, Rejected, Hidden, Archived | Must |
| CAT-06 | การเผยแพร่สินค้าต้องผ่าน Validation และ Moderation ตาม Policy | Must |
| CAT-07 | ผู้ขายแก้ ราคา สต็อก รายละเอียด และสถานะขายได้ | Must |
| CAT-08 | ระบบบันทึก Stock movement จากการขาย ยกเลิก คืนสินค้า และการปรับมือ | Must |
| CAT-09 | แจ้งเตือนสินค้าที่สต็อกต่ำตาม Threshold | Should |
| CAT-10 | ผู้ขาย Archive สินค้าได้ แต่ห้ามลบข้อมูลที่มีประวัติคำสั่งซื้อ | Must |

### 9.9 Seller Order Management

| ID | Requirement | Priority |
|---|---|---|
| SORD-01 | ผู้ขายเห็นเฉพาะ Sub-order ของร้านตนเอง | Must |
| SORD-02 | กรอง/ค้นหาตามสถานะ วันที่ Order number และ Tracking number | Must |
| SORD-03 | ผู้ขายยืนยันรับคำสั่งซื้อ เตรียมสินค้า และระบุข้อมูลจัดส่ง | Must |
| SORD-04 | ระบบตรวจ Transition ของสถานะ ป้องกันการข้ามขั้นที่ไม่อนุญาต | Must |
| SORD-05 | ผู้ขายพิมพ์ใบรายการสินค้า/ใบจัดส่งได้ | Should |
| SORD-06 | แจ้งเตือนออเดอร์ใหม่และออเดอร์ใกล้เกิน SLA | Must |
| SORD-07 | ผู้ขายยกเลิกได้เฉพาะตาม Policy และต้องเลือกเหตุผล | Must |
| SORD-08 | Seller Dashboard แสดงยอดขาย จำนวนออเดอร์ งานที่ต้องทำ และสินค้าสต็อกต่ำ | Must |

### 9.10 Reviews and Ratings

| ID | Requirement | Priority |
|---|---|---|
| REV-01 | User รีวิวได้เฉพาะ Order item ที่สำเร็จและยังไม่เกินเวลาที่กำหนด | Must |
| REV-02 | รีวิวประกอบด้วยคะแนน 1–5 ดาว ข้อความ และรูปภาพ (ถ้ามี) | Must |
| REV-03 | หนึ่ง Order item มีรีวิวหลักได้หนึ่งรายการ | Must |
| REV-04 | ผู้รีวิวแก้ไขได้ภายในช่วงเวลาที่กำหนด | Should |
| REV-05 | ผู้ขายตอบรีวิวได้หนึ่งครั้งหรือเป็น Thread ตาม Policy | Could |
| REV-06 | Admin ซ่อน/ลบรีวิวที่ผิดนโยบายพร้อมเหตุผลและ Audit log | Must |
| REV-07 | คะแนนเฉลี่ยต้องคำนวณใหม่อย่างถูกต้องเมื่อรีวิวถูกซ่อน/คืนสถานะ | Must |

### 9.11 Promotions and Coupons

| ID | Requirement | Priority |
|---|---|---|
| PRO-01 | Admin สร้างคูปองส่วนลดแบบจำนวนเงินหรือเปอร์เซ็นต์ | Must |
| PRO-02 | กำหนดช่วงเวลา ยอดขั้นต่ำ ส่วนลดสูงสุด จำนวนสิทธิ์ และสิทธิ์ต่อ User | Must |
| PRO-03 | จำกัดคูปองตามสินค้า หมวดหมู่ ร้าน หรือผู้ใช้ได้ตามประเภทคูปอง | Should |
| PRO-04 | ตรวจเงื่อนไขทั้งตอน Apply และก่อนสร้างคำสั่งซื้อ | Must |
| PRO-05 | ป้องกันการใช้สิทธิ์เกินจำนวนภายใต้ Concurrent checkout | Must |
| PRO-06 | Seller coupon และ Platform coupon ใช้ร่วมกันได้หรือไม่ ต้องกำหนดด้วย Promotion rule | Should |

### 9.12 Notifications

| ID | Requirement | Priority |
|---|---|---|
| NOTI-01 | In-app notification สำหรับเหตุการณ์สำคัญ | Must |
| NOTI-02 | Email แจ้งสมัครสำเร็จ รีเซ็ตรหัสผ่าน ชำระสำเร็จ และเปลี่ยนสถานะคำสั่งซื้อ | Must |
| NOTI-03 | ผู้ใช้ทำเครื่องหมายอ่านแล้ว/อ่านทั้งหมดได้ | Must |
| NOTI-04 | Notification ต้องลิงก์ไปยังรายการที่เกี่ยวข้องและตรวจสิทธิ์ก่อนแสดง | Must |
| NOTI-05 | รองรับ Preference สำหรับข้อความการตลาดแยกจาก Transactional message | Should |

### 9.13 Admin Dashboard and Operations

| ID | Requirement | Priority |
|---|---|---|
| ADM-01 | Dashboard แสดง GMV, Net sales, Orders, AOV, Users, Active sellers และสินค้า | Must |
| ADM-02 | แสดงกราฟตามช่วงเวลาและเปรียบเทียบช่วงก่อนหน้า | Should |
| ADM-03 | แสดงรายการที่ต้องดำเนินการ เช่น ร้าน/สินค้ารออนุมัติ Payment ผิดปกติ และคืนเงิน | Must |
| ADM-04 | ค้นหา Filter Sort และ Export รายการสำคัญเป็น CSV | Must |
| ADM-05 | Admin ดูรายละเอียดผู้ใช้ ร้าน สินค้า คำสั่งซื้อ Payment และ Timeline ได้ | Must |
| ADM-06 | Admin ระงับ/คืนสถานะ User, Shop และ Product พร้อมเหตุผล | Must |
| ADM-07 | Admin แก้สถานะ Order ได้เฉพาะกรณีที่ Policy อนุญาต พร้อมเหตุผลและ Audit log | Must |
| ADM-08 | จัดการ Category แบบลำดับชั้น ชื่อ Slug รูป และสถานะ | Must |
| ADM-09 | จัดการ Banner, Featured section และหน้า Content พื้นฐาน | Should |
| ADM-10 | จัดการ Coupon/Promotion และตรวจ Usage ได้ | Must |
| ADM-11 | ตรวจ Payment event, Provider reference และ Refund status ได้ | Must |
| ADM-12 | ทุกการแก้ข้อมูลสำคัญบันทึกผู้กระทำ เวลา ค่าเดิม ค่าใหม่ และเหตุผล | Must |

---

## 10. Core User Flows

### 10.1 Purchase Flow

1. Guest/User เข้าหน้าแรก ค้นหาหรือเลือกหมวดหมู่
2. เปิดหน้ารายละเอียดสินค้าและตรวจราคา Variant สต็อก ร้านค้า และรีวิว
3. เลือก Variant/จำนวน แล้วเพิ่มลงตะกร้าหรือกดซื้อทันที
4. ระบบตรวจสต็อกและราคาอีกครั้ง
5. หากยังไม่ Login ระบบพาไป Login แล้วกลับมายัง Checkout
6. User เลือกที่อยู่ วิธีจัดส่ง และคูปอง
7. ระบบแสดง Order summary และยอดสุทธิ
8. User เลือก Payment และยืนยัน
9. ระบบสร้าง Order/Sub-order, กันสต็อก และเริ่ม Payment transaction
10. Backend ยืนยันผลจาก Payment Provider
11. เมื่อสำเร็จ ระบบตัดสต็อก บันทึก Payment ส่งแจ้งเตือน และแสดงคำสั่งซื้อ
12. ผู้ขายรับคำสั่งซื้อ เตรียมและส่งสินค้า
13. ผู้ซื้อดู Tracking และยืนยันรับสินค้า หรือระบบยืนยันอัตโนมัติตาม Policy
14. Order เสร็จสมบูรณ์และเปิดให้รีวิว

### 10.2 Seller Onboarding Flow

1. User เลือก “เริ่มขายสินค้า”
2. กรอกข้อมูลร้าน ที่อยู่ ข้อมูลติดต่อ ข้อมูลยืนยันตัวตน และข้อมูลรับเงิน
3. ยอมรับ Seller policy
4. ส่งคำขอเปิดร้าน
5. Admin ตรวจสอบและอนุมัติ/ปฏิเสธพร้อมเหตุผล
6. เมื่ออนุมัติ User เข้าถึง Seller Center และเผยแพร่สินค้าได้

### 10.3 Product Listing Flow

1. ผู้ขายสร้างสินค้าใหม่ในสถานะ Draft
2. กรอกข้อมูลพื้นฐาน หมวดหมู่ รูป รายละเอียด Variant ราคา สต็อก น้ำหนัก และการจัดส่ง
3. ระบบตรวจ Required field และความสมเหตุสมผลของข้อมูล
4. ผู้ขาย Preview และส่งตรวจ
5. Admin/Rule engine อนุมัติหรือปฏิเสธพร้อมเหตุผล
6. สินค้าที่ผ่านจะเป็น Active และปรากฏใน Search/Category
7. การแก้ข้อมูลสำคัญบางชนิดอาจทำให้กลับสู่ Pending review ตาม Policy

### 10.4 Fulfillment Flow

1. Seller ได้รับแจ้งเตือนเมื่อ Payment สำเร็จ
2. Seller ยืนยันรับออเดอร์ภายใน SLA
3. Seller เตรียมและส่งสินค้า พร้อมกรอก/รับ Tracking number
4. ระบบเปลี่ยนสถานะและแจ้ง Buyer
5. Shipping provider หรือ Seller อัปเดตสถานะการจัดส่ง
6. Buyer ยืนยันรับสินค้า หรือระบบปิดอัตโนมัติหลัง Delivered ตามระยะเวลา
7. ระบบเปลี่ยนเป็น Completed และดำเนินการ Settlement ตามกฎธุรกิจ

### 10.5 Cancellation / Refund Flow

1. Buyer, Seller หรือ Admin ขอ Cancel/Refund ตามสิทธิ์ของสถานะปัจจุบัน
2. ระบบบังคับเลือกเหตุผลและเก็บหลักฐานถ้าจำเป็น
3. หากยังไม่ชำระ ให้ยกเลิกและคืน Stock reservation
4. หากชำระแล้ว ให้สร้าง Refund request และส่งไป Payment Provider
5. Webhook ยืนยันผล Refund แบบ Idempotent
6. ระบบอัปเดตยอด สต็อก คูปอง Settlement และ Timeline ตาม Policy
7. แจ้งผลให้ Buyer, Seller และ Admin ที่เกี่ยวข้อง

---

## 11. Business Rules

### 11.1 Pricing

- ราคาที่แสดงต้องมาจาก Variant ที่เลือก หรือราคาเริ่มต้นต่ำสุดเมื่อยังไม่เลือก
- Backend ต้องคำนวณราคาสุดท้าย ห้ามใช้ยอดรวมจาก Client เป็นแหล่งข้อมูลหลัก
- Order item ต้อง Snapshot ชื่อสินค้า SKU Variant รูป ราคา และข้อมูลร้าน ณ เวลาซื้อ
- ส่วนลดรวมต้องไม่ทำให้ยอดรายการติดลบ
- การปัดเศษและภาษีต้องใช้กฎเดียวกันทุกหน้าและทุก Service

### 11.2 Inventory

- `available stock = on_hand - reserved`
- ห้าม Checkout เมื่อ Available stock ไม่เพียงพอ
- Stock reservation มีเวลาหมดอายุที่กำหนดได้ เช่น 15 นาที
- Payment สำเร็จให้เปลี่ยน Reserved เป็น Sold; Payment ล้มเหลว/หมดเวลาให้คืน Reserved
- ทุกการเปลี่ยน Stock ต้องมี Stock movement และ Reference
- การคืนสินค้าเพิ่มกลับเข้าสต็อกหรือไม่ ขึ้นกับผลตรวจสภาพ

### 11.3 Multi-seller Order

- หนึ่ง Checkout สร้าง Parent order หนึ่งรายการและ Sub-order ตามจำนวนร้าน
- Buyer เห็นภาพรวมทั้งหมด; Seller เห็นเฉพาะ Sub-order ของร้านตน
- ค่าจัดส่ง สถานะ Fulfillment Cancellation และ Refund อาจแตกต่างกันในแต่ละ Sub-order
- Payment ระดับ Parent ต้อง Reconcile กับยอด Sub-order ได้ครบถ้วน

### 11.4 Order Status

สถานะระดับ Business ที่เสนอ:

| Status | ความหมาย | ผู้ดำเนินการหลัก |
|---|---|---|
| `PENDING_PAYMENT` | สร้างออเดอร์แล้ว รอชำระ | Buyer/System |
| `PAID` | ยืนยันรับเงินแล้ว รอผู้ขายดำเนินการ | System/Seller |
| `PROCESSING` | ผู้ขายกำลังเตรียมสินค้า | Seller |
| `SHIPPED` | ส่งสินค้าแล้ว | Seller/Shipping provider |
| `DELIVERED` | ผู้ให้บริการแจ้งว่าส่งถึง | Shipping provider/System |
| `COMPLETED` | ผู้ซื้อยืนยันหรือครบช่วง Auto-complete | Buyer/System |
| `CANCELLED` | ยกเลิกก่อนจบ Fulfillment | Buyer/Seller/Admin/System |
| `RETURN_REQUESTED` | ขอคืนสินค้า/คืนเงิน | Buyer |
| `RETURNING` | อยู่ระหว่างส่งคืน | Buyer/Seller/System |
| `REFUND_PENDING` | อยู่ระหว่างคืนเงิน | Admin/System |
| `REFUNDED` | คืนเงินสำเร็จทั้งหมด | Payment provider/System |
| `PARTIALLY_REFUNDED` | คืนเงินเพียงบางรายการ/บางส่วน | Payment provider/System |

ทุก Transition ต้องกำหนด Allowed source/target และผู้มีสิทธิ์อย่างชัดเจนใน Technical Specification

### 11.5 Cancellation

- Buyer ยกเลิกเองได้ก่อน Seller เริ่มจัดส่ง ตาม Policy
- Seller ยกเลิกได้ด้วยเหตุผลจำกัด เช่น สินค้าชำรุด/สต็อกผิด และอาจกระทบ Seller metric
- หลังส่งสินค้าแล้วต้องเข้าสู่ Return/Refund flow แทน Cancellation
- การยกเลิกต้องคืน Stock, Coupon quota และยอด Payment ตามสถานะจริง

### 11.6 Reviews

- รีวิวต้องเชื่อมกับ Order item ที่ซื้อจริงและแสดงเครื่องหมาย Verified purchase
- ห้ามรีวิวสินค้าที่คำสั่งซื้อถูกยกเลิกหรือคืนเงินเต็มจำนวน เว้นแต่ Business กำหนดต่างออกไป
- Admin ซ่อนเนื้อหาได้โดยไม่ Hard delete เพื่อรองรับการตรวจสอบย้อนหลัง

### 11.7 Data Retention

- คำสั่งซื้อ Payment Refund และ Audit log ห้าม Hard delete ผ่านหน้าจอปกติ
- การลบบัญชีต้อง Anonymize/จำกัดการใช้ข้อมูลส่วนบุคคล โดยยังเก็บข้อมูลธุรกรรมตามกฎหมาย
- ระยะเวลาเก็บข้อมูลต้องยืนยันกับฝ่ายกฎหมายและนโยบาย PDPA

---

## 12. Data Model — Conceptual

| Entity | ข้อมูลหลัก |
|---|---|
| User | id, role, email, phone, password hash/auth provider, status, verified timestamps |
| UserProfile | name, avatar, preferences, marketing consent |
| Address | user, recipient, phone, address lines, district, province, postal code, default flag |
| Shop | owner, name, slug, logo, description, status, rating, pickup/return address |
| SellerVerification | shop, identity/business data, documents, review status |
| Category | parent, name, slug, image, sort order, status |
| Product | shop, category, name, slug, description, status, rating, sold count |
| ProductImage | product, URL/storage key, alt text, sort order |
| ProductVariant | product, SKU, option values, price, compare-at price, weight, status |
| Inventory | variant, on-hand, reserved, low-stock threshold, version |
| StockMovement | variant, type, quantity, before/after, reference, actor |
| Cart / CartItem | user/session, variant, quantity, selected flag |
| WishlistItem | user, product, created time |
| Order | buyer, order number, totals, address snapshot, payment status, overall status |
| SubOrder | order, shop, amounts, shipping method, fulfillment status, SLA |
| OrderItem | sub-order, product/variant reference, immutable snapshot, quantity, amounts |
| Payment | order, provider, method, amount, currency, status, provider reference |
| PaymentEvent | payment, event id, raw reference, verified status, processed time |
| Shipment | sub-order, carrier, service, tracking number, status, timeline |
| Coupon | owner/platform, code, type, value, conditions, quota, start/end time |
| CouponRedemption | coupon, user, order, amount, status |
| Review | user, order item, product, rating, content, moderation status |
| Refund | order/sub-order/item, amount, reason, provider reference, status |
| Notification | user, type, title, body, reference, read time |
| AuditLog | actor, action, entity, entity id, before/after, reason, IP, timestamp |

ข้อกำหนดข้อมูล:

- ใช้ UUID หรือ Identifier ที่คาดเดายากกับ Public resources
- แยก Internal ID และ Human-readable order number
- กำหนด Unique index สำหรับ email/phone ที่ Normalize แล้ว, shop slug, product slug ตาม Scope และ SKU ต่อร้าน
- ใช้ Transaction/Lock/Optimistic concurrency กับสต็อก คูปอง และ Payment
- เก็บเวลาเป็น UTC และแสดงตาม Timezone ของผู้ใช้/ธุรกิจ
- ข้อมูลจำนวนเงินเก็บเป็นหน่วยย่อยที่สุดของสกุลเงินหรือ Decimal ที่กำหนด ห้ามใช้ Floating point

---

## 13. UI/UX Requirements and Mood & Tone

### 13.1 Visual Direction

แนวทางภาพรวมคือ “Marketplace ที่ครบถ้วน แต่สงบและพรีเมียม” โดยได้รับแรงบันดาลใจจากความเรียบง่ายและการจัดลำดับข้อมูลของ Apple ไม่ใช่การคัดลอก Layout, Branding, Icon หรือ Asset ที่มีลิขสิทธิ์จาก Apple หรือ Shopee

- ใช้พื้นหลังสีขาว/เทาอ่อน พื้นที่ว่างมาก และ Grid ที่เป็นระเบียบ
- ใช้สี Brand accent เพียงหนึ่งสีหลักสำหรับ CTA และสถานะสำคัญ
- เน้นภาพสินค้าคุณภาพสูง ขอบมนเล็กน้อย เงาบาง และ Surface ที่สะอาด
- Typography อ่านง่าย มีลำดับ Heading/Body/Caption ชัดเจน และรองรับภาษาไทยดี
- Animation สั้น นุ่ม และมีเป้าหมาย เช่น Feedback หลังเพิ่มตะกร้า
- ลด Banner ที่แข่งขันกันและหลีกเลี่ยง UI ที่แน่นจนรบกวนการตัดสินใจ
- ใช้ภาษาสั้น ตรง และเป็นมิตร

### 13.2 Proposed Design Tokens

ค่าต่อไปนี้เป็นจุดเริ่มต้นและต้องผ่านการออกแบบ Brand identity:

| Token | แนวทาง |
|---|---|
| Background | White / neutral gray 50 |
| Text primary | Near-black |
| Text secondary | Neutral gray 600–700 |
| Primary CTA | Brand color ที่มี Contrast ผ่าน WCAG AA |
| Success | Green |
| Warning | Amber |
| Error | Red |
| Border radius | 10–16 px สำหรับ Card/Input, Pill สำหรับ Tag |
| Spacing | 4/8 px base system |
| Shadow | เบา ใช้เฉพาะ Layer ที่ต้องแยกจากพื้นหลัง |
| Motion | 150–250 ms และรองรับ `prefers-reduced-motion` |

### 13.3 Responsive Breakpoints

- Mobile: 320–767 px
- Tablet: 768–1023 px
- Desktop: ≥ 1024 px
- Large desktop: ≥ 1440 px โดยจำกัด Content width เพื่อให้อ่านง่าย

Mobile เป็น Primary experience สำหรับ Storefront ส่วน Admin และ Seller Center ต้องใช้งานบน Tablet/Desktop ได้ดีและยังดูข้อมูลสำคัญบน Mobile ได้

### 13.4 Required UI States

ทุกหน้าหลักต้องออกแบบสถานะต่อไปนี้:

- Default
- Loading / Skeleton
- Empty
- No search results
- Validation error
- Server/network error พร้อม Retry
- Permission denied
- Session expired
- Success confirmation
- Disabled / Out of stock
- Partial data เช่น รูปเสียหรือ Provider ตอบช้า

### 13.5 Accessibility

- เป้าหมาย WCAG 2.2 Level AA
- Contrast ของข้อความและ Interactive controls ต้องผ่านเกณฑ์
- ใช้งานด้วย Keyboard ได้ครบและ Focus indicator ชัดเจน
- Form มี Label, Help text และ Error ที่ Screen reader อ่านได้
- รูปสินค้ามี Alt text ที่เหมาะสม; Decorative image ใช้ alt ว่าง
- ไม่ใช้สีเพียงอย่างเดียวเพื่อสื่อสถานะ
- Touch target ไม่น้อยกว่า 44 × 44 px เมื่อเป็นไปได้
- รองรับ Zoom 200% โดยไม่สูญเสียข้อมูลหรือการทำงานหลัก

---

## 14. Non-functional Requirements

### 14.1 Performance

- เป้าหมาย Core Web Vitals ที่ 75th percentile บนอุปกรณ์ Mobile:
  - LCP ≤ 2.5 วินาที
  - INP ≤ 200 ms
  - CLS ≤ 0.1
- API อ่านข้อมูลทั่วไปควรตอบ P95 ≤ 500 ms ไม่รวม Provider ภายนอก
- Search response P95 ≤ 1 วินาทีภายใต้ Load เป้าหมาย
- ใช้ Responsive image, Modern format, Lazy loading, CDN และ Cache อย่างเหมาะสม
- หลีกเลี่ยงการโหลด JavaScript ที่ไม่จำเป็นบน Critical path

### 14.2 Availability and Reliability

- Availability เป้าหมาย MVP ≥ 99.5% ต่อเดือน ไม่รวม Maintenance ที่ประกาศล่วงหน้า
- Checkout, Payment webhook และ Stock update ต้องรองรับ Retry และ Idempotency
- มี Database backup อัตโนมัติและทดสอบการกู้คืนเป็นระยะ
- ค่า RPO/RTO ต้องยืนยันตามงบประมาณ; ค่าเสนอเริ่มต้น RPO ≤ 24 ชั่วโมง, RTO ≤ 4 ชั่วโมง
- External provider failure ต้องไม่ทำให้ข้อมูล Order/Payment ไม่สอดคล้องกัน

### 14.3 Scalability

- Service/API เป็น Stateless เท่าที่ทำได้เพื่อ Scale horizontally
- งานส่งอีเมล ประมวลผลรูป Reconciliation และ Notification ใช้ Background job/Queue
- Search, Product list และ Dashboard query ต้องมี Index/Cache ที่รองรับจำนวนข้อมูลเพิ่มขึ้น
- กำหนด Capacity target ก่อน Load test: Concurrent users, Requests/sec, Products และ Orders/day

### 14.4 Compatibility

- รองรับ Chrome, Safari, Edge, Firefox สอง Major versions ล่าสุด ณ วัน Release
- รองรับ Mobile Safari และ Chrome for Android รุ่นที่ยังได้รับการสนับสนุน
- Progressive enhancement สำหรับ Feature ที่ Browser รองรับไม่เท่ากัน

### 14.5 Observability

- Structured log พร้อม Correlation/Request ID โดยไม่บันทึก Password, Token หรือข้อมูลบัตร
- Metrics: Request rate, Error rate, Latency, Queue depth, Payment/Order success
- Error tracking ทั้ง Frontend และ Backend
- Alert สำหรับ Payment webhook failure, Order/Payment mismatch, Queue backlog และ Error spike
- มี Admin/Operations report สำหรับ Reconciliation รายวัน

---

## 15. Security, Privacy, and Compliance

- บังคับ HTTPS/TLS ทุก Environment ที่มีข้อมูลจริง
- Password ต้อง Hash ด้วย Algorithm มาตรฐานที่แข็งแรง เช่น Argon2id หรือ bcrypt พร้อม Cost ที่เหมาะสม
- Session cookie ใช้ `HttpOnly`, `Secure`, `SameSite` หรือ Token strategy ที่ปลอดภัย
- ป้องกัน OWASP Top 10: Injection, XSS, CSRF, Broken access control, SSRF และอื่น ๆ
- ตรวจ Authorization ที่ Server ทุก Request; การซ่อนปุ่มใน UI ไม่ถือเป็น Security control
- ใช้ RBAC และตรวจ Ownership ระดับ Resource
- Admin ควรบังคับ MFA ก่อน Production
- Rate limit สำหรับ Login, OTP, Search abuse, Coupon และ Sensitive APIs
- Upload file ต้องตรวจ MIME, ขนาด, Extension, Malware risk และเก็บนอก Web root
- Secret และ Provider key เก็บใน Secret manager ห้ามฝังใน Source code หรือส่งให้ Client
- Payment card data ไม่ควรผ่านหรือถูกเก็บในระบบโดยตรง ใช้ Hosted page/Tokenization จาก Provider เพื่อลด PCI scope
- เก็บ Consent และ Privacy notice ตาม PDPA; รองรับคำขอเข้าถึง แก้ไข และลบ/จำกัดข้อมูลตามกฎหมาย
- Mask ข้อมูลส่วนบุคคลใน Admin UI ตามความจำเป็น
- Audit log ป้องกันการแก้ไขและมี Retention policy
- ทำ Dependency scanning, Static analysis และ Security review ก่อน Production

---

## 16. Analytics and Event Tracking

### 16.1 Core Funnel Events

- `home_viewed`
- `search_performed`
- `search_result_clicked`
- `product_viewed`
- `variant_selected`
- `wishlist_added`
- `add_to_cart`
- `cart_viewed`
- `checkout_started`
- `address_selected`
- `coupon_applied` / `coupon_failed`
- `payment_started`
- `payment_succeeded` / `payment_failed`
- `order_created`
- `order_cancelled`
- `order_completed`
- `review_submitted`

### 16.2 Seller Events

- `seller_onboarding_started/submitted/approved/rejected`
- `product_draft_created`
- `product_submitted`
- `product_published`
- `inventory_updated`
- `seller_order_accepted`
- `seller_order_shipped`

### 16.3 Tracking Rules

- ทุก Event มี Timestamp, anonymous/user id ตาม Consent, session id, source, device category และ reference id ที่จำเป็น
- ห้ามส่ง Password, Token, เลขบัตร, ที่อยู่เต็ม หรือข้อมูลส่วนบุคคลเกินจำเป็นไป Analytics
- Revenue event ต้องถูก Deduplicate ด้วย Order/Transaction reference
- นิยาม Event schema และ Owner ก่อนเริ่ม Implementation เพื่อป้องกันชื่อหรือความหมายไม่ตรงกัน

---

## 17. SEO Requirements

- Product, Category และ Shop pages ต้องมี URL ที่อ่านได้และ Canonical URL
- รองรับ Server-side rendering/Pre-rendering สำหรับหน้าสาธารณะที่ต้อง Index
- กำหนด Title, Meta description, Open Graph image และ Structured data ที่เหมาะสม
- Product structured data ต้องสะท้อนราคา สต็อก และรีวิวจริง
- สร้าง XML sitemap แยกประเภทและอัปเดตอัตโนมัติ
- ป้องกันการ Index หน้าบัญชี Checkout Admin และ Search parameter ที่ไม่จำเป็น
- Redirect Slug เก่าอย่างถูกต้องเมื่อชื่อสินค้า/ร้านเปลี่ยน
- จัดการสินค้าที่เลิกขายโดยยังรักษาประโยชน์ของ URL ตาม SEO policy

---

## 18. Acceptance Criteria by Epic

### 18.1 Account

- ผู้ใช้สมัคร ยืนยันบัญชี Login และ Reset password ได้ครบ
- ระบบปฏิเสธข้อมูลซ้ำ/ไม่ถูกต้องด้วยข้อความที่เข้าใจได้
- User A ไม่สามารถอ่านหรือแก้ข้อมูลส่วนตัวของ User B ผ่าน UI หรือ API
- บัญชีที่ถูกระงับไม่สามารถทำ Transaction ใหม่ได้

### 18.2 Product Discovery

- Search และ Filter ให้ผลตรงกับข้อมูลสินค้า Active เท่านั้น
- ราคาบน Product card และหน้ารายละเอียดสอดคล้องกับ Variant rule
- สินค้าหมดหรือถูกซ่อนต้องไม่สามารถเพิ่มลง Checkout ได้
- URL ของ Search/Filter สามารถ Refresh/แชร์แล้วคงผลลัพธ์เดิมได้

### 18.3 Cart and Checkout

- ตะกร้าคงอยู่หลัง User Login ใหม่
- ระบบตรวจราคา สต็อก คูปอง และค่าจัดส่งบน Server ก่อนสร้าง Order
- การกดจ่ายซ้ำหรือ Webhook ซ้ำไม่สร้าง Payment/Order ซ้ำ
- หาก Payment ไม่สำเร็จ สต็อกที่กันไว้ถูกคืนตามเวลาที่กำหนด
- ยอดรวมใน Cart, Checkout, Payment และ Order history ตรงกัน

### 18.4 Seller

- User ที่ยังไม่ผ่าน Seller onboarding ไม่สามารถ Publish สินค้าได้
- Seller A ไม่สามารถดูหรือแก้สินค้า/ออเดอร์ของ Seller B
- การปรับสต็อกทุกครั้งมีประวัติและยอดคงเหลือไม่ติดลบ
- Seller เปลี่ยน Order status ได้เฉพาะ Transition ที่อนุญาต

### 18.5 Admin

- เฉพาะ Admin ที่ Login แล้วเข้าหน้าและ API หลังบ้านได้
- Admin ค้นหาและเปิดรายละเอียด User, Product, Shop และ Order ได้
- การ Suspend/Approve/Refund/แก้สถานะสำคัญต้องระบุเหตุผลและมี Audit log
- Dashboard totals ต้อง Reconcile กับข้อมูลรายการภายใต้เงื่อนไขเดียวกัน

### 18.6 Quality

- ไม่มี Critical/High security vulnerability ที่ยังไม่ถูกแก้ก่อน Production
- Critical purchase flow ผ่านการทดสอบบน Browser/Device ที่รองรับ
- หน้าหลักผ่าน Accessibility audit ระดับที่ตกลงกัน
- Backup restore, Payment reconciliation และ Rollback plan ผ่านการทดสอบก่อน Go-live

---

## 19. Testing Strategy

- **Unit tests:** Pricing, Discount, Inventory, Order transition, Permission และ Validation
- **Integration tests:** Database transaction, Payment webhook, Email, Storage และ Shipping adapter
- **API contract tests:** Frontend/Backend และ External provider payload
- **End-to-end tests:** สมัคร → ซื้อ → จ่าย → ส่ง → รับ → รีวิว; ยกเลิก; Refund; Seller listing; Admin moderation
- **Security tests:** Authentication, Authorization, IDOR, Rate limit, Upload และ OWASP checks
- **Performance tests:** Search, Product list, Cart, Checkout และ Webhook burst
- **Accessibility tests:** Automated scan ร่วมกับ Keyboard/Screen reader manual checks
- **UAT:** Buyer, Seller, Operations, Finance และ Admin scenarios
- **Data migration/reconciliation tests:** หากมีการนำเข้าข้อมูลหรือเชื่อม Provider จริง

---

## 20. Dependencies and Integrations

| Dependency | วัตถุประสงค์ | สิ่งที่ต้องยืนยัน |
|---|---|---|
| Payment gateway | รับชำระและคืนเงิน | ช่องทาง, ค่าธรรมเนียม, Webhook, Sandbox, Settlement |
| Shipping provider | ค่าจัดส่ง Tracking และสถานะ | พื้นที่บริการ, SLA, Label, Callback/API |
| Email/SMS/OTP | ยืนยันตัวตนและแจ้งเตือน | Provider, Rate limit, Template, Cost |
| Object storage/CDN | รูปสินค้า ร้าน และรีวิว | ขนาด, Lifecycle, Signed URL, Moderation |
| Search engine | Full-text search/filter | Database search หรือ Dedicated engine ตาม Scale |
| Analytics | Funnel และ Product metrics | Consent, Data location, Event schema |
| Monitoring | Error, Log, Metric และ Alert | Retention, PII masking, On-call process |
| Identity/KYC | ตรวจผู้ขาย | ข้อกฎหมาย, Data handling, Manual/Automated review |

---

## 21. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Role User รวม Buyer/Seller ทำให้ Permission ซับซ้อน | ข้อมูลรั่วหรือแก้ข้ามร้าน | Ownership check ทุก API, Policy tests, Audit log |
| Overselling จาก Concurrent checkout | ยกเลิกออเดอร์และเสียความเชื่อมั่น | Atomic reservation, Lock/version, Idempotency |
| Payment สำเร็จแต่ระบบไม่ได้รับ Callback | Order ค้าง/ยอดไม่ตรง | Webhook retry, Polling, Reconciliation job, Admin tool |
| สินค้าผิดกฎหมาย/ไม่เหมาะสม | ความเสี่ยงกฎหมายและชื่อเสียง | Seller verification, Product moderation, Report workflow |
| Refund/Settlement ไม่ชัดเจน | ความเสียหายทางการเงิน | นิยาม Ledger, Reconciliation, Approval flow ก่อน Production |
| รูป/ข้อมูลสินค้าคุณภาพต่ำ | Conversion ต่ำ | Content guideline, Validation, Image standard, Moderation |
| Scope โตเป็น Shopee เต็มรูปแบบ | ส่งมอบล่าช้า | ยึด MVP, Prioritize Must-have, Roadmap เป็น Phase |
| เลียนแบบ Brand อื่นมากเกินไป | ความเสี่ยงด้านทรัพย์สินทางปัญญา | ใช้เป็นแรงบันดาลใจระดับ Principle และสร้าง Brand system ของตนเอง |
| Admin Role เดียวมีสิทธิ์มากเกินไป | Insider risk | MFA, Audit, Approval สำหรับการเงิน, วางโครง Permission ย่อย |

---

## 22. Delivery Phases

### Phase 0 — Discovery and Foundation

- ยืนยัน Business model, Commission, Settlement, Refund และ Shipping
- User journey, Wireframe, Design system และ Prototype
- Architecture, Data model, Threat model และ Provider selection
- Analytics plan และ Definition of Done

### Phase 1 — Commerce MVP

- Authentication/Profile/Address
- Catalog/Search/Product detail
- Cart/Checkout/Payment
- Order history/Tracking
- Seller onboarding/Product/Inventory/Orders
- Admin Dashboard และ Core management
- Transactional notifications, Security baseline และ Observability

### Phase 2 — Trust and Growth

- Return/Refund workflow เต็มรูปแบบ
- รีวิวพร้อมรูปและ Moderation ที่ดีขึ้น
- Promotion rules และ Seller campaigns
- Seller finance/Settlement dashboard
- SEO, Recommendation และ Conversion optimization

### Phase 3 — Scale

- Chat, Loyalty, Flash sale, Affiliate
- Advanced fraud detection และ Automated moderation
- Multi-language/Multi-currency/Cross-border
- Mobile application และ Fulfillment integrations ขั้นสูง

---

## 23. Definition of Done

Feature จะถือว่าเสร็จเมื่อ:

- Requirement และ Acceptance criteria ได้รับการอนุมัติ
- UX/UI ครบทุก State และ Responsive breakpoint ที่เกี่ยวข้อง
- Implementation ผ่าน Code review และไม่มี Known critical defect
- Unit/Integration/E2E tests ที่เกี่ยวข้องผ่าน
- Permission และ Security cases ผ่านการตรวจ
- Analytics events ทำงานและตรวจสอบ Payload แล้ว
- Error/Log/Metric ที่จำเป็นพร้อมใช้งาน
- Accessibility และ Performance ไม่ต่ำกว่าเกณฑ์ที่ตกลง
- Documentation, Runbook และ Admin procedure ถูกอัปเดต
- Product Owner/UAT อนุมัติบน Staging

---

## 24. Open Questions Requiring Stakeholder Decisions

คำถามต่อไปนี้ไม่ควรถูกปล่อยให้เป็นสมมติฐานก่อนเริ่มพัฒนา Payment/Order/Finance:

### Business Model

1. แพลตฟอร์มคิดค่าคอมมิชชันหรือค่าธรรมเนียมจากผู้ขายอย่างไร?
2. เงินค่าสินค้าถูกพักไว้โดยแพลตฟอร์มหรือจ่ายตรงให้ผู้ขาย?
3. รอบ Settlement และเงื่อนไข Hold เงินคืออะไร?
4. ใครออกใบเสร็จ/ใบกำกับภาษี และราคาที่แสดงรวม VAT แล้วหรือไม่?
5. อนุญาตสินค้าประเภทใด และมีรายการสินค้าต้องห้ามอะไรบ้าง?

### Users and Sellers

6. สมัครด้วย Email, เบอร์โทร หรือรองรับทั้งสองแบบ?
7. Seller ต้องผ่าน KYC/ยืนยันนิติบุคคลระดับใด?
8. ร้านและสินค้าต้องผ่าน Admin ทุกครั้งก่อนเผยแพร่หรือใช้ Auto-approval บางกรณี?
9. ผู้ขายสามารถมีหลายร้านต่อหนึ่งบัญชีหรือหนึ่งร้านเท่านั้น?

### Payment and Orders

10. ช่องทางชำระเงิน MVP คืออะไร เช่น QR PromptPay, Card, Bank transfer หรือ COD?
11. เมื่อ Checkout หลายร้าน ต้องชำระครั้งเดียวหรือแยกชำระ?
12. รองรับ Partial cancellation/Partial refund ตั้งแต่ MVP หรือไม่?
13. ระยะเวลาชำระเงิน, Seller accept SLA และ Auto-complete กี่วัน?
14. Refund ใช้เวลาตาม Provider เท่าใดและใครมีสิทธิ์อนุมัติ?

### Shipping and Returns

15. ค่าจัดส่งคำนวณจาก Provider, ตารางราคา, น้ำหนัก หรือผู้ขายกำหนด?
16. ใครเป็นผู้สร้าง Shipping label และ Tracking number?
17. Return window กี่วัน เงื่อนไขใดคืนได้ และใครรับผิดชอบค่าขนส่งคืน?
18. ต้องมีระบบข้อพิพาทและแนบหลักฐานใน MVP หรือย้ายไป Phase 2?

### Brand and Content

19. ชื่อ Brand, Logo, สีหลัก, Font และ Voice & Tone ที่ได้รับอนุมัติคืออะไร?
20. หน้าแรกต้องเน้นหมวดหมู่ใดและใครเป็นผู้จัด Content/Banner?
21. ต้องรองรับภาษาอังกฤษหรือภาษาอื่นตั้งแต่วันแรกหรือไม่?

### Technical and Operations

22. ปริมาณเป้าหมายในปีแรก: Users, Products, Orders/day และ Concurrent users เท่าใด?
23. มี Technology stack, Cloud provider หรือระบบเดิมที่ต้องเชื่อมต่อหรือไม่?
24. ทีมใดรับผิดชอบ Customer support, Content moderation, Finance reconciliation และ Incident response?
25. SLA ของระบบและงบประมาณ Infrastructure/Provider ที่ยอมรับได้คือเท่าใด?

---

## 25. Recommended Next Steps

1. จัด Workshop เพื่อตอบ Open Questions โดยเฉพาะ Commission, Payment, Settlement, Shipping และ Refund
2. ยืนยัน MVP scope และติดป้าย Must/Should/Could ร่วมกับ Stakeholders
3. สร้าง Buyer/Seller/Admin journey และ Low-fidelity wireframes
4. สร้าง Brand direction และ Design system ที่เป็นเอกลักษณ์ของบริษัท
5. ทำ Technical discovery สำหรับ Payment, Stock concurrency, Multi-seller order และ Security
6. แตก PRD เป็น Epics/User stories พร้อม Acceptance criteria และ Estimate
7. สร้าง Clickable prototype และทดสอบกับผู้ซื้อ/ผู้ขายกลุ่มเล็กก่อนเริ่มพัฒนาเต็มรูปแบบ

---

## Appendix A — Sample User Stories

- ในฐานะผู้ซื้อ ฉันต้องการกรองสินค้าตามราคาและคะแนน เพื่อค้นหาสินค้าที่เหมาะกับงบและน่าเชื่อถือ
- ในฐานะผู้ซื้อ ฉันต้องการเห็นค่าใช้จ่ายทั้งหมดก่อนชำระ เพื่อไม่ให้พบค่าใช้จ่ายที่ไม่คาดคิด
- ในฐานะผู้ซื้อ ฉันต้องการติดตามสถานะสินค้า เพื่อทราบว่าจะได้รับสินค้าเมื่อใด
- ในฐานะผู้ขาย ฉันต้องการเพิ่ม Variant และสต็อกแยกกัน เพื่อขายสินค้าที่มีหลายสีและขนาดอย่างถูกต้อง
- ในฐานะผู้ขาย ฉันต้องการเห็นออเดอร์ที่ต้องจัดส่งวันนี้ เพื่อไม่ให้เกิน SLA
- ในฐานะ Admin ฉันต้องการระงับสินค้าที่ผิดนโยบายพร้อมบันทึกเหตุผล เพื่อป้องกันความเสี่ยงและตรวจสอบย้อนหลังได้
- ในฐานะ Admin ฉันต้องการ Reconcile Payment กับ Order เพื่อค้นหาธุรกรรมที่สถานะไม่ตรงกัน

## Appendix B — Glossary

| คำศัพท์ | ความหมาย |
|---|---|
| Marketplace | แพลตฟอร์มกลางที่มีผู้ขายหลายราย |
| Parent Order | คำสั่งซื้อรวมจาก Checkout หนึ่งครั้ง |
| Sub-order | คำสั่งซื้อย่อยที่แยกตามร้านค้า |
| SKU | รหัสเฉพาะของสินค้า/Variant สำหรับจัดการสต็อก |
| Variant | ตัวเลือกของสินค้า เช่น สีหรือขนาด |
| GMV | มูลค่ารวมของสินค้าที่เกิดคำสั่งซื้อก่อนหักรายการตามนิยามธุรกิจ |
| AOV | มูลค่าเฉลี่ยต่อคำสั่งซื้อ |
| Settlement | การคำนวณและโอนยอดสุทธิให้ผู้ขาย |
| Stock reservation | การกันสต็อกชั่วคราวระหว่างรอชำระเงิน |
| Idempotency | การเรียกคำสั่งซ้ำแล้วไม่ทำให้เกิดผลลัพธ์ทางธุรกิจซ้ำ |
| Reconciliation | การตรวจสอบยอด/สถานะระหว่าง Order, Payment และ Provider ให้ตรงกัน |
| SLA | ระยะเวลาที่ตกลงว่าต้องดำเนินการให้เสร็จ |

