<template>
  <draggable
    class="dragArea"
    tag="ul"
    :list="tasks"
    :group="{ name: 'g1' }"
    animation="300"
    :fallbackOnBody="true"
    :move="onMove"
  >
    <li v-for="el in tasks" :key="el.name">
      <p>
        <i :class="el.iconLs ? el.iconLs : 'el-icon-setting'"></i>{{ el.name }}
      </p>
      <draggable
        class="dragArea1"
        tag="ul"
        :list="el.childrenMenus"
        :group="{ name: 'g1' }"
        animation="300"
        :fallbackOnBody="true"
      >
        <li v-for="els in el.childrenMenus" :key="els.name">
          <p><i :class="els.iconLs ? els.iconLs : ''"></i>{{ els.name }}</p>
        </li>
      </draggable>
    </li>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
export default {
  props: {
    tasks: {
      required: true,
      type: Array,
    },
  },
  components: {
    draggable,
  },
  name: "nested-draggable",
  methods: {
    onMove(e) {
      if (
         e.relatedContext.element &&
        e.draggedContext.element.childrenMenus.length > 0 &&
        e.relatedContext.element.childrenMenus.length == 0
      ) {
        for (let item of this.tasks) {
          if (item.name == e.relatedContext.element.name) {
            return true;
          }
        }
        return false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.dragArea {
  list-style: none;
  // min-height: 2px;
  padding-bottom: 10px;
}

.dragArea1 {
  list-style: none;
}
.el-dialog__body {
  > .dragArea {
    > li {
      > p {
        background-color: bisque;
        font-size: 16px;
        height: 31px;
        line-height: 31px;
        border-radius: 7px;
        padding-left: 5px;
        margin-bottom: 5px;
      }
    }
  }
}

p {
  background-color: skyblue;
  margin: 0px;
  height: 28px;
  line-height: 25px;
  border-radius: 7px;
  padding-left: 5px;
  margin-bottom: 5px;
}
</style>