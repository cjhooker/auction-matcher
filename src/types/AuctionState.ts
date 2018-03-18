/** The current state of an auction */
type AuctionState = {
    currentMatches: AuctionMatch[];
    matchLookup: number[][];
    prices: number[];
    epsilon: number;
    agents: string[];
    objects: string[];
}
