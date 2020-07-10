import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {AgentsApi} from '../../services/ai-algorithms.service';
import {Agent} from '../../models/agent.interface';
import {calAverage} from '../../services/helper';

@Component({
  selector: 'app-algorithm-detail',
  templateUrl: './algorithm-detail.component.html',
  styleUrls: ['./algorithm-detail.component.scss']
})
export class AlgorithmDetailComponent implements OnInit {

  agent: Agent;
  errorMessage;
  averages;

  memoryScores = [];
  memoryAverage;
  memoryTasks = [];
  memoryData;

  logicScores = [];
  logicAverage;
  logicTasks = [];
  logicData;

  planningScores = [];
  planningAverage;
  planningTasks = [];
  planningData;

  /*** Set UI flags */
  error: boolean;
  loading: boolean;

  /*** Set graph options */
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'task';
  xAxisLabelCategory = 'category';
  showYAxisLabel = true;
  yAxisLabel = 'score';
  yAxisLabelAverage = 'average score';
  view = [400];
  colorScheme = {
    domain: ['#0053d6', '#14234b', '#ff4081']
  };

  constructor(private route: ActivatedRoute,
              private agentsApi: AgentsApi,
              private location: Location) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getAgent(id);
  }

  /*** Fetch AI agent with specific id */
  getAgent(id) {
    this.loading = true;
    this.error = false;
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

  /**** Build 2 arrays for each of the task categories, one for scores and the other for tasks */
  buildStatsArrays() {
    for (const task of this.agent.tasks) {
      switch (task.category) {
        case 'memory':
          this.memoryScores.push(task.score);
          this.memoryTasks.push(task);
          break;
        case 'logic':
          this.logicScores.push(task.score);
          this.logicTasks.push(task);
          break;
        case 'planning':
          this.planningScores.push(task.score);
          this.planningTasks.push(task);
          break;
      }
    }
    this.buildGraphData();
    this.buildComparisonArray();
  }

  /**** Format category Tasks arrays, in order to create data sets
   * which can be used to generate each category tasks graph */
  buildGraphData() {
    this.memoryData = this.memoryTasks.map(item => ({
      name: item.name,
      value: item.score
    }));
    this.logicData = this.logicTasks.map(item => ({
      name: item.name,
      value: item.score
    }));
    this.planningData = this.planningTasks.map(item => ({
      name: item.name,
      value: item.score
    }));
  }

  /**** Build an array of category averages to create a data set, 'averages',
   *  which can be used to generate the overview/averages comparison graph */
  buildComparisonArray() {
    this.memoryAverage = calAverage(this.memoryScores, this.memoryScores.length);
    this.logicAverage = calAverage(this.logicScores, this.logicScores.length);
    this.planningAverage = calAverage(this.planningScores, this.planningScores.length);
    this.averages = [
      {
        name: 'Memory',
        value: this.memoryAverage
      },
      {
        name: 'Logic',
        value: this.logicAverage
      },
      {
        name: 'Planning',
        value: this.planningAverage
      },
    ];
  }

  goBack(): void {
    this.location.back();
  }

}
