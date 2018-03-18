# auction-matcher

A Node.js module that finds the optimal set of matches between a set of agents and a set of objects, using an auction algorithm.

## Installation 

```sh
npm install auction-matcher --save
```

## Usage

### TypeScript
```typescript
import * as auctionMatcher from '../auction-matcher'
let possibleMatches = [ 
    { agentId: 'Alicia', objectId: 'apple', value: 100 },
    { agentId: 'Alicia', objectId: 'broccoli', value: 80 },
    { agentId: 'Alicia', objectId: 'carrot', value: 90 },
    { agentId: 'Bo', objectId: 'apple', value: 50 },
    { agentId: 'Bo', objectId: 'broccoli', value: 40 },
    { agentId: 'Bo', objectId: 'carrot', value: 30 },
    { agentId: 'Cara', objectId: 'apple', value: 20 },
    { agentId: 'Cara', objectId: 'broccoli', value: 10 },
    { agentId: 'Cara', objectId: 'carrot', value: 0 } 
    ];
let optimalMatches: MatchValue[] = auctionMatcher.match(matches);
console.log(optimalMatches);
```
Output:
```sh
[ { agentId: 'Alicia', objectId: 'carrot', value: 90 },
  { agentId: 'Bo', objectId: 'broccoli', value: 40 },
  { agentId: 'Cara', objectId: 'apple', value: 20 } ]
```

## Test 

```sh
npm run test
```