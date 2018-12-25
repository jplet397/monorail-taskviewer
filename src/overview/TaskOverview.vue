<template>
  <div class="list-view">
    <task-item :task="titleTask" :index="-1"/>
    <ul class="tasks">
      <li v-for="(task, index) in tasks" :key="index">
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
    data() {
      return {
        titleTask: {
          taskId: 'TaskId',
          taskDescription: 'Task Description',
          location: 'location',
          source: 'source',
          destination: 'destination',
          palletId: 'palletId',
          sccc: 'sccc',
        },
        tasks: [
          {
            taskId: 123456789012,
            taskDescription: 'Bring from a to b',
            location: 'P41A08',
            source: 'P41A08',
            destination: 'DEC001',
            palletId: '000124879',
            sccc: '0123456789ABCDEFGHaa',
          }, {
            taskId: 2456789,
            taskDescription: 'Bring from d to e',
            location: 'P41A08',
            source: 'P41A08',
            destination: 'DEC001',
            palletId: '123456789012',
            sccc: '0123456789ABCDEFGHaa',
          },
        ],
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
