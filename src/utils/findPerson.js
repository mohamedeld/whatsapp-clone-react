
function findPerson(user,users){
  return users[0]._id === user._id? users[1] : users[0]
}
export function findPersonName(user,users){
  return users[0]._id === user._id? users[1].name : users[0].name
}
export function findPersonPicture(user,users){
  return users[0]._id === user._id? users[1].picture : users[0].picture
}

export default findPerson;