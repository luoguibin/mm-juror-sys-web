import Vue from 'vue'

import {
  Aside,
  Button,
  Container,
  Dialog,
  Divider,
  Form,
  FormItem,
  Header,
  Loading,
  Input,
  Main,
  Menu,
  MenuItem,
  Message,
  MessageBox,
  Option,
  Pagination,
  Switch,
  Select,
  Scrollbar,
  Table,
  TableColumn
} from 'element-ui'

Vue.use(Aside)
Vue.use(Button)
Vue.use(Container)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Header)
Vue.use(Loading)
Vue.use(Input)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Scrollbar)
Vue.use(Table)
Vue.use(TableColumn)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
