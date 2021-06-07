<template>
  <Select
    v-bind="getBindValue"
    show-search
    placeholder="input search text"
    :class="[getColor, $attrs.class]"
    :filter-option="false"
    @click="onClick"
    :not-found-content="null"
    @search="fetchUser"
  >
    <Select.Option>a</Select.Option>
    <!-- <Select.Option v-for="d in data" :key="d.value">
      {{ d.text }}
    </Select.Option> -->
  </Select>
</template>
<script lang="ts">
  import { defineComponent, computed, reactive, toRefs, watch } from 'vue';
  import { Select } from 'ant-design-vue';
  import { propTypes } from '/@/utils/propTypes';
  import { debounce } from 'lodash-es';
  import type { SearchInfo, SearchStateInfo } from '/#/api/searchInfo';
  export default defineComponent({
    name: 'ASelect',
    components: { Select },
    inheritAttrs: false,
    props: {
      type: propTypes.oneOf(['primary', 'default', 'danger', 'dashed', 'link']).def('default'),
      color: propTypes.oneOf(['error', 'warning', 'success', '']),
      loading: propTypes.bool,
      disabled: propTypes.bool,
      preIcon: propTypes.string,
      postIcon: propTypes.string,
      onClick: propTypes.func,
    },
    setup(props, { attrs }) {
      const Option = Select.Option;
      let lastFetchId = 0;
      const getColor = computed(() => {
        const { color, disabled } = props;
        return {
          [`ant-btn-${color}`]: !!color,
          [`is-disabled`]: disabled,
        };
      });
      const a0: Array<SearchInfo> = [];
      const a1: SearchStateInfo = {
        data: a0,
        value: '',
        fetching: false,
      };
      const state: SearchStateInfo = reactive(a1);

      const fetchUser = debounce((value) => {
        console.log('fetching user', value);
        lastFetchId += 1;
        const fetchId = lastFetchId;
        const a: Array<SearchInfo> = [];
        state.data = a;
        state.fetching = true;
        fetch('https://randomuser.me/api/?results=5')
          .then((response) => response.json())
          .then((body) => {
            if (fetchId !== lastFetchId) {
              // for fetch callback order
              return;
            }
            const data = body.results.map((user) => {
              const d: SearchInfo = {
                text: `${user.name.first} ${user.name.last}`,
                value: user.login.username,
              };
              return d;
            });
            state.data = data;
            state.fetching = false;
          });
      }, 800);

      watch(state.value, () => {
        state.data = [];
        state.fetching = false;
      });

      const getBindValue = computed((): any => {
        return { ...attrs, ...props };
      });

      return {
        ...toRefs(state),
        getBindValue,
        getColor,
        fetchUser,
        Option,
      };
    },
  });
</script>
