<template>
  <div class="list-view">
    <button v-if="!isPolling" @click="pollData">Start auto mode</button>
    <button v-if="isPolling" @click="endPolling">Stop auto mode</button>
    <task-item :task="titleTask" :index="-1"/>
    <ul class="tasks">
      <li v-for="(task, index) in activeTasks" :key="index">
        <task-item :task="task" :index="index"/>
      </li>
    </ul>

    <table style="width:98%">
      <thead>
      <tr class="header-row">
        <th class="badge">Nr.</th>
        <th>TaskId</th>
        <th>PalletId</th>
        <th>ExecutionStatus</th>
        <th>TaskStatus</th>
        <th>PalletLabel</th>
        <th>Location</th>
        <th>Source</th>
        <th>Destination</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(task, index) in activeTasks" :key="index" class="standard-row">
        <td class="badge">{{index + 1}}</td>
        <td class="normal">{{task.TaskId}}</td>
        <td class="normal">{{task.ObjectData.PalletId}}</td>
        <td class="normal">{{task.ExecutionStatus}}</td>
        <td class="normal">{{task.TaskStatus}}</td>
        <td class="normal">{{task.ObjectData.PalletLabel}}</td>
        <td class="normal">{{task.ExecutionData.CurrentLocation.LocId}}</td>
        <td class="normal">{{task.ExecutionData.SourceLoc.LocId}}</td>
        <td class="normal">{{task.ExecutionData.DestinationLoc.LocId}}</td>
        <td class="normal">{{task.TaskDesc}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import TaskItem from './TaskItem.vue';
  import CollapsibleSection from '../shared/CollapsibleSection.vue';

  export default {
    name: 'TaskOverview',
    components: { CollapsibleSection, TaskItem },
    created() {
      this.$store.dispatch('getTasks')
        .catch((err) => {
          console.log(err);
          this.$toasted.show('Failed to get Tasks');
        });
    },
    beforeDestroy() {
      this.endPolling();
    },
    computed: {
      activeTasks() {
        return this.$store.state.activeTasks;
      },
    },
    methods: {
      pollData() {
        this.isPolling = true;
        this.polling = setInterval(() => {
          this.$store.dispatch('getTasks');
        }, 10000);
      },
      endPolling() {
        clearInterval(this.polling);
        this.isPolling = false;
      },
    },
    data() {
      return {
        isPolling: false,
        polling: null,
        titleTask: {
          TaskId: 'TaskId',
          TaskDescription: 'Task Description',
          ExecutionStatus: 'Execution Status',
          TaskStatus: 'Task status',
          TaskDesc: 'Description',
          ObjectData: {
            PalletId: 'PalletId',
            PalletLabel: 'sscc',
          },
          ExecutionData: {
            CurrentLocation: { LocId: 'Location' },
            SourceLoc: { LocId: 'Source' },
            DestinationLoc: { LocId: 'Destination' },
          },
        },
      };
    },
  };
</script>

<style scoped>
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }

  .tasks {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 100%;
  }

  table {
    left: 0;
    right: 0;
    width: 98%;
    margin: .5em;
    border-radius: 4px;
  }

  tr {
    font-size: small;
    line-height: 2em;
    padding: 0.8em 0.7em 0 0.7em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
    text-align: center;
  }

  td {
    border-radius: 4px 0 0 4px;
  }

  .header-row {
    position: relative;
    left: 0;
    right: 0;
    width: 100%;
    background-color: darkgray;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }

  .standard-row {
    cursor: pointer;
    position: relative;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #EEE;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }

  .badge {
    text-align: center;
    width: 3em;
    color: mediumpurple;
    background-color: yellow;
  }

  .normal {
    color: mediumpurple;
    background-color: #EEE;
  }

  .labels {
    background: purple;
    height: 5em;
  }
</style>
