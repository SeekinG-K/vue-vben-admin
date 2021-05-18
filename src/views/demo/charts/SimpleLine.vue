<template>
  <div ref="chartRef" :style="{ height, width }"></div>
  <!-- <a-button type="primary" :loading="iconLoading" @click="getTestVueInfo"> 点击按钮 </a-button> -->
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, Ref, onMounted } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
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
          title: {
            left: 'center',
            text: '净值',
          },
          tooltip: {
            trigger: 'axis',
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none',
              },
              dataView: { readOnly: false },
              restore: {},
              magicType: { type: ['bar'] },
              saveAsImage: {},
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4'],
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
          },
          series: [
            {
              name: '买入',
              type: 'line',
              symbol: 'roundRect',
              sampling: 'lttb',
              itemStyle: {
                color: 'rgb(65, 105, 225)',
              },
              markPoint: {
                data: [{ type: 'max', name: '最大值', value: '买入' }],
                symbol: 'rect',
              },
              data: [20, 80, 60, 80],
              animation: true,
            },
          ],
        });
      });
      return { chartRef };
    },
  });
</script>
