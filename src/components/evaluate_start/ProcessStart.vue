<template>
  <div style="font-size:30px">
    <el-card class="box-card">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="全省第九批火灾隐患重点地区整治验收实地检查评估" name="1">
          <el-row>
            <el-col :span="8">
              <el-button type="primary" plain @click="goto('THREE')">“三小”场所消防安全评估</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" plain @click="goto('LET_HOUSE')">出租屋消防安全评估</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" plain @click="goto('PUBLIC_PLACE')">公共场所消防安全评估</el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-button type="primary" plain @click="goto('INDUSTRY_BUILDING')">工业建筑消防安全评估</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" plain @click="goto('CIVICISM')">市政消火栓建设评估</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" plain @click="goto('MULTI_TYPE')">多种形式消防队伍建设评估</el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-button type="primary" plain @click="goto('FIRE_SAFETY_NETWORK')">消防安全网格化管理评估</el-button>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="验收评估" name="2">
          <el-row>
            <el-col :span="24">
              <el-button style="width:450px" type="primary" plain @click="gotoAcceptance('FIRE_SAFETY_NETWORK')" >全省第九批火灾隐患重点地区整治验收评估</el-button>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["1", "2"]
    };
  },
  props: [],
  created: function() {},
  methods: {
    goto(type) {
      this.$router.push({
        path: "/user/localeEvaluate",
        query: {
          type: type
        }
      });
    },
    
    gotoAcceptance(type) {
      this.$router.push({
        path: "/user/acceptance-evaluate",
        query: {
          type: type
        }
      });
    },
  }
};
</script>

<style scoped>
.el-button {
  width: 300px;
  font-size: 20px;
}
</style>
 

