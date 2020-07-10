import { Component, OnInit } from '@angular/core';
import { AgentsApi } from '../../services/ai-algorithms.service';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router} from '@angular/router';
import { Agent } from '../../models/agent.interface';

@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.scss']
})
export class AlgorithmsComponent implements OnInit {

  title = 'AI Showcase';
  description = 'We\'ve pulled together our AI algorithms into one ' +
    'easy to search catalogue. Review & compare the\n' + 'performance of some our favourites';

  searchForm: FormGroup;
  agents: Agent[] = [];
  selectedAgents;
  errorMessage: string;

  /*** Set UI flags*/
  compare = false;
  error = false;
  compareDisabled = true;
  loading = false;
  results = false;

  constructor(private agentsApi: AgentsApi,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group ({
      search: [''],
    });
  }

  /*** Fetch all agents*/
  getAgents() {
   this.resetVariables();
   this.agentsApi.listAgents()
      .then(response => {
        this.loading = false;
        this.results = true;
        this.agents = [...response];
      }).catch(error => {
        this.loading = false;
        this.error = true;
        this.errorMessage = 'Looks like there was a problem: \n' + error;
      });
  }

  /*** Fetch all agents containing a specific string*/
  searchAgents() {
    this.resetVariables();
    this.agentsApi.searchAgents(this.searchForm.controls.search.value)
      .then(response => {
        this.loading = false;
        this.results = true;
        this.agents = [...response];
    }).catch(error => {
      this.loading = false;
      this.error = true;
      this.errorMessage = 'Looks like there was a problem: \n' + error;
    });
  }

  resetVariables() {
    this.agents = [];
    this.error = false;
    this.loading = true;
    this.compareDisabled = true;
    this.results = false;
  }

  compareAIs(){
    this.compare = true;
  }

  cancelCompare(){
    this.compare = false;
  }

  /*** Publish array of selected AI agents to be compared*/
  go() {
    this.agentsApi.publishAgentArray(this.selectedAgents);
    this.router.navigate(['/ai-algorithms/algorithm-comparison']);
  }

  /*** Select AI agents to compare*/
  onSelection(options){
    this.selectedAgents = options.selected.map(item => item.value);
    this.compareDisabled = this.selectedAgents.length < 2;
  }

}
