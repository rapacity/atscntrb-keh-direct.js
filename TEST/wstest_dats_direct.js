(function () {
    M.wakeup();
    if (main0 && main0.constructor) {
        if (main0.constructor.name === 'GeneratorFunction')
            M.addCoroutine(main0);
        else if (main0.constructor.name === 'Function')
            main0();
        M.wakeup();
    }
}());
function prompt_int(msg, v) {
    return parseInt(prompt(msg, v));
}
function* worker_0(arg0) {
    var tmp1;
    var tmp4;
    var tmp7;
    var tmplab, tmplab_js;
    tmp1 = prompt_int('Enter a number:', 0);
    yield * _ats2keh_dualChannelWrite_kehyield_(arg0, tmp1);
    alert('message sent!');
    tmp4 = prompt_int('Enter another number:', 0);
    yield * _ats2keh_dualChannelWrite_kehyield_(arg0, tmp4);
    alert('message sent!');
    tmp7 = yield * _ats2keh_dualChannelRead_kehyield_(arg0);
    alert(tmp7);
    return;
}
function main0() {
    var tmp9;
    var tmp10;
    var tmp11;
    var tmplab, tmplab_js;
    tmp9 = _ats2keh_makeWebSocketChannel('ws://localhost:5000/');
    tmp11 = [tmp9];
    tmp10 = _ats2keh_addCoroutine(worker_0, tmp11);
    return;
}
function _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_wstest_056_dats__dynload() {
    var tmplab, tmplab_js;
    if (ATSCKiseqz(_057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_wstest_056_dats__dynloadflag)) {
        _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_wstest_056_dats__dynloadflag = 1;
    }
    return;
}