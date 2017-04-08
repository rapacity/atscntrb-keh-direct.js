window.addEventListener('load', function load(event) {
    window.removeEventListener('load', load, false);
    (function () {
        M.wakeup();
        if (main0 && main0.constructor) {
            if (main0.constructor.name === 'GeneratorFunction')
                M.addCoroutine(main0);
            else if (main0.constructor.name === 'Function')
                M.addJobCallback(main0);
            M.wakeup();
        }
    }());
});
function __patsfun_5__closurerize(env0) {
    return [
        function* (cenv) {
            return yield * __patsfun_5(cenv[1]);
        },
        env0
    ];
}
function __patsfun_6__closurerize(env0) {
    return [
        function* (cenv) {
            return yield * __patsfun_6(cenv[1]);
        },
        env0
    ];
}
function __patsfun_7__closurerize(env0) {
    return [
        function* (cenv) {
            return yield * __patsfun_7(cenv[1]);
        },
        env0
    ];
}
function* worker0_0(arg0) {
    var apy0;
    var tmp2;
    var tmp3;
    var tmp5;
    var tmp6;
    var tmp8;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        yield * _ats2keh_sleep_kehyield_(3000);
        tmp3 = ats2jspre_JSmath_random();
        tmp2 = ats2jspre_mul_double_int(tmp3, 100000);
        tmp5 = [
            0,
            tmp2
        ];
        yield * _ats2keh_ch2send_kehyield_(arg0, tmp5);
        tmp6 = yield * _ats2keh_ch2recv_kehyield_(arg0);
        tmp8 = ats2jspre_string_append('<worker0> recv: ', tmp6);
        ats2jspre_console_log(tmp8);
        apy0 = arg0;
        arg0 = apy0;
        funlab_js = 1;
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function* worker1_1(arg0) {
    var apy0;
    var tmp11;
    var tmp13;
    var tmp14;
    var tmp15;
    var tmp17;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        yield * _ats2keh_sleep_kehyield_(3000);
        tmp11 = yield * _ats2keh_ch2recv_kehyield_(arg0);
        tmp13 = ats2jspre_string_append('<worker1> recv: ', tmp11);
        ats2jspre_console_log(tmp13);
        tmp15 = ats2jspre_JSmath_random();
        tmp14 = ats2jspre_mul_double_int(tmp15, 100000);
        tmp17 = [
            1,
            tmp14
        ];
        yield * _ats2keh_ch2send_kehyield_(arg0, tmp17);
        apy0 = arg0;
        arg0 = apy0;
        funlab_js = 1;
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function* worker2_2(arg0) {
    var apy0;
    var tmp20;
    var tmp22;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        yield * _ats2keh_sleep_kehyield_(3000);
        tmp20 = yield * _ats2keh_ch2recv_kehyield_(arg0);
        tmp22 = ats2jspre_string_append('<worker2> logged: ', tmp20);
        ats2jspre_console_log(tmp22);
        apy0 = arg0;
        arg0 = apy0;
        funlab_js = 1;
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function ch3link_3(arg0, arg1, arg2) {
    var tmp24;
    var tmp25;
    var tmp26;
    var tmplab, tmplab_js;
    tmp24 = _ats2keh_ch2dup(arg0);
    tmp25 = _ats2keh_ch2dup(arg1);
    tmp26 = _ats2keh_ch2dup(arg2);
    _ats2keh_ch2link(arg0, arg1);
    _ats2keh_ch2link(tmp24, arg2);
    _ats2keh_ch2link(tmp25, tmp26);
    return;
}
function main0() {
    var tmp30;
    var tmp31;
    var tmp32;
    var tmp33;
    var tmp34;
    var tmp35;
    var tmp36;
    var tmp37;
    var tmp38;
    var tmp40;
    var tmp42;
    var tmp44;
    var tmplab, tmplab_js;
    tmp30 = _ats2keh_ch2make();
    tmp31 = tmp30[0];
    tmp32 = tmp30[1];
    tmp33 = _ats2keh_ch2make();
    tmp34 = tmp33[0];
    tmp35 = tmp33[1];
    tmp36 = _ats2keh_ch2make();
    tmp37 = tmp36[0];
    tmp38 = tmp36[1];
    ch3link_3(tmp32, tmp35, tmp38);
    tmp40 = _ats2keh_go_cloptr1(__patsfun_5__closurerize(tmp31));
    tmp42 = _ats2keh_go_cloptr1(__patsfun_6__closurerize(tmp34));
    tmp44 = _ats2keh_go_cloptr1(__patsfun_7__closurerize(tmp37));
    return;
}
function* __patsfun_5(env0) {
    var tmplab, tmplab_js;
    yield * worker0_0(env0);
    return;
}
function* __patsfun_6(env0) {
    var tmplab, tmplab_js;
    yield * worker1_1(env0);
    return;
}
function* __patsfun_7(env0) {
    var tmplab, tmplab_js;
    yield * worker2_2(env0);
    return;
}
function _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_group3_056_dats__dynload() {
    var tmplab, tmplab_js;
    if (ATSCKiseqz(_057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_group3_056_dats__dynloadflag)) {
        _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_group3_056_dats__dynloadflag = 1;
    }
    return;
}