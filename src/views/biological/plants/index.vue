<template>
  <div>
    <div class="but">
      <el-button type="primary" v-if="displays" @click="cancel">取消</el-button>
      <el-button type="primary" @click="edit">编辑</el-button>
    </div>
    <el-form ref="form" :model="form" :disabled="isInput" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.region" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="出生年月">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="最高学历">
        <el-select v-model="form.region" placeholder="请选择学历">
          <el-option label="本科" value="本科"></el-option>
          <el-option label="专科" value="专科"></el-option>
          <el-option label="研究生" value="研究生"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="毕业院校">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="毕业时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="工作年限">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="工号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="户籍地">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="现居住地">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="婚姻状况">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="已婚" value="已婚"></el-option>
          <el-option label="未婚" value="未婚"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有无小孩">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="有" value="有"></el-option>
          <el-option label="无" value="无"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="紧急联系人">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="紧急联系人电话">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="证书">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="爱好">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="工作技能">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Web" name="type"></el-checkbox>
          <el-checkbox label="UI" name="type"></el-checkbox>
          <el-checkbox label="Java" name="type"></el-checkbox>
          <el-checkbox label="测试" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="地域">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="南京" value="南京"></el-option>
          <el-option label="上海" value="上海"></el-option>
          <el-option label="湖北" value="湖北"></el-option>
          <el-option label="武汉" value="武汉"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="研发1" value="研发1"></el-option>
          <el-option label="研发2" value="研发2"></el-option>
          <el-option label="研发3" value="研发3"></el-option>
          <el-option label="研发4" value="研发4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="项目1" value="项目1"></el-option>
          <el-option label="项目2" value="项目2"></el-option>
          <el-option label="项目3" value="项目3"></el-option>
          <el-option label="项目4" value="项目4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接口人">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="启用/停用">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      
      <el-form-item label="员工状态">
        <el-radio-group v-model="form.resource">
          <el-radio label="工作中"></el-radio>
          <el-radio label="休假中"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="员工动态记录">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="displays" @click="onSubmit"
          >保存修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateUser, addUser } from "@/api/user";

export default {
  props: {
    toChild: String,
  },
  data() {
    return {
      displays: false,
      isInput: true,
      form: {
        name: "",
        region: "",
        date1: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    // 编辑
    edit() {
      this.isInput = false;
      this.displays = true;
    },
    // 取消
    cancel() {
      // 表单禁用
      this.isInput = true;
      this.displays = false;
      // 获取数据
      // this.getSave();
    },
    // 保存
    onSubmit() {
      console.log("submit!");
      this.isInput = true;
      this.displays = false;
    },
  },
};
</script>

<style lang="less" scoped>
.but {
  display: flex;
  justify-content: right;
  align-items: center;
  margin: 20px 0;
}
</style>