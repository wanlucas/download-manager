import Youtube, { Format } from "./Youtube";

const format = process.argv.at(-2);
const url = process.argv.at(-1);

new Youtube().start(format as Format, url as string);