// ===== TRẠNG THÁI (dữ liệu thay đổi khi người dùng thao tác) =====
let category = "Tất cả";   // danh mục đang chọn
let keyword = "";          // từ khóa tìm kiếm
let cart = loadCart();     // giỏ hàng dạng { idSanPham: soLuong }

// ===== TIỆN ÍCH =====
const $ = (id) => document.getElementById(id);
const formatPrice = (n) => n.toLocaleString("vi-VN") + " ₫";

function loadCart() {
  try { return JSON.parse(localStorage.getItem("juli_cart") || "{}"); }
  catch (e) { return {}; }
}
function saveCart() {
  try { localStorage.setItem("juli_cart", JSON.stringify(cart)); }
  catch (e) { /* bỏ qua nếu trình duyệt không cho lưu */ }
}
function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 1500);
}

// ===== VẼ GIAO DIỆN =====

// Các nút danh mục
function renderCategories() {
  const list = ["Tất cả", ...new Set(PRODUCTS.map((p) => p.c))];
  $("cats").innerHTML = list
    .map((c) => `<button class="chip" aria-pressed="${c === category}" data-cat="${c}">${c}</button>`)
    .join("");
}

// Một thẻ sản phẩm
function productCard(p) {
  const shopeeLink = p.u || "https://shopee.vn/search?keyword=" + encodeURIComponent(p.n);
  const picture = p.img ? `<img src="${p.img}" alt="${p.n}">` : p.e;
  return `
    <div class="card">
      <div class="thumb" style="background:${p.b}">${picture}</div>
      <div class="info">
        <div class="name">${p.n}</div>
        <div class="cat">${p.c}</div>
        <div class="row">
          <span class="price">${formatPrice(p.p)}</span>
          <button class="add" data-add="${p.id}">Thêm</button>
        </div>
        <a class="shp" target="_blank" rel="noopener noreferrer" href="${shopeeLink}">Xem trên Shopee</a>
      </div>
    </div>`;
}

// Lưới sản phẩm (đã lọc theo danh mục và từ khóa)
function renderProducts() {
  const list = PRODUCTS.filter((p) =>
    (category === "Tất cả" || p.c === category) &&
    p.n.toLowerCase().includes(keyword)
  );
  $("grid").innerHTML = list.length
    ? list.map(productCard).join("")
    : `<div class="empty">Không tìm thấy sản phẩm. Thử từ khóa khác nhé.</div>`;
}

// Giỏ hàng
function renderCart() {
  const ids = Object.keys(cart);
  let totalQty = 0;
  let totalPrice = 0;

  $("items").innerHTML = ids.length
    ? ids.map((id) => {
        const p = PRODUCTS.find((x) => x.id == id);
        const qty = cart[id];
        totalQty += qty;
        totalPrice += qty * p.p;
        return `
          <div class="item">
            <span class="e">${p.e}</span>
            <div class="t"><div>${p.n}</div><div class="cat">${formatPrice(p.p)}</div></div>
            <div class="qty">
              <button data-minus="${id}" aria-label="Giảm">−</button>
              <span>${qty}</span>
              <button data-plus="${id}" aria-label="Tăng">+</button>
            </div>
          </div>`;
      }).join("")
    : `<div class="empty">Giỏ hàng đang trống. Hãy thêm một sản phẩm.</div>`;

  $("cnt").textContent = totalQty;
  $("total").textContent = formatPrice(totalPrice);
  saveCart();
}

// Mở / đóng giỏ hàng
function toggleCart(open) {
  $("drawer").classList.toggle("open", open);
  $("veil").classList.toggle("open", open);
}

// ===== SỰ KIỆN (người dùng bấm, gõ) =====

// Chọn danh mục
$("cats").onclick = (e) => {
  const c = e.target.dataset.cat;
  if (!c) return;
  category = c;
  renderCategories();
  renderProducts();
};

// Gõ tìm kiếm
$("q").oninput = (e) => {
  keyword = e.target.value.trim().toLowerCase();
  renderProducts();
};

// Bấm "Thêm" vào giỏ
$("grid").onclick = (e) => {
  const id = e.target.dataset.add;
  if (!id) return;
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
  toast("Đã thêm vào giỏ");
};

// Tăng / giảm số lượng trong giỏ
$("items").onclick = (e) => {
  const plus = e.target.dataset.plus;
  const minus = e.target.dataset.minus;
  if (plus) cart[plus]++;
  if (minus) {
    cart[minus]--;
    if (cart[minus] <= 0) delete cart[minus];
  }
  renderCart();
};

// Mở, đóng giỏ
$("open").onclick = () => toggleCart(true);
$("close").onclick = () => toggleCart(false);
$("veil").onclick = () => toggleCart(false);

// Đặt hàng
$("pay").onclick = () => {
  if (!Object.keys(cart).length) { toast("Giỏ hàng đang trống"); return; }
  cart = {};
  renderCart();
  toggleCart(false);
  toast("Đặt hàng thành công!");
};

// ===== CHẠY LẦN ĐẦU KHI MỞ TRANG =====
renderCategories();
renderProducts();
renderCart();
