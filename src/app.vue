<template>
  <div id="app">
    <el-container>
      <el-header height="160px">
        <el-row>
          <h1>EUROPARL</h1>
          <el-col class="app__tagline" type="flex" align="start">
            <div>Résultats des votes et résultats des votes par appel nominal des périodes de session des derniers mois.</div>
            <div>Ce site vous permet d'exporter ces informations en fichier excel (.xlsx).</div>
          </el-col>
        </el-row>
        <el-row>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-bind:key="index" v-for="(breadcrumb, index) in breadcrumbList" :to="{ path: breadcrumb.path }">{{breadcrumb.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-row>
      </el-header>
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <el-footer>
        <el-row type="flex" justify="center" class="app__footer">
          <div>
            © europal.eu.org - 2020 &nbsp; - with ♥ by
            <a href="https://gautiermorel.com" target="_blank">Gautier</a>
          </div>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="scss">
* {
  text-align: start;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.app__tagline {
  padding-top: 10px;
  padding-bottom: 50px;
}
</style>
<script>
export default {
  data() {
    return {
      breadcrumbList: this.$route.meta.breadcrumb
    };
  },
  watch: {
    $route(to, from) {
      this.breadcrumbList = this.$route.meta.breadcrumb;
    }
  }
};
</script>
