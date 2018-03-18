'use strict';

import { expect } from 'chai'
import * as dataLoader from "../test-util/data-loader"

import * as auctionMatcher from '../auction-matcher'

describe('auction-matcher test', () => {
    it('test', (done) => {
        dataLoader.loadMatchValues("./test-data/set1/match-values-10.txt", function(output: MatchValue[]) {
            let matches: MatchValue[] = auctionMatcher.match(output);
            let totalValue = matches.map(m => m.value).reduce((a, b) => a + b, 0);
            expect(totalValue).to.equal(854);
            done();
        });
    });
});