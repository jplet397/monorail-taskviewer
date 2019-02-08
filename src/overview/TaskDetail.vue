<template>
  <div class="container">
    <div>
      <div class="information">
        <label>Type:</label> <span>{{task.TaskType}}</span><br>
        <label>Priority:</label> <span>{{task.TaskPriority}}</span><br>
        <label>Description:</label> <span>{{task.TaskDesc}}</span><br>
      </div>
      <br>
      <div class="object-data">
        <label>Pallet Type:</label> <span>{{task.ObjectData.PalletType}}</span><br>
        PalletRounds Hbw:<span>{{task.ExecutionData.RoundCounter.DecisionPointHbw}}</span><br>
        PalletRounds Buf:<span>{{task.ExecutionData.RoundCounter.DecisionPointBuffer}}</span>
        <br>
        IQR Counter:<span>{{task.ExecutionData.RoundCounter.ReroutesCounter}}</span>
        <br>
      </div>
      <br>
      <div class="location">
        <h4>Location</h4>
        <label>LocID:</label> <span>{{task.ExecutionData.CurrentLocation.LocId}}</span><br>
        LocID Monorail:<span>{{task.ExecutionData.CurrentLocation.LocidMonorail}}</span><br>
        Sequence: <span>{{task.ExecutionData.CurrentLocation.MonorailSequence}}</span><br>
        <label>PlcID:</label> <span>{{task.ExecutionData.CurrentLocation.Plcid}}</span><br>
      </div>
      <br>
      <div class="source">
        <h4>Source</h4>
        <label>LocID:</label> <span>{{task.ExecutionData.SourceLoc.LocId}}</span><br>
        LocID Monorail: <span>{{task.ExecutionData.SourceLoc.LocidMonorail}}</span><br>
        Sequence: <span>{{task.ExecutionData.SourceLoc.MonorailSequence}}</span><br>
        <label>PlcID:</label> <span>{{task.ExecutionData.SourceLoc.Plcid}}</span><br>
      </div>
      <br>
      <div class="destination">
        <h4>Destination</h4>
        <label>LocID:</label> <span>{{task.ExecutionData.DestinationLoc.LocId}}</span><br>
        LocID Monorail: <span>{{task.ExecutionData.DestinationLoc.LocidMonorail}}</span><br>
        Sequence: <span>{{task.ExecutionData.DestinationLoc.MonorailSequence}}</span><br>
        <label>PlcID:</label> <span>{{task.ExecutionData.DestinationLoc.Plcid}}</span><br>
      </div>
      <br>
      <div>
        <ul class="tasks">
          <li v-for="(failed, index) in task.ExecutionData.FailedDropLocations" :key="index">
            <label>{{failed}}</label>
          </li>
        </ul>
      </div>
    </div>
    <div class="button-container">
      <button @click="clearFailed" v-if="showClearFailedButton">Clear Failed Drops</button>
      <button @click="resetRounds" v-if="showResetButton">Reset Rounds</button>
      <button @click="routeTask" v-if="task.ExecutionData.ManualMode">New destination</button>
      <button @click="updateTask">Full Update</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TaskDetail',
    props: {
      task: {
        type: Object,
        required: true,
      },
    },
    computed: {
      showResetButton() {
        return this.task.ExecutionStatus === 'ToManyReroutes';
      },
      showClearFailedButton() {
        return !(this.task.ExecutionData.FailedDropLocations === undefined
          || this.task.ExecutionData.FailedDropLocations.length === 0);
      },
    },
    methods: {
      clearFailed() {
        this.$store.dispatch('clearFailed', this.task.TaskId)
          .then((result) => {
            if (result === true) {
              this.$toasted.show(`Failed drops for task ${this.task.TaskId} cleared`, { duration: 5000 });
              this.$store.dispatch('getTasks');
            } else {
              this.$toasted.show(`Failed to clear failed drops for task ${this.task.TaskId}, Msg: ${result}`, { duration: 5000 });
            }
          });
      },
      resetRounds() {
        this.$store.dispatch('resetRounds', this.task.TaskId)
          .then((result) => {
            if (result === true) {
              this.$toasted.show(`Rounds counter for ${this.task.TaskId} cleared and reactivated`, { duration: 5000 });
              this.$store.dispatch('getTasks');
            } else {
              this.$toasted.show(`Failed to reset counters ${this.task.TaskId}, Msg: ${result}`, { duration: 5000 });
            }
          });
      },
      updateTask() {
        this.$router.push(`/update/${this.task.TaskId}`);
      },
      routeTask() {
        this.$router.push(`/route/${this.task.TaskId}`);
      },
    },
  };
</script>

<style scoped>
  .information {
    background-color: #DCDCDC;
  }

  button:hover {
    background-color: #45a049;
  }

  button {
    background-color: #4CAF50;
    color: white;
    padding: 4px 14px;
    margin: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .container {
    display: flex;
  }

  .button-container {
    display: flex;
    flex-direction: column;
  }
</style>
