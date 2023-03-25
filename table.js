import Table from "cli-table3"
import {draw, lose, range, range1, win} from "./script.js"

export function getTable(...moves) {
    const table = new Table({
        head: ['Computer'.blue+' vs '.white+'Gamer >>', ...moves],
        colWidths: [22]
    });
    moves.forEach((move1) => {
        const row = [move1.blue]
        moves.forEach((move2) => {
            let moveU = moves.indexOf(move1);
            let moveC = moves.indexOf(move2);
            if(moveU === moveC) row.push(draw)
            if (moves.length <= 5) {
                if (moveU > moveC){(moveU - moveC <= range)?row.push(lose):row.push(win)}
                if (moveU < moveC){(moveC - moveU <= range)?row.push(win):row.push(lose)}}
            if (moves.length > 5){
                if (moveU > moveC){(moveU - moveC <= range1)?row.push(lose):row.push(win)}
                if (moveU < moveC){(moveC - moveU <= range1)?row.push(win):row.push(lose)}}})
        table.push(row)
    })
    console.log(table.toString())
}
