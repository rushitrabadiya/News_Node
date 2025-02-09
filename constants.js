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

const POST_STATUS = Object.freeze({
  PUBLISHED: "published",
  DRAFT: "draft",
  PENDING: "pending",
  ARCHIVED: "archived",
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
  POSTS: "POSTS",
});
module.exports = { STATUS_ENUM, ACTIONS, KEY, POST_STATUS };
