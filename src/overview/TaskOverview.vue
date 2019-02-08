<template>
  <div class="list-view">
    <div class="buttons">
      <button class="not-active" v-if="!isPolling" @click="pollData">Start auto mode</button>
      <button class="active" v-if="isPolling" @click="endPolling">Stop auto mode</button>
    </div>
    <h2>Active Tasks:</h2>
    <ul class="tasks">
      <li v-for="(task, index) in activeTasks" :key="index">
        <task-item :task="task" :index="index"/>
      </li>
    </ul>
  </div>
</template>

<script>
  import TaskItem from './TaskItem.vue';

  export default {
    name: 'TaskOverview',
    components: { TaskItem },
    created() {
      this.pollData();
      this.$store.dispatch('getTasks')
        .catch((err) => {
          console.log(err);
          this.$toasted.show('Failed to get Tasks', { duration: 5000 });
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
        isSelected: false,
        isPolling: false,
        selectedTask: null,
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
  .list-view {
    padding: 1%;
  }

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

  h2 {
    text-align: left;
    margin-left: 16px;
    text-decoration: underline;
    color: #6E6E6E;
    margin-bottom: -4px;
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

  .datagrid tr:hover td
  {
    background-color: #9fff5b;
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
</style>
