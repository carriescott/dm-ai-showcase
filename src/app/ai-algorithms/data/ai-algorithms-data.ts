import {Agent} from '../models/agent.interface';
import {nextId} from '../services/helper.service';


export const AGENTS: ReadonlyArray<Agent> = [
    {
      id: nextId(),
      name: 'IMPALA',
      description: 'Scalable Distributed Deep-RL with Importance Weighted Actor-Learner Architectures',
      tasks: [
        {
          id: 'mem_1',
          name: 'Blackjack', category: 'memory', score: 56,
        },
        {
          id: 'mem_2',
          name: 'Q-bert', category: 'memory', score: 61,
        },
        {
          id: 'logic_1',
          name: 'Breakout', category: 'logic', score: 79,
        },
        {
          id: 'logic_2', name: 'Tetris', category: 'logic', score: 21,
        },
        {
          id: 'logic_3', name: 'Basic Math', category: 'logic', score: 54,
        },
        {
          id: 'planning_1', name: 'Pacman', category: 'planning', score: 58,
        }
      ]
    },
  {
    id: nextId(),
    name: 'AlphaZero',
    description: 'Generalisation of AlphaGo Zero that can achieve, tabularasa, superhuman performance in many challenging ' +
      'domains such as Chess, Shogi and Go.',
    tasks: [
      {
        id: 'mem_1',
        name: 'Blackjack', category: 'memory', score: 37,
      }, {
        id: 'mem_2',
        name: 'Q-bert', category: 'memory', score: 29,
      }, {
        id: 'logic_1', name: 'Breakout', category: 'logic', score: 78,
      }, {
        id: 'logic_2', name: 'Tetris', category: 'logic', score: 92,
      }, {
        id: 'logic_3', name: 'Basic Math', category: 'logic', score: 88,
      }, {
        id: 'planning_1', name: 'Pacman', category: 'planning', score: 100,
      }
    ]
  },
  {
    id: nextId(),
    name: 'R2D3',
    description: 'Making Efficient Use of Demonstrations to Solve Hard Exploration Problems.',
    tasks: [
      {
        id: 'mem_1',
        name: 'Blackjack', category: 'memory', score: 85,
      }, {
        id: 'mem_2',
        name: 'Q-bert', category: 'memory', score: 73,
      }, {
        id: 'logic_1', name: 'Breakout', category: 'logic', score: 28,
      }, {
        id: 'logic_2', name: 'Tetris', category: 'logic', score: 26,
      }, {
        id: 'logic_3', name: 'Basic Math', category: 'logic', score: 44,
      }, {
        id: 'planning_1', name: 'Pacman', category: 'planning', score: 72,
      }
    ]
  }
];



