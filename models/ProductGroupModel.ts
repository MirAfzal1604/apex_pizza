import {Product} from "~/models/Products";

export class ProductGroupModel {
    constructor(
        public name: string,
        public items: Product[]
    ) {
    }
}