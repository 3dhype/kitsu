<template>
<div :class="{
  'modal': true,
  'is-active': active
}">
  <div @click="$emit('cancel')" class="modal-background"></div>

  <div class="modal-content">
    <div class="box content">
      <h1 class="title">
        {{ $t('entities.build_filter.title') }}
      </h1>

      <combobox
        class="flexrow-item"
        :options="general.unionOptions"
        locale-key-prefix="entities.build_filter."
        v-model="union"
      />

      <h3
        class="subtitle"
        v-if="isAssets"
      >
        {{ $t('entities.build_filter.asset_type') }}
      </h3>

      <div
        class="flexrow asset-type-filter"
        v-if="isAssets"
      >
        <combobox
          class="flexrow-item"
          :options="general.operatorOptions"
          locale-key-prefix="entities.build_filter."
          v-model="assetTypeFilters.operator"
        />
        <combobox
          class="flexrow-item"
          :options="assetTypeOptions"
          v-model="assetTypeFilters.value"
        />
      </div>

      <h3 class="subtitle">
        {{ $t('entities.build_filter.status') }}
      </h3>

      <div
        class="flexrow task-type-filter"
        :key="'task-type-' + i"
        v-for="(taskTypeFilter, i) in taskTypeFilters.values"
      >
        <combobox-task-type
          class="flexrow-item"
          :task-type-list="taskTypeList"
          v-model="taskTypeFilter.id"
        />
        <combobox
          class="flexrow-item"
          :options="general.taskTypeOperatorOptions"
          @input="onTaskTypeOperatorChanged(taskTypeFilter)"
          locale-key-prefix="entities.build_filter."
          v-model="taskTypeFilter.operator"
        />
        <div class="flexrow-item flexrow value-column">
          <combobox-status
            class="flexrow-item"
            :key="'task-type-value-' + index"
            :task-status-list="productionTaskStatuses"
            v-model="taskTypeFilter.values[index]"
            v-for="(statusId, index) in taskTypeFilter.values"
          />
          <button-simple
            class="mt05"
            icon="plus"
            @click="addInTaskTypeFilter(taskTypeFilter)"
            v-if="taskTypeFilter.operator === 'in'"
          />
        </div>
        <button-simple
          class="mt05"
          icon="minus"
          @click="removeTaskTypeFilter(taskTypeFilter)"
        />
      </div>
      <div class="add-button">
        <button-simple
          icon="plus"
          @click="addTaskTypeFilter"
        />
      </div>

      <div v-if="descriptorOptions.length > 0">
        <h3 class="subtitle">
          {{ $t('entities.build_filter.descriptor') }}
        </h3>

        <div
          class="flexrow descriptor-filter"
          :key="'desc-' + i"
          v-for="(descriptorFilter, i) in metadataDescriptorFilters.values"
        >
          <combobox
            class="flexrow-item"
            :options="descriptorOptions"
            @input="onDescriptorChanged(descriptorFilter)"
            v-model="descriptorFilter.id"
          />
          <combobox
            class="flexrow-item"
            :options="general.operatorOptions"
            locale-key-prefix="entities.build_filter."
            v-model="descriptorFilter.operator"
          />

          <div class="flexrow-item flexrow value-column">
            <template
              v-for="(value, index) in descriptorFilter.values"
            >
              <text-field
                :key="'descriptor-value-' + index"
                class="flexrow-item"
                input-class=" thin"
                v-model="descriptorFilter.values[index]"
                v-if="getDescriptor(descriptorFilter.id).choices.length === 0"
              />
              <combobox
                class="flexrow-item"
                :key="'descriptor-value-' + index"
                :options="getDescriptorChoiceOptions(descriptorFilter.id)"
                v-model="descriptorFilter.values[index]"
                v-else
              />
            </template>
            <button-simple
              class="mt05"
              icon="plus"
              @click="addInDescriptorFilter(descriptorFilter)"
              v-if="descriptorFilter.operator === 'in'"
            />
          </div>
          <button-simple
            class="mt05"
            icon="minus"
            @click="removeDescriptorFilter(descriptorFilter)"
          />
        </div>
        <div class="add-button">
          <button-simple
            icon="plus"
            @click="addDescriptorFilter"
          />
        </div>
      </div>

      <h3 class="subtitle" v-if="!isCurrentUserVendor">
        {{ $t('entities.build_filter.assignation') }}
      </h3>

      <div class="flexrow" v-if="!isCurrentUserVendor">
        <combobox
          class="flexrow-item"
          :options="assignation.options"
          locale-key-prefix="entities.build_filter."
          v-model="assignation.value"
        />

        <combobox-task-type
          class="flexrow-item"
          :task-type-list="taskTypeList"
          v-model="assignation.taskTypeId"
          v-if="['assigned', 'unassigned'].includes(assignation.value)"
        />

        <people-field
          class="flexrow-item"
          :people="team"
          v-model="assignation.person"
          v-if="['assignedto', '-assignedto'].includes(assignation.value)"
        />
      </div>

      <h3 class="subtitle">
        {{ $t('entities.build_filter.thumbnail') }}
      </h3>

      <combobox
        :options="hasThumbnail.options"
        locale-key-prefix="entities.build_filter."
        v-model="hasThumbnail.value"
      />

      <modal-footer
        :error-text="$t('entities.thumbnails.error')"
        @confirm="applyFilter"
        @cancel="$emit('cancel')"
      />
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { modalMixin } from './base_modal'
import { getFilters } from '../../lib/filtering'

