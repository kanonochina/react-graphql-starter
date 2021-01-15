// Resolver
const graphql = require('graphql');
const User = require('../db/user.js');

const { 
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString, 
  GraphQLInt, 
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = graphql;
  
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    everyUser: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return User.findById(args.id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const user = new User(args);
        return user.save();
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(args.id, args);
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args) {
        return User.findByIdAndRemove(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});