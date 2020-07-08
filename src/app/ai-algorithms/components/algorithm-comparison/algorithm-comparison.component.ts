import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AgentsApi} from '../../services/ai-algorithms.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-algorithm-comparison',
  templateUrl: './algorithm-comparison.component.html',
  styleUrls: ['./algorithm-comparison.component.scss']
})
export class AlgorithmComparisonComponent implements OnInit {

  agent;
  memory = [];
  memoryAverage;
  logic = [];
  logicAverage;
  planning = [];
  planningAverage;

  constructor(private route: ActivatedRoute,
              private agentsApi: AgentsApi,
              private location: Location) { }

  ngOnInit(): void {
    // const array = history.state.data;
    const AI1 = +this.route.snapshot.paramMap.get('AI1');
    console.log(AI1);
    this.getAgent(AI1);
    const AI2 = +this.route.snapshot.paramMap.get('AI2');
    console.log(AI2);
    // this.getAgent(AI1);
    // const optionTwo = +this.route.snapshot.paramMap.get('optionTwo');
    // console.log(optionTwo);
  }


  getAgent(id) {
    this.agentsApi.getAgent(id)
      .then(response => {
        this.agent = response;
        console.log('agent', this.agent);
        this.buildStatsObj();
      }).catch(error => {
      console.log('Looks like there was a problem: \n', error);
    });
  }


  buildStatsObj() {
    this.emptyStatsObj();
    for (const task of this.agent.tasks) {
      switch (task.category) {
        case 'memory':
          this.memory.push(task.score);
          break;
        case 'logic':
          this.logic.push(task.score);
          break;
        case 'planning':
          this.planning.push(task.score);
          break;
      }
    }
    this.buildAvgObj();
  }

  buildAvgObj() {
    this.memoryAverage = this.averageObj(this.memory, this.memory.length);
    this.logicAverage = this.averageObj(this.logic, this.logic.length);
    this.planningAverage = this.averageObj(this.planning, this.planning.length);
    console.log(this.memoryAverage, this.logicAverage, this.planningAverage);
  }

  averageObj(item, length) {
    const total = item.reduce((a, b) => a + b, 0);
    const average = total / length;
    return average;
  }

  emptyStatsObj(){
    this.memory = [];
    this.logic = [];
    this.planning = [];
  }

  goBack(): void {
    this.location.back();
  }

}
