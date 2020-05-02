const log = (typeof console != 'undefined') && console.log;
const mock = () => {
};
export default log ? log : mock;