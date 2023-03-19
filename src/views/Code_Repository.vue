<template>
  <div class="about">

    <article class="code_border">
      <div class="title" >
        <h3>
          <font-awesome-icon icon="fas fa-book" />
          <a href="#">G3ogNum</a>
            /
            <a href="#">Demo1</a>
        </h3>
      </div>
      <nav class="tabnav">
        <div class="introduce">
          <div class="code">
            <font-awesome-icon icon="fas fa-code" />
            <a>
              Code
            </a>
          </div>
          <div class="repeat">
              <font-awesome-icon icon="fas fa-chart-line" />
                <a>
                    占比23%
                </a>
          </div>
        </div>
      </nav>
      <div class="downSide">
        <div class="demoLink">
          <p>Code Demo，开源链接：
            <a href="#">https://github.com/1111
            </a>
          </p>
        </div>
        <div class="updateTimeAndComponentLanguage">
          <ul>
            <li>
              Updated
              <font datetime="2022-12-27T08:21:47Z"
                title="Dec 27, 2022, 4:21 PM GMT+8">Dec 27, 2022
              </font>
            </li>
            <li>
              <span class="languageSpan" style="background-color: #178600"></span>
                <span itemprop="programmingLanguage">C#</span>
              <span class="languageSpan" style="background-color: #ff0000"></span>
                <span itemprop="programmingLanguage">Java</span>
              <span class="languageSpan" style="background-color: #009fff"></span>
                <span itemprop="programmingLanguage">JavaScript</span>
            </li>
          </ul>
        </div>
      </div>
    </article>

  </div>
</template>

<script>

import 'font-awesome/css/font-awesome.min.css';
export default {
  name: "Code_Repository"
}
</script>

<style scoped lang="less">
.code_border{
  display: block;
  background: rgba(245, 245, 250, 1);
  width: 30%;
  height: 100%;
  border: 2px solid #cccccc;
  border-radius: 5px;
  padding: 10px 0px 0px 0px;
  margin-top: 20px;
}
.title{
  display: inline-block;
  margin-top: 20px;
  margin-left: 20px;
}
.tabnav {
  border-bottom:  1px solid #cccccc;
  margin-top: 0;
  margin-bottom: 0 ;
}
.introduce {
  display: flex;
  margin-bottom: -1px;
  overflow: auto;
}
.code {
  display: inline-flex ;
  border: #cccccc 1px solid;
  border-bottom: none;
  border-top-right-radius:  6px;
  border-top-left-radius: 6px;
  padding: 4px 8px;
  box-sizing: border-box;
  margin-left: 40px;
  margin-top: 10px;
  background: #ffffff;
}
.repeat{
  display: inline-flex ;
  padding: 4px 8px;
  box-sizing: border-box;
  margin-left: 20px;
  margin-top: 10px;
}
.downSide {
  background-color: #ffffff;
  border-bottom-right-radius:  6px;
  border-bottom-left-radius: 6px;
}
.demoLink {
  padding:  20px;
  p{
    margin-bottom: 0 ;
  }
}
.updateTimeAndComponentLanguage{
  border-top: #cccccc 1px solid;
  padding: 10px 20px;
  ul{
    list-style: none;
    padding: 0px;
    li{
      display: inline-block;
      list-style: none;

    }
  }
}
.languageSpan {
  margin-left: 10px;
  margin-right: 5px;
  position: relative;
  top: 1px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid ;
  border-radius: 50%;
}
</style>
