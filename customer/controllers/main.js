
const productSer = new ProductServive();


function showTable(arrayData) {
    var content = "";

    arrayData.map(function (product, index) {
        content += `
        <div class="col-4">
        <div class="card bg-dark" style="width: 18rem;">
          <img src="${product.img}" class="card-img-top" alt="">
          <div class="card-body">
          <div class="name-price d-flex justify-content-between">
                <h5 class="card-name text-uppercase pr-2">${product.name}</h5>
                <h5 class="card-price text-success fw-bold pl-2">${product.price}$</h5>
              </div>
            <h5 class="card-screen d-none">${product.screen}</h5>
            <h5 class="card-backCamera d-none">${product.backCamera}</h5>
            <h5 class="card-frontCamera d-none">${product.frontCamera}</h5>
            <p class="card-desc">${product.desc}</p>
            <a class="btn btn-primary" onclick="addProduct()">Thêm vào giỏ</a>
          </div>
        </div>
      </div>
        `
    });

    document.querySelector("#myProducts_body").innerHTML = content;

}
const addProduct= () => {
  let index = 0;
  index = document.getElementById("cart-count").innerHTML;
  index++;
  document.getElementById("cart-count").innerHTML = index;
}

function showProductList() {
    //hiển thị danh sach khi thành công. Ngược lại báo lỗi khi thất bại

    var axiosResult = productSer.getProductList();

    axiosResult.then(function (result) {
        //?Resolve (thành công)
        // console.log(result);
        console.log(result.data);
        //? các xử lý sau khi có data
        showTable(result.data);

    })
        .catch(function (error) {
            //? Reject (thất bại)
            console.log(error)
        });

}

//lấy danh sách khi load web
showProductList();

// function addProduct() {
//     //lấy dữ liệu từ form
//     var tenSP = document.querySelector("#TenSP").value;
//     var gia = document.querySelector("#GiaSP").value
//     var hinhAnh = document.querySelector("#HinhSP").value
//     var moTa = document.querySelector("#MoTa").value;

//     //Tạo đối tượng sản phẩm
//     var product = new Product(tenSP, gia, hinhAnh, moTa);
//     // console.log(product)

//     //truyền xuống BE
//     productSer.addProductSer(product)
//         .then(function (result) {
//             console.log(result);
//             //hiển thị lại danh sách
//             showProductList();

//         })
//         .catch(function (error) {
//             console.log(error)
//         })

//     //hien thị danh sach sản phẩm
// }


// document.querySelector("#btnThemSP").onclick = function () {
//     //thêm button cho form
//     document.querySelector("#myModal .modal-footer").innerHTML = `
//         <button class="btn btn-success" onclick="addProduct()" >Add Product</button>
//     `;

//     // document.querySelector("#TenSP").value = "";
//     document.querySelector("#formProduct").reset();

// }


// function deleteProduct(id) {
//     console.log(id);
//     productSer.deleteProductSer(id)
//         .then(function (result) {
//             console.log(result);

//             //hiển thị lại danh sách
//             showProductList();
//         })
//         .catch(function (error) {
//             console.log(error)
//         })
// }

// function showProductDetail(id) {
//     console.log(id);

//     productSer.getProductItem(id)
//         .then(function (result) {
//             console.log(result.data);

//             //hiển thị lên form
//             document.querySelector("#TenSP").value = result.data.tenSP;
//             document.querySelector("#GiaSP").value = result.data.gia;
//             document.querySelector("#HinhSP").value = result.data.hinhAnh;
//             document.querySelector("#MoTa").value = result.data.moTa;

//             //thêm button update cho form
//             document.querySelector("#myModal .modal-footer").innerHTML = `
//             <button class="btn btn-success" onclick="updateProduct('${result.data.id}')" >Update Product</button>
//             `

//         })
//         .catch(function (error) {
//             console.log(error)
//         })


// }


// function updateProduct(id) {
//     console.log(id);
//     //Lấy dữ liệu từ form
//     var tenSP = document.querySelector("#TenSP").value;
//     var gia = document.querySelector("#GiaSP").value
//     var hinhAnh = document.querySelector("#HinhSP").value
//     var moTa = document.querySelector("#MoTa").value;

//     //tạo đối tương productUpdate
//     var productUpdate = new Product(tenSP, gia, hinhAnh, moTa);
//     console.log(productUpdate);

//     //Tương tác với BE để update
//     productSer.updateProductSer(productUpdate, id)
//         .then(function (result) {
//             console.log(result.data);
//             //Hiển thị lại table
//             showProductList();

//             alert("Cập nhật thành công");

//             document.querySelector("#myModal .close").click();

//         })
//         .catch(function (error) {
//             console.log(error);
//         })

// }

