<template>
  <v-app>
<template>
      <v-container class="grey lighten-5">
        <v-row :class="mb-6">
          <v-col :cols="3" :align="left">Name:</v-col>
          <v-col :cols="7" :align="left">{{this.selectedProduct.name}}</v-col>
          <v-col :cols="2"></v-col>
        </v-row>
        <v-row :class="mb-6">
          <v-col :cols="3" :align="left">QuantityInPackage:</v-col>
          <v-col :cols="7" :align="left">{{this.selectedProduct.quantityInPackage}}</v-col>
          <v-col :cols="2"></v-col>
        </v-row>
        <v-row :class="mb-6">
          <v-col :cols="3" :align="left">Unit Of Measurement:</v-col>
          <v-col :cols="7" :align="left">{{this.selectedProduct.unitOfMeasurement}}</v-col>
          <v-col :cols="2"></v-col>
        </v-row>
        <v-row :class="mb-6" >
          <v-col :cols="3" :align="left">Image:</v-col>
          <v-col :cols="7" :align="left">
       
            <v-img :src="this.selectedProduct.image"    height="250" width="250"></v-img>
            
          </v-col>
          <v-col :cols="2"></v-col>
        </v-row>

        <v-row :class="mb-6" >
          <v-col :cols="4"/>
          <v-col :cols="4">
            <v-btn color="success" @click="backProductList" >Back to List</v-btn>
          </v-col>
          <v-col :cols="4" />          
        </v-row>
      </v-container>
    </template>
  </v-app>

</template>

<script>
import router from '../router';
import { mapGetters } from "vuex";

export default {
  name: "DetailComponent",
  data: function () {
    return {};
  },
  mounted() {},
  created() {},
  computed: mapGetters(["selectedProduct"]),
  methods: {
    backProductList:function () {
     router.push("/")
  }
  },
};
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>