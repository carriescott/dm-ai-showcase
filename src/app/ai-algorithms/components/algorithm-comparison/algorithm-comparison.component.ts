import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AgentsApi} from '../../services/ai-algorithms.service';
import {Location} from '@angular/common';
import { Subscription } from 'rxjs';
import {Agent} from '../../models/agent.interface';

@Component({
  selector: 'app-algorithm-comparison',
  templateUrl: './algorithm-comparison.component.html',
  styleUrls: ['./algorithm-comparison.component.scss']
})
export class AlgorithmComparisonComponent implements OnInit, OnDestroy {

  subAgentArray: Subscription;
  subscriptionList = new Subscription();

  agent: Agent;
  memory = [];
  memoryAverage;
  logic = [];
  logicAverage;
  planning = [];
  planningAverage;


  agentArray;
  comparisonArray;

  testArray = [];


  // graph options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Task';
  showYAxisLabel = true;
  yAxisLabel = 'Average Score';
  legendTitle = 'AI';
  view: any[] = [600];
  colorScheme = {
    domain: ['#0053d6', '#ff4081']
  };

  constructor(private route: ActivatedRoute,
              private agentsApi: AgentsApi,
              private location: Location) { }

  ngOnInit(): void {
    this.getAgentArray();
  }

  getAgentArray() {
    this.subAgentArray =
      this.agentsApi.agentArray.subscribe
      (data => {
        if (data !== null) {
          this.agentArray = data;
          this.buildTest(this.agentArray);
        }
      });
    this.subscriptionList.add(this.subAgentArray);
  }

  buildTest(test){
    for (const item of test) {
      const result = this.buildStatsObj(item);
      this.testArray.push(result);
    }
    this.buildComparisonObj(this.testArray);
  }

  buildComparisonObj(data) {
    this.comparisonArray = [
      {
        name: 'Memory',
        series: [
          {
            name: data[0].name,
            value: data[0].memory
          },
          {
            name: data[1].name,
            value: data[1].memory
          }
        ]
      },

      {
        name: 'Logic',
        series: [
          {
            name: data[0].name,
            value: data[0].logic
          },
          {
            name: data[1].name,
            value: data[1].logic
          }
        ]
      },
      {
        name: 'Planning',
        series: [
          {
            name: data[0].name,
            value: data[0].planning
          },
          {
            name: data[1].name,
            value: data[1].memory
          }
        ]
      }
    ];
  }


  buildStatsObj(item) {
    this.emptyStatsObj();
    for (const task of item.tasks) {
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
    const result = this.buildAvgObj(item);
    return result;
  }

  buildAvgObj(item) {
    this.memoryAverage = this.averageObj(this.memory, this.memory.length);
    this.logicAverage = this.averageObj(this.logic, this.logic.length);
    this.planningAverage = this.averageObj(this.planning, this.planning.length);
    const averages = {
      name: item.name,
      memory: this.memoryAverage,
      logic: this.logicAverage,
      planning: this.planningAverage
    };
    return averages;
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

  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }

}
