# auction-matcher

A Node.js module that finds the optimal set of matches between a set of agents and a set of objects, using an auction algorithm.

## Installation 

```sh
npm install auction-matcher --save
```

## Usage

### TypeScript
```typescript
import * as auctionMatcher from 'auction-matcher'
type MatchValue = auctionMatcher.MatchValue;

let possibleMatches = [ 
    { agentId: 'Alicia', objectId: 'apple', value: 100 },
    { agentId: 'Alicia', objectId: 'broccoli', value: 80 },
    { agentId: 'Alicia', objectId: 'carrot', value: 90 },
    { agentId: 'Bo', objectId: 'apple', value: 50 },
    { agentId: 'Bo', objectId: 'broccoli', value: 40 },
    { agentId: 'Bo', objectId: 'carrot', value: 30 },
    { agentId: 'Cara', objectId: 'apple', value: 25 },
    { agentId: 'Cara', objectId: 'broccoli', value: 10 },
    { agentId: 'Cara', objectId: 'carrot', value: 0 } 
];

let optimalMatches: MatchValue[] = auctionMatcher.match(possibleMatches);
console.log(optimalMatches);
```
### JavaScript
```javascript
let auctionMatcher = require('auction-matcher');
let possibleMatches = [ 
    { agentId: 'Alicia', objectId: 'apple', value: 100 },
    { agentId: 'Alicia', objectId: 'broccoli', value: 80 },
    { agentId: 'Alicia', objectId: 'carrot', value: 90 },
    { agentId: 'Bo', objectId: 'apple', value: 50 },
    { agentId: 'Bo', objectId: 'broccoli', value: 40 },
    { agentId: 'Bo', objectId: 'carrot', value: 30 },
    { agentId: 'Cara', objectId: 'apple', value: 25 },
    { agentId: 'Cara', objectId: 'broccoli', value: 10 },
    { agentId: 'Cara', objectId: 'carrot', value: 0 } 
    ];
let optimalMatches = auctionMatcher.match(possibleMatches);
console.log(optimalMatches);
```
### Output
```sh
[ { agentId: 'Alicia', objectId: 'carrot', value: 90 },
  { agentId: 'Bo', objectId: 'broccoli', value: 40 },
  { agentId: 'Cara', objectId: 'apple', value: 25 } ]
```

## Test 

To run all unit tests except the slow ones:

```sh
npm test
```

Some tests on large datasets take a long time to run (~2 minutes). If you want to include these in your test run, do:
```sh
npm run test-all
```