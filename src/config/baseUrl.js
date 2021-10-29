const http = "http://";
const url = "192.168.31.106";
const port = ":8800";
// const url = window.location.hostname;
// const port = `:${window.location.port}`

const baseUrl = `${http}${url}${port}`;
export default {
    admin: `${baseUrl}/admin/dfove/v1`,
};