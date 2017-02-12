let userType  = require('../types/user.type')
let userModel = require('../../models/user.model')

module.exports = new graphql.GraphQLObjectType({
    name: 'userQuery',
    fields: function () {
        return {
            users: {
                type: new graphql.GraphQLList(userType),
                args: {
                    id: {
                        type: graphql.GraphQLID
                    },
                    pseudo: {
                        type: graphql.GraphQLString
                    },
                    confirmed: {
                        type: graphql.GraphQLBoolean
                    }
                },
                resolve: function (root, {id, pseudo, confirmed}) {
                    return userModel({id, pseudo, confirmed});
                }
            }
        }
    }
});
