<template>
  <div class="login">
    <div class="container">
      <img src="../assets/image/login/loginBGup.png" alt="" class="logbgup">
      <img src="../assets/image/login/loginBG.png" alt="" class="logbgdown">
      <div class="logframe" style="transform: scale(0.8);">
        <div class="introduce_1">Hi！你好！</div>
        <div class="introduce_2">欢迎进入元素瓶软件代码审查系统</div>
        <img src="../assets/image/login/logimg.png" alt="" class="logimg">
        <div class="rightborder"></div>
        <div class="bottomborder"></div>
        <div class="logwindow">
          <el-form :label-position="labelPosition" :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">


            <div class="logsys">登录系统</div>
            <div class="uid">用户账号</div>
            <div class="getuid">
              <el-form-item  label="" prop="username">
                <el-input class="myInput" placeholder="请输入帐号" v-model="userForm.username"></el-input>
              </el-form-item>
            </div>
            <div class="upassword">用户密码</div>
            <div class="getupswd">
              <el-form-item label="" prop="password">
                <el-input class="myInput" placeholder="请输入密码" v-model="userForm.password" show-password></el-input>
              </el-form-item>
            </div>
            <div class="register"><a href="" >注册账号</a></div>
            <div class="forgetpaswd"><a href="#">忘记密码</a></div>
            <div class="rmbpaswd">
              <input type="checkbox" value="rmbUser" class=""  name="" >记住密码
            </div>
            <div>
              <el-form-item>
                <el-button class="loginbtn" type="primary" @click="submitForm('userForm')">登录</el-button>
              </el-form-item>
            </div>

          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import http from "@/utils/request";
