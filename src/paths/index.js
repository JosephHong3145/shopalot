class Parts {
  static home = "";
  static profile = "profile";
  static myProfile = "my-profile";
  static items = "items";
  static signup = "signup";
  static login = "login";
  static orderConfirmation = "order-confirmation";
  static createItem = "create-item";
  static editItem = "edit-item";
  static myOrders = "my-orders";
}

export class Paths {
  static home = () => `/${Parts.home}`;
  static profile = (profileId) =>
    `/${Parts.profile}/${Paths.profilePath(profileId)}`;

  static profilePath = (profileId) => profileId ?? ":profileId";
  static myProfile = () => `/${Parts.myProfile}`;
  static items = () => `/${Parts.items}`;
  static item = (itemId) => `/${Parts.items}/${Paths.itemPath(itemId)}`;
  static itemPath = (itemId) => itemId ?? ":itemId";
  static signup = () => `/${Parts.signup}`;
  static login = () => `/${Parts.login}`;
  static orderConfirmation = () => `/${Parts.orderConfirmation}`;
  static createItem = () => `/${Parts.createItem}`;
  static editItem = (itemId) => `/${Parts.editITem}/${Paths.itemPath(itemId)}`;
  static myOrders = () => `/${Parts.myOrders}`;
}
