<template>
  <el-dropdown split-button type="">
    <span class="el-dropdown-link">
       深圳市
    </span>
    <el-dropdown-menu slot="dropdown" style="width:400px">
      <el-dropdown-item v-for="(row,index) in province" :key="index">
        <template>
          <el-row>
            <el-col :span="6" v-for="(item,index2) in row" :key="index2">
              <!--<el-button @click="selectProvince(item.title)" type="text">{{item.title}}</el-button>-->
              <el-button @click="selectProvince(item.title)" type="text"
                         :disabled="item.id=='420000' ? provinceDisabled : !provinceDisabled"
              >
                {{item.title}}
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-dropdown-item>

    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        province: [],
        curProvince: {
          title: "深圳市"
        },
        addr: {
          province: "",
        },
        provinceDisabled: false,

      };
    },
    watch: {
      'addr.province': function () {
        let _this = -this;
        if (_this.addr.province != "") {
          _this.$axios({
            method: "post",
            url: "/user/setProvince",
            data: {province: _this.addr.province}
          })
        }
      },
    },
    created: function () { 
      
    },
    methods: {

      selectProvince(title) {
        let _this = this;
        _this.$axios({
          method: "post",
          url: "/user/setReqProvince",
          data: {"province": title}
        }).then((res) => {
          if (res.data.status === 200) {
            localStorage.setItem("province", title);
            _this.$store.state.curProvince.title = localStorage.getItem("province");
            _this.reload();
          }
        });
      },

      //默认调用户登录的当前省份信息
      getLocation() {
        var _this = this;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(
          function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              var geoc = new BMap.Geocoder();
              geoc.getLocation(r.point, function (rs) {
                var addComp = rs.addressComponents;
                _this.curProvince.title = localStorage.getItem("province");
                _this.addr.province = addComp.province;
                var sz = [];
                if (!!addComp.province && addComp.province.length > 0) {
                  sz.push(addComp.province);
                }
                if (!!addComp.city && addComp.city.length > 0) {
                  sz.push(addComp.city);
                }
                if (!!addComp.district && addComp.district.length > 0) {
                  sz.push(addComp.district);
                }
                if (!!addComp.streetNumber && addComp.streetNumber.length > 0) {
                  sz.push(addComp.streetNumber);
                }
                _this.addr.addr = sz.join(";");
              });
            } else {
              alert("定位失败！");
            }
          }, {
            enableHighAccuracy: true
          }
        );
      }
    }
  };
</script>

<style lang="less">
  .el-col {
    padding: 5px;
  }

  .el-button-group .el-button {
    width: 53px;
    padding-left: 10px;
    background: none;
    border: none;
    color: #007cc6;
    overflow: hidden;
  }

  .el-button-group .el-button:last-child {
    width: 30px;
  }
</style>
