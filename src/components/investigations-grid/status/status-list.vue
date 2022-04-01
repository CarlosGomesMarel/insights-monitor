<template>
  <div class="status-list">
    <el-select v-model="value" placeholder="Select Status" @change="onChanged">
      <el-option
        v-for="(item, idx) in statusList"
        :key="row.id + '-' + idx"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script src="./status-list.ts"></script>
<style lang="scss" src="./status-list.scss"></style>
