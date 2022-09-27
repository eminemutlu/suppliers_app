
<template>
   <div class="mt-3 d-flex justify-content-end">
        <btn icon="back" @click="prev" />
        <span class="p-2">{{pageIndex}}&nbsp;/&nbsp;{{$props.datasourceCount}}</span>
        <btn icon="chevronright" @click="next" />
      </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from "vue";
    import { useStore } from "vuex";
    import { DxButton as btn} from 'devextreme-vue/button';

    export default defineComponent({
    name: "Pagination",
    components: {
        btn
    },
    props: {
        actionMethod: {
            type: String,
            required: true,
        },
        datasourceCount: {
            type: Number,
            required: true,
        }
    },

    setup(props) {
        const store = useStore();
        const pageIndex = ref(1);

        const prev = () => {
            if(pageIndex.value > 1) {
            pageIndex.value = pageIndex.value -1;
            store.dispatch(props.actionMethod, pageIndex.value);
            }
        };
        const next = () => {
            const pageCount: number = (props.datasourceCount)/10;
            if(pageCount >= pageIndex.value ) {
            pageIndex.value = pageIndex.value + 1;
            store.dispatch(props.actionMethod, pageIndex.value);
            }
        };
        
        onMounted(() => { });

        return { 
            prev,
            next,
            store,
            pageIndex
        };
    }

});
  
</script>
    