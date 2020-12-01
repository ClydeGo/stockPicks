import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

    constructor(data?){
        this.id = data.id;
        this.code = data.code;
        this.reason = data.reason;
        this.win = data.win;
        this.conviction = data.conviction;
    }


}
