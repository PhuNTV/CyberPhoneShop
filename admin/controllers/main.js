const productSer = new ProductServive();
const validation = new Validation();

function showTable(arrayData) {
    var content = "";

    arrayData.map(function(product, index) {
        content += `
            <tr>
                <td ">${product.name}</td>
                <td ">${product.price.toLocaleString()}</td>
                <td ">${product.screen}</td>
                <td ">${product.backCamera}</td>
                <td ">${product.frontCamera}</td>
                <td "><img src="${product.img}" style="width:100%" ></td>
                <td ">${product.desc}</td>
                <td ">${product.type}</td>
                <td ">
                    <button onclick="deleteProduct('${product.id}')" class="btn btn-danger" style=" width: 60px; padding: 10px 10px;">Xóa</button>
                    <br>
                    <br>
                    <button  data-toggle="modal" data-target="#myModal"    onclick="showProductDetail('${product.id}')"      class="btn btn-info"  style=" width: 60px; padding: 10px 10px;">Xem</button>
                </td>
            </tr>
        `
    });

    document.querySelector("#tblDanhSachSP").innerHTML = content;

}

function showProductList() {
    //hiển thị danh sach khi thành công. Ngược lại báo lỗi khi thất bại

    var axiosResult = productSer.getProductList();

    axiosResult.then(function(result) {
            //?Resolve (thành công)
            // console.log(result);
            console.log(result.data);
            //? các xử lý sau khi có data
            showTable(result.data)

        })
        .catch(function(error) {
            //? Reject (thất bại)
            console.log(error)
        });

}

//lấy danh sách khi load web
showProductList();

function addProduct() {
    //lấy dữ liệu từ form
    var name = document.getElementById("TenSP").value;
    var price = Number(document.querySelector("#GiaSP").value);
    var screen = document.querySelector("#ManHinhSP").value;
    var backCamera = document.querySelector("#BackCamSP").value;
    var frontCamera = document.querySelector("#FrontCamSP").value;
    var img = document.querySelector("#HinhSP").value
    var desc = document.querySelector("#MoTa").value
    var type = document.querySelector("#LoaiSP").value;

    //truyền xuống BE

    var isValid = true;

    isValid &= validation.checkEmpty(name, "tbName", "Tên sản phẩm không để trống!");
    isValid &= validation.checkEmpty(price, "tbGia", "Giá không để trống!") && validation.checkPrice(price, "tbGia", "Hiện tại samsung và iphone mỗi mặt hàng đều lớn 1 triệu và nhỏ hơn 50 triệu!");
    isValid &= validation.checkEmpty(screen, "tbManHinh", "Size màn hình không để trống!");
    isValid &= validation.checkEmpty(backCamera, "tbBackCam", "Thông tin không được để trống!");
    isValid &= validation.checkEmpty(frontCamera, "tbFrontCam", "Thông tin không được để trống!");
    isValid &= validation.checkEmpty(img, "tbHinh", "Thông tin không được để trống!");
    isValid &= validation.checkEmpty(desc, "tbMoTa", "Thông tin không được để trống!");
    isValid &= validation.checkSelect("LoaiSP", "tbLoai", "Thông tin chưa hợp lệ!");

    if (isValid) {
        var product = new Product(name, Number(price), screen, backCamera, frontCamera, img, desc, type);
        productSer.addProductSer(product)
            .then(function(result) {
                console.log(result);
                //hiển thị lại danh sách
                showProductList();
                alert("Thêm thành công");

            })
            .catch(function(error) {
                console.log(error)
            })


    }

    //hien thị danh sach sản phẩm
}


document.querySelector("#btnThemSP").onclick = function() {
    //thêm button cho form
    document.querySelector("#myModal .modal-footer").innerHTML = `
        <button class="btn btn-success" onclick="addProduct()" >Thêm sản phẩm</button>
    `;

    document.querySelector("#formProduct").reset();

}


function deleteProduct(id) {
    console.log(id);
    productSer.deleteProductSer(id)
        .then(function(result) {
            console.log(result);
            //hiển thị lại danh sách
            showProductList();
        })
        .catch(function(error) {
            console.log(error)
        })
}



