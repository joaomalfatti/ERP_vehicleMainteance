export class DateAcquisitionValidate {
    private readonly value!: Date;
  
    constructor(value: Date) {
      const now = new Date();
      if (value > now) {
        throw new Error('A data de aquisição não pode ser futura.');
      }
      this.value = value;
    }
  
    public getDateAcquisitionValidate(): Date {
      return this.value;
    }
  }
  