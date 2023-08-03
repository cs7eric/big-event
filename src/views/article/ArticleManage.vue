<script setup>

import PageContainer from '@/components/PageContainer.vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import {ref} from 'vue'
import {articleDelService, articleGetArticleListService} from '@/api/article'
import {formatTime} from '@/utils/format'
import {Delete, Edit} from '@element-plus/icons-vue'
import ArticleEdit from '@/views/article/components/ArticleEdit.vue'

const loading = ref(false)
const total = ref()
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const articleEditRef = ref()
const articleList = ref([])

const getArticleList = async () => {

  loading.value = true
  const res = await articleGetArticleListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}

getArticleList()
const onEditArticle = (row) => {
  articleEditRef.value.open(row)

}
const onAddArticle = () => {
  articleEditRef.value.open({})

}
const onDeleteArticle = async (row) => {

  await articleDelService(row.id)
  getArticleList()

}

const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}

const onReset = () => {
  params.value.pagenum = 1
  params.value.state = ''
  params.value.cate_id = ''
  getArticleList()
}

const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}

const onCurrentPageChange = (current) => {
  params.value.pagenum = current
  getArticleList()
}

const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}

</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{row}">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name" align="center"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date" align="center">
        <template #default="{row}">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{row}">
          <el-button type="primary" :icon="Edit" plain circle @click="$event => onEditArticle(row)"></el-button>
          <el-popconfirm title="你确定要删除吗" @confirm="$event => onDeleteArticle(row)" >
            <template #reference>
              <el-button type="danger" :icon="Delete" plain circle></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>

    </el-table>


    <el-pagination
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :page-sizes="[2,3,5,10]"
        :background="true"
        layout="jumper, total, sizes, prev, pager, next"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentPageChange"
        style="margin-top: 20px; justify-content: flex-end"
    />
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

<style scoped lang="scss">

</style>