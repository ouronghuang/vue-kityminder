<template>
  <div
      :class="$options.name"
      :id="id"
  >
    <div
        v-if="toolbar.show && toolbar.left"
        :class="`${$options.name}-toolbar-left`"
    >
      <button
          v-if="toolbar.appendSiblingNode"
          type="button"
          :class="`${$options.name}-btn`"
          :disabled="!selectedNodes"
          @click="handleCommand('AppendSiblingNode')"
      >
        插入同级
      </button>
      <button
          v-if="toolbar.appendChildNode"
          type="button"
          :class="`${$options.name}-btn ${$options.name}-ml`"
          :disabled="!selectedNodes"
          @click="handleCommand('AppendChildNode')"
      >
        插入下级
      </button>
      <button
          v-if="toolbar.arrangeUp"
          type="button"
          :class="`${$options.name}-btn ${$options.name}-ml`"
          :disabled="!selectedNodes"
          @click="handleCommand('ArrangeUp')"
      >
        上移
      </button>
      <button
          v-if="toolbar.arrangeDown"
          type="button"
          :class="`${$options.name}-btn ${$options.name}-ml`"
          :disabled="!selectedNodes"
          @click="handleCommand('ArrangeDown')"
      >
        下移
      </button>
      <button
          v-if="toolbar.removeNode"
          type="button"
          title="双击执行删除操作"
          :class="`${$options.name}-btn ${$options.name}-ml`"
          :disabled="selectedNodes !== 1"
          @dblclick="removeNode"
      >
        删除
      </button>
      <input
          v-if="toolbar.text"
          v-model="text"
          type="text"
          placeholder="回车即可更新数据"
          :class="`${$options.name}-control ${$options.name}-ml`"
          :disabled="selectedNodes !== 1"
          @keyup.enter="setNodeText()"
      >
    </div>
    <div
        v-if="toolbar.show && toolbar.right"
        :class="`${$options.name}-toolbar-right`"
    >
      <select
          v-if="toolbar.template"
          v-model="tpl"
          :class="`${$options.name}-control`"
      >
        <option
            v-for="v in templates"
            :key="v.name"
            :value="v.name"
        >
          {{ v.title }}
        </option>
      </select>
      <select
          v-if="toolbar.theme"
          v-model="the"
          :class="`${$options.name}-control ${$options.name}-ml`"
      >
        <option
            v-for="v in themes"
            :key="v.name"
            :value="v.name"
        >
          {{ v.title }}
        </option>
      </select>
      <button
          v-if="toolbar.hand"
          type="button"
          :class="`${$options.name}-btn ${$options.name}-ml`"
          @click="handleHand"
      >
        {{ hand ? '拖拽模式' : '选择模式' }}
      </button>
      <button
          v-if="toolbar.resetLayout"
          type="button"
          :class="`${$options.name}-btn ${$options.name}-ml`"
          @click="handleCommand('ResetLayout')"
      >
        整理布局
      </button>
      <button
          v-if="toolbar.zoomOut"
          type="button"
          :class="`${$options.name}-btn ${$options.name}-ml`"
          @click="handleCommand('ZoomOut')"
      >
        缩小
      </button>
      <button
          v-if="toolbar.zoomIn"
          type="button"
          :class="`${$options.name}-btn ${$options.name}-ml`"
          @click="handleCommand('ZoomIn')"
      >
        放大
      </button>
    </div>
  </div>
</template>