import ButtonSimple from '../widgets/ButtonSimple'
import Combobox from '../widgets/Combobox'
import ComboboxStatus from '../widgets/ComboboxStatus'
import ComboboxTaskType from '../widgets/ComboboxTaskType'
import ModalFooter from './ModalFooter'
import PeopleField from '../widgets/PeopleField'
import TextField from '../widgets/TextField'

export default {
  name: 'build-filter-modal',
  mixins: [modalMixin],

  components: {
    ButtonSimple,
    Combobox,
    ComboboxStatus,
    ComboboxTaskType,
    ModalFooter,
    PeopleField,
    TextField
  },

  props: {
    active: {
      type: Boolean,
      default: false
    },
    entityType: {
      type: String,
      default: 'asset'
    }
  },

  data () {
    return {
      assetTypeFilters: {
        operator: '=',
        value: ''
      },
      assignation: {
        person: null,
        taskTypeId: '',
        value: 'nofilter',
        options: [
          { label: 'no_filter', value: 'nofilter' },
          { label: 'assigned_to', value: 'assignedto' },
          { label: 'not_assigned_to', value: '-assignedto' },
          { label: 'assignation_exists_for', value: 'assigned' },
          { label: 'no_assignation_for', value: 'unassigned' }
        ]
      },
      general: {
        operatorOptions: [
          { label: 'equal', value: '=' },
          { label: 'not_equal', value: '=-' },
          { label: 'in', value: 'in' }
        ],
        taskTypeOperatorOptions: [
          { label: 'equal', value: '=' },
          { label: 'not_equal', value: '=-' },
          { label: 'in', value: 'in' }
        ],
        unionOptions: [
          { label: 'union_and', value: 'and' },
          { label: 'union_or', value: 'or' }
        ]
      },
      hasThumbnail: {
        value: 'nofilter',
        options: [
          { label: 'no_filter', value: 'nofilter' },
          { label: 'with_thumbnail', value: 'withthumbnail' },
          { label: 'without_thumbnail', value: '-withthumbnail' }
        ]
      },
      metadataDescriptorFilters: {
        values: []
      },
      taskTypeFilters: {
        values: []
      },
      union: 'and'
    }
  },

  mounted () {
    this.reset()
    this.setFiltersFromCurrentQuery()
  },

  computed: {
    ...mapGetters([
      'assetMetadataDescriptors',
      'assetTypeMap',
      'assetSearchText',
      'assetValidationColumns',
      'currentProduction',
      'isCurrentUserVendor',
      'people',
      'personMap',
      'productionAssetTypes',
      'productionTaskStatuses',
      'productionTaskTypes',
      'shotMetadataDescriptors',
      'shotSearchText',
      'shotValidationColumns',
      'taskTypeMap',
      'taskStatusMap'
    ]),

    isAssets () {
      return this.entityType === 'asset'
    },

    assetTypeOptions () {
      return [
        { label: this.$t('entities.build_filter.all_types'), value: '-' },
        ...this.productionAssetTypes.map((assetType) => {
          return {
            label: assetType.name,
            value: assetType.id
          }
        })
      ]
    },

    taskTypeList () {
      if (this.isAssets) {
        return this.assetValidationColumns
          .map((taskTypeId) => this.taskTypeMap.get(taskTypeId))
      } else {
        return this.shotValidationColumns
          .map((taskTypeId) => this.taskTypeMap.get(taskTypeId))
      }
    },

    team () {
      return this.currentProduction.team.map(pId => this.personMap.get(pId))
    },

    descriptorOptions () {
      return this.metadataDescriptors.map(descriptor => ({
        label: descriptor.name,
        value: descriptor.id
      }))
    },

    metadataDescriptors () {
      let descriptors = this.shotMetadataDescriptors
      if (this.isAssets) descriptors = this.assetMetadataDescriptors
      return descriptors
    }
  },

  methods: {
    ...mapActions([
    ]),

    // Build filter

    applyFilter () {
      const query = this.buildFilter()
      this.$emit('confirm', query)
    },

    buildFilter () {
      let query = ''
      query = this.applyAssetTypeChoice(query)
      query = this.applyTaskTypeChoice(query)
      query = this.applyDescriptorChoice(query)
      query = this.applyAssignationChoice(query)
      query = this.applyThumbnailChoice(query)
      query = this.applyUnionChoice(query)
      return query.trim()
    },

    applyAssetTypeChoice (query) {
      const value = this.assetTypeFilters.value
      if (value && value !== '-') {
        let operator = '=['
        if (this.assetTypeFilters.operator === '=-') operator = '=[-'
        const assetType = this.assetTypeMap.get(value)
        query += ` type${operator}${assetType.name}]`
      }
      return query
    },

    applyTaskTypeChoice (query) {
      this.taskTypeFilters.values.forEach((taskTypeFilter) => {
        let operator = '=['
        if (taskTypeFilter.operator === '=-') operator = '=[-'
        const taskType = this.taskTypeMap.get(taskTypeFilter.id)
        const value = taskTypeFilter.values.map(statusId => {
          return this.taskStatusMap.get(statusId).short_name
        }).join(',')
        query += ` [${taskType.name}]${operator}${value}]`
      })
      return query
    },

    applyDescriptorChoice (query) {
      this.metadataDescriptorFilters.values.forEach(descriptorFilter => {
        let operator = '=['
        if (descriptorFilter.operator === '=-') operator = '=[-'
        const desc = this.getDescriptor(descriptorFilter.id)
        const value = descriptorFilter.values.join(',')
        query += ` [${desc.name}]${operator}${value}]`
      })
      return query
    },

    applyAssignationChoice (query) {
      if (this.assignation.value !== 'nofilter') {
        if (this.assignation.person) {
          let value = this.assignation.person.name
          if (this.assignation.value === '-assignedto') value = `-${value}`
          query += ` assignedto=[${value}]`
        } else if (this.assignation.taskTypeId) {
          const taskType = this.taskTypeMap.get(this.assignation.taskTypeId)
          const value =
            this.assignation.value === 'assigned' ? 'assigned' : 'unassigned'
          query += ` [${taskType.name}]=${value}`
        }
      }
      return query
    },

    applyThumbnailChoice (query) {
      if (this.hasThumbnail.value !== 'nofilter') {
        query += ` ${this.hasThumbnail.value}`
      }
      return query
    },

    applyUnionChoice (query) {
      if (this.union === 'or') {
        query = ` +(${query.trim()})`
      }
      return query
    },

    // Task types

    addTaskTypeFilter () {
      const filter = {
        id: this.taskTypeList[0].id,
        operator: '=',
        values: [this.productionTaskStatuses[0].id]
      }
      this.taskTypeFilters.values.push(filter)
      return filter
    },

    addInTaskTypeFilter (taskTypeFilter) {
      taskTypeFilter.values.push(this.productionTaskStatuses[0].id)
    },

    removeTaskTypeFilter (taskTypeFilter) {
      this.taskTypeFilters.values =
        this.taskTypeFilters.values.filter(f => f !== taskTypeFilter)
    },

    addInDescriptorFilter (descriptorFilter) {
      descriptorFilter.values.push('')
    },

    // Descriptors

    onDescriptorChanged (descriptorFilter) {
      const descriptor = this.getDescriptor(descriptorFilter.id)
      if (descriptor.choices.length > 0) {
        descriptorFilter.values = [descriptor.choices[0]]
      } else {
        descriptorFilter.values = ['']
      }
    },

    addDescriptorFilter () {
      const desc = this.getDescriptor(this.descriptorOptions[0].value)
      const filter = {
        id: this.descriptorOptions[0].value,
        operator: '=',
        values: [desc.choices.length > 0 ? desc.choices[0] : '']
      }
      this.metadataDescriptorFilters.values.push(filter)
      return filter
    },

    removeDescriptorFilter (descriptorFilter) {
      this.metadataDescriptorFilters.values =
        this.metadataDescriptorFilters.values.filter(
          f => f !== descriptorFilter
        )
    },

    getDescriptor (descriptorId) {
      return this.metadataDescriptors.find(d => d.id === descriptorId)
    },

    getDescriptorChoiceOptions (descriptorId) {
      return this.getDescriptor(descriptorId)
        .choices
        .map(choice => ({ label: choice, value: choice }))
    },

    // Helpers to set filters from search query

    setFiltersFromCurrentQuery () {
      const searchQuery =
        this.isAssets ? this.assetSearchText : this.shotSearchText
      if (searchQuery) {
        const filters = getFilters({
          entryIndex: [], // entry list is not needed,
          assetTypes: this.productionAssetTypes,
          taskTypes: this.productionTaskTypes,
          taskStatuses: this.productionTaskStatuses,
          descriptors: this.metadataDescriptors,
          persons: this.people,
          query: searchQuery
        })
        filters.forEach((filter) => {
          if (filter.type === 'assettype') {
            this.setFiltersFromAssetTypeQuery(filter)
          } else if (filter.type === 'status') {
            this.setFiltersFromStatusQuery(filter)
          } else if (filter.type === 'descriptor') {
            this.setFiltersFromDescriptorQuery(filter)
          } else if (filter.type === 'assignation') {
            this.setFiltersFromAssignationQuery(filter)
          } else if (filter.type === 'assignedto') {
            this.setFiltersFromAssignedToQuery(filter)
          } else if (filter.type === 'thumbnail') {
            this.setFiltersFromThumbnailQuery(filter)
          }
        })
        if (filters.union) {
          this.setUnion()
        }
      }
    },

    setFiltersFromAssetTypeQuery (filter) {
      this.assetTypeFilters.operator = filter.excluding ? '=-' : '='
      this.assetTypeFilters.value = filter.assetType.id
    },

    setFiltersFromStatusQuery (filter) {
      let operator = '='
      if (filter.taskStatuses.length > 1) {
        operator = 'in'
      } else if (filter.excluding) {
        operator = '=-'
      }
      this.taskTypeFilters.values.push({
        id: filter.taskType.id,
        operator,
        values: filter.taskStatuses
      })
    },

    setFiltersFromDescriptorQuery (filter) {
      let operator = '='
      if (filter.values.length > 1) {
        operator = 'in'
      } else if (filter.excluding) {
        operator = '=-'
      }
      this.metadataDescriptorFilters.values.push({
        id: filter.descriptor.id,
        operator,
        values: filter.values
      })
    },

    setFiltersFromAssignationQuery (filter) {
      if (filter.assigned) {
        this.assignation.value = 'assigned'
      } else {
        this.assignation.value = 'unassigned'
      }
      this.assignation.taskTypeId = filter.taskType.id
    },

    setFiltersFromAssignedToQuery (filter) {
      this.assignation.value = filter.excluding ? '-assignedto' : 'assignedto'
      this.assignation.person = this.people.find(p => p.id === filter.personId)
    },

    setFiltersFromThumbnailQuery (filter) {
      if (filter.excluding) {
        this.hasThumbnail.value = '-withthumbnail'
      } else {
        this.hasThumbnail.value = 'withthumbnail'
      }
    },

    setUnion () {
      this.union = 'or'
    },

    // General

    onTaskTypeOperatorChanged (taskTypeFilter) {
      if (taskTypeFilter.operator !== 'in') {
        taskTypeFilter.values = [taskTypeFilter.values[0]]
      }
    },

    reset () {
      this.assignation.value = 'nofilter'
      this.assignation.person = null
      this.assignation.taskType = ''
      this.hasThumbnail.value = 'nofilter'
      this.metadataDescriptorFilters.values = []
      this.taskTypeFilters.values = []
      this.assetTypeFilters.operator = '='
      this.assetTypeFilters.value = '-'
    }
  },

  watch: {
    active () {
      if (this.active) {
        this.reset()
        this.assignation.taskTypeId =
          this.taskTypeList.length > 0 ? this.taskTypeList[0].id : ''
        this.setFiltersFromCurrentQuery()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-content {
  max-height: calc(100vh - 7rem);
  margin-top: 3rem;
}

.add-button button {
  margin-left: 0;
}

.subtitle {
  color: $grey;
  font-size: 1em;
  margin-top: 1.1em;
  text-transform: uppercase;
  margin-bottom: 0.5em;
  margin-left: 0.1em;
}

.field {
  margin-top: 0;
  margin-bottom: 0;
}

.task-type-filter,
.descriptor-filter {
  margin-bottom: 0.3em;
  align-items: flex-start;

  .descriptor-text-value {
    padding: 0;
  }
}

.value-column {
  flex-direction: column;
  align-items: flex-start;
}
</style>
