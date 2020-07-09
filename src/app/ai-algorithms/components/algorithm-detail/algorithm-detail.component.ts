import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {AgentsApi} from '../../services/ai-algorithms.service';
import {Agent} from '../../models/agent.interface';

@Component({
  selector: 'app-algorithm-detail',
  templateUrl: './algorithm-detail.component.html',
  styleUrls: ['./algorithm-detail.component.scss']
})
export class AlgorithmDetailComponent implements OnInit {

  agent: Agent;
  memoryScores = [];
  memoryAverage;
  memoryGames = [];
  memoryData;
  logicScores = [];
  logicAverage;
  logicGames = [];
  logicData;
  planningScores = [];
  planningAverage;
  planningGames = [];
  planningData;

  error: boolean;
  errorMessage;

  averages;

  loading: boolean;


  // graph options
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'game';
  showYAxisLabel = true;
  yAxisLabel = 'score';
  view = [400];
  colorScheme = {
    domain: ['#0053d6', '#14234b', '#ff4081']
  };

  constructor(private route: ActivatedRoute,
              private agentsApi: AgentsApi,
              private location: Location) { }

  ngOnInit(): void {
    this.getAgent();
  }

  getAgent() {
    this.loading = true;
    this.error = false;
    const id = +this.route.snapshot.paramMap.get('id');
    this.agentsApi.getAgent(id)
      .then(response => {
        this.loading = false;
        this.agent = {...response};
        this.buildStatsArrays();
      }).catch(error => {
      this.loading = false;
      this.error = true;
      this.errorMessage = 'Looks like there was a problem: \n' + error;
    });
  }

  /**** build 2 arrays for each of the task categories, one to hold the each  **/

  buildStatsArrays() {
    this.emptyStatsObj();
    for (const task of this.agent.tasks) {
      switch (task.category) {
        case 'memory':
          this.memoryScores.push(task.score);
          this.memoryGames.push(task);
          break;
        case 'logic':
          this.logicScores.push(task.score);
          this.logicGames.push(task);
          break;
        case 'planning':
          this.planningScores.push(task.score);
          this.planningGames.push(task);
          break;
      }
    }
    this.buildComparisonArray();
    this.buildGraphData();
  }

  buildGraphData() {
    this.memoryData = this.memoryGames.map(item => ({
      name: item.name,
      value: item.score
    }));
    this.logicData = this.logicGames.map(item => ({
      name: item.name,
      value: item.score
    }));
    this.planningData = this.planningGames.map(item => ({
      name: item.name,
      value: item.score
    }));
    console.log(this.memoryData);
  }

  buildComparisonArray() {
    this.memoryAverage = this.averageObj(this.memoryScores, this.memoryScores.length);
    this.logicAverage = this.averageObj(this.logicScores, this.logicScores.length);
    this.planningAverage = this.averageObj(this.planningScores, this.planningScores.length);
    this.averages = [
      {
        name: 'memory',
        value: this.memoryAverage
      },
      {
        name: 'logic',
        value: this.logicAverage
      },
      {
        name: 'planning',
        value: this.planningAverage
      },
    ];
  }

  averageObj(item, length) {
    const total = item.reduce((a, b) => a + b, 0);
    const average = total / length;
    return average;
  }

  emptyStatsObj(){
    this.memoryScores = [];
    this.logicScores = [];
    this.planningScores = [];
  }

  goBack(): void {
    this.location.back();
  }




}
