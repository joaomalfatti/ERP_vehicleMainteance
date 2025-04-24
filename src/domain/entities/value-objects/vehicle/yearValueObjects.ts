export class YearValidate {
    private readonly getYearValidatevalue: string;

    constructor(value: string) {
        const currentYear = new Date().getFullYear();
        const numericYear = Number.parseInt(value);


        if (
            Number.
            isNaN(numericYear) || numericYear < 1950 || numericYear > currentYear + 1
        ) {
            throw new Error ('Ano do veículo inválido.')
        }

        this.getYearValidatevalue = value
    }

    public getYearValidate(): string {
        return this.getYearValidatevalue;
    }
}