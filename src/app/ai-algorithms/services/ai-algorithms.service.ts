import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Agent} from '../models/agent.interface';
import {AGENTS} from '../data/ai-algorithms-data';
import {AgentId} from '../models/agent.interface';
import {asFallibleAsyncResponse} from './helper.service';

@Injectable({
  providedIn: 'root'
})

export class AgentsApi {

  listAgents(): Promise<ReadonlyArray<Agent>> {
    return asFallibleAsyncResponse(AGENTS);
  }

  searchAgents(nameSubstr: string): Promise<ReadonlyArray<Agent>> {
    return asFallibleAsyncResponse(
      AGENTS.filter(agent => agent.name.includes(nameSubstr)));
  }

  getAgent(id: AgentId): Promise<Agent | undefined> {
    return asFallibleAsyncResponse(AGENTS.find(agent => agent.id === id));
  }

}


