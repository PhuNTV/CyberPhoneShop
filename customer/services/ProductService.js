// Thay thế cho lớp đối tượng DanhSach
function ListProductCart() {
    this.arrayListProDucts = [];


    this.addProductCart = function(product){
        this.arrayListProDucts.push(product);
    }
    // this.findIndexProductCart = function(name){

    // }
    // this.deleteProductCart = function(id){

    // }
    // this.updateProductCart = function(id,quality){

    // }
}

function ProductServive() {
    //lấy danh sách sản phẩm
    this.getProductList = function () {
        //!Promise: 3 trạng thái (pending, resolve , reject)
        //? Pending (đang chờ)
        //trả kết quả từ axios lên main
        return axios({
            method: 'get',
            url: 'https://6407479177c1a905a0f3f705.mockapi.io/Products'
        })

    }

    //thêm sản phẩm
    // this.addProductSer = function (product) {
    //     return axios({
    //         method: 'post',
    //         url: 'https://6065c01ab8fbbd001756734b.mockapi.io/Products',
    //         data: product
    //     })
    // }

    //xóa sản phẩm
    // this.deleteProductSer = function (id) {
    //     return axios({
    //         method: 'delete',
    //         url: `https://6065c01ab8fbbd001756734b.mockapi.io/Products/${id}`,
    //     })
    // }


    this.getProductItem = function (id) {
        return axios({
            method: 'get',
            url: `https://6407479177c1a905a0f3f705.mockapi.io/Products/${id}`,
        })
    }

    // cập nhật
    // this.updateProductSer = function (productUpdate,id) {
    //     return axios({
    //         method: 'put',
    //         url: `https://6065c01ab8fbbd001756734b.mockapi.io/Products/${id}`,
    //         data: productUpdate
    //     })
    // }


}