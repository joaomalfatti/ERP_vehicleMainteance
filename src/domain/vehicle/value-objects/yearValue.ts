export class YearValidate {
    private readonly value: string;

    constructor(value: string) {
        const currentYear = new Date().getFullYear();
        const numericYear = Number.parseInt(value);

        if (
            // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
            isNaN(numericYear) ||
            numericYear < 1950 ||
            numericYear > currentYear + 1
        ) {
            throw new Error('Ano do veículos invalido');
        }

        this.value= value;
    }

    public getYearValidate(): string {
        return this.value;
    }
}