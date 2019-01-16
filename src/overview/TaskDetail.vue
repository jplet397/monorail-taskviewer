<template>
    <div>
      under construction
    </div>
</template>

<script>
  export default {
    name: 'TaskDetail',
    methods: {
      getPayLoad() {
        const anId = this.$route.params.taskId;
        // this.$store.dispatch('getTasksById', anId)
        //   .then((task) => {
        //     if (task !== false) {
        //       this.payload.task = task.TaskId;
        //       this.payload.trolley = task.ExecutionData.TrolleyId;
        //       this.payload.location = task.ExecutionData.CurrentLocation.LocId;
        //       this.payload.source = task.ExecutionData.SourceLoc.LocId;
        //       this.payload.destination = task.ExecutionData.DestinationLoc.LocId;
        //       this.payload.taskStatus = task.TaskStatus;
        //       this.payload.executionStatus = task.ExecutionStatus;
        //     }
        //   });
      },
    },
  };
</script>

<style scoped>

</style>
