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
function* worker_0(arg0) {
    var tmp1;
    var tmp2;
    var tmp5;
    var tmp6;
    var tmp9;
    var tmplab, tmplab_js;
    tmp2 = ats2jspre_prompt_some('Enter a number:', '0');
    tmp1 = ats2jspre_parseInt_1(tmp2);
    yield * _ats2keh_dualChannelWrite_kehyield_(arg0, tmp1);
    ats2jspre_alert('message sent!');
    tmp6 = ats2jspre_prompt_some('Enter another number:', '0');
    tmp5 = ats2jspre_parseInt_1(tmp6);
    yield * _ats2keh_dualChannelWrite_kehyield_(arg0, tmp5);
    ats2jspre_alert('message sent!');
    tmp9 = yield * _ats2keh_dualChannelRead_kehyield_(arg0);
    ats2jspre_alert(tmp9);
    return;
}
function main0() {
    var tmp11;
    var tmp12;
    var tmp13;
    var tmplab, tmplab_js;
    tmp11 = _ats2keh_makeWebSocketChannel('ws://localhost:5000/');
    tmp13 = [tmp11];
    tmp12 = _ats2keh_addCoroutine(worker_0, tmp13);
    return;
}
function _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_wstest_056_dats__dynload() {
    var tmplab, tmplab_js;
    if (ATSCKiseqz(_057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_wstest_056_dats__dynloadflag)) {
        _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_wstest_056_dats__dynloadflag = 1;
    }
    return;
}