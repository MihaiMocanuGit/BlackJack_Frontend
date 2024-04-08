export class Player {
    private uid: number;
    private username: string;
    private bank: number;
    private level: number;


    public constructor(uid: number,  username: string, bank: number, level: number) 
    {
        this.uid = uid;
        this.username = username;
        this.bank = bank;
        this.level = level;
    }


    public getUid() : number
    {
        return this.uid;
    }
    public setUid(uid: number)
    {
        this.uid = uid;
    }

    public getUsername() : string
    {
        return this.username;
    }
    public setUsername(username: string)
    {
        this.username = username;
    }
    

    public getBank() : number
    {
        return this.bank;
    }
    public setBank(bank: number)
    {
        this.bank = bank;
    }

    public getLevel() : number
    {
        return this.level;
    }
    public setLevel(level: number)
    {
        this.level = level;
    }
    
    

}
