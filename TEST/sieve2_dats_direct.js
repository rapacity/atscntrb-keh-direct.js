function __patsfun_2__closurerize(env0, env1, env2) {
    return [
        function* (cenv) {
            return yield * __patsfun_2(cenv[1], cenv[2], cenv[3]);
        },
        env0,
        env1,
        env2
    ];
}
function __patsfun_5__closurerize(env0, env1, env2) {
    return [
        function* (cenv) {
            return yield * __patsfun_5(cenv[1], cenv[2], cenv[3]);
        },
        env0,
        env1,
        env2
    ];
}
function __patsfun_8__closurerize(env0) {
    return [
        function (cenv, arg0) {
            return __patsfun_8(cenv[1], arg0);
        },
        env0
    ];
}
function __patsfun_9__closurerize(env0, env1) {
    return [
        function* (cenv) {
            return yield * __patsfun_9(cenv[1], cenv[2]);
        },
        env0,
        env1
    ];
}
function __patsfun_12__closurerize(env0) {
    return [
        function* (cenv) {
            return yield * __patsfun_12(cenv[1]);
        },
        env0
    ];
}
function ch1filter_0(arg0, arg1) {
    var tmpret0;
    var tmp5;
    var tmp6;
    var tmp7;
    var tmp8;
    var tmplab, tmplab_js;
    tmp5 = _ats2keh_ch1make();
    tmp6 = tmp5[0];
    tmp7 = tmp5[1];
    tmp8 = _ats2keh_go_cloptr(__patsfun_2__closurerize(arg0, arg1, tmp7));
    tmpret0 = tmp6;
    return tmpret0;
}
function* loop_1(arg0, arg1, arg2) {
    var apy0;
    var apy1;
    var apy2;
    var tmp2;
    var tmp4;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        tmp2 = yield * _ats2keh_ch1recv_kehyield_(arg1);
        tmp4 = arg2[0](arg2, tmp2);
        if (tmp4) {
            yield * _ats2keh_ch1send_kehyield_(arg0, tmp2);
        } else {
        }
        apy0 = arg0;
        apy1 = arg1;
        apy2 = arg2;
        arg0 = apy0;
        arg1 = apy1;
        arg2 = apy2;
        funlab_js = 1;
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function* __patsfun_2(env0, env1, env2) {
    var tmplab, tmplab_js;
    yield * loop_1(env2, env0, env1);
    return;
}
function ch1iota_3(arg0, arg1) {
    var tmpret10;
    var tmp14;
    var tmp15;
    var tmp16;
    var tmp17;
    var tmplab, tmplab_js;
    tmp14 = _ats2keh_ch1make();
    tmp15 = tmp14[0];
    tmp16 = tmp14[1];
    tmp17 = _ats2keh_go_cloptr(__patsfun_5__closurerize(arg0, arg1, tmp16));
    tmpret10 = tmp15;
    return tmpret10;
}
function* loop_4(arg0, arg1, arg2) {
    var apy0;
    var apy1;
    var apy2;
    var tmp13;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        yield * _ats2keh_ch1send_kehyield_(arg0, arg1);
        tmp13 = ats2jspre_add_int0_int0(arg1, arg2);
        apy0 = arg0;
        apy1 = tmp13;
        apy2 = arg2;
        arg0 = apy0;
        arg1 = apy1;
        arg2 = apy2;
        funlab_js = 1;
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function* __patsfun_5(env0, env1, env2) {
    var tmplab, tmplab_js;
    yield * loop_4(env2, env0, env1);
    return;
}
function sieve_6(arg0) {
    var tmpret19;
    var tmp26;
    var tmp27;
    var tmp28;
    var tmp29;
    var tmplab, tmplab_js;
    tmp26 = _ats2keh_ch1make();
    tmp27 = tmp26[0];
    tmp28 = tmp26[1];
    tmp29 = _ats2keh_go_cloptr(__patsfun_9__closurerize(arg0, tmp28));
    tmpret19 = tmp27;
    return tmpret19;
}
function* loop_7(arg0, arg1) {
    var apy0;
    var apy1;
    var tmp21;
    var tmp23;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        tmp21 = yield * _ats2keh_ch1recv_kehyield_(arg0);
        yield * _ats2keh_ch1send_kehyield_(arg1, tmp21);
        tmp23 = ch1filter_0(arg0, __patsfun_8__closurerize(tmp21));
        apy0 = tmp23;
        apy1 = arg1;
        arg0 = apy0;
        arg1 = apy1;
        funlab_js = 1;
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function __patsfun_8(env0, arg0) {
    var tmpret24;
    var tmp25;
    var tmplab, tmplab_js;
    tmp25 = ats2jspre_mod_int0_int0(arg0, env0);
    tmpret24 = ats2jspre_gt_int0_int0(tmp25, 0);
    return tmpret24;
}
function* __patsfun_9(env0, env1) {
    var tmplab, tmplab_js;
    yield * loop_7(env0, env1);
    return;
}
function* consumer_10(arg0) {
    var apy0;
    var tmp32;
    var tmp34;
    var tmp35;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        tmp32 = yield * _ats2keh_ch1recv_kehyield_(arg0);
        tmp35 = ats2jspre_toString(tmp32);
        tmp34 = ats2jspre_string_append('received: ', tmp35);
        ats2jspre_console_log(tmp34);
        yield * _ats2keh_sleep_kehyield_(1000);
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
    var tmp38;
    var tmp39;
    var tmp40;
    var tmplab, tmplab_js;
    tmp38 = ch1iota_3(2, 1);
    tmp39 = sieve_6(tmp38);
    tmp40 = _ats2keh_go_cloptr(__patsfun_12__closurerize(tmp39));
    return;
}
function* __patsfun_12(env0) {
    var tmplab, tmplab_js;
    yield * consumer_10(env0);
    return;
}
function _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_sieve2_056_dats__dynload() {
    var tmplab, tmplab_js;
    if (ATSCKiseqz(_057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_sieve2_056_dats__dynloadflag)) {
        _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_sieve2_056_dats__dynloadflag = 1;
    }
    return;
}