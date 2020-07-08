export interface Task {
  readonly id: string;
  readonly name: string;
  readonly category: 'memory'|'planning'|'logic';
  readonly score: number;
}
