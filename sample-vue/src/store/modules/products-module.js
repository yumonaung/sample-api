import axios from 'axios'

const state = { 
    products: [],
    totalItems:null,
    selectedId : -1
};

const getters = { 
    productsList: state => state.products,
    totalProducts: state => state.totalItems,
    selectedProduct : state => state.products?.find(x => x.id = state.selectedId)
};

const actions = { 
    async fetchProducts({commit},request){
      const response = await axios.get(`https://localhost:44341/api/products?CategoryId=${request.id}&Page=${request.pageNumber}&ItemsPerPage=20`);
      commit("setProducts", response.data.items)
      commit("setTotalItems", response.data.totalItems/20)
    },
    async addProduct({commit}, product){
      const response = await axios.post("https://localhost:44341/api/products", product);
      commit("addNewProduct", response.data)
    },
    async deleteProduct({commit}, data){
      await axios.delete(`https://localhost:44341/api/products/${data.id}`);
      commit("removeProduct", data)
    },
    async setSelectedId({commit}, data){
        console.log(data);
        commit("setSelectedId", data)
    }

};

const mutations = { 
    setProducts: (state, products) => (
        state.products = products
    ),
    setTotalItems: (state, totalItems) => (
        state.totalItems = totalItems
    ),
    addNewProduct: (state, product) => state.products.unshift(product),
    removeProduct: (state, id) => (
        state.products.filter(product => product.id !== id),
        state.products.splice(product => product.id, 1)
    ),
    setSelectedId: (state, id) => (
        state.selectedId = id
    ),
};

export default {
    state,
    getters,
    actions,
    mutations
}