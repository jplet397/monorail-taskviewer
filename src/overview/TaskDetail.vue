<template>
  <div class="container">
    <div class="information">
      <label>Type:</label> <span>{{task.TaskType}}</span><br>
      <label>Priority:</label> <span>{{task.TaskPriority}}</span><br>
      <label>Description:</label> <span>{{task.TaskDesc}}</span><br>
    </div><br>
    <div class="object-data">
      <label>Pallet Type:</label> <span>{{task.ObjectData.PalletType}}</span><br>
      PalletRounds Hbw:<span>{{task.ExecutionData.RoundCounter.DecisionPointHbw}}</span><br>
      PalletRounds Buf:<span>{{task.ExecutionData.RoundCounter.DecisionPointBuffer}}</span>
      <br>
      IQR Counter:<span>{{task.ExecutionData.RoundCounter.ReroutesCounter}}</span>
      <br>
    </div><br>
    <div class="location">
      <h4>Location</h4>
      <label>LocID:</label> <span>{{task.ExecutionData.CurrentLocation.LocId}}</span><br>
      LocID Monorail:<span>{{task.ExecutionData.CurrentLocation.LocidMonorail}}</span><br>
      Sequence: <span>{{task.ExecutionData.CurrentLocation.MonorailSequence}}</span><br>
      <label>PlcID:</label> <span>{{task.ExecutionData.CurrentLocation.Plcid}}</span><br>
    </div><br>
    <div class="source">
      <h4>Source</h4>
      <label>LocID:</label> <span>{{task.ExecutionData.SourceLoc.LocId}}</span><br>
      LocID Monorail: <span>{{task.ExecutionData.SourceLoc.LocidMonorail}}</span><br>
      Sequence: <span>{{task.ExecutionData.SourceLoc.MonorailSequence}}</span><br>
      <label>PlcID:</label> <span>{{task.ExecutionData.SourceLoc.Plcid}}</span><br>
    </div><br>
    <div class="destination">
      <h4>Destination</h4>
      <label>LocID:</label> <span>{{task.ExecutionData.DestinationLoc.LocId}}</span><br>
      LocID Monorail: <span>{{task.ExecutionData.DestinationLoc.LocidMonorail}}</span><br>
      Sequence: <span>{{task.ExecutionData.DestinationLoc.MonorailSequence}}</span><br>
      <label>PlcID:</label> <span>{{task.ExecutionData.DestinationLoc.Plcid}}</span><br>
    </div><br>
    <div >
      <ul class="tasks">
        <li v-for="(failed, index) in task.ExecutionData.FailedDropLocations" :key="index">
          <label>{{failed}}</label>
        </li>
      </ul>
    </div>
    <button @click="clearFailed" v-if="showClearFailedButton">Clear Failed Drops</button>
    <button @click="resetRounds" v-if="showResetButton">Reset Rounds</button>
    <br>
    <div>
      <button @click="setManualMode" v-if="!task.ExecutionData.ManualMode">To Manual Mode</button>
      <button @click="routeTask" v-if="task.ExecutionData.ManualMode">New destination</button>
      <button @click="setAutomaticMode" v-if="task.ExecutionData.ManualMode">To Automatic Mode</button>
    </div>
    <br>
    <div>
      <button @click="updateTask">Full Update</button>
      <button @click="cancelTask">Cancel</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TaskDetail"
    }
</script>

<style scoped>

</style>
