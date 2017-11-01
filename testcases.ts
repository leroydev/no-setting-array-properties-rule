let arr: number[] = [];
const str: string = "str";
const num = 2;

//String literal should be disallowed
arr["bla"] = "1";

//String variable should be disallowed
arr[str] = "11";

//Array index by number should be allowed
arr[0] = 1;

//Array index by number variable should be allowed
arr[num] = 2;