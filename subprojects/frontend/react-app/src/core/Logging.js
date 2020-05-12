import Environment from "../common/Environment";

const env = Environment.instance();
const log = (typeof console != 'undefined') && console.log;
const mock = () => {
};
export default log && env.logEnabled ? log : mock;