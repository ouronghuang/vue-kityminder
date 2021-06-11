<template>
  <vue-kityminder
      style="height: 600px"
      ref="kityminder"
      theme="classic"
      template="fish-bone"
      :value="val"
      :toolbar-status="toolbar"
      @content-change="handleContent"
      @node-change="handleNode"
      @node-remove="handleRemove"
      @selection-change="handleSelection"
  >
  </vue-kityminder>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      val: {
        data: {
          id: 1,
          text: 'test'
        },
        children: [
          {
            data: {
              id: 2,
              text: '新闻\nsrc/module/node.j'
            }
          },
          {
            data: {
              id: 3,
              text: '网页'
            }
          }
        ]
      },
      toolbar: {
        appendSiblingNode: true,
        arrangeUp: true,
        arrangeDown: false,
        text: true,
        template: true,
        hand: false,
        resetLayout: true,
        zoomIn: true,
      }
    }
  },
  methods: {
    handleContent(data) {
      console.log(data);
    },
    handleNode(data) {
      console.log(data);

      if (data.id === 0) {
        this.$refs.kityminder.setNodeData('id', 12138);
      }
    },
    handleRemove(data) {
      console.log(data);
    },
    handleSelection(data) {
      console.log(data);
    }
  }
}
</script>
