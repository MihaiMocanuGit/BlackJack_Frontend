export interface playerFromServer{
    _links: {
        player: {
            href: string
        }
        self: {
            href: string
        }
    }
    Uid: number,
    username: string,
    bank: number,
    level: number
}


export interface playerListFromServer
{
    _embedded: {
        playerList: playerFromServer[]
    }
    _links: {
        self: {
            href: string
        }
    }
}