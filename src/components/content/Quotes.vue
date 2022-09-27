<template>
    <h1>Quotes</h1>
    <div class="mt-3">
      <DxDataGrid
          :data-source="store.getters.getQuotesDatasource.results"
          key-expr="id"
          :show-borders="true"
          >
          <DxScrolling row-rendering-mode="virtual"/>
          <DxPager :visible="false" />
          <DxColumn :width="50" data-field="id"/>
          <DxColumn data-field="amount"/>
          <DxColumn data-field="created" dataType="date" format="dd/MM/yyyy HH:mm"/>
          <DxColumn data-field="title"/>
          <DxColumn type="buttons">
            <DxButton
              icon="edit"
              text="detail"
              :on-click="goValue" />
          </DxColumn>
        </DxDataGrid>
        <Paginaton :actionMethod="Quotes" :datasourceCount="store.getters.getQuotesDatasource.count" />
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent, computed, onMounted, ref } from "vue";
    import { useStore } from "vuex";
    import { Actions } from "@/store/enums/storeEnums";
    import { 
      DxDataGrid, 
      DxColumn, 
      DxPager,
      DxScrolling, 
      DxButton
    } from 'devextreme-vue/data-grid';
    import notify from "devextreme/ui/notify";
   
    import Paginaton from "../_shared/pagination.vue"

    export default defineComponent({
      name: "Quotes",
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
        const Quotes = Actions.QUOTES;
        
        const datasource: any = computed(() => {
            return store.getters.getQuotesDatasource;
        });
   
        const goValue = ((e: any) => {
            const id = e.row.data.supplier_id;
            if(Number(id)) {
                store.dispatch(Actions.SUPPLIERBYID_DATA, id);
            } else {
                notify({
                message: "There is no Supplier",
                width: 350, 
                shading: true,
                position: {
                    my: 'right top',
                    at: 'right top',
                },
                }, 'error', 1000);
            }
        });
  
        onMounted(() => { 
          store.dispatch(Quotes, pageIndex.value);
         });
  
        return { 
          datasource,
          goValue,
          store,
          Quotes
        };
      }
    });
  
  </script>
      