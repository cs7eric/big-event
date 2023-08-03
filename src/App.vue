<template>
  <ElConfigProvider :locale="locale">
    <router-view></router-view>

  </ElConfigProvider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {ref} from 'vue'
import {ElConfigProvider} from 'element-plus'

const locale = ref(zhCn)
</script>

<style lang="scss" scoped>

</style>