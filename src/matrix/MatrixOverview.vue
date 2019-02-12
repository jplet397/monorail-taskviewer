<template>
    <div class="container">
    <button :click="resetTests"> Reset Test</button>
      <br>
      <br>
    <div class="fullForm">
      <div class="form">
        <form id="form" @submit.prevent="startTest">
          <label>Number of tasks:
            <span class="required">*</span>
            <input type="text" name="count" v-model="payload.count">
          </label>
          <br>
          <label>Types:
            <span class="required">*</span>
            <select v-model="payload.type">
              <option v-for="(matrixType, index) in matrixTypes"
                      :key="index"
                      :value="matrixType">
                {{ matrixType }}
              </option>
            </select>
          </label>

          <br><br>
          <input type="submit" value="Submit">
          <a class="cancel-button" @click="cancel">Cancel</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MatrixOverview',
    data() {
      return {
        matrixTypes: ['INVOER', 'UITVOER', 'MIXED'],
        payload: {
          count: '',
          type: '',
          active: false,
        },
      };
    },
    methods: {
      startTest() {
        this.payload.active = true;
        this.$store.dispatch('matrixCommand', this.payload)
          .then((result) => {
            if (result === true) {
              this.$toasted.show(`New matrix test started: ${this.payload.type} #${this.payload.count}`, { duration: 5000 });
              this.$store.dispatch('getTasks');
            } else {
              this.$toasted.show(`Failed to start matrix test, Msg: ${result}`, { duration: 5000 });
            }
          });
      },
      resetTests() {
        this.payload.active = false;
        this.payload.count = 0;
        this.$store.dispatch('matrixCommand', this.payload)
          .then((result) => {
            if (result === true) {
              this.$toasted.show('Matrix test is been reset');
              this.$store.dispatch('getTasks');
            } else {
              this.$toasted.show(`Failed to reset matrix test, Msg: ${result}`, { duration: 5000 });
            }
          });
      },
      cancel() {
        this.$router.push('/');
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
    width: 88px;
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
    color: red;
    font-weight: normal;
  }

  .container {
    padding-top: 80px;
  }

  button:hover {
    background-color: #45a049;
  }

  button {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
