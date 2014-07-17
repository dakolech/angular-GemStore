function template(locals) {
var jade_debug = [{ lineno: 1, filename: "public/source//first.jade" }];
try {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (undefined) {
jade_debug.unshift({ lineno: 0, filename: "public/source//first.jade" });
jade_debug.unshift({ lineno: 1, filename: "public/source//first.jade" });
buf.push("<asdasd>");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 2, filename: "public/source//first.jade" });
buf.push("<sdd>");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 3, filename: "public/source//first.jade" });
buf.push("<assss>");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</assss>");
jade_debug.shift();
jade_debug.shift();
buf.push("</sdd>");
jade_debug.shift();
jade_debug.shift();
buf.push("</asdasd>");
jade_debug.shift();
jade_debug.shift();}("undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
} catch (err) {
  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "asdasd\r\n\tsdd\r\n\t\tassss");
}
}