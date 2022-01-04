import {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  arg,
  asNexusMethod,
  enumType,
  nullable,
} from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';
import { context, Context } from './context';
import { type } from 'os';
// import { Product } from '@prisma/client';

/* Todo:
  1. Product Type ✅
  1. Product ID Type ✅
  2. getProduct(ID!): Query ✅
  3. allProducts: Query ✅
  4. productIds(): Query ✅
  4. deleteProduct(): Mutation ✅
  4. deleteProduct(): Mutation ✅
*/

export const DateTime = asNexusMethod(DateTimeResolver, 'date');

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allProducts', {
      type: 'Product',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.product.findMany();
      },
    });

    t.field('getProduct', {
      type: 'Product',
      args: {
        productId: nonNull(intArg()),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.product.findUnique({
          where: { id: args.productId },
        });
      },
    });

    t.nonNull.list.nonNull.field('productIds', {
      type: 'ProductID',
      resolve: async (_parent, args, context: Context) => {
        return context.prisma.product.findMany({ select: { id: true } });
      },
    });
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createProduct', {
      type: 'Product',
      args: {
        data: nonNull(
          arg({
            type: 'ProductCreateInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.product.create({
          data: {
            name: args.data.name,
            description: args.data.description,
            descriptionShort: args.data.descriptionShort,
            price: args.data.price,
          },
        });
      },
    });

    t.field('deleteProduct', {
      type: 'Product',
      args: {
        productId: nonNull(intArg()),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.product.delete({
          where: { id: args.productId },
        });
      },
    });
  },
});

const ProductCreateInput = inputObjectType({
  name: 'ProductCreateInput',
  definition(t) {
    t.nonNull.string('name');
    t.string('description');
    t.string('descriptionShort');
    t.nonNull.float('price');
  },
});

const ProductID = objectType({
  name: 'ProductID',
  definition(t) {
    t.nonNull.int('id');
  },
});

const Product = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.field('createdAt', { type: 'DateTime' });
    t.nonNull.field('updatedAt', { type: 'DateTime' });
    t.nonNull.string('name');
    t.string('description');
    t.string('descriptionShort');
    t.nonNull.float('price');
  },
});

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    ProductCreateInput,
    Product,
    ProductID,
    // Post,
    // PostCreateInput,
    // SortOrder,
    // PostOrderByUpdatedAtInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});
