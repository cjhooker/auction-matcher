"use strict";

import * as randomSeed from "random-seed"

/** Create a random assignment of the possible matches in matchValues, using the given random seed. */
export let match = (matchValues: MatchValue[], seed?: string) => {
    let rand = randomSeed.create(seed);
    let agentIds = [...new Set(matchValues.map(mv => mv.agentId))];

    let matches : MatchValue[] = [];
    for (let i = 0; i < agentIds.length; i++) {
        let agentId = agentIds[i];
        // Get a random objectId that hasn't been taken already
        let remainingMatches = matchValues.filter(mv => mv.agentId == agentId && !matches.map(m => m.objectId).includes(mv.objectId));
        let randomMatch = remainingMatches.sort((a,b) => {let r = rand.random(); return r < 0.5 ? 1 : r > 0.5 ? -1 : 0})[0];
        matches.push(randomMatch);
    }

    return matches;
}