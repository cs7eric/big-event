<script setup>

import {ref} from 'vue'
import {articleGetChannelsService} from '@/api/article'

defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})

const channelList = ref([])

const getChannelList = async () => {
  const res = await articleGetChannelsService()
  channelList.value = res.data.data
}
getChannelList()

const emit = defineEmits(['update:modelValue'])

</script>

<template>
  <el-select :modelValue="modelValue" @update:modelValue="$event => emit('update:modelValue', $event)" :style="{width}">
    <el-option
        v-for="channel in channelList"
        :key="channel.id"
        :label="channel.cate_name"
        :value="channel.id">
    </el-option>
  </el-select>
</template>

<style scoped lang="scss">

</style>