errorInfo = {
    SERVER_REQUEST_OK:[0,'请求成功'],
    SERVER_ERROR:[1000,'服务器出问题了'],
    SERVER_REQUEST_FAIL:[1001,'请求失败'],
    SERVER_NO_DATA:[2000,'没有数据'],
    SERVER_PARAMS_ERROR:[2001,'参数错误'],
    USER_CREATE_FAIL:[3000,'用户创建失败'],
    USER_LOGIN_FAIL:[3001,'用户登录失败'],
    USER_NOT_FIND:[3002,'没有找到用户'],
    USER_CODE_INVALID:[3003,'无效的code没有解出来openid'],
    USER_NOT_LOGIN:[3004,'用户未登录'],
    ACTIVITY_ERROR:[4000, '活动异常']
}

module.exports = errorInfo;
