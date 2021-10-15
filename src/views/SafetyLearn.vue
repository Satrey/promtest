<template>
    <v-main>
        <v-container>
            <v-expansion-panels>
                <v-expansion-panel
                    v-for="ticket in tickets"
                    :key="ticket.id"
                >
                <v-expansion-panel-header>
                    {{ticket.title}}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-expansion-panels
                        v-model="panel"
                        multiple
                    >
                        <v-expansion-panel
                            v-for="question in ticket.questions"
                            :key="question.id"
                        >
                        <v-expansion-panel-header>
                            {{question.title + ':'}}<em><strong class="ml-2">{{question.question}}</strong></em>
                        </v-expansion-panel-header>
                            <v-expansion-panel-content 
                                class="pa-2 ma-3 elevation-2 rounded" 
                                v-for="answer in question.ansvers" :key="answer.id" :color="answer.correct ? '#AED581' : '#FFCDD2'"
                            >
                                <p>{{answer.ansver}}</p>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
    </v-main>
</template>

<script>

import axios from 'axios'

export default {
    data: () => {
        return {
            test: 'Work on height Learning',
            tickets: [],
            panel  : [ 0,1 ],
        };
    },

    created() {
        console.log("created hook is active");
        axios
        .get("./safetytickets.json")
        .then((response) => {
            this.tickets = response.data.tickets;
            console.log("Вывод билетов в консоль для Обучения по дисциплине 'Охрана труда': ", this.tickets);
        })
        .catch((error) => {
            console.log("error", error);
        });
    },
}
</script>

<style scoped>
    .v-expansion-panel-content {
        vertical-align: middle;
    }
</style>