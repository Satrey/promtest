<template>
  <v-main>
    <v-container>
      <v-btn @click="readTicketsArray" v-show="false">Read Tickets Array</v-btn>
      <v-btn @click="takeTicket" class="mr-2">Выбрать билет</v-btn>
      <v-btn @click="showQuestions" class="mr-2">Начать тест</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="getAnswers" v-show="false">Show Answers</v-btn>
    </v-container>
    <v-container>
      <v-card v-if="ticketNumber" class="pa-4">
        <h3 class="text-center primary--text">
          Билет номер : {{ ticketNumber }}
        </h3>
      </v-card>
      <v-card v-else class="pa-4"
        ><h3 class="text-center">Пожалуйста, возьмите билет!</h3></v-card
      >
    </v-container>
    <v-container>
      <v-card
        v-for="question in questions"
        :key="question.id"
        v-show="!showResult && question.id == page"
        class="mt-4 pa-6 elevation-4"
      >
        <v-card-title class="pb-2">
          <em><strong class="primary--text mr-4">{{ question.title }}</strong></em>
          <br />
          <strong class="text-start">{{ question.question }}</strong>
        </v-card-title>
        <hr />
        <br />
        <v-card-text>
          <div
            v-for="answers in question.ansvers " :key='answers.id'
            class="d-flex align-center selected pl-4"
          >
            <v-radio-group v-model="radioGroup">
              <v-radio
                :value="answers.id"
                color="primary"
                @click="setAnswer(answers.correct)"
              ></v-radio>
            </v-radio-group>
            <h3 class="ml-4">{{ answers.ansver }}</h3>
          </div>
          <br />
        </v-card-text>
        <v-container class="d-flex">
          <v-btn
            class="warning"
            v-if="!testComplete"
            @click="checkAnswer(answers.id)"
            >Ответить</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn class="warning" @click="checkResult" v-if="testComplete"
            >Завершить тест</v-btn
          >
        </v-container>
      </v-card>
    </v-container>
    <v-spacer></v-spacer>
    <div class="text-center">
      <v-pagination
        v-show="!showResult"
        class="elevation=10"
        v-model="page"
        :length="questions.length"
        circle
      ></v-pagination>
    </div>
    <v-container>
      <v-card class="text-center pa-10" v-show="showResult">
        <h1>Допущено ошибок : {{ errorCount }}</h1>
        <h2 v-if="errorCount > 2" class="red--text">Тест не сдан!</h2>
        <h2 v-else class="green--text">Тест сдан!</h2>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    drawer: false,
    tickets: [],
    questions: [],
    answers: [],
    ticketNumber: 0,
    page: 1,
    radioGroup: null,
    errorCount: 0,
    showResult: false,
    ticketTaked: false,
    currentAnswer: false,
    testComplete: false,
  }),

  computed: {},

  methods: {
    readTicketsArray: function () {
      console.log("Количество билетов : ", this.tickets.length);
      return this.tickets.length;
    },
    takeTicket: function () {
      let maxTicket = this.readTicketsArray();
      console.log(maxTicket);
      let min = Math.ceil(1);
      let max = Math.floor(maxTicket);
      this.ticketNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log("Вы вытянули билет номер : ", this.ticketNumber);
      this.ticketTaked = true;
      this.errorCount = 0;
      this.page = 1;
      this.radioGroup = null;
      // Далее вывод вопроса и вариантов ответов к нему...
    },
    showQuestions: function () {
      //console.log('Show Questions : ', this.questions);
      this.showResult = false;
      this.testComplete = false;
      this.questions = this.tickets[this.ticketNumber - 1].questions;
      //console.log(this.questions);
    },
    setAnswer: function (val) {
      console.log("Recieved value : ", val);
      this.currentAnswer = val;
    },

    checkAnswer: function () {
      if (this.currentAnswer) {
        console.log("Правильный ответ!");
        console.log(this.currentAnswer);
        if (this.questions.length > this.page) {
          this.page += 1;
          this.radioGroup = null;
        } else {
          console.log("Test Complete");
          this.testComplete = true;
          this.currentAnswer = null;
        }
      } else {
        console.log(
          "Ответ не верный, рекомендуем вам повторить учебный маетериал!"
        );
        console.log(this.currentAnswer);
        this.errorCount += 1;
        if (this.questions.length > this.page) {
          this.page += 1;
          this.radioGroup = null;
        } else {
          console.log("Test Complete");
          this.testComplete = true;
          this.currentAnswer = null;
        }
      }
    },
    getAnswers: function () {
      this.questions = this.tickets[this.ticketNumber - 1].questions;
      for (let i = 0; i < this.questions.length; i++) {
        const answers = this.questions[i].ansvers;
        const question =
          this.questions[i].title + " " + this.questions[i].question;
        console.log(question);
        console.log(".");
        //console.log('Количество вариантов ответов к вопросу : ',answers);
        for (let i = 0; i < answers.length; i++) {
          const answer = answers[i];
          console.log(
            "Ответ ",
            answer.id,
            answer.ansver,
            "Правильный ответ : ",
            answer.correct
          );
        }
        console.log(".");
      }
    },
    checkResult: function () {
      this.showResult = true;
    },
  },

  created() {
    console.log("created hook is active");
    axios
      .get("./wahtickets.json")
      .then((response) => {
        this.tickets = response.data.tickets;
        console.log("Вывод билетов для тестирования : ", this.tickets);
      })
      .catch((error) => {
        console.log("error", error);
      });
  },
};
</script>
