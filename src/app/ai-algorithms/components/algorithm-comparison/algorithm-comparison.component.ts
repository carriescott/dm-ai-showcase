import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AgentsApi} from '../../services/ai-algorithms.service';
import {Location} from '@angular/common';
import { Subscription } from 'rxjs';
import {Agent} from '../../models/agent.interface';
import {calAverage} from '../../services/helper';

@Component({
  selector: 'app-algorithm-comparison',
  templateUrl: './algorithm-comparison.component.html',
  styleUrls: ['./algorithm-comparison.component.scss']
})
export class AlgorithmComparisonComponent implements OnInit, OnDestroy {

  subAgentArray: Subscription;
  subscriptionList = new Subscription();

  agent: Agent;
  agentArray;
  comparisonArray;
  averagesArray = [];

  memoryScores = [];
  memoryAverage;

  logicScores = [];
  logicAverage;

  planningScores = [];
  planningAverage;


  /*** Set graph options */
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'category';
  showYAxisLabel = true;
  yAxisLabel = 'average score';
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

  /**** Subscribe to AI agent comparison array*/
  getAgentArray() {
    this.subAgentArray =
      this.agentsApi.agentArray.subscribe
      (data => {
        if (data !== null) {
          this.agentArray = data;
          this.buildAveragesArray(this.agentArray);
        }
      });
    this.subscriptionList.add(this.subAgentArray);
  }

  /**** Build an array of average objects,
   * one object per AI agent */
  buildAveragesArray(agents){
    for (const agent of agents) {
      const result = this.buildCategoryScoreArrays(agent);
      this.averagesArray.push(result);
    }
    this.buildComparisonArray(this.averagesArray);
  }

  /**** Format averagesArrays to create a data set
   *  which can be used to generate the comparison graph */
  buildComparisonArray(data) {
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

  /**** Build an array for each of the task categories to
   * hold all the scores in that category */
  buildCategoryScoreArrays(item) {
    this.emptyArrays();
    for (const task of item.tasks) {
      switch (task.category) {
        case 'memory':
          this.memoryScores.push(task.score);
          break;
        case 'logic':
          this.logicScores.push(task.score);
          break;
        case 'planning':
          this.planningScores.push(task.score);
          break;
      }
    }
    const result = this.buildAvgObj(item);
    return result;
  }

  /**** Build an object of category task score averages */
  buildAvgObj(item) {
    this.memoryAverage = calAverage(this.memoryScores, this.memoryScores.length);
    this.logicAverage = calAverage(this.logicScores, this.logicScores.length);
    this.planningAverage = calAverage(this.planningScores, this.planningScores.length);
    const averages = {
      name: item.name,
      memory: this.memoryAverage,
      logic: this.logicAverage,
      planning: this.planningAverage
    };
    return averages;
  }

  emptyArrays(){
    this.memoryScores = [];
    this.logicScores = [];
    this.planningScores = [];
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }

}
