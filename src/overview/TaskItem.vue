<template>
  <div>
    <div class="container">
      <div class="title-bar" @click="collapseDetail">
        <div  class="badge" v-bind:style="{ background: badgeColor }">
          <div>{{task.ExecutionData.TrolleyId}}</div>
        </div>
        <div class="area-container" v-if="true">
          <div class="line title">
            <span>Task Id:</span>
            <span>Pallet Id:</span>
            <span>SSCC:</span>
          </div>
          <div class="line data">
            <span>{{task.TaskId}}</span>
            <span>{{task.ObjectData.PalletId}}</span>
            <span>{{task.ObjectData.PalletLabel}}</span>
          </div>
        </div>
        <div class="area-container" v-if="true">
        <div class="line title">
          <span>Location:</span>
          <span>Source:</span>
          <span>Destination:</span>
        </div>
        <div class="line data">
          <span>{{task.ExecutionData.CurrentLocation.LocId}}</span>
          <span>{{task.ExecutionData.SourceLoc.LocId}}</span>
          <span>{{task.ExecutionData.DestinationLoc.LocId}}</span>
        </div>
        </div>
        <div class="area-container" v-if="true">
          <div class="line title">
            <span>Task status:</span>
            <span>Exec status:</span>
            <span>Error Code:</span>
          </div>
          <div class="line data">
            <span>{{task.TaskStatus}}</span>
            <span>{{task.ExecutionStatus}}</span>
            <span>{{task.TaskError}}</span>
          </div>
        </div>
        <div class="area-container" v-if="true">
          <div class="line title">
            <span>Created:</span>
            <span>Updated:</span>
            <span>Error Desc:</span>
          </div>
          <div class="line data">
            <span>{{formatCreateDate}}</span>
            <span>{{formatUpdateDate}}</span>
            <span>{{task.TaskErrorDesc}}</span>
          </div>
        </div>
        <!--<span class="standard badge">{{index + 1}}</span>-->
      </div>
      <div v-if="open">
        <div class="information">
            <label>Type:</label> <span>{{task.TaskType}}</span><br>
            <label>Priority:</label> <span>{{task.TaskPriority}}</span><br>
            <label>Description:</label> <span>{{task.TaskDesc}}</span><br>
          </div><br>
          <div class="object-data">
            <label>Pallet Type:</label> <span>{{task.ObjectData.PalletType}}</span><br>
          </div><br>
            <div class="location">
              <label>LocID:</label> <span>{{task.ExecutionData.CurrentLocation.LocId}}</span><br>
              LocID Monorail:<span>{{task.ExecutionData.CurrentLocation.LocidMonorail}}</span><br>
              Sequence: <span>{{task.ExecutionData.CurrentLocation.MonorailSequence}}</span><br>
              <label>PlcID:</label> <span>{{task.ExecutionData.CurrentLocation.Plcid}}</span><br>
            </div><br>
            <div class="source">
              <label>LocID:</label> <span>{{task.ExecutionData.SourceLoc.LocId}}</span><br>
              LocID Monorail: <span>{{task.ExecutionData.SourceLoc.LocidMonorail}}</span><br>
             Sequence: <span>{{task.ExecutionData.SourceLoc.MonorailSequence}}</span><br>
              <label>PlcID:</label> <span>{{task.ExecutionData.SourceLoc.Plcid}}</span><br>
            </div><br>
            <div class="destination">
              <label>LocID:</label> <span>{{task.ExecutionData.DestinationLoc.LocId}}</span><br>
              LocID Monorail: <span>{{task.ExecutionData.DestinationLoc.LocidMonorail}}</span><br>
              Sequence: <span>{{task.ExecutionData.DestinationLoc.MonorailSequence}}</span><br>
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
          <button @click="updateTask">Update</button>
          <button @click="cancelTask">Cancel</button>
          <button @click="clearFailed">Clear Failed Drops</button>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'TaskItem',
    created() {
      this.colorCode();
    },
    beforeUpdate() {
      this.colorCode();
    },
    computed: {
      formatCreateDate() {
        function pad(s) { return (s < 10) ? `0${s}` : s; }
        const d = new Date(this.task.TaskCreated);
        const aDate = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
        const aHour = [pad(d.getHours()), pad(d.getSeconds()), pad(d.getMilliseconds())].join(':');
        return `${aDate} ${aHour}`;
      },
      formatUpdateDate() {
        function pad(s) { return (s < 10) ? `0${s}` : s; }
        const d = new Date(this.task.TaskLastUpdate);
        const aDate = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
        const aHour = [pad(d.getHours()), pad(d.getSeconds()), pad(d.getMilliseconds())].join(':');
        return `${aDate} ${aHour}`;
      },
    },
    methods: {
      checkToOld() {
        const today = new Date();
        const created = new Date(this.task.TaskCreated);
        const diffMs = (today - created); // milliseconds between now & Christmas
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        return diffMins > 20;
      },
      colorCode() {
        if (this.task.TaskError !== '' && this.task.TaskError !== 0 && this.task.TaskError !== null) this.badgeColor = '#FF000F';
        else if (this.checkToOld()) this.badgeColor = '#ff7c10';
        else if (this.task.ExecutionData.TrolleyId === 0) this.badgeColor = '#4a54ff';
        else this.badgeColor = '#34ff47';
      },
      cancelTask() {
        this.$store.dispatch('cancelTask', this.task.TaskId)
          .then((result) => {
            if (result === true) {
              this.$toasted.show(`Canceled task ${this.task.TaskId} successfully`);
              this.$store.dispatch('getTasks');
            } else {
              this.$toasted.show(`Failed to cancel task ${this.task.TaskId}, Msg: ${result}`);
            }
          });
      },
      clearFailed() {
        this.$store.dispatch('clearFailed', this.task.TaskId)
          .then((result) => {
            if (result === true) {
              this.$toasted.show(`Failed drops for task ${this.task.TaskId} cleared`);
            } else {
              this.$toasted.show(`Failed to clear failed drops for task ${this.task.TaskId}, Msg: ${result}`);
            }
          });
      },
      updateTask() {
        this.$router.push(`/update/${this.task.TaskId}`);
      },
      collapseDetail() {
        if (this.index + 1 !== 0) {
          this.open = !this.open;
        }
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
        badgeColor: 'white',
      };
    },
  };
</script>

<style scoped>
  badge-error {
    background-color: #FF000F;;
  }

  badge-warning {
    background-color: #ff7c10;
  }

  badge-normal{
    background-color: #34ff47;
  }

  badge-waiting{
    background-color: #4a54ff;
  }

  .badge {
    text-align: center;
    width: 4%;
    height: 30%;
    color: white;
    border-radius: 2px;
    border-right: 2px solid #6E6E6E;
    border-bottom: 2px solid #6E6E6E;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    flex-direction: column;
  }

  .information {
    background-color: #DCDCDC;
  }

  .area-container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    margin: 16px;
  }

  .line {
    display: flex;
    flex-wrap: nowrap;
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
    /*background-color: #DCDCDC;*/
    background-color: #F0F0F0;
    height: 5em;
    border-radius: 4px;
    border-color: #6E6E6E;
    border-width: 2px;
    border-style: solid;
  }

  .container {
    background-color: #DCDCDC;
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
</style>
