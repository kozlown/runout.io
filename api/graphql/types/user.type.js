module.exports = new graphql.GraphQLObjectType({
    name: 'user',
    fields: function () {
        return {
            id: {
                type: graphql.GraphQLID
            },
            pseudo: {
                type: graphql.GraphQLString
            },
            confirmed: {
                type: graphql.GraphQLBoolean
            }
        }
    }
});
