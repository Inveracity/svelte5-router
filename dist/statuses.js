/**
 * The available status codes that a route can have called out from the statuses
 * handler mapping.
 *
 * @see {@link Statuses}
 * @category Router
 */
export var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["PermanentRedirect"] = 301] = "PermanentRedirect";
    StatusCode[StatusCode["TemporaryRedirect"] = 302] = "TemporaryRedirect";
    StatusCode[StatusCode["BadRequest"] = 400] = "BadRequest";
    StatusCode[StatusCode["Unauthorized"] = 401] = "Unauthorized";
    StatusCode[StatusCode["Forbidden"] = 403] = "Forbidden";
    StatusCode[StatusCode["NotFound"] = 404] = "NotFound";
    StatusCode[StatusCode["InternalServerError"] = 500] = "InternalServerError";
})(StatusCode || (StatusCode = {}));
/**
 * Get the status by value.
 *
 * @param {number} value The value to get the status for.
 * @returns {StatusCode} The status.
 *
 * @see {@link StatusCode}
 * @category Router
 */
export const getStatusByValue = (value) => {
    return Object.keys(StatusCode)[Object.values(StatusCode).indexOf(value)];
};
