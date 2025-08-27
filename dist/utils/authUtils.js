"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginToGoogle = void 0;
const GoogleLoginPage_1 = require("../pages/GoogleLoginPage");
const loginToGoogle = async (page, username, password) => {
    const googleLoginPage = new GoogleLoginPage_1.GoogleLoginPage(page);
    try {
        await googleLoginPage.enterEmail(username);
        await googleLoginPage.enterPassword(password);
        await googleLoginPage.selectAllCheckboxes();
        await googleLoginPage.finalizeLogin();
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Google login process failed: ${error.message}`);
        }
        throw new Error('Google login process failed due to an unknown error');
    }
};
exports.loginToGoogle = loginToGoogle;
//# sourceMappingURL=authUtils.js.map