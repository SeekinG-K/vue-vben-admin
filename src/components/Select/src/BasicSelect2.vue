<template>
  <Select placeholder="input search text" :class="[getColor, $attrs.class]" @click="onClick">
    <OptionItem key="1" value="aa">a</OptionItem>
  </Select>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Select } from 'ant-design-vue';
  import { propTypes } from '/@/utils/propTypes';
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
    setup(props) {
      debugger;
      const OptionItem = Select.Option;
      const getColor = computed(() => {
        const { color, disabled } = props;
        return {
          [`ant-btn-${color}`]: !!color,
          [`is-disabled`]: disabled,
        };
      });

      return {
        getColor,
        OptionItem,
      };
    },
  });
</script>
