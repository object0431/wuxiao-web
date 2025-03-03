import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabList: [], //tab列表
    currentTab: {},  //当前tab
    siderMenus: {},
    navList: [],
    cachedPages: [],//路由缓存
  },
  getters: {
  },
  mutations: {
    // 添加标签
    addTabs(state, addTabItem) {
      const isExist = state.tabList.find(j => j.name === (addTabItem.path || addTabItem.name))
      if (isExist) {
        state.currentTab = isExist
      } else {
        const addTab = {
          title: addTabItem.label,
          name: addTabItem.path || addTabItem.name,
          topMenu: state.siderMenus.name || ''
        }
        if(addTabItem.path=="/workbench"){
          state.tabList.unshift(addTab)
        }else{
          state.tabList.push(addTab)
        }
        state.currentTab = addTab
      }
      sessionStorage.setItem('tabList', JSON.stringify(state.tabList))
      sessionStorage.setItem('currentTab', JSON.stringify(state.currentTab))
    },
    // 删除标签
    removeTabs(state, delTabItem) {
      let tabs = state.tabList
      const activeName = state.currentTab.name
      const index = tabs.findIndex(item => item.name === delTabItem)
      // if(delTabItem=='/workbench'){
      //   this.notify({
      //     title:'警告',
      //     message:'首页不能被删除',
      //     type:'warning'
      //   })
      //   return
      // }
      tabs.splice(index, 1)
      if (activeName === delTabItem) {
        if (tabs.length > 0) {
          this.commit('tabClicks', { name: tabs[tabs.length - 1].name } || '')
        } else {
          state.siderMenus = {}
          state.currentTab = {}
          sessionStorage.setItem('siderMenu', JSON.stringify(state.siderMenus))
          sessionStorage.setItem('currentTab', JSON.stringify(state.currentTab))
        }
      }
      sessionStorage.setItem('tabList', JSON.stringify(tabs))
    },
    // 审核标签关闭
    removeCheckTabs(state, delTabItem) {
      Vue.prototype.$confirm('审核成功，点击确认关闭当前页', '提示', {
        confirmButtonText: '确定',
        // cancelButtonText: '取消',
        showCancelButton: false,
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'warning'
      }).then(() => {
        // let tabs = state.tabList
        // const activeName = state.currentTab.name
        // const index = tabs.findIndex(item => item.name === delTabItem)
        // tabs.splice(index, 1)
        // if (activeName === delTabItem) {
        //   if (tabs.length > 0) {
        //     this.commit('tabClicks', { name: tabs[tabs.length - 1].name } || '')
        //   } else {
        //     state.siderMenus = {}
        //     state.currentTab = {}
        //     sessionStorage.setItem('siderMenu', JSON.stringify(state.siderMenus))
        //     sessionStorage.setItem('currentTab', JSON.stringify(state.currentTab))
        //   }
        // }
        window.open("about:blank","_self")
        window.close()
      })
    },
     // 纯关闭
    clearCheckTabs(state, delTabItem) {
      Vue.prototype.$confirm('关闭，点击确认关闭当前页', '提示', {
        confirmButtonText: '确定',
        // cancelButtonText: '取消',
        showCancelButton: false,
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'warning'
      }).then(() => {
        window.open("about:blank","_self")
        window.close()
      })
    },
    // 回复标签关闭
    removeResponseTabs(state, delTabItem) {
      Vue.prototype.$confirm('回复成功，点击确认关闭当前页', '提示', {
        confirmButtonText: '确定',
        // cancelButtonText: '取消',
        showCancelButton: false,
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'warning'
      }).then(() => {
        // let tabs = state.tabList
        // const activeName = state.currentTab.name
        // const index = tabs.findIndex(item => item.name === delTabItem)
        // tabs.splice(index, 1)
        // if (activeName === delTabItem) {
        //   if (tabs.length > 0) {
        //     this.commit('tabClicks', { name: tabs[tabs.length - 1].name } || '')
        //   } else {
        //     state.siderMenus = {}
        //     state.currentTab = {}
        //     sessionStorage.setItem('siderMenu', JSON.stringify(state.siderMenus))
        //     sessionStorage.setItem('currentTab', JSON.stringify(state.currentTab))
        //   }
        // }
        window.open("about:blank","_self")
        window.close()
      })
    },
    saveRemoveCheckTabs(state, delTabItem) {
      Vue.prototype.$confirm('提交成功，点击确认关闭当前页', '提示', {
        confirmButtonText: '确定',
        // cancelButtonText: '取消',
        showCancelButton: false,
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'warning'
      }).then(() => {
        // let tabs = state.tabList
        // const activeName = state.currentTab.name
        // const index = tabs.findIndex(item => item.name === delTabItem)
        // tabs.splice(index, 1)
        // if (activeName === delTabItem) {
        //   if (tabs.length > 0) {
        //     this.commit('tabClicks', { name: tabs[tabs.length - 1].name } || '')
        //   } else {
        //     state.siderMenus = {}
        //     state.currentTab = {}
        //     sessionStorage.setItem('siderMenu', JSON.stringify(state.siderMenus))
        //     sessionStorage.setItem('currentTab', JSON.stringify(state.currentTab))
        //   }
        // }
        window.open("about:blank","_self")
        window.close()
      })
    },
    // 特殊的立项审核标签关闭
    removeIniCheckTabs(state, payload) {
      Vue.prototype.$confirm(`下一环节：${payload.nextLink}，审批人：${checker}`, '审核成功', {
        confirmButtonText: '确定',
        // cancelButtonText: '取消',
        showCancelButton: false,
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'warning'
      }).then(() => {
        // let tabs = state.tabList
        // const activeName = state.currentTab.name
        // const index = tabs.findIndex(item => item.name === payload.name)
        // tabs.splice(index, 1)
        // if (activeName === payload.name) {
        //   if (tabs.length > 0) {
        //     this.commit('tabClicks', { name: tabs[tabs.length - 1].name } || '')
        //   } else {
        //     state.siderMenus = {}
        //     state.currentTab = {}
        //     sessionStorage.setItem('siderMenu', JSON.stringify(state.siderMenus))
        //     sessionStorage.setItem('currentTab', JSON.stringify(state.currentTab))
        //   }
        // }
        window.close()
      })
    },
    // 标签点击
    tabClicks(state, clickItem) {
      const clickTab = state.tabList.find(item => item.name === clickItem.name)
      const siderMenu = state.navList.find(item => item.name === clickTab.topMenu) || {}
      const currentTab = clickTab
      state.siderMenus = siderMenu
      state.currentTab = currentTab
      sessionStorage.setItem('siderMenu', JSON.stringify(siderMenu))
      sessionStorage.setItem('currentTab', JSON.stringify(currentTab))
    },

    setcurrentAndSiderMenu(state,obj){
      let addTab={},currentTab={}
      const siderMenu = state.navList.find(item => item.name === obj.siderMenuName) || {}
      currentTab = siderMenu.children.find(item => item.label === obj.currentTabName)
      if(currentTab && currentTab.children){
        if(obj.childrencurrentTabName){
          let tempCurrentTab=currentTab.children.find(item => item.label === obj.childrencurrentTabName)
          currentTab=tempCurrentTab
        }
      }
      const isExist = state.tabList.find(j => j.name === (currentTab.path || currentTab.name))
      if (isExist) {
        currentTab = isExist
        state.currentTab = currentTab
      }else {
        addTab = {
          title: currentTab.label,
          name: currentTab.path || currentTab.name,
          topMenu: siderMenu.name || ''
        }
        state.tabList.push(addTab)
        state.currentTab = addTab
      }
      state.siderMenus = siderMenu
      sessionStorage.setItem('tabList', JSON.stringify(state.tabList))
      sessionStorage.setItem('siderMenu', JSON.stringify(state.siderMenus))
      sessionStorage.setItem('currentTab', JSON.stringify(state.currentTab))
    },
    // 切换侧边菜单
    changeSiderMenu(state, menu) {
      state.siderMenus = menu
      sessionStorage.setItem('siderMenu', JSON.stringify(menu))
    },
    changeTabList(state, tabList) {
      state.tabList = tabList
      sessionStorage.setItem('tabList', JSON.stringify(tabList))
    },
    addNavList(state, navList) {
      state.navList = navList
    },
    openTargetTab(state, targetTab) {
      const { title, path, topMenu } = targetTab
      const siderMenu = state.navList.find(item => item.name === topMenu)
      this.commit('changeSiderMenu', siderMenu)
      if (path) {
        this.commit('addTabs', {
          label: title,
          path,
        })
      } else {
        const secondMenu = siderMenu.children.find(item => item.label === title)
        // 默认打开二级菜单的第一个子菜单
        const { label: thirdLabel, path: thirdPath } = secondMenu.children[0]
        this.commit('addTabs', {
          label: thirdLabel,
          path: thirdPath
        })
      }
    },
    // 添加缓存组件
    addCachedPages(state, page) {
      if (state.cachedPages.includes(page.name)) {
        return
      }
      state.cachedPages.push(page.name)
    },
    // 移除缓存组件
    delCachedPages: (state, page) => {
      const index = state.cachedPages.indexOf(page.name)
      index > -1 && state.cachedPages.splice(index, 1)
    },
  },
  actions: {
  },
  modules: {
  }
})
