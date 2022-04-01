<template>
  <div class="query-select">
    <el-select
      v-model="value"
      size="small"
      width="300"
      multiple
      collapse-tags
      clearable
      placeholder="Filter queries"
      @change="onChanged"
    >
      <el-option
        v-for="(item, idx) in queryList"
        :key="'query-select-option-' + item.id + '-' + idx"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script src="./query-select.ts"></script>
<style lang="scss" src="./query-select.scss"></style>
