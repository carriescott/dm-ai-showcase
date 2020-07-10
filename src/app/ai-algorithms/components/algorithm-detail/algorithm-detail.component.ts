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

  /*** Set UI flags */
  error: boolean;
  loading: boolean;

  /*** Set graph options */
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
    const id = +this.route.snapshot.paramMap.get('id');
    this.getAgent(id);
  }

  /*** Fetch agent with specific id */
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

  /**** Build 2 arrays for each of the task categories, one for scores and the other for games */
  buildStatsArrays() {
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
    this.buildGraphData();
    this.buildComparisonArray();
  }

  /**** Format games arrays for each of the task categories,
   * to create data sets which can be used to generate each category graph */
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
  }

  /**** Build an array of category averages to create a data set, 'averages'
   *  which can be used to generate the overview graph */
  buildComparisonArray() {
    this.memoryAverage = calAverage(this.memoryScores, this.memoryScores.length);
    this.logicAverage = calAverage(this.logicScores, this.logicScores.length);
    this.planningAverage = calAverage(this.planningScores, this.planningScores.length);
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

  goBack(): void {
    this.location.back();
  }

}
