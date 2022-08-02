"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logout = (req, res, next) => {
    res.clearCookie('token_uid');
    res.json({ success: true, message: 'User is logged out.' });
};
exports.default = logout;
//# sourceMappingURL=Logout.js.map