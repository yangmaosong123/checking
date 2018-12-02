import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const state = {
  fileUploadUrl: "http://127.0.0.1:8080/wf/attachment/reupload",
  fileDownloadUrl: "http://127.0.0.1:8080/wf/attachment/download?id=",
  fileDownloadUrls: "http://127.0.0.1:8080/wf/attachment/downloadByBizName?bizObjId=",
  outputImgByIdUrl: "http://127.0.0.1:8080/wf/attachment/outputImgById?id=",
  outputImgUrl: "http://127.0.0.1:8080/wf/attachment/outputImg?bizObjId=",
  recycleAddr: "http://127.0.0.1:8080/rec",
  //recycleAddr: "http://fzaisheng.com/rec",
  account: "",
  userId: "",
  password: "",
  curProvince: {
    title: ""
  },
  accountObj: {
    id: 0,
    companyId: 0,
  },
  enterpriseTypeStatus: "",
  activeIndex: "",
  id: "",//企业id
  dictionary: {},
  searchKey: "",
  rec: {
    addr: []
  },
  timeout: {
    compileTimeout: ""
  },

  // fileUploadUrl: "http://192.168.5.140:8080/attachment/upload",
  // fileDownloadUrl: "http://127.0.0.140:8080/attachment/download",
  // outputImgByIdUrl: "http://192.168.5.140:8080/attachment/outputImgById?id=",
  // fileUploadUrl:"http://192.168.5.132:8080/attachment/upload",
  // outputImgByIdUrl: "http://192.168.5.132:8080/attachment/outputImgById?id=",
};

export default new Vuex.Store({
  "state": state,
  getters: {
    getActiveProvince() {
      state.province = localStorage.getItem("province");
    }
  },
  actions: {},
  mutations: {

    saveActiveProvince(state, data) {
      localStorage.setItem('province', data);
      state.province = data;
    }

  }
})

