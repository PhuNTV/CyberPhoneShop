const productSer = new ProductServive();
const listProductCart = new ListProductCart();

// const listCart = new ListProductCart();
function setLocalStorage(arrayProducts) {
  localStorage.setItem("ListProducts", JSON.stringify(arrayProducts));
}

function getLocalStorage() {
  if (localStorage.getItem("ListProducts") != null) {
    listProductCart.arrayListProDucts = JSON.parse(localStorage.getItem("ListProducts"));
    // hienThiTable(dssv.mangSV);
    showProductsCart(listProductCart.arrayListProDucts);
  }
}
getLocalStorage();




const addProduct = (id) => {
  let index = 0;
  index = document.getElementById("cart-count").innerHTML;
  index++;
  document.getElementById("cart-count").innerHTML = index;
  console.log(id);
  showCart(id);
};

function showCart(id) {
  productSer.getProductItem(id)
  .then(function(result){
    console.log(result.data.name);
    const cartItem = new CartItem(result.data.name,result.data.img,result.data.price);
    listProductCart.addProductCart(cartItem);
    console.log(listProductCart.arrayListProDucts);
    showProductsCart(listProductCart.arrayListProDucts);
    setLocalStorage(listProductCart.arrayListProDucts);
    
    
    
  })
  .catch(function(error){
    console.log(error);
  })
}
function showProductsCart(array){
var content = "";
array.map(function (product, index) {
  console.log("PRODUCT:",product);
  //? 3. Tạo từng td
  var trELE = `<tr>
                  <td >${product.name}</td>
                  <td ><img src="${product.img}" alt=""></td>
                  <td >${product.price}</td>
                  <td class="quality">
                    <div class="buttons_added">
                    <input aria-label="quantity" id="quality" class="input-qty" max="100" min="1" name=""
                     type="number" value="1">
                    </div>
                    <button style="color:red" id="CloseX" >Remove</button>
                  </td>
                </tr>`;
  content += trELE;
});
//? 4. innerHTML biến content lên table
document.getElementById("table-cart").innerHTML = content;
}



function showProducts(arrayData) {
  var content = "";

  arrayData.map(function (product) {
    content += `
        <div class="col-4">
        <div class="card" style="width: 18rem;">
          <img src="${product.img}" class="card-img-top" alt="">
          <div class="card-body">
          <div class="name-price d-flex justify-content-between">
                <h5 class="card-name text-uppercase pr-2">${product.name}</h5>
                <h5 class="card-price text-success fw-bold pl-2">${product.price}$</h5>
              </div>
              <div class="hover_information text-success">
                <h5 class="card-screen">${product.screen}</h5>
                <h5 class="card-backCamera">${product.backCamera}</h5>
                <h5 class="card-frontCamera">${product.frontCamera}</h5>
              </div>
                <p class="card-desc">${product.desc}</p>
                <a class="btn btn-primary" onclick="addProduct('${product.id}')">Thêm vào giỏ</a>
          </div>
        </div>
      </div>
        `;
  });

  document.querySelector("#myProducts_body").innerHTML = content;
}



function showProductList() {

  var axiosResult = productSer.getProductList();

  axiosResult
    .then(function (result) {
      // console.log(result);
      // console.log(result.data);
      //? các xử lý sau khi có data
      showProducts(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
//lấy danh sách khi load web
showProductList();
