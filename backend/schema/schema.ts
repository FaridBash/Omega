// const { User, groups } =require("../sampleData.js");

const Group = require("../models/Group.js");
const User = require("../models/User.js");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const GroupType = new GraphQLObjectType({
  name: "Group",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    catagory: { type: GraphQLString },
    members: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({ _id: parent.members });
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    birthDate: { type: GraphQLString },
    address: { type: GraphQLString },
    gender: { type: GraphQLString },
    qualifications: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    groups: {
      type: new GraphQLList(GroupType),
      resolve(parent, args) {
        return Group.find();
      },
    },
    group: {
      type: GroupType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Group.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        birthDate: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        gender: { type: GraphQLNonNull(GraphQLString) },
        qualifications: { type: GraphQLNonNull(GraphQLString) },
        role: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
          phone: args.phone,
          birthDate: args.birthDate,
          address: args.address,
          gender: args.gender,
          qualifications: args.qualifications,
          role: args.role,
        });
        return user.save();
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findByIdAndDelete(args.id);
      },
    },
    updateUser: {
        type: UserType,
        args: {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString },
            phone: { type: GraphQLString },
            birthDate: { type: GraphQLString },
            address: { type: GraphQLString },
            gender: { type: GraphQLString },
            qualifications: { type: GraphQLString },
            role: { type: GraphQLString },
        },
        resolve(parent, args) {
            return User.findByIdAndUpdate({
                $set: {
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    phone: args.phone,
                    birthDate: args.birthDate,
                    address: args.address,
                    gender: args.gender,
                    qualifications: args.qualifications,
                    role: args.role,
                }
            }),
            { new: false }
        },
    },
    addGroup: {
      type: GroupType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "GroupStatus",
            values: {
              new: { value: "Inactive" },
              active: { value: "Active" },
              completed: { value: "Completed" },
            },
          }),
          default: "Inactive",
        },
        startDate: { type: GraphQLNonNull(GraphQLString) },
        endDate: { type: GraphQLNonNull(GraphQLString) },
        catagory: { type: GraphQLNonNull(GraphQLString) },
        members: { type: GraphQLList(GraphQLID) },
      },
      resolve(parent, args) {
        const group = new Group({
          name: args.name,
          description: args.description,
          status: args.status,
          startDate: args.startDate,
          endDate: args.endDate,
          catagory: args.catagory,
          members: args.members,
        });
        return group.save();
      },
    },
    deleteGroup: {
      type: GroupType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Group.findByIdAndDelete(args.id);
      },
    },
    updateGroup: {
      type: GroupType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "GroupStatusUpdate",
            values: {
              new: { value: "Inactive" },
              active: { value: "Active" },
              completed: { value: "Completed" },
            },
          }),
        },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        catagory: { type: GraphQLString },
        members: { type: GraphQLList(GraphQLID) },
      },
      resolve(parent, args) {
        return Group.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
              startDate: args.startDate,
              endDate: args.endDate,
              catagory: args.catagory,
              members: args.members,
            },
          },
          { new: false }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
