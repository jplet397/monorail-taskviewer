<template>
  <div>
    <div class="container">
      <div class="title-bar" @click="collapseDetail"  v-bind:style="{ background: backgroundColor }">
        <div class="badge" v-bind:style="{ background: badgeColor }">
          <div>{{task.ExecutionData.TrolleyId}}</div>
        </div>
        <div class="area-container first" v-if="true">
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
        <div class="area-container second" v-if="true">
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
        <div class="area-container third" v-if="true">
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
        <div class="area-container fourth" v-if="true">
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
        <div class="side-buttons end">
          <button @click.stop="cancelTask">Cancel</button>
          <div class="manual-button-container">
            <button
              class="manual-button"
              @click.stop="setManualMode"
              v-if="!task.ExecutionData.ManualMode">
              MAN
            </button>
            <button
              class="manual-button"
              @click.stop="setAutomaticMode"
              v-if="task.ExecutionData.ManualMode">
              AUT
            </button>
          </div>
        </div>
      </div>
      <div v-if="open">
        <task-detail :task="task"></task-detail>
      </div>
    </div>
  </div>
</template>

<script>
  import TaskDetail from './TaskDetail.vue';

  export default {
    name: 'TaskItem',
    components: { TaskDetail },
    created() {
      this.colorCode();
    },
    beforeUpdate() {
      this.colorCode();
    },
    computed: {
      formatCreateDate() {
        function pad(s) {
          return (s < 10) ? `0${s}` : s;
        }

        const d = new Date(this.task.TaskCreated);
        const aDate = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
        const aHour = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
        return `${aDate} ${aHour}`;
      },
      formatUpdateDate() {
        function pad(s) {
          return (s < 10) ? `0${s}` : s;
        }

        const d = new Date(this.task.TaskLastUpdate);
        const aDate = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
        const aHour = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
        return `${aDate} ${aHour}`;
      },
      showResetButton() {
        return this.task.ExecutionStatus === 'ToManyReroutes';
      },
      showClearFailedButton() {
        return !(this.task.ExecutionData.FailedDropLocations === undefined
          || this.task.ExecutionData.FailedDropLocations.length === 0);
      },
    },
    methods: {
      cancelTask() {
        this.$store.dispatch('cancelTask', this.task.TaskId)
          .then((result) => {
            if (result === true) {
              this.$toasted.show(`Canceled task ${this.task.TaskId} successfully`, { duration: 5000 });
              this.$store.dispatch('getTasks');
            } else {
              this.$toasted.show(`Failed to cancel task ${this.task.TaskId}, Msg: ${result}`, { duration: 5000 });
            }
          });
      },
      setManualMode() {
        this.$store.dispatch('setToManual', this.task.TaskId)
          .then((result) => {
            if (result === true) {
              this.$toasted.show(`Manual mode for task ${this.task.TaskId} enabled`, { duration: 5000 });
              this.$store.dispatch('getTasks');
            } else {
              this.$toasted.show(`Failed to enable manual mode ${this.task.TaskId}, Msg: ${result}`, { duration: 5000 });
            }
          });
      },
      setAutomaticMode() {
        this.$store.dispatch('setToAutomatic', this.task.TaskId)
          .then((result) => {
            if (result === true) {
              this.$toasted.show(`Manual mode for task ${this.task.TaskId} disabled`), { duration: 5000 };
              this.$store.dispatch('getTasks');
            } else {
              this.$toasted.show(`Failed to disable manual mode ${this.task.TaskId}, Msg: ${result}`, { duration: 5000 });
            }
          });
      },
      checkToOld() {
        const today = new Date();
        const created = new Date(this.task.TaskCreated);
        const diffMs = (today - created);
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        return diffMins > 20;
      },
      colorCode() {
        if (this.task.TaskStatus === 'InError') this.badgeColor = '#FF000F';
        else if (this.checkToOld()) this.badgeColor = '#ff7c10';
        else if (this.task.ExecutionData.TrolleyId === 0) this.badgeColor = '#4a54ff';
        else this.badgeColor = '#34ff47';

        if (this.task.ExecutionData.ManualMode) this.backgroundColor = '#FFE739';
        else this.backgroundColor = '#DCDCDC';
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
        backgroundColor: 'White',
      };
    },
  };
</script>

<style scoped>
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

  button:hover {
    background-color: #45a049;
  }

  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    height: 50%;
    width: 3em;
  }

  .manual-button {
    height: 100%;
  }

  .manual-button-container {
    height: 50%;
  }

  .side-buttons {
    width: 3em;
    align-items: flex-end;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

  .first {
    width: 232px;
  }

  .second {
    width: 200px;
  }

  .fourth {
    flex-grow: 1;
  }
</style>
