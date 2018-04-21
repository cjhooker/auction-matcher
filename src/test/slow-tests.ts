'use strict';

import { expect } from 'chai'
import * as dataGenerator from "../test-util/data-generator"
import * as auctionMatcher from '../auction-matcher'
import { MatchValue } from "../types/MatchValue"

describe('auction-matcher slow tests', () => {
    it('Optimizes a set of 500 agents and 500 objects without errors', (done) => {
        let possibleMatches = dataGenerator.generateData(500);
        let matches: MatchValue[] = auctionMatcher.match(possibleMatches);
        done();
    }).timeout(0);
});