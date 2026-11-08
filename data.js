// ===== DANH SÁCH SẢN PHẨM =====
// Mỗi sản phẩm là một dòng. Ý nghĩa các trường:
//   id : số thứ tự, không được trùng nhau
//   n  : tên sản phẩm
//   c  : danh mục (cùng tên thì tự gom thành một nút lọc)
//   p  : giá (số, không có dấu chấm)
//   e  : emoji hiển thị tạm
//   b  : màu nền của khung ảnh
//   u  : (không bắt buộc) link Shopee của sản phẩm. Bỏ trống thì nút sẽ mở trang tìm kiếm Shopee
//   img: (không bắt buộc) đường dẫn ảnh thật, ví dụ "images/ao-thun.jpg". Có thì ảnh thay emoji
//
// Ví dụ thêm link và ảnh:
//   { id: 1, n: "Áo thun basic", c: "Thời trang", p: 149000, e: "👕", b: "#dff0e8",
//     u: "https://shopee.vn/...", img: "images/ao-thun.jpg" },

const PRODUCTS = [
  { id: 1,  n: "Áo thun basic",         c: "Thời trang", p: 149000,  e: "👕", b: "#dff0e8" },
  { id: 2,  n: "Giày sneaker",          c: "Thời trang", p: 690000,  e: "👟", b: "#fde9c9" },
  { id: 3,  n: "Balo laptop",           c: "Thời trang", p: 420000,  e: "🎒", b: "#e3e8f7" },
  { id: 4,  n: "Tai nghe không dây",    c: "Điện tử",    p: 550000,  e: "🎧", b: "#efe3f5" },
  { id: 5,  n: "Đồng hồ thông minh",    c: "Điện tử",    p: 1290000, e: "⌚", b: "#dcecf5" },
  { id: 6,  n: "Sạc dự phòng 10000mAh", c: "Điện tử",    p: 320000,  e: "🔋", b: "#f5ecd0" },
  { id: 7,  n: "Bình giữ nhiệt",        c: "Gia dụng",   p: 210000,  e: "🥤", b: "#d9efe9" },
  { id: 8,  n: "Đèn bàn LED",           c: "Gia dụng",   p: 260000,  e: "💡", b: "#fbf0c8" },
  { id: 9,  n: "Cây xanh mini",         c: "Gia dụng",   p: 99000,   e: "🪴", b: "#dcefd8" },
  { id: 10, n: "Son dưỡng môi",         c: "Làm đẹp",    p: 89000,   e: "💄", b: "#f8dde3" },
  { id: 11, n: "Kem chống nắng",        c: "Làm đẹp",    p: 240000,  e: "🧴", b: "#fde9c9" },
  { id: 12, n: "Cà phê rang xay",       c: "Thực phẩm",  p: 135000,  e: "☕", b: "#eadfd3" }
];
