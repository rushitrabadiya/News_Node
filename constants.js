const STATUS_ENUM = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  ARCHIVED: "archived",
  DELETED: "deleted",
  VERIFIED: "verified",
  UNVERIFIED: "unverified",
  BLOCKED: "blocked",
});

const ACTIONS = Object.freeze({
  READ: "READ",
  CREATE: "CREATE",
  EDIT: "EDIT",
  DELETE: "DELETE",
});

const KEY = Object.freeze({
  TAGS: "TAGS",
  USERS: "USERS",
  CATEGORIES: "CATEGORIES",
  MENU: "MENU",
  ROLES: "ROLES",
});
module.exports = { STATUS_ENUM, ACTIONS, KEY };
