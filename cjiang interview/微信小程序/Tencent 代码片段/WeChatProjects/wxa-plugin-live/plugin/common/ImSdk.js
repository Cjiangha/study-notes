/**
 * Create by changsheng on 2019-05-30 17:42
 */

import WebIM from './webim_wx';
import WebIMHandler from './webim_handler';

export default {
    init(options) {
        WebIMHandler.init({
            accountMode: 0, // 1 托管，0 独立
            accountType: '36862',
            sdkAppID: '1400215171',
            selType: WebIM.SESSION_TYPE.GROUP,
            selToID: options.groupId,
            avChatRoomId: options.groupId,
        })
    },
};
