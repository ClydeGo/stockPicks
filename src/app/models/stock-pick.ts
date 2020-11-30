export interface IstockPick {
    id: string,
    code: string,
    reason: string,
    win: number,
    conviction: number
}

export class stockPick implements IstockPick {
    public id  = '';
    public code = '';
    public reason = '';
    public win = 0;
    public conviction = 0;
}
