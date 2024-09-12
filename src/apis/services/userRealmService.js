import Realm from 'realm';

// Define the User schema
const UserSchema = {
    name: 'User',
    properties: {
        id: 'int',
        username: 'string',
        token: 'string',
        email: 'string?', // Optional
    },
    primaryKey: 'id',
};

const realm = new Realm({ schema: [UserSchema], schemaVersion: 1 });

const saveUser = (user) => {
    realm.write(() => {
        realm.create('User', user, Realm.UpdateMode.Modified);
    });
};

const getUser = () => {
    return realm.objects('User')[0];
};

const deleteUser = () => {
    realm.write(() => {
        let allUsers = realm.objects('User');
        realm.delete(allUsers);
    });
};

export { saveUser, getUser, deleteUser };
