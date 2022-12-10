const BASE_URL = "http://localhost:8000";

export const API = {
  //   MAIN: `${BASE_URL}/main`,
  //   MYPAGE: `${BASE_URL}/users/private/user`,
  //   USER_PAGE: `${BASE_URL}/users/public/user`,
  //   SIGNUP: `${BASE_URL}/users/signup`,
  //   WRITERDATA: `${BASE_URL}/users/?user_tag_id=`,
  //   TAGDATA: `${BASE_URL}/branch_tags/userTagList`,
  //   DITAILLIST: `${BASE_URL}/postings`,
  //   KEYWORDS: `${BASE_URL}/keywords/list`,
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/users`,
  SENDMAIL: `${BASE_URL}/auth/mail`,
  VRYMAIL: `${BASE_URL}/auth/authentication`,
  GETMAINCATEGORY: `${BASE_URL}/main-category`,
  GETSUBCATEGORY: `${BASE_URL}/sub-category/`,
  GETFOODS: `${BASE_URL}/foods/`,
  //   RELATED: `${BASE_URL}/postings`,
};
