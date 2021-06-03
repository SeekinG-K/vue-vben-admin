<template>
  <div class="p-4">
    <div>
      <Select
        :class="buttonSelectClass"
        v-model:value="value1"
        @focus="focus"
        ref="select"
        @change="handleChange"
      >
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="disabled" disabled>Disabled</a-select-option>
        <a-select-option value="Yiminghe">yiminghe</a-select-option>
      </Select>
    </div>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '删除',
              icon: 'ic:outline-delete-outline',
              onClick: handleDelete.bind(null, record),
            },
          ]"
          :dropDownActions="[
            {
              label: '启用',
              popConfirm: {
                title: '是否启用？',
                confirm: handleOpen.bind(null, record),
              },
            },
          ]"
        />
      </template>
      <template #editColumn="{ record }">
        <span>
          <a-button type="primary" :loading="iconLoading" @click="() => edit(record.key)">
            选择 ${loading}
          </a-button>
          <a-button type="primary" :loading="iconLoading" @click="() => edit(record.key)">
            编辑
          </a-button>
          <a-button type="primary" :loading="iconLoading" @click="() => edit(record.key)">
            删除
          </a-button>
        </span>
      </template>
    </BasicTable>
  </div>
  <div ref="chartRef" :style="{ height, width }"></div>
  <div>
    <a-select
      v-model="value"
      mode="multiple"
      style="@buttonselect;"
      placeholder="select one country"
      option-label-prop="label"
    >
      <a-select-option value="china" label="China">
        <span role="img" aria-label="China"> 🇨🇳 </span>
        China (中国)
      </a-select-option>
      <a-select-option value="usa" label="USA">
        <span role="img" aria-label="USA"> 🇺🇸 </span>
        USA (美国)
      </a-select-option>
      <a-select-option value="japan" label="Japan">
        <span role="img" aria-label="Japan"> 🇯🇵 </span>
        Japan (日本)
      </a-select-option>
      <a-select-option value="korea" label="Korea">
        <span role="img" aria-label="Korea"> 🇰🇷 </span>
        Korea (韩国)
      </a-select-option>
    </a-select>
  </div>
  <!--  -->
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, Ref, onMounted } from 'vue';
  import _ from 'lodash';
  import { useECharts } from '/@/hooks/web/useECharts';
  import type { WeatherInfo } from '/#/api/backstage';
  import echarts from '/@/utils/lib/echarts';
  import EchartsEnum from '/@/utils/lib/echartsConst';
  import { BasicTable, useTable, BasicColumn, TableAction } from '/@/components/Table';
  import { Select } from 'ant-design-vue';
  import { demoListApi } from '/@/api/demo/table';

  const columns: BasicColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 300,
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 300,
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 300,
    },
    {
      title: '开始时间',
      width: 300,
      dataIndex: 'beginTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 300,
    },
    {
      title: '操作项',
      dataIndex: 'operation',
      width: 300,
      slots: { customRender: 'editColumn' },
    },
  ];

  export default defineComponent({
    components: { BasicTable, TableAction, Select },
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
    setup() {
      const focus = () => {
        console.log('focus');
      };
      const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      const [registerTable] = useTable({
        title: 'TableAction组件及固定列示例',
        api: demoListApi,
        columns: columns,
        rowSelection: {
          type: 'radio',
          getCheckboxProps: () => {
            return {
              disabled: true,
              indeterminate: true,
            };
          },
        },
        bordered: true,
        loading: false,
        scroll: {
          scrollToFirstRowOnChange: true,
        },
        actionColumn: {
          width: 160,
          title: 'Action',
          fixed: 'right',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
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
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }
      function handleOpen(record: Recordable) {
        console.log('点击了启用', record);
      }
      function edit(key: any): void {
        console.log('你点击了');
        console.log(key);
      }
      function save(key: any): void {
        console.log(key);
      }
      function cancel(key: any): void {
        console.log(key);
      }
      onMounted(() => {
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
              type: 'line',
              symbol: (rawValue: WeatherInfo, params: Object): string => {
                console.log(rawValue);
                console.log(params);
                if (rawValue.qty) return EchartsEnum.SYMBOL_BUY_SVG;
                return 'pin';
              },
              itemStyle: {
                color: 'rgb(65, 105, 225)',
                opacity: 0.618,
              },
              markPoint: {
                data: [{ type: 'max', name: '最大值' }],
                symbol: 'pin',
                symbolOffset: [0, '-20%'],
                label: {
                  show: true,
                  fontSize: 0,
                  color: 'yellow',
                },
                symbolSize: 10,
                animation: true,
                itemStyle: {
                  color: 'red',
                },
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(255,181,197)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 255, 255)',
                  },
                ]),
                opacity: 0.618,
              },
              data: [20, 80, 60, 80, 20, 15, 60],
              animation: true,
              color: 'red',
            },
          ],
        });
      });

      return {
        chartRef,
        handleDelete,
        handleOpen,
        registerTable,
        edit,
        save,
        cancel,
        focus,
        handleChange,
        value1: ref('lucy'),
        value2: ref('lucy'),
        value3: ref('lucy'),
        buttonSelectClass: 'buttonSelect',
      };
    },
    data() {
      return {
        loading: false,
        iconLoading: false,
        value: ['china'],
      };
    },
    methods: {
      getTestVueInfo(): string {
        console.log('你点击了按钮');
        const a1 = 'alex';
        return a1;
      },
    },
  });
</script>
<style lang="less">
  .buttonSelect {
    width: 120px;
  }
</style>
