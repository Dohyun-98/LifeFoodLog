export const isExpiration = (status) => {
  if (status === 401) {
    alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
    window.location.href = "/login";
    return;
  } else {
    return;
  }
};