import moment from "moment";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      userForm: {
        username: '',
        password: ''
      },
      labelPosition:'top',
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs.userForm.validate((valid) => {
        if (valid) {

          http.post('/common/enUser/login',{username:this.userForm.username,password:this.userForm.password}).then(({data}) => {
            const token=data.data
            if(data.code===200){
              Cookie.set('token',token)
              Cookie.set('menuId','项目管理')
              this.$router.push('/project_manager')
            }
            this.$store.commit('setToken',token)
            console.log(this.$store.state.token)
            })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped lang="less">

.myInput {
  width: 100%;
  height: 60px;
  /deep/  .el-input__inner {
    height: 60px;
    font-size: 20px;
  }
}


.login{
  background-color:rgba(2, 99, 241, 1);
  height: 100vh;
}
.container{
}

.container .logbgdown{
  position: absolute;
  left: -58px;
  top: 612px;
  width: 1885px;
  height: 685px;
}

.container .logbgup{
  position: absolute;
  left: -10px;
  top: -144px;
  width: 2200px;
  height: 711px;
  opacity: 0.7 ;
}

.container .logframe{
  position: absolute;
  left: 250px;
  top: 100px;
  width: 1399px;
  height: 771px;
  border-radius: 50px;
  background: linear-gradient(195.71deg, rgba(1, 130, 246, 1) 0%, rgba(0, 110, 238, 1) 100%);
}



.container .logframe .rightborder{
  position: absolute;
  left: 940px;
  top: 314px;
  width: 775px;
  height: 143px;
  opacity: 1;
  border-radius: 50px 50px 0px 0px;
  transform: rotate(89.87deg);
  background: linear-gradient(180deg, rgba(147, 255, 255, 0.4) 0%, rgba(168, 255, 255, 0) 100%);

}

.container .logframe .bottomborder{
  position: absolute;
  left: 800px;
  top: 717px;
  width: 600px;
  height: 55px;
  opacity: 1;
  border-radius: 0px 0px 50px 0px;
  background: linear-gradient(0deg, rgba(147, 255, 255, 0.4) 0%, rgba(168, 255, 255, 0) 100%);

}

.container .logframe .logimg{
  position: absolute;
  left: 31px;
  top: 275px;
  width: 735.93px;
  height: 465.62px;
  opacity: 1;
}

.container .logframe .introduce_1{
  position: absolute;
  left: 130px;
  top: 105px;
  width: 300px;
  height: 58px;
  opacity: 1;
  /** 文本1 */
  font-size: 40px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: middle;

}

.container .logframe .introduce_2{
  position: absolute;
  left: 130px;
  top: 167px;
  width: 600px;
  height: 58px;
  opacity: 1;
  /** 文本2 */
  font-size: 40px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: middle;

}

.container .logwindow{
  position: absolute;
  left: 800px;
  top: 0px;
  width: 601px;
  height: 771px;
  border-radius: 0px 50px 50px 0px;
  background: rgba(199, 231, 254, 0.46);

}

.container .logwindow .logsys{
  position: absolute;
  left: 54px;
  top: 109px;
  width: 160px;
  height: 58px;
  opacity: 1;
  /** 文本1 */
  font-size: 40px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: middle;

}

.container .logwindow .uid{
  position: absolute;
  left: 54px;
  top: 200px;
  width: 219px;
  height: 38px;
  opacity: 1;
  /** 文本1 */
  font-size: 26px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: middle;

}

.container .logwindow .upassword{
  position: absolute;
  left: 54px;
  top: 350px;
  width: 104px;
  height: 38px;
  opacity: 1;
  /** 文本1 */
  font-size: 26px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: middle;

}

.container .logwindow .register{
  position: absolute;
  left: 479px;
  top: 206px;
  width: 72px;
  height: 27px;
  opacity: 1;
  /** 文本1 */
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: middle;

}

.container .logwindow .forgetpaswd{
  position: absolute;
  left: 479px;
  top: 508px;
  width: 72px;
  height: 27px;
  opacity: 1;
  /** 文本1 */
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: middle;

}

.container .logwindow .rmbpaswd{
  position: absolute;
  left: 91px;
  top: 500px;
  width: 140px;
  height: 40px;
  opacity: 1;
  /** 文本1 */
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: middle;

}

.container .logwindow .rmbpaswdbtn{
  position: absolute;

  opacity: 1;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}
input[type=checkbox]{
  width: 20px;
  height: 20px;
  vertical-align: top;
}

input[type=text]:focus{
  outline: 0px;
}
input[type=password]:focus{
  outline: 0px;
}
input[type=text],
input[type=password],
input[type=submit] {
  border: none;
  height: 100%;
  width: 100%;
  /*很关键：将默认的select选择框样式清除*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 95%;
  padding-left: 10px;
  font-size: 18px;
  font-weight: 400;
}

.container .logwindow .getuid{
  padding: 5px;
  position: absolute;
  left: 48px;
  top: 235px;
  width: 506px;
  height: 60px;
  opacity: 1;
  border-radius: 6px;
  background: rgba(255, 255, 255, 1);
  transition: all 0.3s ease;
}

.container .logwindow .getupswd{
  padding: 5px;
  position: absolute;
  left: 48px;
  top: 385px;
  width: 506px;
  height: 60px;
  opacity: 1;
  border-radius: 6px;
  background: rgba(255, 255, 255, 1);
  transition: all 0.3s ease;
}

.container .logwindow .loginbtn{
  position: absolute;
  left: 48px;
  top: 596px;
  width: 506px;
  height: 68px;
  opacity: 1;
  border-radius: 6px;
  background: rgba(2, 99, 241, 0.5);
  font-size: 26px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.container .logwindow .loginbtn:hover,
.container .logwindow .getupswd:hover,
.container .logwindow .getuid:hover{
  transform: scale(1.03);
}

.container .logwindow .loginbtn:active{
  background-color:rgba(2, 99, 241, 1);
}



a{
  color: white;
  transition: all 0.3s ease;
}
a:link{
  text-decoration:none;   /* 指正常的未被访问过的链接*/
}
a:visited{
  text-decoration:none; /*指已经访问过的链接*/
}
a:hover{
  text-decoration:none;/*指鼠标在链接*/
  color: #1dffdd;
}
a:active{
  text-decoration:none;/* 指正在点的链接*/
  color: #2c6bf6;
}

</style>
