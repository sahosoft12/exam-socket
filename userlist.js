const userList = [];
const userData = [];
function connectUsers(data) {
    const user = data;
    userList.push(user);
    return user;
}

function getUserByUserId(userid) {
    
    return userList.find(x => x.userId == userid);
}
function removeSocketId(id) {
    // userList = userList.filter(x => x.socketId !== id);
    const index = userList.findIndex(user => user.socketId === id);

    if (index !== -1) {
      userList.splice(index, 1)[0];
    }
}
function setData(data){
    userData.push(data);
}
function getData(userid){
    return userData.find(x=> x.userId == userid);
}

module.exports = {
    setData,
    getData,
    connectUsers,
    getUserByUserId,
    removeSocketId
};
