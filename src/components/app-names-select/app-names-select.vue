<template>
  <div class="app-names-select">
    <el-select
      v-model="value"
      size="small"
      width="300"
      multiple
      collapse-tags
      clearable
      placeholder="Filter App Names"
      @change="onChanged"
    >
      <el-option
        v-for="(item, idx) in appNamesList"
        :key="'app-names-select-option-' + item.appName + '-' + idx"
        :label="item.appName"
        :value="item.appName"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script src="./app-names-select.ts"></script>
<style lang="scss" src="./app-names-select.scss"></style>
