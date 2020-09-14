<template>
<v-app>
     <v-app-bar
      app
      color="primary"
      dark
    > 

     <v-toolbar-title>ADD</v-toolbar-title>    
    </v-app-bar>
 <ValidationObserver ref="observer"  v-slot="{ invalid }" tag="form" @submit.prevent="submit()">
  <form style="margin:30px">
      <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:10">
    <v-text-field
      v-model="name"
       :error-messages="errors"
      :counter="10"
      label="Name"
      required
    ></v-text-field>
      </ValidationProvider>

       <ValidationProvider v-slot="{ errors }" name="Quantity In Package" rules="required">
    <v-text-field
      v-model="quantityInPackage"
      :error-messages="errors"
      label="Quantity In Package"
      type = "number"
      required
    ></v-text-field>
</ValidationProvider>
     <ValidationProvider v-slot="{ errors }" name="Unit Of Measurement" rules="required">
    <v-text-field
      v-model="unitOfMeasurement"    
      :error-messages="errors"
      label="Unit Of Measurement"
      required 
    ></v-text-field>
</ValidationProvider>

<ValidationProvider v-slot="{ errors }" name="Category" rules="required">
    <v-select
      v-model="category"
      :error-messages="errors"
      :items="categoryList"
      item-text="name"
      item-value="id"
      label="Category"
      required
    ></v-select>
</ValidationProvider>
    <v-btn class="mr-4" :disabled="invalid" @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
   </ValidationObserver >
</v-app>
</template>

<script>
 import { required,max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
 setInteractionMode('eager')
extend('required', {
  ...required,
  message: ' {_field_} is required'
});
  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

import {
    mapGetters,
    mapActions
  } from "vuex";

export default {
  name: "AddProduct",
   components: {
    ValidationProvider,   ValidationObserver,
  },
  data: function () {
    return {
         name : '',
        quantityInPackage :'',
        unitOfMeasurement :'',
        category : null,
    };
  },
  mounted() {},
  created() {
    this.fetchCategories();
   
  },
  computed : mapGetters(["categoryList"]),
  methods : {
    
    ...mapActions(["fetchCategories"]),
    ...mapActions(["addProduct"]),
    async submit () {
       // alert(this.category.name);
       const isValid = await this.$refs.observer.validate()
      if (isValid) {
          this.addProduct({
                    name : this.name,
                    quantityInPackage :parseInt(this.quantityInPackage),
                    unitOfMeasurement :parseInt(this.unitOfMeasurement),
                    categoryId : this.category,
            })
      }


      },
    clear () {
        this.name = ''
        this.quantityInPackage = ''
        this.unitOfMeasurement = ''
        this.category = null
        this.$refs.observer.reset()
      },
    },

 
};
</script>