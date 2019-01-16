<template>
  <div class="list-view">
    <div class="buttons">
      <button class="not-active" v-if="!isPolling" @click="pollData">Start auto mode</button>
      <button class="active" v-if="isPolling" @click="endPolling">Stop auto mode</button>
    </div>
    <task-item :task="titleTask" :index="-1"/>
    <ul class="tasks">
      <li v-for="(task, index) in activeTasks" :key="index">
        <task-item :task="task" :index="index"/>
      </li>
    </ul>

    <!--<ul class="tasks">-->
      <!--<li v-for="(task, index) in activeTasks" :key="index">-->
        <!--<div class="container">-->
          <!--<div class="title-bar" @click="open = !open">-->
            <!--<span class="standard badge">{{index + 1}}</span>-->
            <!--<span class="standard normal task-id">{{task.TaskId}}</span>-->
            <!--<span class="standard normal execution">{{task.ExecutionStatus}}</span>-->
            <!--<span class="standard normal pallet-id">{{task.ObjectData.PalletId}}</span>-->
            <!--<span class="standard normal sscc">{{task.ObjectData.PalletLabel}}</span>-->
            <!--<span class="standard normal location">{{task.ExecutionData.SourceLoc.LocId}}</span>-->
            <!--<span class="standard normal location">{{task.ExecutionData.DestinationLoc.LocId}}</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</li>-->
    <!--</ul>-->
    <div class="grid-container">
      <div class="overview">
      <table class="datagrid">
        <thead>
        <tr class="header-row">
          <th class="badge">Nr.</th>
          <th>TaskId</th>
          <th>PalletId</th>
          <th>ExecutionStatus</th>
          <th>PalletLabel</th>
          <th>Location</th>
          <th>Source</th>
          <th>Destination</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(task, index) in activeTasks"
            :key="index"
            class="standard-row"
            v-bind:class="{selected: isSelected}">
          <td class="badge">{{index + 1}}</td>
          <td class="normal">{{task.TaskId}}</td>
          <td class="normal">{{task.ObjectData.PalletId}}</td>
          <td class="normal">{{task.ExecutionStatus}}</td>
          <td class="normal">{{task.ObjectData.PalletLabel}}</td>
          <td class="normal">{{task.ExecutionData.CurrentLocation.LocId}}</td>
          <td class="normal">{{task.ExecutionData.SourceLoc.LocId}}</td>
          <td class="normal">{{task.ExecutionData.DestinationLoc.LocId}}</td>
        </tr>
        </tbody>
      </table>
      </div>
      <div class="detail" style="">
        <task-detail></task-detail>
      </div>
    </div>
  </div>
</template>

<script>
  import TaskItem from './TaskItem.vue';
  import CollapsibleSection from '../shared/CollapsibleSection.vue';
  import TaskDetail from './TaskDetail.vue';

  export default {
    name: 'TaskOverview',
    components: { CollapsibleSection, TaskItem, TaskDetail },
    created() {
      this.pollData();
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
  .buttons {
    background: none;
    margin-right: 2em;
  }

  .active:hover {
    background-color: #45a049;
  }

  .not-active:hover {
    background-color: #ff4738;
  }

  .active {
    background-color: #4CAF50;
  }

  .not-active {
    background-color: #ff001e;
  }

  button {

    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }

  button {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .grid-container {
    margin: 1em;
    display: grid;
    grid-template-columns: 40% auto;
    height: 100%;
  }

  .overview {
    grid-column: 1 / span 1;
    margin-right: 1em;
  }

  .detail {
    grid-column: 2 / span 1;
    background: yellow;
  }

  .datagrid tr:hover td
  {
    background-color: #9fff5b;
  }

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
    width: 100%;
    left: 0;
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

  .information {
    background: lightsteelblue;
  }

  .title-bar {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
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

  .container {
    background-color: lightsteelblue;
    left: 0;
    right: 0;
    width: 98%;
    margin: .5em;
    border-radius: 4px;
  }

  .standard {
    font-size: small;
    line-height: 1em;
    padding: 0.8em 0.7em 0 0.7em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
    text-align: center;
  }

  .normal {
    color: mediumpurple;
    background-color: #EEE;
  }

  .badge {
    text-align: center;
    width:2em;
    color: mediumpurple;
    background-color: yellow;
  }

  .task-id {
    width: 8em;
  }

  .pallet-id {
    width: 8em;
  }

  .execution {
    width: 12em;
  }

  .sscc {
    width: 10em;
  }

  .location {
    width: 6em;
  }
</style>
