import {ProductGroupModel} from "~/models/ProductGroupModel";

export default function () {
    return useState<ProductGroupModel[]>('products', () => [])
}