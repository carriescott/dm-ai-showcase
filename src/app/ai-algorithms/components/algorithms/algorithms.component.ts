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

  compare = false;
  searchForm: FormGroup;
  agents: Agent[] = [];
  selectedAgents;
  loading = false;
  errorMessage: string;
  error = false;
  compareDisabled = true;

  constructor(private agentsApi: AgentsApi,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group ({
      search: [''],
    });
  }

  getAgents() {
    this.agents = [];
    this.error = false;
    this.loading = true;
    this.compareDisabled = true;
    this.agentsApi.listAgents()
      .then(response => {
        this.loading = false;
        this.agents = [...response];
      }).catch(error => {
        this.loading = false;
        this.error = true;
        this.errorMessage = 'Looks like there was a problem: \n' + error;
      });
  }

  searchAgents() {
    this.agents = [];
    this.loading = true;
    this.error = false;
    this.compareDisabled = true;
    this.agentsApi.searchAgents(this.searchForm.controls.search.value)
      .then(response => {
        this.loading = false;
        this.agents = [...response];
    }).catch(error => {
      this.loading = false;
      this.error = true;
      this.errorMessage = 'Looks like there was a problem: \n' + error;
    });
  }

  compareAIs(){
    this.compare = true;
  }
  cancelCompare(){
    this.compare = false;
  }

  go() {
    this.agentsApi.publishAgentArray(this.selectedAgents);
    this.router.navigate(['/ai-algorithms/algorithm-comparison']);
  }

  onSelection(e, v){
    this.selectedAgents = v.selected.map(item => item.value);
    this.compareDisabled = this.selectedAgents.length < 2;
  }




}
