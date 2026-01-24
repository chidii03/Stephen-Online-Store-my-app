import product from './product';
import category from './category';
import { SchemaTypeDefinition } from 'sanity';


export const schema : { types: SchemaTypeDefinition[] } = {
  types : [product, category],
}
