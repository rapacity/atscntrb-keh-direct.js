function __patsfun_4__closurerize(env0) {
    return [
        function* (cenv) {
            return yield * __patsfun_4(cenv[1]);
        },
        env0
    ];
}
function __patsfun_5__closurerize(env0) {
    return [
        function* (cenv) {
            return yield * __patsfun_5(cenv[1]);
        },
        env0
    ];
}
function __patsfun_6__closurerize() {
    return [function* (cenv) {
            return yield * __patsfun_6();
        }];
}
function* helloloop_0() {
    var tmp2;
    var tmp3;
    var tmp4;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        tmp4 = ats2jspre_JSmath_random();
        tmp3 = ats2jspre_gt_double_double(tmp4, 0.5);
        if (tmp3) {
            tmp2 = 'HELLO';
        } else {
            tmp2 = 'BYE';
        }
        ats2jspre_console_log(tmp2);
        yield * _ats2keh_sleep_kehyield_(6000);
        funlab_js = 1;
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function* workerA_1(arg0) {
    var apy0;
    var tmp8;
    var tmp9;
    var tmp11;
    var tmp12;
    var tmp14;
    var tmp16;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        yield * _ats2keh_sleep_kehyield_(3000);
        tmp9 = ats2jspre_JSmath_random();
        tmp8 = ats2jspre_mul_double_int(tmp9, 100000);
        tmp12 = ats2jspre_toString(tmp8);
        tmp11 = ats2jspre_string_append('<workerA> send to workerB: ', tmp12);
        ats2jspre_console_log(tmp11);
        yield * _ats2keh_ch2send_kehyield_(arg0, tmp8);
        tmp14 = yield * _ats2keh_ch2recv_kehyield_(arg0);
        tmp16 = ats2jspre_string_append('<workerA> recv from workerB: ', tmp14);
        ats2jspre_console_log(tmp16);
        apy0 = arg0;
        arg0 = apy0;
        funlab_js = 1;
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function* workerB_2(arg0) {
    var apy0;
    var tmp19;
    var tmp21;
    var tmp22;
    var tmp23;
    var tmp25;
    var tmp26;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        yield * _ats2keh_sleep_kehyield_(3000);
        tmp19 = yield * _ats2keh_ch2recv_kehyield_(arg0);
        tmp21 = ats2jspre_string_append('<workerB> recv from workerA: ', tmp19);
        ats2jspre_console_log(tmp21);
        tmp23 = ats2jspre_JSmath_random();
        tmp22 = ats2jspre_mul_double_int(tmp23, 100000);
        tmp26 = ats2jspre_toString(tmp22);
        tmp25 = ats2jspre_string_append('<workerB> send to workerA: ', tmp26);
        ats2jspre_console_log(tmp25);
        yield * _ats2keh_ch2send_kehyield_(arg0, tmp22);
        apy0 = arg0;
        arg0 = apy0;
        funlab_js = 1;
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function main0() {
    var tmp29;
    var tmp30;
    var tmp31;
    var tmp32;
    var tmp33;
    var tmp34;
    var tmp35;
    var tmp36;
    var tmp37;
    var tmp40;
    var tmp42;
    var tmp44;
    var tmplab, tmplab_js;
    tmp29 = _ats2keh_ch2make();
    tmp30 = tmp29[0];
    tmp31 = tmp29[1];
    tmp32 = _ats2keh_ch2make();
    tmp33 = tmp32[0];
    tmp34 = tmp32[1];
    tmp35 = _ats2keh_ch2make();
    tmp36 = tmp35[0];
    tmp37 = tmp35[1];
    _ats2keh_ch2link(tmp31, tmp33);
    _ats2keh_ch2link(tmp34, tmp36);
    tmp40 = _ats2keh_go_cloptr(__patsfun_4__closurerize(tmp30));
    tmp42 = _ats2keh_go_cloptr(__patsfun_5__closurerize(tmp37));
    tmp44 = _ats2keh_go_cloptr(__patsfun_6__closurerize());
    return;
}
function* __patsfun_4(env0) {
    var tmplab, tmplab_js;
    yield * workerA_1(env0);
    return;
}
function* __patsfun_5(env0) {
    var tmplab, tmplab_js;
    yield * workerB_2(env0);
    return;
}
function* __patsfun_6() {
    var tmplab, tmplab_js;
    yield * helloloop_0();
    return;
}
function _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_ch2test_056_dats__dynload() {
    var tmplab, tmplab_js;
    if (ATSCKiseqz(_057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_ch2test_056_dats__dynloadflag)) {
        _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_ch2test_056_dats__dynloadflag = 1;
    }
    return;
}