<script>
import 'kity';
import 'kityminder-core';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'vue-kityminder',
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          data: {
            text: '新建'
          }
        };
      }
    },
    toolbarStatus: {
      type: Object,
      default: () => {
      }
    },
    theme: {
      type: String,
      default: 'fresh-blue'
    },
    template: {
      type: String,
      default: 'filetree'
    }
  },
  data() {
    return {
      minder: null,
      tpl: this.template,
      templates: [
        {
          name: 'default',
          title: '思维导图'
        },
        {
          name: 'filetree',
          title: '目录组织图'
        },
        {
          name: 'fish-bone',
          title: '鱼骨头图'
        },
        {
          name: 'right',
          title: '逻辑结构图'
        },
        {
          name: 'structure',
          title: '组织结构图'
        },
        {
          name: 'tianpan',
          title: '天盘图'
        }
      ],
      the: this.theme,
      themes: [
        {
          name: 'classic',
          title: '脑图经典'
        },
        {
          name: 'classic-compact',
          title: '紧凑经典'
        },
        {
          name: 'fresh-blue',
          title: '天空蓝'
        },
        {
          name: 'fresh-blue-compat',
          title: '紧凑蓝'
        },
        {
          name: 'fresh-green',
          title: '文艺绿'
        },
        {
          name: 'fresh-green-compat',
          title: '紧凑绿'
        },
        {
          name: 'fresh-pink',
          title: '脑残粉'
        },
        {
          name: 'fresh-pink-compat',
          title: '紧凑粉'
        },
        {
          name: 'fresh-purple',
          title: '浪漫紫'
        },
        {
          name: 'fresh-purple-compat',
          title: '紧凑紫'
        },
        {
          name: 'fresh-red',
          title: '清新红'
        },
        {
          name: 'fresh-red-compat',
          title: '紧凑红'
        },
        {
          name: 'fresh-soil',
          title: '泥土黄'
        },
        {
          name: 'fresh-soil-compat',
          title: '紧凑黄'
        },
        {
          name: 'snow',
          title: '温柔冷光'
        },
        {
          name: 'snow-compact',
          title: '紧凑冷光'
        },
        {
          name: 'tianpan',
          title: '经典天盘'
        },
        {
          name: 'tianpan-compact',
          title: '紧凑天盘'
        },
        {
          name: 'fish',
          title: '鱼骨图'
        },
        {
          name: 'wire',
          title: '线框'
        }
      ],
      hand: 0,
      selectedNodes: 0,
      text: ''
    }
  },
  computed: {
    id() {
      return `${this.$options.name}-${this._.uid}`;
    },
    toolbar() {
      return {
        show: true,
        left: true,
        right: true,
        appendSiblingNode: true,
        appendChildNode: true,
        arrangeUp: true,
        arrangeDown: true,
        removeNode: true,
        text: true,
        template: true,
        theme: true,
        hand: true,
        resetLayout: true,
        zoomOut: true,
        zoomIn: true,
        ...this.toolbarStatus
      };
    }
  },
  watch: {
    value: {
      handler: function () {
        this.handleInit();
      },
      deep: true
    },
    template(val) {
      this.tpl = val;
    },
    tpl(val) {
      this.handleTemplate(val);
    },
    theme(val) {
      this.the = val;
    },
    the(val) {
      this.handleTheme(val);
    }
  },
  mounted() {
    this.minder = new kityminder.Minder({
      renderTo: `#${this.id}`
    });
    this.handleInit();
    this.minder.on('selectionchange', () => {
      this.selectedNodes = this.minder.getSelectedNodes().length;

      if (this.selectedNodes === 1) {
        this.text = this.minder.getSelectedNode().getText();
      } else {
        this.text = '';
      }

      this.$emit('selection-change', this.getNodeData());
    });
    this.minder.on('preExecCommand', e => {
      if ('removenode' === e.commandName) {
        this.$emit('node-remove', this.getNodeData());
      }
    });
    this.minder.on('execCommand', e => {
      if (['appendchildnode', 'appendsiblingnode'].indexOf(e.commandName) !== -1) {
        this.minder.getSelectedNode().setData('id', 0);
      } else if ('removenode' === e.commandName) {
        this.$emit('content-change', this.minder.exportJson().root);
      }
    });
  },
  methods: {
    handleInit() {
      if (!this.minder) {
        return;
      }

      this.minder.importJson({root: this.value});
      this.handleTemplate(this.tpl);
      this.handleTheme(this.the);
    },
    getNodeData() {
      if (this.selectedNodes !== 1) {
        return null;
      }

      const node = this.minder.getSelectedNode();

      return {
        level: node.getLevel(),
        ...node.getData()
      };
    },
    setNodeData(key, data) {
      if (this.selectedNodes !== 1) {
        return false;
      }

      this.minder.getSelectedNode().setData(key, data);

      return true;
    },
    removeNode() {
      if (this.selectedNodes !== 1) {
        return false;
      }

      this.handleCommand('RemoveNode');

      return true;
    },
    setNodeText(val = '') {
      val = val || this.text;

      if (!val || this.selectedNodes !== 1) {
        return;
      }

      this.minder.execCommand('text', val);
      this.$emit('content-change', this.minder.exportJson().root);
      this.$emit('node-change', this.getNodeData());
    },
    handleCommand(command) {
      this.minder.execCommand(command);
    },
    handleTemplate(template) {
      this.minder.execCommand('Template', template);
      this.$emit('template-change', template);
    },
    handleTheme(theme) {
      this.minder.execCommand('Theme', theme);
      this.$emit('theme-change', theme);
    },
    handleHand() {
      this.minder.execCommand('Hand');
      this.hand = this.minder.queryCommandState('Hand');
    }
  }
});
</script>

<style lang="scss">
@import "~kityminder-core/dist/kityminder.core.css";

$prefix: 'vue-kityminder';
$primary: #409eff;

.#{$prefix} {
  position: relative;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .#{$prefix}-toolbar-left,
  .#{$prefix}-toolbar-right {
    position: absolute;
    top: .5rem;
  }

  .#{$prefix}-toolbar-left {
    left: .5rem;
  }

  .#{$prefix}-toolbar-right {
    right: .5rem;
  }

  .#{$prefix}-btn {
    color: #fff;
    background: rgba($primary, .8);
    border: none;
    cursor: pointer;
    border-radius: 3px;
    font-size: 12px;
    transition: background .3s ease;
    padding: 2px 5px;

    &:hover {
      background: $primary;
    }

    &[disabled] {
      cursor: not-allowed;
      background: #bbb;
    }
  }

  .#{$prefix}-ml {
    margin-left: 3px;

  }

  .#{$prefix}-control {
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    outline: none;
    transition: border-color .3s ease;

    &:hover {
      border-color: $primary;
    }

    &[disabled] {
      cursor: not-allowed;
      border-color: #dcdfe6;
    }
  }
}
</style>
