<template>
  <div class="container">
    <div class="data-zone">
      <div class="box">
        <h4>Object Data</h4>
        <div class="area-container">
          <div class="line title">
            <span>Pallet Type:</span>
            <span>Orig Source Loc:</span>
            <span>Orig Dest Loc:</span>
          </div>
          <div class="line data">
            <span>{{task.ObjectData.PalletType}}</span>
            <span>{{task.ObjectData.OrigSourceLocation}}</span>
            <span>{{task.ObjectData.OrigDestinationLocation}}</span>
          </div>
        </div>
      </div>
      <div class="box">
        <h4>Rounds counters</h4>
        <div class="area-container">
          <div class="line title">
            <span># passed Hbw:</span>
            <span># passed Buffer:</span>
            <span>IQR Counter:</span>
          </div>
          <div class="line data">
            <span>{{task.ExecutionData.RoundCounter.DecisionPointHbw}}</span>
            <span>{{task.ExecutionData.RoundCounter.DecisionPointBuffer}}</span>
            <span>{{task.ExecutionData.RoundCounter.ReroutesCounter}}</span>
          </div>
        </div>
      </div>
      <div class="box">
        <h4>Rounds counters</h4>
        <div class="area-container">
          <div class="line title">
            <span>LocID:</span>
            <span>LocID EMS:</span>
            <span>MFC sequence:</span>
            <span>PlcID:</span>
          </div>
          <div class="line data">
            <span>{{task.ExecutionData.CurrentLocation.LocId}}</span>
            <span>{{task.ExecutionData.CurrentLocation.LocidMonorail}}</span>
            <span>{{task.ExecutionData.CurrentLocation.MonorailSequence}}</span>
            <span>{{task.ExecutionData.CurrentLocation.Plcid}}</span><br>
          </div>
        </div>
      </div>
      <div class="box">
        <h4>Source</h4>
        <div class="area-container">
          <div class="line title">
            <span>LocID:</span>
            <span>LocID EMS:</span>
            <span>MFC sequence:</span>
            <span>PlcID:</span>
          </div>
          <div class="line data">
            <span>{{task.ExecutionData.SourceLoc.LocId}}</span>
            <span>{{task.ExecutionData.SourceLoc.LocidMonorail}}</span>
            <span>{{task.ExecutionData.SourceLoc.MonorailSequence}}</span>
            <span>{{task.ExecutionData.SourceLoc.Plcid}}</span><br>
          </div>
        </div>
      </div>
      <div class="box">
        <h4>Destination</h4>
        <div class="area-container">
          <div class="line title">
            <span>LocID:</span>
            <span>LocID EMS:</span>
            <span>MFC sequence:</span>
            <span>PlcID:</span>
          </div>
          <div class="line data">
            <span>{{task.ExecutionData.SourceLoc.LocId}}</span>
            <span>{{task.ExecutionData.SourceLoc.LocidMonorail}}</span>
            <span>{{task.ExecutionData.SourceLoc.MonorailSequence}}</span>
            <span>{{task.ExecutionData.SourceLoc.Plcid}}</span><br>
          </div>
        </div>
      </div>
      <div class="box">
        <h4>Extra info</h4>
        <div class="area-container">
          <div class="line title">
            <span>Type:</span>
            <span>Priority:</span>
            <span>Description:</span>
          </div>
          <div class="line data">
            <span>{{task.TaskType}}</span>
            <span>{{task.TaskPriority}}</span>
            <span>{{task.TaskDesc}}</span>
          </div>
        </div>
      </div>
      <div class="box drops">
        <h4>Failed Drop Locs</h4>
        <div
          class="title2"
          v-if="task.ExecutionData.FailedDropLocations === undefined
          || task.ExecutionData.FailedDropLocations.length === 0">
          None
        </div>
        <ul class="tasks">
          <li v-for="(failed, index) in task.ExecutionData.FailedDropLocations" :key="index">
            <label class="data2">{{failed}}</label>
          </li>
        </ul>
      </div>
    </div>
    <div class="button-container">
      <button @click="clearFailed" v-if="showClearFailedButton">Clear Failed Drops</button>
      <button @click="resetRounds" v-if="showResetButton">Reset Rounds</button>
      <button @click="routeTask" v-if="showNewDestinationButton">New destination</button>
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
      showNewDestinationButton() {
        return this.task.ExecutionData.ManualMode && this.task.ExecutionStatus === 'WaitForManualDestination';
      },
    },
    methods: {
      clearFailed() {
        this.$store.dispatch('clearFailed', this.task.TaskId)
          .then((result) => {
            if (result === true) {
              this.$toasted.show(`Failed drops for task ${this.task.TaskId} cleared`, {duration: 5000});
              this.$store.dispatch('getTasks');
            } else {
              this.$toasted.show(`Failed to clear failed drops for task ${this.task.TaskId}, Msg: ${result}`, {duration: 5000});
            }
          });
      },
      resetRounds() {
        this.$store.dispatch('resetRounds', this.task.TaskId)
          .then((result) => {
            if (result === true) {
              this.$toasted.show(`Rounds counter for ${this.task.TaskId} cleared and reactivated`, {duration: 5000});
              this.$store.dispatch('getTasks');
            } else {
              this.$toasted.show(`Failed to reset counters ${this.task.TaskId}, Msg: ${result}`, {duration: 5000});
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
    padding: 10px 14px;
    margin: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  .container {
    display: flex;
    justify-content: space-between;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    width: 130px;
    border-left: 1px #6E6E6E solid;
    margin-bottom: 8px;
  }

  .data-zone {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
  }

  .locations-info {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box {
    width: auto;
    border-radius: 6px;
    border-color: #6E6E6E;
    border-width: 1px;
    border-style: solid;
    margin: 8px;
    padding: 8px;
  }

  h4 {
    padding: 4px;
    margin: 4px;
    background-color: #6E6E6E;
    color: white;
    border-radius: 6px;
  }

  .drops {
    width: 160px;
  }

  .line {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    flex-direction: column;
  }

  .title {
    text-align: right;
    font-style: italic;
    color: #6E6E6E;
  }

  .data {
    text-align: left;
    margin-left: 8px;
    font-weight: bold;
    color: #6E6E6E;
    max-width: 240px;
  }

  .title2 {
    font-style: italic;
    color: #6E6E6E;
  }

  .data2 {
    margin-left: 8px;
    font-weight: bold;
    color: #6E6E6E;
    max-width: 240px;
  }

  .area-container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    margin: 16px;
  }
</style>
