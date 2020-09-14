<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    > 

     <v-toolbar-title>List</v-toolbar-title>    
    </v-app-bar>

<v-container id="dropdown-categories">
    <v-row>
      <v-col cols="12" sm="4">
        <p>Categories</p>

        <v-overflow-btn
          class="my-2"
          v-if="categoryList != null"
          :items="categoryList"        
          item-text="name"
          item-value="id"
          label="Select Categories"
          target="#dropdown-categories"
          v-model ="selectedcate"
          @change="slectcategory"
         
        ></v-overflow-btn>
        
      </v-col>
    </v-row>

<p align="right">
 <v-btn class="ma-2" tile color="success" dark @click="addproduct"><v-icon dark>mdi-plus</v-icon></v-btn>
 <v-btn class="ma-2" tile color="success" dark > <v-icon dark>mdi-pencil</v-icon></v-btn>
 <v-btn class="ma-2" tile outlined color="error"  @click.stop="dialog = true"><v-icon dark>mdi-delete</v-icon></v-btn>

 <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>

        <v-card-text>
         Are you sure to delete this product {{this.selectedProduct}}?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="removeproduct"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</p>
     <v-data-table
  
    :headers="headers"
    :items="productsList"
    :server-items-length="totalProducts"
    :hide-default-footer="true"
    class="elevation-1"
    show-select
    @item-selected="productSelect"
  
  >
   <template v-slot:[`item.image`]="{ item }">
     <v-img :src="item.image" aspect-ratio="1.7" class="mb-3 mt-3"></v-img>
    </template>

   <template  v-slot:[`item.action`]="{ item }">
        <v-btn color="success" @click="detailProduct(item)" :loading="item.createloading" :disabled="item.createloading">DETAIL</v-btn>
                
    </template>

  </v-data-table>
  
  <v-pagination v-if="totalProducts" v-model="page" :length="totalProducts"  @input="pageChange($event)"></v-pagination>
  </v-container>

  </v-app>
</template>

<script>

import router from '../router'
import {
    mapGetters,
    mapActions
  } from "vuex";

export default {
  name: 'DisplayList',
  data : function () { 
    return {
        selectedcate:undefined,
        products:null,
        selectedProduct:null,
        page:1,
        dialog: false,
        headers: [
          { text: 'Image', value: 'image' },
          { text: 'Name', value: 'name' },
          { text: 'Quantity in Package', value: 'quantityInPackage' },
          { text: 'Unit of Measurement', value: 'unitOfMeasurement' },
           { text: 'Actions', value: 'action', sortable: false, align: 'center'},
        
        ],
    }
  },
  created() {
    this.fetchCategories();
   
  },
  computed : mapGetters(["productsList","categoryList","totalProducts"]),
 
  methods : {
    ...mapActions(["fetchProducts"]),
    ...mapActions(["fetchCategories"]),
    ...mapActions(["setSelectedId"]),
    ...mapActions(["deleteProduct"]),
    slectcategory: function(value) {
        this.fetchProducts({ id: value,pageNumber : 1 });
    },
    pageChange : function(number){
      this.fetchProducts({ id: this.selectedcate , pageNumber : number });
    }, 
    productSelect: function(selectInfo){
   
      if(selectInfo.value){
        alert(selectInfo.item.id)
      this.selectedProduct=  selectInfo.item.id
      }
    
    }, 
  async detailProduct(item) {
   await this.setSelectedId(item.id)
   router.push(`/productid/${item.id}`)
  },
  addproduct: function() {
        router.push('/addproduct')
    },
  removeproduct: function() {
  this.dialog=false;
  alert(this.selectedProduct);
  this.deleteProduct({id:this.selectedProduct});
            
    },
  }
}
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>