function showProductDetail(id) {


    console.log(id);

    productSer.getProductItem(id)
        .then(function(result) {
            console.log(result.data);

            //hiển thị lên form

            document.querySelector("#TenSP").value = result.data.name;
            document.querySelector("#GiaSP").value = result.data.price;
            document.querySelector("#ManHinhSP").value = result.data.screen;
            document.querySelector("#BackCamSP").value = result.data.backCamera;
            document.querySelector("#FrontCamSP").value = result.data.frontCamera;
            document.querySelector("#HinhSP").value = result.data.img;
            document.querySelector("#MoTa").value = result.data.desc;
            document.querySelector("#LoaiSP").value = result.data.type;

            //thêm button update cho form
            document.querySelector("#myModal .modal-footer").innerHTML = `
            <button class="btn btn-success" onclick="updateProduct('${result.data.id}')" >Update Product</button>
            `
        })
        .catch(function(error) {
            console.log(error)
        })


}

function updateProduct(id) {

    console.log(id);
    //Lấy dữ liệu từ form
    var name = document.getElementById("TenSP").value;
    var price = Number(document.querySelector("#GiaSP").value);
    var screen = document.querySelector("#ManHinhSP").value;
    var backCamera = document.querySelector("#BackCamSP").value;
    var frontCamera = document.querySelector("#FrontCamSP").value;
    var img = document.querySelector("#HinhSP").value
    var desc = document.querySelector("#MoTa").value
    var type = document.querySelector("#LoaiSP").value;

    //tạo đối tương productUpdate

    var isValid = true;

    isValid &= validation.checkEmpty(name, "tbName", "Tên sản phẩm không để trống!");
    isValid &= validation.checkEmpty(price, "tbGia", "Giá không để trống!") && validation.checkPrice(price, "tbGia", "Hiện tại samsung và iphone mỗi mặt hàng đều lớn 1 triệu và nhỏ hơn 50 triệu!");
    isValid &= validation.checkEmpty(screen, "tbManHinh", "Size màn hình không để trống!");
    isValid &= validation.checkEmpty(backCamera, "tbBackCam", "Thông tin không được để trống!");
    isValid &= validation.checkEmpty(frontCamera, "tbFrontCam", "Thông tin không được để trống!");
    isValid &= validation.checkEmpty(img, "tbHinh", "Thông tin không được để trống!");
    isValid &= validation.checkEmpty(desc, "tbMoTa", "Thông tin không được để trống!");
    isValid &= validation.checkSelect("LoaiSP", "tbLoai", "Thông tin chưa hợp lệ!");

    //Tương tác với BE để update
    if (isValid) {
        var productUpdate = new Product(name, Number(price), screen, backCamera, frontCamera, img, desc, type);
        console.log(productUpdate);
        productSer.updateProductSer(productUpdate, id)
            .then(function(result) {
                console.log(result.data);

                //Hiển thị lại table
                showProductList();
                alert("Cập nhật thành công");
                document.querySelector("#myModal .close").click();
                // document.querySelector("#formProduct").reset();

            })
            .catch(function(error) {
                console.log(error);
            })

    }

}




function searchProduct() {
    //hiển thị danh sach khi thành công. Ngược lại báo lỗi khi thất bại

    var axiosResult = productSer.getProductList();

    axiosResult.then(function(result) {
            var products = result.data;

            // Lấy input tìm kiếm
            var searchInput = document.getElementById('searchName');

            // Lắng nghe sự kiện onkeyup của input tìm kiếm
            searchInput.onkeyup = function() {
                // Lấy giá trị của input tìm kiếm
                var searchValue = searchInput.value.toLowerCase();

                // Lọc danh sách sản phẩm theo tên sản phẩm chứa từ khóa tìm kiếm
                var filteredProducts = products.filter(function(product) {
                    return product.name.toLowerCase().includes(searchValue);
                });

                // Hiển thị danh sách sản phẩm đã lọc
                showTable(filteredProducts);
            };

        })
        .catch(function(error) {
            //? Reject (thất bại)
            console.log(error)
        });

}
searchProduct();

function sortUp() {

    var axiosResult = productSer.getProductList();

    axiosResult.then(function(result) {
        var products = result.data;
        var sortIcons = document.querySelectorAll('.sort-icon');
      
        sortIcons.forEach(function(icon) {
          icon.addEventListener('click', function() {
            var selectedValue = this.getAttribute('data-value');
      
            if (selectedValue === 'asc') {
              products.sort(function(a, b) {
                return a.price - b.price;
              });
            } else if (selectedValue === 'desc') {
              products.sort(function(a, b) {
                return b.price - a.price;
              });
            }
      
            showTable(products);
          });
        });
      })
      .catch(function(error) {
        console.log(error);
      });
}

sortUp();