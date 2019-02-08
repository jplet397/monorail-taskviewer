<template>
  <div class="container">
    <div>To create a new task, the pallet must already exist in the database</div>
    <br>
    <br>
    <div class="fullForm">
      <div class="float">
        <label class="switch">
          <input type="checkbox" checked v-model="basicMode">
          <span class="slider round"></span>
        </label>
        <label class="label">Basic</label>
      </div>
      <br>
       <div class="form">
         <form v-if="!basicMode" id="form" @submit.prevent="pushTask">
             <label>Pallet ID:
               <span class="required">*</span>
               <input type="text" name="palletId" v-model="payload.pallet">
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
           <a class="cancel-button" @click="cancel">Cancel</a>
         </form>
         <form v-if="basicMode" @submit.prevent="pushBasicTask">
           <label>Pallet ID:
             <span class="required">*</span>
             <input type="text" name="palletId" v-model="payload.pallet">
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
           <br>
           <input type="submit" value="Submit">
           <a class="cancel-button" @click="cancel">Cancel</a>
         </form>
       </div>
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
    },
    data() {
      return {
        basicMode: true,
        payload: {
          pallet: '',
          trolley: '',
          location: '',
          source: '',
          destination: '',
          taskStatus: '',
          executionStatus: '',
        },
      };
    },
    methods: {
      cancel() {
        this.$router.push('/');
      },
      pushTask() {
        this.$store.dispatch('pushTask', this.payload)
          .then((result) => {
            if (result === true) {
              this.$toasted.show(`Task for pallet ${this.payload.pallet} created successfully`, { duration: 5000 });
              this.$router.push('/');
            } else {
              this.$toasted.show(`Failed to create new task for pallet ${this.payload.pallet}, Msg: ${result}`, { duration: 5000 });
            }
          });
      },
      pushBasicTask() {
        this.payload.executionStatus = 'ToRequestTrolley';
        this.payload.taskStatus = 'Ready';
        this.payload.trolley = 0;
        this.payload.location = this.payload.source;

        this.$store.dispatch('pushTask', this.payload)
          .then((result) => {
            if (result === true) {
              this.$toasted.show(`Task for pallet ${this.payload.pallet} created successfully`, { duration: 5000 });
              this.$router.push('/');
            } else {
              this.$toasted.show(`Failed to create new task for pallet ${this.payload.pallet}, Msg: ${result}`, { duration: 5000 });
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
     /*background-color: #4CAF50;*/
     background-color: #FF000F;
     color: white;
     padding: 12px 20px;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     float: right;
     width: 88px;
     height: 40px;
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
     width:88px;
     height: 40px;
   }

   .cancel-button:hover {
     background-color: #666666;
   }

   .fullForm {
     width: 600px;
     display: inline-block;
   }

   .form {
     display: inline-block;
     border-radius: 5px;
     background-color: #DCDCDC;
     padding: 20px;
     width: 100%;
   }

   .required {
     color:red;
     font-weight:normal;
   }

  .container {
    padding-top: 80px;
  }

  .label {
    width: 96px;
    height: 34px;
    font-size: 30px;
    font-weight: bold;
    padding: 2px;
  }

  .float {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-content: flex-end;
  }
   /* The switch - the box around the slider */
   .switch {
     position: relative;
     display: inline-block;
     width: 60px;
     height: 34px;
   }

   /* Hide default HTML checkbox */
   .switch input {
     opacity: 0;
     width: 0;
     height: 0;
   }

   /* The slider */
   .slider {
     position: absolute;
     cursor: pointer;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background-color: #DCDCDC;
     -webkit-transition: .4s;
     transition: .4s;
   }

   .slider:before {
     position: absolute;
     content: "";
     height: 26px;
     width: 26px;
     left: 4px;
     bottom: 4px;
     background-color: white;
     -webkit-transition: .4s;
     transition: .4s;
   }

   input:checked + .slider {
     background-color: #FF000F;
   }

   input:focus + .slider {
     box-shadow: 0 0 1px #DCDCDC;
   }

   input:checked + .slider:before {
     -webkit-transform: translateX(26px);
     -ms-transform: translateX(26px);
     transform: translateX(26px);
   }

   /* Rounded sliders */
   .slider.round {
     border-radius: 34px;
   }

   .slider.round:before {
     border-radius: 50%;
   }
</style>
