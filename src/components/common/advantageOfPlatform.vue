<template>
  <div class="advantage-of-platform">
    <div class="title">
      <img class="advantage" src="../../assets/img/index-icon/platformadvantage.png" alt="">
      <img src="../../assets/img/index-icon/stack.png"/>
    </div>
    <ul>
      <li v-for="(item,index) in imgs" class="item-img" @click="handleGoToIndustryChain(item.title)">
        <img :src="item.url" :alt="index">
        <div class="content">
          <h2>{{item.title}}</h2>
          <p>{{item.content}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "advantageOfPlatform",//平台优势
    data() {
      return {
        imgs: [
          {title: '智能', content: '助力实验室产业升级', url: require('../../assets/img/index-icon/intelligence.png')},
          {title: '云商', content: '用更少的人接更多的单', url: require('../../assets/img/index-icon/cloud.png')},
          {title: '行情', content: '回收市场最及时的行情和资讯', url: require('../../assets/img/index-icon/industry.png')},
          {title: '金融', content: '解决产业链上下游资金问题', url: require('../../assets/img/index-icon/finance.png')},
          {title: '物流', content: '运输、仓储、加工一体式服务', url: require('../../assets/img/index-icon/logistics.png')}
        ]//图片
      };
    },
    methods: {

      //跳转到服务流程页面
      handleGoToIndustryChain(type) {
        let _this = this;
        if (type == '行情') {
          _this.$router.push("/marketCenter");
        } else if (type == '智能' || type == '物流')
          _this.$router.push({
            path: '/industryChain',
            query: {
              type: type
            }
          });
      }
    }
  };
</script>
<style lang="less" scoped>
  .advantage-of-platform {
    margin-top: 15px;
    .advantage {
      display: block;
      margin: 0 auto;
      margin-top: 10px;
    }
    .title {
      width: 1200px;
      img {
        margin-bottom: 5px;
        margin-top: 5px;
      }
    }
    .item-img {
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
      width: 235px;
      height: 350px;
      overflow: hidden;
      display: inline-block;
      margin-left: 5px;
      position: relative;
      img {
        display: block;
        width: 100%;
        height: 100%;
        transition: all 2s;
      }
      &:hover {
        img {
          cursor: pointer;
          transform: scale(1.4);
        }
      }
      .content {
        color: #fff;
        width: 190px;
        position: absolute;
        top: 134px;
        left: 28px;
        h2 {
          text-align: center;
        }
        p {
          margin: 0 auto;
          text-align: center;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>
