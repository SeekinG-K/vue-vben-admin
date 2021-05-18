<template>
  <div ref="chartRef" :style="{ height, width }"></div>
  <!-- <a-button type="primary" :loading="iconLoading" @click="getTestVueInfo"> 点击按钮 </a-button> -->
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, Ref, onMounted } from 'vue';
  import _ from 'lodash';
  import { useECharts } from '/@/hooks/web/useECharts';
  import type { WeatherInfo } from '/#/api/backstage';
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
      const dataTable: Array<WeatherInfo> = [
        {
          datetime: '2020-12-01',
          direction: 'buy',
          qty: 0.2,
          price: 805,
          text: 'buy 0.2 shares at 805',
        },
        {
          datetime: '2020-12-02',
          direction: 'sell',
          qty: 0.2,
          price: 1100,
          text: 'buy 0.2 shares at 1100',
        },
        {
          datetime: '2020-12-03',
          direction: 'buy',
          qty: 0.2,
          price: 900,
          text: 'buy 0.2 shares at 900',
        },
        {
          datetime: '2020-12-04',
          direction: 'buy',
          qty: 0.2,
          price: 800,
          text: 'buy 0.2 shares at 800',
        },
        {
          datetime: '2020-12-05',
          direction: 'buy',
          qty: 0.2,
          price: 1000,
          text: 'buy 0.2 shares at 1000',
        },
        {
          datetime: '2020-12-06',
          direction: 'sell',
          qty: 0.2,
          price: 860,
          text: 'buy 0.2 shares at 860',
        },
        {
          datetime: '2020-12-07',
          direction: 'buy',
          qty: 0.2,
          price: 1200,
          text: 'buy 0.2 shares at 1200',
        },
      ];
      function f1(params: Array<WeatherInfo>): void {
        params.forEach((item) => {
          const a: string = _.get(item, 'datetime');
          console.log(a);
        });
      }
      onMounted(() => {
        debugger;
        f1(dataTable);
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
            data: [
              '2020-12-01',
              '2020-12-02',
              '2020-12-03',
              '2020-12-04',
              '2020-12-05',
              '2020-12-06',
              '2020-12-07',
            ],
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
                label: {
                  fontSize: 10,
                },
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
