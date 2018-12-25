<template>
  <div class="container">
    <span class="standard badge">{{index + 1}}</span>
    <span class="standard normal task-id">{{task.taskId}}</span>
    <span class="standard normal pallet-id">{{task.palletId}}</span>
    <span class="standard normal sccc">{{task.sccc}}</span>
    <span class="standard normal location">{{task.location}}</span>
    <span class="standard normal location">{{task.source}}</span>
    <span class="standard normal location">{{task.destination}}</span>
    <span class="standard normal">{{task.taskDescription}}</span>
  </div>
</template>

<script>
  export default {
    name: 'TaskItem',
    props: {
      index: {
        type: Number,
        required: false,
      },
      task: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style scoped>
  .container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    cursor: pointer;
    position: relative;
    left: 0;
    right: 0;
    width: 98%;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
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

  .sccc {
    width: 10em;
  }

  .location {
    width: 4em;
  }
</style>
