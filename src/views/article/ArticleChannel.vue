<script setup>
import PageContainer from '@/components/PageContainer.vue'
import {articleDeleteChannelsService, articleGetChannelsService} from '@/api/article'
import {ref} from 'vue'
import {Delete, Edit} from '@element-plus/icons-vue'
import ChannelEdit from '@/views/article/components/ChannelEdit.vue'
import {ElMessage, ElMessageBox} from 'element-plus'

const channelList = ref([])
const dialog = ref()
const loading = ref(false)

const getChannelList = async () => {
  loading.value = true
  const res = await articleGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}

getChannelList()

const onEditChannel = (row) => {
  dialog.value.open(row)
}

const onAddChannel = () => {
  dialog.value.open()
}

const onSuccess = () => {
  getChannelList()
}

const onDeleteChannel = async (row) => {
  await ElMessageBox.confirm('你确认要删除吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })

  await articleDeleteChannelsService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}

</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel" type="primary">添加分类</el-button>
    </template>


    <el-table :data="channelList" style="width:100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="100%"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{row, $index}">
          <el-button type="primary" :icon="Edit" circle plain @click="$event => onEditChannel(row, $index)"></el-button>
          <el-button type="danger" :icon="Delete" circle plain @click="$event => onDeleteChannel(row, $index)"></el-button>
        </template>
      </el-table-column>

    </el-table>
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<style scoped lang="scss">

</style>