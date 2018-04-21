'use strict';

import { expect } from 'chai'
import * as dataLoader from "../test-util/data-loader"
import * as dataGenerator from "../test-util/data-generator"
import * as auctionMatcher from '../auction-matcher'
import { MatchValue } from "../types/MatchValue"

describe('auction-matcher', () => {
    it('Correctly optimizes a set of 3 agents and 3 objects', (done) => {
        dataLoader.loadMatchValues("./test-data/match-values-3.txt", function (output: MatchValue[]) {
            let matches: MatchValue[] = auctionMatcher.match(output);
            let totalValue = matches.map(m => m.value).reduce((a, b) => a + b, 0);
            expect(totalValue).to.equal(150);
            done();
        });
    });

    it('Correctly optimizes a set of 10 agents and 10 objects', (done) => {
        dataLoader.loadMatchValues("./test-data/match-values-10.txt", function (output: MatchValue[]) {
            let matches: MatchValue[] = auctionMatcher.match(output);
            let totalValue = matches.map(m => m.value).reduce((a, b) => a + b, 0);
            expect(totalValue).to.equal(854);
            done();
        });
    });
});