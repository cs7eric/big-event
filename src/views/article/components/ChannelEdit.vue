<script setup>
import {ref} from 'vue'
import {articleAddChannelsService, articleEditChannelsService} from '@/api/article'
import {ElMessage} from 'element-plus'

const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

const rules = {
  cate_name: [
    {required: true, message: '请输入分类名称 ', trigger: 'blur'},
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是 1-10 位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    {required: true, message: '请输入分类别名', trigger: 'blur'},
    {
      pattern: /^[a-zA-Z0-9]{0,15}$/,
      message: '分类名必须是 1-15 位的字母或数字',
      trigger: 'blur'
    }
  ]
}
const dialogVisible = ref()

const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  formModel.value.id
    ? await articleEditChannelsService(formModel.value)
    : await articleAddChannelsService(formModel.value)
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })
  dialogVisible.value = false
  emit('success')
}

const open = (row) => {
  dialogVisible.value = true
  formModel.value = {...row}
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%">
    <el-form :model="formModel" ref="formRef" :rules="rules">
      <el-form-item prop="cate_name" label="分类名称">
        <el-input v-model="formModel.cate_name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item prop="cate_alias" label="分类别名">
        <el-input v-model="formModel.cate_alias" placeholder="请输入分类别名"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>