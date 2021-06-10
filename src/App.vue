<template>
  <div id="app">
    <vue-kityminder
        style="height: 600px"
        :value="val"
        @content-change="handleContent"
        @node-change="handleNode"
        @node-remove="handleRemove"
    >
    </vue-kityminder>
  </div>
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
      }
    }
  },
  methods: {
    handleContent(data) {
      console.log(data);
    },
    handleNode(data) {
      console.log(data);
    },
    handleRemove(data) {
      console.log(data);
    }
  }
}
</script>
