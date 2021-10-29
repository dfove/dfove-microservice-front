function f(n) {
    return Number(n) < 10 ? `0${n}` : n;
}
export function timeRange(format = "-", date = "日", v = 0) {
    let startTime = "";
    let currentTime = "";

    // 当前时间
    var current = new Date();
    const CY = current.getFullYear();
    const CM = f(current.getMonth() + 1);
    const CD = f(current.getDate());
    // const HH = f(current.getHours());
    // const MM = f(current.getMinutes());
    // const DD = f(current.getSeconds());
    // currentTime = `${CY}${format}${CM}${format}${CD} ${HH}:${MM}:${DD}`;
    currentTime = `${CY}${format}${CM}${format}${CD} 23:59:59`;

    if (!v) {
        return [currentTime, currentTime];
    }

    // 开始时间
    var start = new Date();
    start.setDate(start.getDate());
    start.setMonth(start.getMonth());
    start.setFullYear(start.getFullYear());

    switch (date) {
        case "日":
            start.setDate(start.getDate() - v);
            break;
        case "月":
            start.setMonth(start.getMonth() - v);
            break;
        case "年":
            start.setFullYear(start.getFullYear() - v);
            break;
    }
    const SY = start.getFullYear();
    const SM = f(start.getMonth() + 1);
    const SD = f(start.getDate());
    startTime = `${SY}${format}${SM}${format}${SD} 00:00:00`;

    console.log("开始时间", startTime);
    console.log("结束时间", currentTime);
    return [startTime, currentTime];
}