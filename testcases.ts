let arr: number[] = [];
let obj = {};
const str: string = "str";
const num = 2;

// Array string literal should be disallowed
arr["bla"] = "1";

// Array string variable should be disallowed
arr[str] = "11";

// Array index by number should be allowed
arr[0] = 1;

// Array index by number variable should be allowed
arr[num] = 2;

// Object string literal should be allowed
obj["bla"] = "1";

// Object string variable should be allowed
obj[str] = "1";
