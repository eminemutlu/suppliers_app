<template>
  <h1>Suppliers</h1>
  <div class="mt-3">
    <DxDataGrid
        :data-source="store.getters.getSupplierDatasource.results"
        key-expr="id"
        :show-borders="true"
        >
        <DxScrolling row-rendering-mode="virtual"/>
        <DxPager :visible="false" />
        <DxColumn :width="50" data-field="id"/>
        <DxColumn data-field="name"/>
        <DxColumn data-field="description"/>
        <DxColumn type="buttons">
          <DxButton
            icon="edit"
            text="detail"
            :on-click="goValue" />
        </DxColumn>
        
      </DxDataGrid>
      <Paginaton :actionMethod="Suppliers" :datasourceCount="store.getters.getSupplierDatasource.count" /> 
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, onMounted, ref } from "vue";
  import { useStore } from "vuex";
  import { Actions } from "@/store/enums/storeEnums";
  import { DxDataGrid, DxColumn, 
    DxPager, 
    DxScrolling, 
    DxButton 
  } from 'devextreme-vue/data-grid';
  import Paginaton from "../_shared/pagination.vue"
  
  export default defineComponent({
    name: "SuppliersList",
    components: {
        DxDataGrid,
        DxColumn,
        DxPager,
        DxScrolling,
        DxButton,
        Paginaton
      },

    setup() {
      const store = useStore();
      const pageIndex = ref(1);
      const Suppliers = Actions.SUPPLIERS;

      const datasource: any = computed(() => {
        console.log(store.getters.getSupplierDatasource);
          return store.getters.getSupplierDatasource;
      });
 
      const goValue = ((e: any) => {
        const id = e.row.data.id;
        if(Number(id)) {
          store.dispatch(Actions.SUPPLIERBYID_DATA, id);
        }
      });
     
      onMounted(() => { 
        store.dispatch(Suppliers, pageIndex.value);
       });

      return { 
        datasource,
        goValue,
        store,
        pageIndex,
        Suppliers
      };

    }

  });

</script>