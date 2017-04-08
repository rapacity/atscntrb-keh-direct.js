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
        yield * _ats2keh_sleep_kehyield_(2000);
        funlab_js = 1;
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function* producer_1(arg0) {
    var apy0;
    var tmp7;
    var tmp8;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        tmp8 = ats2jspre_JSmath_random();
        tmp7 = ats2jspre_mul_double_int(tmp8, 100000);
        yield * _ats2keh_sleep_kehyield_(1000);
        yield * _ats2keh_ch1send_kehyield_(arg0, tmp7);
        apy0 = arg0;
        arg0 = apy0;
        funlab_js = 1;
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function* consumer_2(arg0) {
    var apy0;
    var tmp12;
    var tmp14;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        tmp12 = yield * _ats2keh_ch1recv_kehyield_(arg0);
        tmp14 = ats2jspre_string_append('recieved from producer: ', tmp12);
        ats2jspre_console_log(tmp14);
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
    var tmp16;
    var tmp17;
    var tmp18;
    var tmp19;
    var tmp20;
    var tmp21;
    var tmp22;
    var tmp23;
    var tmp24;
    var tmp27;
    var tmp29;
    var tmp31;
    var tmplab, tmplab_js;
    tmp16 = _ats2keh_ch1make();
    tmp17 = tmp16[0];
    tmp18 = tmp16[1];
    tmp19 = _ats2keh_ch1make();
    tmp20 = tmp19[0];
    tmp21 = tmp19[1];
    tmp22 = _ats2keh_ch1make();
    tmp23 = tmp22[0];
    tmp24 = tmp22[1];
    _ats2keh_ch1link(tmp17, tmp21);
    _ats2keh_ch1link(tmp20, tmp24);
    tmp27 = _ats2keh_go_cloptr1(__patsfun_4__closurerize(tmp18));
    tmp29 = _ats2keh_go_cloptr1(__patsfun_5__closurerize(tmp23));
    tmp31 = _ats2keh_go_cloptr1(__patsfun_6__closurerize());
    return;
}
function* __patsfun_4(env0) {
    var tmplab, tmplab_js;
    yield * producer_1(env0);
    return;
}
function* __patsfun_5(env0) {
    var tmplab, tmplab_js;
    yield * consumer_2(env0);
    return;
}
function* __patsfun_6() {
    var tmplab, tmplab_js;
    yield * helloloop_0();
    return;
}
function _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_ch1test_056_dats__dynload() {
    var tmplab, tmplab_js;
    if (ATSCKiseqz(_057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_ch1test_056_dats__dynloadflag)) {
        _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_ch1test_056_dats__dynloadflag = 1;
    }
    return;
}