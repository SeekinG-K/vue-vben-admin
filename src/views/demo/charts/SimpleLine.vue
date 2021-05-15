<template>
  <div ref="chartRef" :style="{ height, width }"></div>
  <a-button type="primary" :loading="iconLoading" @click="getTestVueInfo"> 点击按钮 </a-button>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, Ref, onMounted } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  // import { uploadApi } from '/@/api/sys/upload';

  export default defineComponent({
    data() {
      return {
        loading: false,
        iconLoading: false,
      };
    },
    props: {
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: 'calc(100vh - 78px)',
      },
    },
    methods: {
      getTestVueInfo(): string {
        // const a: any;
        // const data = uploadApi(a,);
        // console.log(data);
        console.log('你点击了按钮');
        const a1 = 'alex';
        return a1;
      },
    },
    setup() {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      onMounted(() => {
        setOptions({
          // backgroundColor: '#0f375f',
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line',
            },
          ],
        });
      });
      return { chartRef };
    },
  });
</script>
