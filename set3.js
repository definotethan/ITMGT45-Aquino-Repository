/**
 * Set 3
 *
 * This assignment will develop your ability to manipulate data.
 * You should be ready for JS tutorials on more advanced topics after this.
 *
 * Please refer to the `module4/sample-data/set3-sample-data.js` file for examples of:
 * - the `socialGraph` parameter for `relationshipStatus`
 * - the `board` parameter for `ticTacToe`
 * - the `routeMap` parameter for `eta`
 */

/**
 * Relationship status
 *
 * Let's pretend that you are building a new app with social media functionality.
 * Users can have relationships with other users.
 *
 * The two guidelines for describing relationships are:
 * 1. Any user can follow any other user.
 * 2. If two users follow each other, they are considered friends.
 *
 * This function describes the relationship that two users have with each other.
 *
 * Please see the sample data for examples of `socialGraph`.
 *
 * @param {string} fromMember The subject member
 * @param {string} toMember The object member
 * @param {object} socialGraph The relationship data
 * @returns {string} "follower" if fromMember follows toMember;
 * "followed by" if fromMember is followed by toMember;
 * "friends" if fromMember and toMember follow each other;
 * "no relationship" otherwise.
 */
function relationshipStatus(fromMember, toMember, socialGraph) {
    if (!socialGraph[fromMember]) {
        return "no relationship";
    }

    const userConnections = socialGraph[fromMember].following.includes(toMember);
    const followsBack = socialGraph[toMember]?.following.includes(fromMember);

    if (userConnections && followsBack) {
        return "friends";
    } else if (userConnections) {
        return "follower";
    } else if (followsBack) {
        return "followed by";
    } else {
        return "no relationship";
    }
}

/**
 * Tic tac toe
 *
 * Tic Tac Toe is a common paper-and-pencil game.
 * Players must attempt to draw a line of their symbol across a grid.
 * The player that does this first is considered the winner.
 *
 * This function evaluates a Tic Tac Toe game board and returns the winner.
 *
 * Please see the sample data for examples of `board`.
 *
 * @param {Array} board The representation of the Tic Tac Toe board as a square array of arrays. The size of the array will range between 3x3 to 6x6.
 * The board will never have more than 1 winner.
 * There will only ever be 2 unique symbols at the same time.
 * @returns {string} the symbol of the winner, or "NO WINNER" if there is no winner.
 */
function ticTacToe(board) {
    const n = board.length;

    for (let i = 0; i < n; i++) {
        if (board[i].every(cell => cell === board[i][0] && cell !== "")) {
            return board[i][0];
        }
    }

    for (let i = 0; i < n; i++) {
        let column = [];
        for (let j = 0; j < n; j++) {
            column.push(board[j][i]);
        }
        if (column.every(cell => cell === column[0] && cell !== "")) {
            return column[0];
        }
    }

    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < n; i++) {
        diagonal1.push(board[i][i]); 
        diagonal2.push(board[i][n - 1 - i]);
    }
    if (diagonal1.every(cell => cell === diagonal1[0] && cell !== "")) {
        return diagonal1[0];
    }
    if (diagonal2.every(cell => cell === diagonal2[0] && cell !== "")) {
        return diagonal2[0];
    }

    return "NO WINNER";
}

/**
 * ETA
 *
 * A shuttle van service is tasked to travel one way along a predefined circular route.
 * The route is divided into several legs between stops.
 * The route is fully connected to itself.
 *
 * This function returns how long it will take the shuttle to arrive at a stop after leaving anothe rstop.
 *
 * Please see the sample data for examples of `routeMap`.
 *
 * @param {string} firstStop the stop that the shuttle will leave
 * @param {string} secondStop the stop that the shuttle will arrive at
 * @param {object} routeMap the data describing the routes
 * @returns {Number} the time that it will take the shuttle to travel from firstStop to secondStop
 */
function eta(firstStop, secondStop, routeMap) {
    let current = firstStop;
    let totalTime = 0;
    
    while (current !== secondStop) {
        let next = null;
        for (const [routeLeg, details] of Object.entries(routeMap)) {
            const [start, end] = routeLeg.split(',');
            if (start === current) {
                next = end;
                totalTime += details.travel_time_mins;
                break;
            }
        }
        
        current = next;
    }
    
    return totalTime;
}