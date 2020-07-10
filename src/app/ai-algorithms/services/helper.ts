/**
 * Common database helper functions.
 */

let currentId = 1;

/**** Return average value for provided array */
export function calAverage(array: number[], length) {
  const total = array.reduce((a, b) => a + b, 0);
  const average = total / length;
  return average;
}

/** Returns a new unique ID at every invocation. */
export function nextId() {
  return currentId++;
}

/** Returns a random number between min and max. */
function randomBetween(min: number, max: number): number {
  const rand = Math.random();
  const span = max - min;
  return rand * span + min;
}

/** Returns true a random percentage of invocations. */
function randomCondition(percentageTrue: number): boolean {
  const rand = Math.random();
  return rand < percentageTrue;
}

const MIN_LATENCY_MS = 100;
const MAX_LATENCY_MS = 3000;
const FAILURE_RATE = 0.05; /* 5% API calls fail */

/**** Returns the data as a Promise, delayed by a random latency and * occasionally failing with an error.**/

export function asFallibleAsyncResponse<T>(data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (randomCondition(FAILURE_RATE)) {
        reject(new Error('API Error - database unavailable.'));
      } else {
        resolve(data);
      }
    }, randomBetween(MIN_LATENCY_MS, MAX_LATENCY_MS));
  });
  return Promise.resolve(data);
}

