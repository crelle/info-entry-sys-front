<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="父级菜单名称">
          <el-select
            v-model="formData.name"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in fatherData"
              :key="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子级菜单名称">
          <el-select
            v-model="formData.childrenName"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in childrenData"
              :key="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onCreate">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :load="load"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="code" label="编码" width="180">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
      </el-table>
    </el-card>
    <add-dictionary ref="AddDictionaryRef"></add-dictionary>
  </div>
</template>

<script>
import AddDictionary from "@/views/sysmanage/dictionary/dialog/AddDictionary.vue";
import { queryDictionary } from "@/api/dictionary";

export default {
  components: {
    AddDictionary,
  },
  data() {
    return {
      formData: {
        name: "",
        childrenName: "",
      },
      fatherData: [],
      childrenData: [],
      value: [],
      list: [],
      loading: false,
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      dictionaryData: [
        {
          id: 1,
          name: "部门",
          code: "department",
          updateTime: "123",
        },
        {
          id: 2,
          name: "人名",
          code: "name",
          updateTime: "456",
          hasChildren: true,
        },
        {
          id: 1,
          name: "动物",
          code: "department",
          updateTime: "123",
        },
      ],
    };
  },
  mounted() {
    this.list = this.states.map((item) => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  methods: {
    remoteMethod(query) {
      debugger;
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = [];
          let data = { records: [{ ...this.formData }] };
          debugger;
          queryDictionary(data).then((resp) => {
            console.log("@@@@@@@@@@@@@@", resp);
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    load(tree, treeNode, resolve) {
      console.log("@@@@@@@@@@@@@", tree, treeNode, resolve);
      setTimeout(() => {
        resolve([
          {
            id: 31,
            code: "2016-05-01",
            name: "王小虎",
            updateTime: "上海市普陀区金沙江路 1519 弄",
          },
          {
            id: 32,
            code: "2016-05-01",
            name: "王小虎",
            updateTime: "上海市普陀区金沙江路 1519 弄",
          },
        ]);
      }, 1000);
    },

    onCreate() {
      this.$refs.AddDictionaryRef.openDialog();
    },

    onsubmit() {
      let data = { records: [{ ...this.dictionary }] };
      queryDictionary(data).then((resp) => {
        console.log("@@@@@@@@@@@@@@", resp);
      });
    },
  },
};
</script>

<style>
</style>