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

const USER_DEFAULT = [
  "_id",
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "roleId",
];

const POST_DEFAULT = [
  "_id",
  "title",
  "subTitle",
  "author",
  "categories",
  "tags",
  "status",
];
const TAG_DEFAULT = ["name", "_id", "status"];
const CATEGORY_DEFAULT = ["name", "_id", "status", "parentId"];

module.exports = {
  STATUS_ENUM,
  ACTIONS,
  KEY,
  POST_STATUS,
  TAG_DEFAULT,
  POST_DEFAULT,
  USER_DEFAULT,
  CATEGORY_DEFAULT,
};
