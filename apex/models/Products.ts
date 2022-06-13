export class Product {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: string
    ) {
    }

    getFormattedPrice(): string {
        return this.price
            .toString()
            .replace(
                /\B(?=(\d{3})+(?!\d))/g,
                " "
            );
    }
}