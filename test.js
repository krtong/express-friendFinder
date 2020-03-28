/**
 * @param {number[]} tree
 * @return {number}
 */
var totalFruit = function(tree) {
    let output = 0
    let result = function(subArray){
            let basket1 = [tree[0], 1]
    let basket2 = [, 0];
    for (let i = 1; i < tree.length; i++){
        let fruit = tree[i]
        if (fruit !== basket1[0] && basket2[0] === undefined) basket2[0] = fruit;
        if (basket1[0] === fruit) basket1[1]++
        if (basket2[0] === fruit) basket2[1]++
    }
    return basket2[1] + basket1[1]
    }

};