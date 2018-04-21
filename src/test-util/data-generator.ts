import { MatchValue } from "MatchValue";

export function generateData(agentCount: number) {
    let output: MatchValue[] = [];

    for (let i = 0; i < agentCount; i++) {
        for (let j = 0; j < agentCount; j++) {
            output.push({
                agentId: `Agent${i}`,
                objectId: `Object${j}`,
                value: i + j  
            })
        }
    }

    return output;
}