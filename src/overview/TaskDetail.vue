<template>
    <div>
      <div class="general">
        <label>TaskId ID:</label> <span>{{task.TaskId}}</span><br>
        <label>Type:</label> <span>{{task.TaskType}}</span><br>
        <label>Priority:</label> <span>{{task.TaskPriority}}</span><br>
        <label>Description:</label> <span>{{task.TaskDesc}}</span><br>
        <label>Created:</label> <span>{{task.TaskCreated}}</span><br>
        <label>Updated:</label> <span>{{task.TaskLastUpdate}}</span><br>
        <label>Error:</label> <span>{{task.TaskError}}</span><br>
        <label>Error Desc:</label> <span>{{task.TaskErrorDesc}}</span><br>
        <label>Task Status:</label> <span>{{task.TaskStatus}}</span><br>
      </div><br>
      <div class="object-data">
        <label>Pallet ID:</label> <span>{{task.ObjectData.PalletId}}</span><br>
        <label>SSCC:</label> <span>{{task.ObjectData.PalletLabel}}</span><br>
        <label>Pallet Type:</label> <span>{{task.ObjectData.PalletType}}</span><br>
      </div><br>
      <div class="execution-data">
        <div class="general">
          <label>Trolley:</label> <span>{{task.ExecutionData.TrolleyId}}</span><br>
          <label>Execution Status:</label> <span>{{task.ExecutionData.ExecutionStatus}}</span><br>
        </div><br>
        <div class="location">
          <label>LocID:</label> <span>{{task.ExecutionData.CurrentLocation.LocId}}</span><br>
          <label>LocID Monorail:</label> <span>{{task.ExecutionData.CurrentLocation.LocidMonorail}}</span><br>
          <label>Sequence:</label> <span>{{task.ExecutionData.CurrentLocation.MonorailSequence}}</span><br>
          <label>PlcID:</label> <span>{{task.ExecutionData.CurrentLocation.Plcid}}</span><br>
        </div><br>
        <div class="source">
          <label>LocID:</label> <span>{{task.ExecutionData.SourceLoc.LocId}}</span><br>
          <label>LocID Monorail:</label> <span>{{task.ExecutionData.SourceLoc.LocidMonorail}}</span><br>
          <label>Sequence:</label> <span>{{task.ExecutionData.SourceLoc.MonorailSequence}}</span><br>
          <label>PlcID:</label> <span>{{task.ExecutionData.SourceLoc.Plcid}}</span><br>
        </div><br>
        <div class="destination">
          <label>LocID:</label> <span>{{task.ExecutionData.DestinationLoc.LocId}}</span><br>
          <label>LocID Monorail:</label> <span>{{task.ExecutionData.DestinationLoc.LocidMonorail}}</span><br>
          <label>Sequence:</label> <span>{{task.ExecutionData.DestinationLoc.MonorailSequence}}</span><br>
          <label>PlcID:</label> <span>{{task.ExecutionData.DestinationLoc.Plcid}}</span><br>
        </div><br>
        <div >
          <ul class="tasks">
            <li v-for="(failed, index) in task.ExecutionData.FailedDropLocations" :key="index">
              <label>{{failed.LocId}}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'TaskDetail',
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        task: {},
      };
    },
    created() {
      this.getPayLoad();
    },
    methods: {
      getPayLoad() {
        this.$store.dispatch('getTasksById', this.id)
          .then((task) => {
            if (task !== false) {
              this.task = task;
            }
          });
      },
    },
  };
</script>

<style scoped>
.execution-data {

}
</style>
