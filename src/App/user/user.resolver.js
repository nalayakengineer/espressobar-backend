import users from '../../db/user';

const User = (_, args) => {
    return users.filter(user => user._id === args._id)
}


export default {
    Query: {
        User
    }
}