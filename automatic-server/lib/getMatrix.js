const { getTime } = require("./getters")

const surface = {
    "1": require("../matrix/surface/1.json"),
    "2": require("../matrix/surface/2.json"),
    "3": require("../matrix/surface/3.json"),
    "4": require("../matrix/surface/4.json"),
    "5": require("../matrix/surface/5.json"),
    "6": require("../matrix/surface/6.json"),
    "7": require("../matrix/surface/7.json"),
    "8": require("../matrix/surface/8.json"),
    "9": require("../matrix/surface/9.json"),
    "10": require("../matrix/surface/10.json"),
    "11": require("../matrix/surface/11.json"),
    "12": require("../matrix/surface/12.json"),
    "13": require("../matrix/surface/13.json"),
    "14": require("../matrix/surface/14.json"),
    "15": require("../matrix/surface/15.json"),
    "16": require("../matrix/surface/16.json"),
    "17": require("../matrix/surface/17.json"),
    "18": require("../matrix/surface/18.json"),
    "19": require("../matrix/surface/19.json"),
}

const pathfinding = {
    "1": require("../matrix/pathfinding/1.json"),
    "2": require("../matrix/pathfinding/2.json"),
    "3": require("../matrix/pathfinding/3.json"),
    "4": require("../matrix/pathfinding/4.json"),
    "5": require("../matrix/pathfinding/5.json"),
    "6": require("../matrix/pathfinding/6.json"),
    "7": require("../matrix/pathfinding/7.json"),
    "8": require("../matrix/pathfinding/8.json"),
    "9": require("../matrix/pathfinding/9.json"),
    "10": require("../matrix/pathfinding/10.json"),
    "11": require("../matrix/pathfinding/11.json"),
    "12": require("../matrix/pathfinding/12.json"),
    "13": require("../matrix/pathfinding/13.json"),
    "14": require("../matrix/pathfinding/14.json"),
    "15": require("../matrix/pathfinding/15.json"),
    "16": require("../matrix/pathfinding/16.json"),
    "17": require("../matrix/pathfinding/17.json"),
    "18": require("../matrix/pathfinding/18.json"),
    "19": require("../matrix/pathfinding/19.json"),
}

const getSurface = async() => {
    const {season} = await getTime()
    return surface[`${season || '19'}`]
}

const getPathfinding = async() => {
    const {season} = await getTime()
    return pathfinding[`${season || '19'}`]
}

module.exports = {
    getSurface,
    getPathfinding
}