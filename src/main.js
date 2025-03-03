import babelPolyfill from 'babel-polyfill';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import cssVars from 'css-vars-ponyfill'
import echarts from 'echarts'
//引入element样式
import './assets/css/element-variables.scss'
import './assets/css/index.scss'
//引入iconfont
import './assets/iconfont/iconfont.css'
import './assets/css/font-awesome.css'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
//element按需引入
import { Loading, Message, MessageBox } from 'element-ui';
cssVars({})
Vue.prototype.$echarts = echarts //挂载到Vue实例上面
Vue.use(babelPolyfill)
Vue.use(ElementUI);
Vue.use(Loading.directive);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)
import {Progress, Container, Header, Aside, Main, Button, Cascader, Menu, MenuItem, Upload, RadioGroup, RadioButton, CheckboxGroup, DatePicker, Result, Dropdown, DropdownItem, DropdownMenu, Radio, Select, Table, TableColumn, Pagination, PageHeader, Form, FormItem, Row, Col, Input, Dialog, Popconfirm, Switch, Option, Tooltip, Divider, Checkbox, Tree, Popover, Scrollbar, Descriptions, DescriptionsItem, Timeline, TimelineItem, Tabs, TabPane, Submenu,Link } from 'element-ui';
Vue.use(Button)
Vue.use(Progress)
Vue.use(Select)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(PageHeader)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Popconfirm)
Vue.use(Switch)
Vue.use(Option)
Vue.use(Tooltip)
Vue.use(Radio)
Vue.use(Result)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Cascader)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(Upload)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Tree)
Vue.use(Popover)
Vue.use(Scrollbar)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Link)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
