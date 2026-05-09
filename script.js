let items = JSON.parse(localStorage.getItem("items")) || [];

function save() {
  localStorage.setItem("items", JSON.stringify(items));
}

function addItem() {
  let name = document.getElementById("name").value;
  let brand = document.getElementById("brand").value;
  let price = +document.getElementById("price").value;
  let qty = +document.getElementById("qty").value;

  if (!name || !brand || !price || !qty) return;

  items.push({ name, brand, price, qty });
  save();
  render();
}

function render() {
  let list = document.getElementById("list");
  let search = document.getElementById("search").value.toLowerCase();

  list.innerHTML = "";
  let total = 0;

  items.forEach((item, index) => {
    if (
      item.name.toLowerCase().includes(search) ||
      item.brand.toLowerCase().includes(search)
    ) {
      let sum = item.price * item.qty;
      total += sum;

      list.innerHTML += `
        <div class="item">
          <div>
            <b>${item.name}</b> (${item.brand})<br>
            ${item.price} сом × ${item.qty} = ${sum} сом
          </div>

          <div class="controls">
            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
            <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
            <button class="delete" onclick="removeItem(${index})">🗑</button>
          </div>
        </div>
      `;
    }
  });

  document.getElementById("total").innerText = total;
}

function changeQty(i, val) {
  items[i].qty += val;
  if (items[i].qty < 1) items[i].qty = 1;
  save();
  render();
}

function removeItem(i) {
  items.splice(i, 1);
  save();
  render();
}

render();