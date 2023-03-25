import Colors from '@colors/colors'
import crypto from 'crypto'
import readline from 'readline'
import {getTable} from './table.js'
import UIDGenerator from 'uid-generator'

export const win = 'Win'.brightYellow
export const lose = 'Lose'.black
export const draw = 'Draw'.grey
const moves = process.argv.slice(2)
export const range = Math.round(moves.length / 2)
export const range1 = Math.round((moves.length -1) / 2)
const cmptMoves = []
const res = []
let userMove
let cmptMove
let uid

class Game {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout})}
    start() {
        if(new Set(process.argv).size === process.argv.length && process.argv.length % 2 !== 0 && process.argv.length >= 3) {
            this.rl.question(`Available moves:\n${moves.map((move, index) =>
            `${index + 1} - ${move}`).join('\n')}\n0 - exit\n? - help\n`, (ans) => {
            if(parseInt(ans) === 0){
                this.rl.close()}
            if(ans === '?'){
                getTable(...moves)
                this.rl.close()}
            if(parseInt(ans) > 0 && parseInt(ans) <= moves.length){
                let selectedMove = moves[parseInt(ans) - 1]
                console.log(`You selected: ${selectedMove}` + '\n'+'Computer move: '+cmptChoice)
                userMove = moves.indexOf(selectedMove)+1
                cmptMove = moves.indexOf(cmptChoice)+1
                genRes(userMove, cmptMove)
                console.log('Game Result: '+res+'\n'+'HMAC key: '+uid)
                this.rl.close()
            }else{
                console.log("Let's try again!")
                this.rl.close()}})
        }else{
            console.error('Error: Invalid input! Please provide an odd number of '.green +
                            'at least 3 non-repeating strings as command line arguments.\nEx. Scissors Lizard Spock.'.green)
            this.rl.close()
        }
    }
}
const game = new Game()
game.start()

function genRes(move1, move2) {
    if(move1 === move2) res.push(draw)
    if (moves.length <= 5) {
        if (move2 > move1) {(move2 - move1 <= range) ? res.push(lose) : res.push(win)}
        if (move2 < move1) {(move1 - move2 <= range) ? res.push(win) : res.push(lose)}
    }
    if (moves.length > 5) {
        if (move2 > move1) {(move2 - move1 <= range1) ? res.push(lose) : res.push(win)}
        if (move2 < move1) {(move1 - move2 <= range1) ? res.push(win) : res.push(lose)}
    }
}

for(let move in moves){
    cmptMoves.push(moves[crypto.randomInt(0, moves.length)])
}

const cmptChoice = cmptMoves[Math.floor(Math.random() * cmptMoves.length)]
cmptMove = moves.indexOf(cmptChoice) + 1;

setKey()
function setKey() {
    const secret = new UIDGenerator(368)
    uid = secret.generateSync()
    if(cmptChoice){
        const hmac = crypto.createHmac("sha3-256", uid).update(cmptChoice).digest('hex')
        console.log('HMAC: '+hmac+'\n'+'Enter your move:')
    }
}
