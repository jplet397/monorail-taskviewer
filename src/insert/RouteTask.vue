<template>
  <div class="container">
    <br>
    <div class="form">
      <form id="form" @submit.prevent="updateTask">
        <label>Task ID:
          <span class="required">*</span>
          <input type="text" name="taskId" disabled="disabled" readonly v-model="payload.task">
        </label>
        <br>
        <label>Destination:
          <span class="required">*</span>
          <input type="text" name="destination" v-model="payload.destination">
        </label>
        <br>
        <br>
        <input type="submit" value="Submit">
        <a class="cancel-button" @click="cancel">Cancel</a>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RouteTask',
    created() {
      this.getPayLoad();
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
          task: '',
          destination: '',
        },
      };
    },
    methods: {
      cancel() {
        this.$router.push('/');
      },
      updateTask() {
        this.$store.dispatch('routeTask', this.payload)
          .then((result) => {
            if (result === true) {
              this.$toasted.show(`Task ${this.payload.task} routed successfully`, { duration: 5000 });
              this.$router.push('/');
            } else {
              this.$toasted.show(`Failed to route Task ${this.payload.task}, Msg: ${result}`, { duration: 5000 });
            }
          });
      },
      getPayLoad() {
        const anId = this.$route.params.taskId;
        this.$store.dispatch('getTasksById', anId)
          .then((task) => {
            if (task !== false) {
              this.payload.task = task.TaskId;
              this.payload.destination = task.DestinationLoc.LocId;
            }
          });
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
    background-color: #FF000F;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
  }

  input[type=submit]:hover {
    background-color: #e6000f;
  }

  .cancel-button {
    background-color: #6E6E6E;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
    margin-right: 16px;
  }

  .cancel-button:hover {
    background-color: #666666;
  }

  .form {
    width: 600px;
    display: inline-block;
    border-radius: 5px;
    background-color: #DCDCDC;
    padding: 20px;
  }

  .required{
    color:red;
    font-weight:normal;
  }

  .container {
    padding-top: 80px;
  }
</style>
