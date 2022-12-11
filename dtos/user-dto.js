class UserDto {
  userName;
  email;
  avatar;
  _id;

  constructor(user) {
    this.userName = user.userName;
    this.email = user.email;
    this.avatar = user.avatar;
    this._id = user._id;
  }
}

export default UserDto;
