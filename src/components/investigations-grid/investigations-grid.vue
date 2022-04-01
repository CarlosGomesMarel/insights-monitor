<template>
  <div class="investigations-grid">
    <bug-entry-form
      :row="editBugRow"
      ref="editBugForm"
      @changed="onBugIdChanged"
    />

    <div class="search-row">
      <el-input
        v-model="search"
        size="small"
        placeholder="Type to search"
        class="search"
      />

      <app-names-select
        :selected="appNamesFilter"
        @changed="onAppNamesFilterChanged"
      />

      <query-select :selected="queryFilter" @changed="onQueryFilterChanged" />

      <button
        class="btn btn-plain"
        :title="'Refresh ' + investigations.length + ' row(s)'"
        @click="onRefresh"
      >
        <font-awesome-icon icon="refresh" />

        <font-awesome-icon v-show="refreshBusy" icon="spinner" spin />
      </button>

      <a
        v-on:mousedown="exportToCsv()"
        :href="exportLink"
        class="btn btn-default"
        :class="{ 'anchor-disabled': !dataCount }"
        :disabled="dataCount == 0"
        download="insights-monitor.csv"
        id="export-to-csv"
        :title="'Export ' + dataCount + ' row(s)'"
        ref="export"
      >
        <font-awesome-icon icon="file-export" />
        Export {{ dataCount }} rows
      </a>
    </div>

    <el-table
      :data="tableData"
      size="large"
      :default-sort="defaultSort"
      :highlight-current-row="true"
      :highlightCurrentRow="true"
      @filter-change="onFilterChanged"
      @sort-change="onSortChanged"
    >
      <el-table-column type="selection" width="30"> </el-table-column>

      <el-table-column type="expand" width="15px" class="expand-column">
        <template slot-scope="scope">
          <div class="expand-row">
            <div>
              <span class="label">Notes:</span>
              <textarea
                rows="10"
                cols="50"
                v-model="scope.row.notes"
                v-on:blur="onNotesChanged(scope.row)"
              ></textarea>
            </div>

            <div>
              <span class="label">Properties:</span>
              <pre>{{ scope.row.properties }}</pre>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="timestamp"
        column-key="timestamp"
        label="Timestamp"
        width="100rem"
        sortable
      >
        <template slot-scope="scope">
          <span class="timestamp">
            {{ scope.row.timestampStr }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        prop="issueCount"
        column-key="issueCount"
        label="Count"
        width="100rem"
        sortable
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.issueCountStr }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        prop="title"
        column-key="title"
        label="Title"
        width="280rem"
        sortable
      >
        <template slot-scope="scope">
          <edit-text
            :value="scope.row.titleMessage"
            :id="scope.row.id"
            :row="scope.row"
            :showEdit="scope.row.showEditTitle"
            :className="scope.row.statusClassName"
            :onChanged="onTitleChanged"
            :onValueChanged="(value, row) => (row.titleMessage = value)"
            :onShowEdit="(value, row) => (row.showEditTitle = value)"
          />
        </template>
      </el-table-column>

      <el-table-column
        prop="message"
        column-key="message"
        label="Message"
        sortable
      >
        <template slot-scope="scope">
          <div class="message-column">
            <span
              v-if="!scope.row.showNameAsTitle"
              :title="scope.row.name"
              class="name"
              :class="scope.row.statusClassName"
            >
              {{ scope.row.name }}
            </span>

            <span
              :title="scope.row.message"
              class="message"
              :class="scope.row.statusClassName"
            >
              {{ scope.row.message }}
            </span>

            <span
              :title="scope.row.context"
              class="message"
              :class="scope.row.statusClassName"
            >
              {{ scope.row.context }}
            </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="status"
        column-key="status"
        label="Status"
        width="150rem"
        sortable
        :filter-method="statusFilterHandler"
        :filters="statusFilter"
        :filtered-value="statusFilterValue"
      >
        <template slot-scope="scope">
          <status-list
            :statusId="scope.row.statusId"
            :row="scope.row"
            :key="'status-list-' + scope.row.id"
            @changed="onStatusChanged"
          />
        </template>
      </el-table-column>

      <el-table-column
        prop="bugId"
        column-key="bugId"
        label="Bug"
        width="100rem"
        sortable
      >
        <template slot-scope="scope">
          <div>
            <edit-bug
              :value="scope.row.bugId"
              :url="scope.row.bugUrl"
              :id="scope.row.id"
              :row="scope.row"
              :onShowEdit="(value, row) => onShowEditBugForm(row)"
              :onChanged="onBugIdChanged"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="cloudRoleName" label="Role" width="150" sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script src="./investigations-grid.ts"></script>
<style lang="scss" src="./investigations-grid.scss"></style>
