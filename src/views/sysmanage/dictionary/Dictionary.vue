<template>
  <div class="card-container">
    <el-card :body-style="{ height: '6vh', paddingTop: '60px',paddingBottom: '0px' }">
      <el-form :inline="true" ref="ruleForm">
        <el-form-item label="父级菜单名称">
          <el-select
            v-model="parent"
            filterable
            remote
            placeholder="请输入父级关键词"
            :remote-method="remoteFirst"
            :loading="loading"
            @focus="getFoucus()"
          >
            <el-option v-for="item in fatherData" :key="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子级菜单名称">
          <el-select
            v-model="child"
            filterable
            remote
            placeholder="请输入子级关键词"
            :remote-method="remoteSec"
            :loading="loading"
            @focus="getFoucus('sec')"
          >
            <el-option v-for="item in childrenData" :key="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onCreate">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card :body-style="{ height: '67vh'}">
      <el-table
        :data="dictionaryData"
        style="width: 90%"
        row-key="id"
        max-height="619"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="code" label="编码" width="180">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="300"> </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="310" align="center">
          <template slot-scope="{ row}">
            <div style="width:120px;display:flex;justify-content: end;margin: 0 auto;">
              <span class="operate-btn" type="primary" @click="edit(row)" size="small" v-if="row.children"
                >编辑</span
              >
              <span class="operate-btn" type="danger" @click="delbtn(row.id)" size="small"
                >删除</span
              >
            </div>
            
          </template>
        </el-table-column>
     
      </el-table>
      
      <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
    </el-card>
    <add-dictionary ref="AddDictionaryRef"></add-dictionary>
  </div>
</template>

<script>
import AddDictionary from "@/views/sysmanage/dictionary/dialog/AddDictionary.vue";
import { manualPage,deleteDic } from "@/api/dictionary";
export default {
  components: {
    AddDictionary,
  },
  data() {
    return {
      parent: "",
      child: "",
      total: 0,
      currentPage1:1,
      // -----------------------
      fatherData: [],
      childrenData: [],
      value: [],
      loading: false,
      dictionaryData: [],
    };
  },
  mounted() {
    this.parent = "",
    this.child = "",
    this.fatherData = [],
    this.childrenData = [];
    this.onSubmit()
  },
  methods: {
    getFoucus(item){
      if(item){
        this.remoteSec('')
      }else{
        this.remoteFirst()
      }
     
      console.log('获取焦点');
    },
    remoteFirst(query) {
      // if (query !== "") {
        this.fatherData = [];
        this.loading = true;
        manualPage({
          records: [
            {
              childrenName: "",
              name: query,
            },
          ],
          current:1,
          size: 1000000,
          // total: 10,
        }).then((res) => {
          if (res && res.code && res.code === "00000") {
            res.data.records.forEach((item) => {
              console.log(item);
              this.fatherData.push(item.name);
            });
            this.loading = false;
          }
        });
      // } else {
      //   this.fatherData = [];
      // }
    },
    remoteSec(query) {
      // if (query !== "") {
        this.childrenData = [];
        this.loading = true;
        manualPage({
          records: [
            {
              childrenName: query,
              name: "",
            },
          ],
          current:1,
          size: 1000000,
        }).then((res) => {
          if (res && res.code && res.code === "00000") {
            res.data.records.forEach((item) => {
              if (item.children.length) {
                item.children.forEach((sitem) => {
                  if (sitem.name.includes(query)) {
                    console.log(item.name, sitem.name);
                    this.childrenData.push(`${sitem.name}`);
                    this.childrenData=[...new Set(this.childrenData)]
                  }
                });
              }
            });
            this.loading = false;
          }
        });
      // } else {
      //   this.childrenData = [];
      // }
    },

    onCreate() {
      this.$refs.AddDictionaryRef.openDialog();
    },
    onSubmit() {
      manualPage({
        records: [
          {
            childrenName: this.child.split("-")[1] || "",
            name: this.parent,
          },
        ],
        size: 10,
        current:this.currentPage1
      }).then((res) => {
        if (res && res.code && res.code === "00000") {
          console.log(res.data.records, this.child, "11111");
          if (this.child) {
            res.data.records.forEach((item) => {
              item.children=item.children.filter(item=>item.name.includes(this.child.split("-")[1]))
            });
          }
          this.total = Number(res.data.total) ;
         if(this.total==0&&this.currentPage1>1){
          this.currentPage1--
            this.onSubmit()
         }else{
          this.dictionaryData = res.data.records;
         }
          
          // this.dictionaryData.forEach(item=>{
            // item.updateTime=this.timeDeal(item.updateTime)
            // item.children.forEach(item=>item.updateTime=this.timeDeal(item.updateTime))
          // })
          
        }
      });
    },
    reset() {
      this.child = "";
      this.parent = "";
    },
    edit(row){
      this.$refs.AddDictionaryRef.openDialog(row);
      console.log('edit',row);
    },
    delbtn(id){
      //  deleteDic(id).then(res=>{
      //       if (res && res.code && res.code === "00000") {
      //         }
      //     })
          
      this.$confirm('此操作将永久删除该字典, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('delbtn----',id);
          deleteDic(id).then(res=>{
            if (res && res.code && res.code === "00000") {
              this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.onSubmit()
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleCurrentChange(val){
      this.currentPage1=val
      console.log('handleCurrentChange',this.currentPage1);
      this.onSubmit()
    },
    timeDeal(timeString) {
      const date = new Date(timeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");
      const second = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    },
  },
};
</script>

<style>
</style>