import { Player } from './models/Player';




export function basicAdd(data: Player[], username: string, bank: number, level: number) {
    let validUid = data.length;

    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        if (element.getUid() >= validUid)
            validUid = element.getUid() + 1;
    }

    const newPlayer = new Player(validUid, username, bank, level);
    const result = data.map((x: Player) => x);
    result.push(newPlayer);
    return result;
}export function basicRemove(data: Player[], playerUid: number) {
    const result = data.filter((x: Player) => x.getUid() !== playerUid);
    return result;
}
export function basicModify(data: Player[], playerUid: number, username: string, bank: number, level: number) {
    const result = data.map((x: Player) => x);
    for (let index = 0; index < result.length; index++) {
        const element = result[index];

        if (element.getUid() === playerUid) {
            if (username != "") {
                element.setBank(bank);
                element.setLevel(level);
                element.setUsername(username);
            }
        }
    }

    return result;
}

