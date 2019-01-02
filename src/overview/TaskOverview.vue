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
  </div>
</template>

<script>
  import TaskItem from './TaskItem.vue';

  export default {
    name: 'TaskOverview',
    components: { TaskItem },
    created() {
      this.pollData();
      this.$store.dispatch('getTasks');
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
          ExecutionStatus: 'execution status',
          TaskStatus: 'task status',
          TaskDesc: 'description',
          ObjectData: {
            PalletId: 'palletId',
            PalletLabel: 'sccc',
          },
          ExecutionData: {
            CurrentLocation: { LocId: 'location' },
            SourceLoc: { LocId: 'source' },
            DestinationLoc: { LocId: 'destination' },
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
</style>
