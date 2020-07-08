import { Component, OnInit } from '@angular/core';
import {AgentsApi} from '../../services/ai-algorithms.service';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.scss']
})
export class AlgorithmsComponent implements OnInit {

  searchForm: FormGroup;
  agents;
  searchResults;
  compareArray = [];
  constructor(private agentsApi: AgentsApi,
              private fb: FormBuilder,
              private router: Router) { }


  ngOnInit(): void {
    this.getAgents();
    this.searchForm = this.fb.group ({
      search: [''],
    });
  }

  getAgents() {
    this.agentsApi.listAgents()
      .then(response => {
        this.agents = response;
        console.log('agents', this.agents);
      }).catch(error => {
        console.log('Looks like there was a problem: \n', error);
      });
  }

  searchAgents() {
    this.agents = [];
    this.agentsApi.searchAgents(this.searchForm.controls.search.value)
      .then(response => {
      this.searchResults = response;
      this.agents = this.searchResults;
      console.log('searchResults', this.searchResults);
    }).catch(error => {
      console.log('Looks like there was a problem: \n', error);
    });
  }

  consoleLog(){
    console.log(this.searchForm.controls.search.value);
  }

  enableSelection() {
    document.getElementById('compare-ai');
  }

  addToCompareArray(id) {
    this.compareArray.push(id);
  }

  compareAIs(array){
    console.log(array);
    this.router.navigate(['/ai-algorithms/algorithm-comparison', {AI1: array[0], AI2: array[1]}]);
  }




}
