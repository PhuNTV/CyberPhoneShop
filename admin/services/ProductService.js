function ProductServive() {
    this.getProductList = function() {
        return axios({
            method: 'get',
            url: 'https://64172b2b9863b4d772a45d17.mockapi.io/Products'
        })

    }

    this.addProductSer = function(product) {
        return axios({
            method: 'post',
            url: 'https://64172b2b9863b4d772a45d17.mockapi.io/Products',
            data: product
        })
    }

    this.deleteProductSer = function(id) {
        return axios({
            method: 'delete',
            url: `https://64172b2b9863b4d772a45d17.mockapi.io/Products/${id}`,
        })
    }


    this.getProductItem = function(id) {
        return axios({
            method: 'get',
            url: `https://64172b2b9863b4d772a45d17.mockapi.io/Products/${id}`,
        })
    }

    this.updateProductSer = function(productUpdate, id) {
        return axios({
            method: 'put',
            url: `https://64172b2b9863b4d772a45d17.mockapi.io/Products/${id}`,
            data: productUpdate
        })
    }


}