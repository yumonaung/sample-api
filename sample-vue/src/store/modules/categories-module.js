import axios from 'axios'

const state = { 
    categories: []
};

const getters = { 
    categoryList: state => state.categories,
};

const actions = { 
    async fetchCategories({commit}){
      const response = await axios.get("https://localhost:44341/api/categories");
      commit("setCategories", response.data)
    },
    async addCategory({commit}, product){
      const response = await axios.post("http://localhost:3000/products", product);
      commit("addNewCategory", response.data)
    },
    async deleteCategory({commit}, id){
      await axios.delete(`http://localhost:3000/products/${id}`);
      commit("removeCategory", id)
    }
};

const mutations = { 
    setCategories: (state, categories) => (
        state.categories = categories
    ),
    addNewCategory: (state, category) => state.categories.unshift(category),
    removeCategory: (state, id) => (
        state.categories.filter(category => category.id !== id),
        state.categories.splice(category => category.id, 1)
    )
};

export default {
    state,
    getters,
    actions,
    mutations
}