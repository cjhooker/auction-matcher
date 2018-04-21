"use strict";

import "./array-extensions";
import * as randomMatcher from "./random-matcher"
import * as logger from "./logger"
import { MatchValue } from "./types/MatchValue"

export { MatchValue } from "./types/MatchValue"

/** The random seed to use for the initial assignment of matches before optimization. */
let seed: string = null;

/** Set the random seed */
export let setSeed = (value: string) => {
    seed = value;
}

/** Theta determines how quickly epsilon will be scaled down.
    The higher theta is, the faster it will scale down (i.e. less scaling iterations) */
let theta: number = 5;

/** Set theta */
export let setTheta = (value: number) => {
    theta = value;
}

/** Given an array of the values of all possible matches, return the optimal set of matches */
export let match = (matchValues: MatchValue[]) => {
    let auctionState: AuctionState = prepareAuctionState(matchValues);

    // Rather than just optimizing using an epsilon of 1, it can be faster to first optimize using a higher epsilon, 
    // then optimize those results using progressively lower epsilons, until we get to an epsilon of 1.

    // Delta is the initial epsilon value we will use.
    // Set delta to the max object value / 2
    let delta = auctionState.matchLookup.max() / 2;

    let scalingIteration = 0;

    do {
        auctionState.epsilon = Math.max(1, Math.floor(delta / Math.pow(theta, scalingIteration)));
        doAuction(auctionState);
        scalingIteration++;
    } while (auctionState.epsilon > 1)

    // Map the agent/object indexes back to their names
    return auctionState.currentMatches.map(am => <MatchValue>({ 
        agentId: auctionState.agents[am.agentId], 
        objectId: auctionState.objects[am.objectId], 
        value: am.value / (auctionState.agents.length + 1)
    }));
}

/** Set up the initial state of the auction */
function prepareAuctionState(matchValues: MatchValue[]) {
    // Assign initial matches randomly
    let initialMatches = randomMatcher.match(matchValues, seed);

    let agents = [...new Set(matchValues.map(mv => mv.agentId))];
    let objects = [...new Set(matchValues.map(mv => mv.objectId))];
    
    // Assign initial prices as 0
    let prices: number[] = objects.map(objectId => 0);

    // For performance, build match value lookup as matrix with number indexes for agents and objects,
    // instead of their string identifiers.
    let matchLookup: number[][] = [];

    // Store the current matches list with number indexes as well.
    let currentMatches: AuctionMatch[] = [];

    for (let i = 0; i < agents.length; i++) {
        matchLookup[i] = [];
    }

    for (let j = 0; j < matchValues.length; j++) {
        let agentIndex = agents.indexOf(matchValues[j].agentId);
        let objectIndex = objects.indexOf(matchValues[j].objectId);
        matchLookup[agentIndex][objectIndex] = matchValues[j].value * (agents.length + 1);
        let matchesInCurrent = initialMatches.filter(mv => mv.agentId == matchValues[j].agentId && mv.objectId == matchValues[j].objectId);
        if (matchesInCurrent.length == 1) {
            currentMatches.push({agentId: agentIndex, objectId: objectIndex, value: matchesInCurrent[0].value * (agents.length + 1)});
        }
    }

    return <AuctionState>{ currentMatches, matchLookup, prices, epsilon: 0, agents, objects };
}

/** Perform an auction using the given AuctionState */
function doAuction(auctionState: AuctionState) {
    let allHappy = false;
    let iteration = 0;

    do {
        let { unhappyMatch, maxNetValue } = getUnhappyMatch(auctionState);

        if (unhappyMatch == null) {
            allHappy = true;
        } else {
            makeHappy(auctionState, unhappyMatch, maxNetValue);
        }

        iteration++;
    } while (!allHappy)
}

/** Get the first unhappy match in the given AuctionState */
function getUnhappyMatch(auctionState: AuctionState) {
    for (let i = 0; i < auctionState.currentMatches.length; i++) {
        let match = auctionState.currentMatches[i];
        let netValue = getMatchNetValue(match, auctionState.prices);
        let maxNetValue = auctionState.matchLookup[match.agentId]
            .map((value, index) => getNetValue(value, index, auctionState.prices))
            .max();

        // An agent is happy if the net value of their current match is 
        // within epsilon of the max net value of any match 
        let isHappy = (netValue >= maxNetValue - auctionState.epsilon);
        if (!isHappy) {
            return { unhappyMatch: match, maxNetValue };
        }
    }

    return { unhappyMatch: null, maxNetValue: null };
}

/** Make the unhappy agent happy by swapping their current object for the best object for them */
function makeHappy(auctionState: AuctionState, unhappyMatch: AuctionMatch, maxNetValue: number) {

    let bestObjectId: number = auctionState.matchLookup[unhappyMatch.agentId].map((value, index) => ({value, index}))
        .filter(x => (getNetValue(x.value, x.index, auctionState.prices)) == maxNetValue)[0].index;

    let bestMatch: AuctionMatch = {
        agentId: unhappyMatch.agentId, 
        objectId: bestObjectId, 
        value: auctionState.matchLookup[unhappyMatch.agentId][bestObjectId]
    };

    // Do the swap
    let matchToSwap : AuctionMatch = auctionState.currentMatches.filter(mv => mv.objectId == bestMatch.objectId)[0];
    let newMatchForSwapped: AuctionMatch = {
        agentId: matchToSwap.agentId, 
        objectId: unhappyMatch.objectId, 
        value: auctionState.matchLookup[matchToSwap.agentId][unhappyMatch.objectId]
    };
    
    auctionState.currentMatches.splice(auctionState.currentMatches.indexOf(unhappyMatch), 1, bestMatch);
    auctionState.currentMatches.splice(auctionState.currentMatches.indexOf(matchToSwap), 1, newMatchForSwapped);
    
    // Set new price
    let bestObjectPrice = auctionState.prices[bestObjectId];
    let secondBestValue: number = auctionState.matchLookup[unhappyMatch.agentId]
        .map((value, index) => getNetValue(value, index, auctionState.prices))
        .filter((value, index) => index != bestObjectId)
        .max();

    auctionState.prices[bestObjectId] += (getMatchNetValue(bestMatch, auctionState.prices) - secondBestValue + auctionState.epsilon);
}

/** Get the net value of the given match (i.e. the value minus the current price of the object). */
function getMatchNetValue(match: AuctionMatch, prices: number[]) {
    return match.value - prices[match.objectId];
}

/** Get the net value, given a gross value and an object and an array of prices */
function getNetValue(value:number, objectId: number, prices: number[]) {
    return value - prices[objectId];
}
