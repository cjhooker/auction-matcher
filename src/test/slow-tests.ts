'use strict';

import { expect } from 'chai'
import * as dataGenerator from "../test-util/data-generator"
import * as auctionMatcher from '../auction-matcher'
import { MatchValue } from "../types/MatchValue"

describe('auction-matcher slow tests', () => {
    /**
     * This test is very slow, but detects a bug that happened because we were 
     * passing too many arguments to Math.max when the possible matches array
     * is large.
     */
    it('Optimizes a set of 500 agents and 500 objects without errors', (done) => {
        let possibleMatches = dataGenerator.generateData(500);
        let matches: MatchValue[] = auctionMatcher.match(possibleMatches);
        done();
    }).timeout(0);
});