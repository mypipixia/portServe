//权限判断
const panDuan = (ctx, index) => {
  let { role } = ctx.state.user || { role: '' };
  if (!role) {
    return false;
  }
  if (role == '*') {
    return true;
  } else {
    let flag = role.includes(index);
    return flag;
  }
};

module.exports = panDuan;
