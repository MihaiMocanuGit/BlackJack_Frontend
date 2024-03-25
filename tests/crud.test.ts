import { expect, test } from 'vitest'
import {Player} from '../src/models/Player'
import {basicAdd, basicRemove, basicModify} from "../src/CrudOperations"

function addData()
{
    const players: Player[] = [
        new Player(0, 'Name0', 100, 0),
        new Player(1, 'Name1', 101, 1),
        new Player(2, 'Name2', 102, 2),
        new Player(3, 'Name3', 103, 3),
        new Player(4, 'Name4', 104, 4),
        new Player(5, 'Name5', 105, 5),
        new Player(6, 'Name6', 106, 6),
        new Player(7, 'Name7', 107, 7),
        new Player(8, 'Name8', 108, 8),
        new Player(9, 'Name9', 109, 9),
        new Player(10, 'Name10', 110, 10)
    ];
    return players;
}

test("Test Player init", () => {
    let player = new Player(1, "test", 100, 1);

    expect(player.getBank()).toBe(100);
    expect(player.getLevel()).toBe(1);
    expect(player.getUsername()).toBe("test");
    expect(player.getUid()).toBe(1);


    player.setBank(200);
    player.setLevel(2);
    player.setUid(2);
    player.setUsername("test2");



    expect(player.getBank()).toBe(200);
    expect(player.getLevel()).toBe(2);
    expect(player.getUsername()).toBe("test2");
    expect(player.getUid()).toBe(2);
    
})

test('Test loading the data', () => {
    const players = addData();
    
    expect(players.length).toBe(11);
    expect(players[3].getUsername()).toBe("Name3");
})

test('Test adding a new element', () => {
    let players = addData();
    players = basicAdd(players, "Name11", 111, 11);
    expect(players.length).toBe(12);
    expect(players[11]).toStrictEqual(new Player(11, "Name11", 111, 11));
});

test('Removing an element', () => {
    let players = addData();
    players = basicRemove(players, 9);
    expect(players.length).toBe(10);
    expect(players[9]).toStrictEqual(new Player(10, 'Name10', 110, 10));
    expect(players[8]).toStrictEqual(new Player(8, 'Name8', 108, 8));

    players = basicRemove(players, 9);
    expect(players.length).toBe(10);
    expect(players[9]).toStrictEqual(new Player(10, 'Name10', 110, 10));
    expect(players[8]).toStrictEqual(new Player(8, 'Name8', 108, 8));

    players = [];
    players = basicRemove(players, 9);
    expect(players.length).toBe(0);
})


test('Updating an element', () => {
    let players = addData();
    players = basicModify(players, 9, 'Name90', 900, 90);
    expect(players.length).toBe(11);
    expect(players[10]).toStrictEqual(new Player(10, 'Name10', 110, 10));
    expect(players[9]).toStrictEqual(new Player(9, 'Name90', 900, 90));
    expect(players[8]).toStrictEqual(new Player(8, 'Name8', 108, 8));

    players = basicModify(players, 90, 'Name90', 900, 90);
    expect(players.length).toBe(11);
    expect(players[10]).toStrictEqual(new Player(10, 'Name10', 110, 10));
    expect(players[9]).toStrictEqual(new Player(9, 'Name90', 900, 90));
    expect(players[8]).toStrictEqual(new Player(8, 'Name8', 108, 8));

    players = [];
    players = basicModify(players, 90, 'Name90', 900, 90);
    expect(players.length).toBe(0);


})



