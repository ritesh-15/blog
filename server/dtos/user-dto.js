class UserDto {
  name;
  email;
  avatar;
  _id;

  constructor(user) {
    this.name = user.userName;
    this.email = user.email;
    this.avatar = user.avatar;
    this._id = user._id;
  }
}

export default UserDto;
