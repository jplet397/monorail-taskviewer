<template>
  <div class="container">
    <div>Make sure to only send valid data</div>
    <div>Do not use spaces</div>
    <br>

    <div class="form">
      <form id="form" @submit.prevent="updateTask">
        <label>Task ID:
          <span class="required">*</span>
          <input type="text" name="taskId" readonly v-model="payload.task">
        </label>
        <br>
        <label>Trolley ID:
          <span class="required">*</span>
          <input type="text" name="trolleyId" v-model="payload.trolley">
        </label>
        <br>
        <label>Location:
          <span class="required">*</span>
          <input type="text" name="location" v-model="payload.location">
        </label>
        <br>
        <label>Source:
          <span class="required">*</span>
          <input type="text" name="source" v-model="payload.source">
        </label>
        <br>
        <label>Destination:
          <span class="required">*</span>
          <input type="text" name="destination" v-model="payload.destination">
        </label>
        <br>
        <label v-if="showTaskStates">Task Status:
          <span class="required">*</span>
          <select v-model="payload.taskStatus">
            <option v-for="(taskState, index) in getTaskStates"
                    :key="index"
                    :value="taskState"
            >
              {{ taskState }}
            </option>
          </select>
        </label>
        <br>
        <label v-if="showExecStates">Execution Status:
          <span class="required">*</span>
          <select v-model="payload.executionStatus">
            <option v-for="(executionState, index) in getExecutionStates"
                    :key="index"
                    :value="executionState"
            >
              {{ executionState }}
            </option>
          </select>
        </label>
        <br><br>
        <input type="submit" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddTask',
    created() {
      this.$store.dispatch('getTaskStates');
    },
    mounted() {
      this.$store.dispatch('getExecutionStates');
    },
    props: {
      id: {
        type: [Number, String],
        validator(value) {
          return Number.isInteger(Number(value));
        },
      },
    },
    data() {
      return {
        payload: {
          task: this.getTask.TaskId,
          trolley: this.getTask.ObjectData.TrolleyId,
          location: this.getTask.ExecutionData.CurrentLocation.LocId,
          source: this.getTask.ExecutionData.SourceLoc.LocId,
          destination: this.getTask.ExecutionData.DestinationLoc.LocId,
          taskStatus: this.getTask.TaskStatus,
          executionStatus: this.getTask.ExecutionStatus,
        },
      };
    },
    computed: {
      showExecStates() {
        const states = this.$store.state.executionStates;
        return states.length !== 0;
      },
      showTaskStates() {
        const states = this.$store.state.taskStates;
        return states.length !== 0;
      },
      getExecutionStates() {
        return this.$store.state.executionStates;
      },
      getTaskStates() {
        return this.$store.state.taskStates;
      },
      getTask() {
        const tasks = this.$store.state.taskStates;
        return tasks.find(x => x.id === this.taskId);
      },
    },
    methods: {
      updateTheTask() {
        console.log('payload:', this.payload);
        this.$store.dispatch('pushTask', this.payload);
      },
      updateTask() {
        this.updateTheTask()
          .then(() => this.$toasted.show(`Task for pallet id ${this.payload.pallet} created successfully`))
          .then(() => this.$router.push('/'));
      },
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  label {
    width: 100%;
    padding: 12px 12px 12px 0;
    display: inline-block;
  }

  input[type=text], select, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }

  input[type=submit] {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
  }

  input[type=submit]:hover {
    background-color: #45a049;
  }

  .form {
    width: 600px;
    display: inline-block;
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  }

  .required{
    color:red;
    font-weight:normal;
  }
</style>
