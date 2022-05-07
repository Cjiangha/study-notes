<template>
  <!-- table-column 姓名 年龄 性别 出生日期 地址 操作 -->
  <div class="common-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        show-overflow-tooltip
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
      <el-table-column prop="sexLabel" label="性别" width="180">
      </el-table-column>
      <el-table-column prop="birth" label="出生日期" width="180">
      </el-table-column>
      <el-table-column prop="addr" label="地址"> </el-table-column>
       -->
      <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）-->
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handeleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" @click="handelDel(scope.row)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  <!-- 分页器 -->
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      :page-size="20"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
/*
    封装一个CommonTable，
    只关心数据层
    props:{
       tableData: Array,   // tableData  table-column name age sex birth address operate，拿到的table每一条的相关数据
       tableLabel: Array,  //  prop: 'name',
          label: '姓名',
        },
       config: Object,     // 把配置config 传递 page，以及total
    }

    $emit分发的事件
    @changePage
    @edit
    @del

*/
export default {
  props: {
    tableData: {
      type: Array,
      default: [],
    },
    tableLabel: {
      type: Array,
      default: function () {
        return [];
      },
    },
    config: {
      type: Object,
      default: {
        page: 1,
        total: 200,
      },
    },
  },
  data() {
    return {
      // tableData: [],
      // config: {
      //   page: 1,
      //   total: 200,
      // },
      isOpen: true,
    };
  },
  methods: {
    // async getList(page) {
    //   await getUser({
    //     page,
    //     // name,
    //   }).then(({ data: res }) => {
    //     console.log("getList", res);
    //     this.tableData = res.list;
    //     this.tableData = res.list.map((item) => {
    //       //  第一种写法：
    //       item.sexLabel = item.sex === 0 ? "女" : "男";
    //       //  第二种写法
    //       // if(item.sex === 0){
    //       //     item.sexLabel = '女'
    //       // }else{
    //       //     item.sexLabel = '男'
    //       // }
    //       return item;
    //     });
    //     this.config.total = res.count;
    //   });
    // },
    handleCurrentChange(page) {
      // this.getList(val);
      // this.config.page = val;
      // return val;
      this.$emit("changePage", page);
    },
    handelDel(row) {
      // this.$confirm("此操作将永久删除此组件，是否继续？", "提示", {
      //   confirmButtonText: "确认",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // }).then(() => {
      //   const id = row.id;
      //   console.log("--id--", id);
      //   console.log("--row--", row);
      //   delUser({
      //     id: id,
      //   }).then((res) => {
      //     console.log("res", res);
      //     this.$message({
      //       type: "success",
      //       message: "删除成功",
      //     });
      //     this.getList(this.config.page);
      //   });
      // });
      this.$emit("del", row);
    },
    handeleEdit(row) {
      this.$emit("edit", row);
    },
    // 存一个状态丢到子组件
  },
  created() {
    console.log("--props--", this.$options.propsData);
  },
};
</script>

<style lang="less" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: white;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
