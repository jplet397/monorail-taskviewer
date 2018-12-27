<template>
  <div class="list-view">
    <button @click="endPolling">Stop auto mode</button>
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
        console.log(`something: ${this.$store.state.activeTasks}`);
        return this.$store.state.activeTasks;
      },
    },
    methods: {
      pollData() {
        this.polling = setInterval(() => {
          this.$store.dispatch('getTasks');
        }, 10000);
      },
      endPolling() {
        clearInterval(this.polling);
      },
    },
    data() {
      return {
        polling: null,
        titleTask: {
          TaskId: 'TaskId',
          TaskDescription: 'Task Description',
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
