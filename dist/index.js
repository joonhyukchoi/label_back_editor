"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketRoute_1 = require("./routes/socketRoute");
// const sslport = 443;
const sslport = 3001;
socketRoute_1.server.listen(sslport, () => {
    // eslint-disable-next-line no-console
    console.log('[HTTPS] Server is started on port 443');
});
