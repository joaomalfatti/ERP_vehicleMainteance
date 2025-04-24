export class DateAcquisitionValidade {
    
    private readonly getDateAcquisitionvalue!: Date;

    constructor(value: Date) {
        const now = new Date();
        if (value > now) {
            throw new Error('A data de aquisição não pode ser futura.')
        }
        
        this.getDateAcquisitionvalue = value;
    }

    public getDateAcquisition(): Date {
        return this.getDateAcquisitionvalue;
    }
} 