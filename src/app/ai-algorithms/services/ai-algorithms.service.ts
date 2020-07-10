import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';
import {Agent} from '../models/agent.interface';
import {AGENTS} from '../data/ai-algorithms-data';
import {AgentId} from '../models/agent.interface';
import {asFallibleAsyncResponse} from './helper';

@Injectable({
  providedIn: 'root'
})

export class AgentsApi {

  /*** Stores array of AI agents*/
  agentArray = new BehaviorSubject<any>(null);

  /*** Sets array of AI agents*/
  publishAgentArray(data: any) {
    this.agentArray.next(data);
  }

  /*** Returns all AI agents*/
  listAgents(): Promise<ReadonlyArray<Agent>> {
    return asFallibleAsyncResponse(AGENTS);
  }

  /*** Returns all AI agents with a name property that contains the provided string*/
  searchAgents(nameSubstr: string): Promise<ReadonlyArray<Agent>> {
    return asFallibleAsyncResponse(
      AGENTS.filter(agent => agent.name.includes(nameSubstr)));
  }

  /*** Returns a single AI agent*/
  getAgent(id: AgentId): Promise<Agent | undefined> {
    return asFallibleAsyncResponse(AGENTS.find(agent => agent.id === id));
  }

}
