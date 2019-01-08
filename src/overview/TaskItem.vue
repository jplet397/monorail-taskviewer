<template>
  <div>
    <div class="container">
      <div class="title-bar" @click="open = !open">
        <span class="standard badge">{{index + 1}}</span>
        <span class="standard normal task-id">{{task.TaskId}}</span>
        <span class="standard normal execution">{{task.ExecutionStatus}}</span>
        <span class="standard normal pallet-id">{{task.TaskStatus}}</span>
        <span class="standard normal pallet-id">{{task.ObjectData.PalletId}}</span>
        <span class="standard normal sscc">{{task.ObjectData.PalletLabel}}</span>
        <span class="standard normal location">{{task.ExecutionData.CurrentLocation.LocId}}</span>
        <span class="standard normal location">{{task.ExecutionData.SourceLoc.LocId}}</span>
        <span class="standard normal location">{{task.ExecutionData.DestinationLoc.LocId}}</span>
        <span class="standard normal">{{task.TaskDesc}}</span>
      </div>
      <div v-if="open">
        <div class="information">
          <button @click="updateTask">Update</button>
          <button @click="cancelTask">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TaskItem',
    created() {
      console.log(this.task);
    },
    methods: {
      cancelTask() {
        this.$store.dispatch('cancelTask', this.task.TaskId);
      },
      updateTask() {
        this.$router.push(`/update/${this.task.TaskId}`);
      },
    },
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
    data() {
      return {
        open: false,
      };
    },
  };
</script>

<style scoped>
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
    width: 4em;
  }
</style>
