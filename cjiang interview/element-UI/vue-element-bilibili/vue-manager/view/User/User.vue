<template>
  <div>
    <el-dialog
      :title="operateType === 'add' ? '新增' : '更新'"
      :visible.sync="isShow"
      append-to-body
    >
      <common-form
        :form-label="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      >
      </common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <common-form
        :form-label="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form2"
      >
        <el-button type="primary" @click="getList">搜索</el-button>
      </common-form>
    </div>
    <common-table @edit="editUser" :propspage="2"></common-table>
  </div>
</template>

<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";

import debounce from "../../config/VueDebounce";

export default {
  data() {
    return {
      operateType: "add",
      isShow: false,
      /*
        传入数据 
        {
            model
            label
            type
        }
        特殊:select 控件
          {
          model
          label
          type:'select'
          opts: [
            {
              label
              value
            },
            {
              label,
              value
            },
          ],
        },
      */
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      //form submit Object message.
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
    };
  },
  methods: {
    // async confirm() {
    //   console.log("弹框确认");
    //   console.log("operateForm", this.operateForm);
    //   if (this.operateType === "edit") {
    //     // 编辑
    //     this.$http.post("/user/edit", this.operateForm).then((res) => {
    //       console.log(res);
    //       this.isShow = false;
    //     });
    //   } else if (this.operateType === "add") {
    //     //增加
    //     await this.$http.post("/user/add", this.operateForm).then((res) => {
    //       console.log(res);
    //       this.isShow = false;
    //     });
    //   }
    //   await this.$children[3].getList(1)
    // },
    confirm: debounce(async function()  {
      {
        console.log("弹框确认");
        console.log("operateForm", this.operateForm);
        if (this.operateType === "edit") {
          // 编辑
          this.$http.post("/user/edit", this.operateForm).then((res) => {
            console.log(res);
            this.isShow = false;
          });
        } else if (this.operateType === "add") {
          //增加
          await this.$http.post("/user/add", this.operateForm).then((res) => {
            console.log(res);
            this.isShow = false;
          });
        }
        await this.$children[3].getList(1);
      }
    },500),
    // confirmfangdou(){
    //   console.log(this.confirm)
    //   //  函数的 执行顺序 => confirm() 进行防抖，防抖了之后，进行接口的调用
    //   debounce(this.confirm,10000)
    // },

    //  confirm:debounce(async ()=>{
    //   await setTimeout(()=>{
    //     console.log(1)
    //   },1000)
    //   console.log(2)
    //    await setTimeout(()=>{
    //     console.log(3)
    //     console.log('我是防抖')
    //   },2000)
    //   console.log(4)
    // },1000),
    editUser(row) {
      this.isShow = true;
      this.operateType = "edit";
      this.operateForm = row;
      // 重新渲染
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {};
      // 重新渲染
    },
    getList() {
      console.log("搜索");
    },
  },
  mounted() {},
  components: {
    CommonForm,
    CommonTable,
  },
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>