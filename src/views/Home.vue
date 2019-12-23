<template>
  <div>
    <el-container>
      <el-header class="header">
        <h2>东软云医院HIS系统</h2>
        <el-dropdown @command="handleCommand" >
                      <span class="el-dropdown-link">
                        {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="look" v-if="hidden" >显示菜单</el-dropdown-item>
            <el-dropdown-item command="hid" v-if="!hidden" >隐藏菜单</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px" style="height:calc(100vh - 60px);" :hidden="hidden">
          <el-col :span="12">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    :hidden="hidden"

                    router
                    >
              <el-submenu :index="index+''" :key="index" v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden" style="padding:0">
                <template slot="title">
                  <i ></i>
                  <span style="font-size: 12px">{{item.meta.title}}</span>
                </template>
                  <el-menu-item :index="child.path" @click="addTab(child.meta.title,child.path)"  :key="i" v-for="(child,i) in item.children" class="item">{{child.meta.title}}</el-menu-item>
              </el-submenu>

            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tabRouter">
            <el-tab-pane
                    v-for="(item, index) in editableTabs"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name"
                    :path="item.path"

            >
            </el-tab-pane>
          </el-tabs>
          <div class="home" v-if="this.$route.path =='/Home'">
            <h1>欢迎登陆东软云医院HIS系统</h1>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data(){
      return{
        user:JSON.parse(window.sessionStorage.getItem('user')),
        hidden:false,
        editableTabsValue: '',
        editableTabs: [],
        tabIndex: 0
      }
    },
    methods: {
      tabRouter(data){
        this.$router.push(data.$attrs.path)
      },
      removeTab(targetName){
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          console.log(targetName)
          console.log(activeName)
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                  this.$router.push(nextTab.path)
                }else {this.$router.push("/Home")}
              }
            });
          }

          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
      addTab(title,path){
        for(let i in this.editableTabs){
          if(title==this.editableTabs[i].title){
            this.editableTabsValue=this.editableTabs[i].name
            return;
          }
        }
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: title,
          name: newTabName,
          path:path
        });
        this.editableTabsValue = newTabName;
      },
      // handleRole(roles){
      //   let userRoles = JSON.parse(window.sessionStorage.getItem('user')).authorities
      //   for(let i in roles){
      //     for(let j in userRoles){
      //       if(userRoles[j].authority==roles[i]){
      //         return true;
      //       }
      //     }
      //   }
      //   return false;
      // },
      handleCommand(command) {
        if(command=='logout'){
          this.$confirm('是否退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getRequest('/logout');
            window.sessionStorage.removeItem('user');
            this.$router.replace('/');
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        }else if(command=='look'){
          this.hidden=!this.hidden
        }else {this.hidden=!this.hidden}

      }
    }
  }
</script>
<style scoped>
  .header{
    background: #409EFF;
    color: white;
    display:flex;
    align-items: center;
    justify-content:space-between;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: white;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .head{
    padding-bottom: 8px;
  }
  .home{
    text-align: center;
    color: blue;
  }
 .el-menu-vertical-demo{
   width: 195px;
   height:calc(100vh - 60px);
   background: seashell;
   text-align: left;
  }
  .item{
    font-size: 12px;
  }

</style>