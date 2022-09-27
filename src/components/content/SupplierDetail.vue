<template>
     <DxPopup
          v-if="datasource.id"
          id="detail"
          :visible="store.getters.getPopupVisible"
          title="Detail"
          :resize-enabled="true"
          :width="550"
          :height="450"
          @hidden="OnHidden"
          >
          <template #content>
            <DxScrollView width="100%" height="100%">
                <div class="card mt-5">
                <div class="card-body">
                  <h5 class="card-title">{{datasource.name}}</h5>
                  <p class="card-text">{{datasource.description}}</p>
                </div>
              </div>
            </DxScrollView>
          </template>
      </DxPopup>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useStore } from "vuex";
  import { DxScrollView } from "devextreme-vue/scroll-view";
  import { DxPopup } from "devextreme-vue/popup";
  import { Mutations } from "@/store/enums/storeEnums";
   
    export default defineComponent({
      name: "SupplierDetail",
      components: {
        DxScrollView,
        DxPopup
      },

      setup() {
        const store = useStore();
        
        const datasource: any = computed(() => {
            return store.getters.getSupplierByIdDatasource;
        });
        const OnHidden = () => {
          store.commit(Mutations.SET_POPUP_VISIBLE, false);
          store.commit(Mutations.SET_SUPPLIERBYID_DATA, []);
        };
        
        return {
            store,
            datasource,
            OnHidden
        };

      }

    });

</script>
    