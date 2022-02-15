/*
    Task One:
    Chosen type is the one given in examples.
    Implementations are straight forward and have been documented with the use of console logs after function calls.
    Functions made:
        1. match
        2. fold
        3. map
        4. find
        5. isEmpty
        6. contains
*/
var notStarted = function () {
    return { __tag: "notStarted" };
};
var finished = function (fin) {
    return {
        __tag: "finished",
        val: fin
    };
};
var progress = function (p) {
    return {
        __tag: "progress",
        val: { val: p }
    };
};
var paused = function (b) {
    return {
        __tag: "paused",
        val: b
    };
};
var isNotStarted = function (p) { return p.__tag === "notStarted"; };
var isFinished = function (p) { return p.__tag === "finished"; };
var isProgress = function (p) { return p.__tag === "progress"; };
var isPaused = function (p) { return p.__tag === "paused"; };
var ns = notStarted();
var fin = finished(100);
var prog = progress(25);
var psd = paused(true);
var fold = function (p, d) {
    if (isNotStarted(p)) {
        return d();
    }
    if (isFinished(p)) {
        return p.val;
    }
    if (isProgress(p)) {
        return p.val.val;
    }
    if (isPaused(p)) {
        return p.val;
    }
};
console.log("Fold - Progress(25): ", fold(prog, function () { return "default"; }));
var match = function (p, f, g, h, d) {
    if (isNotStarted(p)) {
        return d();
    }
    else if (isFinished(p)) {
        return f(p.val);
    }
    else if (isProgress(p)) {
        return g(p.val.val);
    }
    else if (isPaused(p)) {
        return h(p.val);
    }
};
console.log("NotStarted: ", match(ns, function (t) { return t + "%. Task is finished."; }, function (t) { return t.toString() + "%. Task is in progress."; }, function (t) { return t === true ? "Task is paused" : "Task is not paused"; }, function () { return "0%. Task has not started yet."; }));
console.log("Progress: ", match(prog, function (t) { return t + "%. Task is finished."; }, function (t) { return t.toString() + "%. Task is in progress."; }, function (t) { return t === true ? "Task is paused" : "Task is not paused"; }, function () { return "0%. Task has not started yet."; }));
console.log("Finished: ", match(fin, function (t) { return t + "%. Task is finished."; }, function (t) { return t.toString() + "%. Task is in progress."; }, function (t) { return t === true ? "Task is paused" : "Task is not paused"; }, function () { return "0%. Task has not started yet."; }));
console.log("Paused: ", match(psd, function (t) { return t + "%. Task is finished."; }, function (t) { return t.toString() + "%. Task is in progress."; }, function (t) { return t === true ? "Task is paused" : "Task is not paused"; }, function () { return "0%. Task has not started yet."; }));
var map = function (p, f, g, h) {
    if (isNotStarted(p)) {
        return notStarted();
    }
    else if (isFinished(p)) {
        return finished(f(p.val));
    }
    else if (isProgress(p)) {
        return progress(g(p.val.val));
    }
    else if (isPaused(p)) {
        return paused(h(p.val));
    }
};
console.log("map: ", map(fin, function (val) { return val + 200; }, function (val) { return val + 111; }, function (val) { return !val; }));
//find for arrays in js returns undefined if nothing is found
var find = function (p, val) {
    if (isFinished(p)) {
        return p.val === val ? p.val : undefined;
    }
    else if (isProgress(p)) {
        return p.val.val === val ? p.val : undefined;
    }
    else if (isPaused(p)) {
        return p.val === val ? p.val : undefined;
    }
    return undefined;
};
console.log("Find(100): ", find(fin, 100));
var isEmpty = function (p) { return isNotStarted(p) ? true : false; };
console.log("isEmpty - NotStarted: ", isEmpty(ns));
var contains = function (p, val) {
    if (isFinished(p)) {
        return p.val === val;
    }
    else if (isProgress(p)) {
        return p.val.val === val;
    }
    else if (isPaused(p)) {
        return p.val === val;
    }
    else {
        return false;
    }
};
console.log("Contains(25) with Finished", contains(fin, 25));
