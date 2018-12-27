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
    },
    beforeDestroy() {
      this.endPolling();
    },
    computed: {
      activeTasks() {
        return this.$store.state.tasks.activeTasks;
      },
    },
    methods: {
      pollData() {
        this.polling = setInterval(() => {
          this.$store.dispatch('tasks/getTasks');
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
          taskId: 'TaskId',
          taskDescription: 'Task Description',
          location: 'location',
          source: 'source',
          destination: 'destination',
          palletId: 'palletId',
          sccc: 'sccc',
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
