<template>
  <div class="position-module">
    <!-- 左侧导航 -->
    <div class="left fl">
     
    </div>

    <div class="right fr">

      <!-- 用户中心 -->
      <div class="user">
        <!--<el-badge :value="total" class="item">系统通知</el-badge>-->
        <img src="../../assets/img/user.png" alt="" @click="handleClickPhone">
        <span>Hi，欢迎<i>{{$store.state.account}}</i>来到消防评估系统</span>
        <template v-if="$store.state.account">
          <input type="text" name="" @click="goWorkCenter()" value="个人中心">
          <input type="text" name="" @click="goOut()" value="退出">
        </template>
        <template v-else>
          <input type="text" name="" @click="goLogin()" value="登陆">
          <input class="register" type="text" name="" @click="goRegister()" value="注册">
        </template>
      </div>
 
      

    </div>
  </div>
</template>
<script>
  import LeftNav from '../common/leftNav/leftNav'
  import Event from '../../assets/js/event'

  export default {
    data() {
      return {
        notices: [],//公告--数据
        information: [],//资讯--数据
        ggHide: true,
        zzHide: false,
        total: "",//消息
        tags: ['汽车零配件', '电池专区', '危险废品'],
        currentIndex: 0//li选中
      };
    },
    created: function () {
      let _this = this;
      Event.$on("getTotal", (totals) => {
        if (totals.length >= 1)
          _this.total = totals.length;
      });
    },
    components: {
      LeftNav,//导航
    },
    methods: {

      // 跳转登录页
      goLogin() {
        this.$router.push({path: "/login"});
      },
      goRegister() {
        this.$router.push({path: "/register"});
      },
      goWorkCenter() {
        this.$router.push({path: "/user/check_manager"});
      },

      // 退出登录
      goOut() {
        let _this = this;
        _this.$axios({
          method: "post",
          url: "/user/loginBack",
          data: ""
        }).then((res) => {
          if (res.data.status === 200) {
            _this.$router.push({path: "/login"});
            _this.$store.state.account = "";
            _this.$store.state.accountObj.companyId = 0;
          }

        })
      },

      //头像事件
      handleClickPhone() {
        let _this = this;
        if (!_this.$store.state.account) _this.$router.push("/login");
        else _this.$router.push("/user/basicMsg");
      },

      //li点击事件
      handleLiClick(item, index) {
        let _this = this;
        _this.currentIndex = index;
      },

      //我要求购+出售
      handleGoToCommodityList() {
        let _this = this;
        if (!_this.$store.state.account) {
          _this.$message({
            type: 'warning',
            message: "您还未登录，请先登录！"
          });
          setTimeout(() => {
            _this.$router.push("login");
          }, 1000);
        }
        else _this.$router.push("/user/commodityList");
      },

      //帮助中心
      handleGoToHelpCenter() {
        let _this = this;
        _this.$router.push("/commonProblem");
      },

      //系统通知
      handleGoToNoticeCenter() {
        let _this = this;
        _this.$router.push("/user/noticeOfTheSystem");
      },

      //系统推荐
      handleGoToSystemCenter() {
        let _this = this;
        _this.$router.push("/user/theSystemRecommended");
      },

      //发布产废
      handleGoToWasteListCenter() {
        let _this = this;
        _this.$router.push("/user/wasteList");
      },

      //报价管理
      handleGoToWasteOfferSystemRecommendedCenter() {
        let _this = this;
        _this.$router.push("/user/theOfferSystemRecommended");
      },
    }
  };
</script>
<style lang="less" scoped>
  .position-module {
    width: 1200px;
    overflow: hidden;
    position: absolute;
    top: 0;
    .left {
      float: left;
    }
    .right {
      float: right;
    }

    @media screen and (min-width: 1024px) and (max-width: 1366px) {
      .right {
        right: 5.5%;
      }
    }
    @media screen and  (max-width: 768px) {
      .right {
        right: 0;
      }
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }

    .user {
      height: 210px;
      text-align: center;
      margin-top: 8px;
      padding: 15px 10px 0px 10px;
      margin-bottom: 3px;
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #ccc;
        display: block;
        margin: 0 auto;
      }
      span {
        display: block;
        margin-top: 20px;
        font-size: 13px;
      }
      .active {
        background-color: #208dd6;
        color: #fff;
      }
      input {
        margin-top: 25px;
        width: 48%;
        height: 30px;
        border: 1px solid #f27d16;
        background-color: #f27d16;
        text-align: center;
        color: #fff;
        // border-radius: 20px;
        cursor: pointer;
      }
      .register {
        border: 1px solid #f27d16;
        background-color: #fff;
        color: #f27d16;
      }

    }

    .notices {
      padding-bottom: 5px;
      background: #fff;
      ul {
        height: 50px;
        border-bottom: 1px solid #ddd;
        padding-left: 10px;
        li {
          color: #666;
          height: 50px;
          line-height: 50px;
          display: inline-block;
          margin-left: 10px;
          &:first-child {
            margin-left: 0;
          }
          &:hover {
            cursor: pointer;
          }
        }
        .border-li {
          border-bottom: 2px solid #409EFF;

        }
      }
      img {
        margin: 15px 0px 5px 12px;
      }
    }
    .links {
      margin-top: 1px;
      background: #fff;
      height: 88px;
      img {
        margin-left: 5px;
      }
      h6 {
        color: #757575;
      }
      img, h6:hover {
        cursor: pointer;
        color: #409EFF;
      }
      div {
        width: 31%;
        height: 88px;
        padding-top: 20px;
        text-align: center;
        display: inline-block;
        border-left: 1px solid #ddd;
        &:first-child {
          border-left: 0;
        }
      }

    }
  }
</style>
