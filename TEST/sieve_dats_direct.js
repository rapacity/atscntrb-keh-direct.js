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
function __patsfun_6__closurerize(env0, env1) {
    return [
        function* (cenv) {
            return yield * __patsfun_6(cenv[1], cenv[2]);
        },
        env0,
        env1
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
function __patsfun_8__closurerize(env0) {
    return [
        function* (cenv) {
            return yield * __patsfun_8(cenv[1]);
        },
        env0
    ];
}
function* filter_0(arg0, arg1, arg2) {
    var apy0;
    var apy1;
    var apy2;
    var tmp1;
    var tmp2;
    var tmp3;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        tmp1 = yield * _ats2keh_ch2recv_kehyield_(arg1);
        tmp3 = ats2jspre_mod_int0_int0(tmp1, arg0);
        tmp2 = ats2jspre_gt_int0_int0(tmp3, 0);
        if (tmp2) {
            yield * _ats2keh_ch2send_kehyield_(arg2, tmp1);
            apy0 = arg0;
            apy1 = arg1;
            apy2 = arg2;
            arg0 = apy0;
            arg1 = apy1;
            arg2 = apy2;
            funlab_js = 1;
        } else {
            apy0 = arg0;
            apy1 = arg1;
            apy2 = arg2;
            arg0 = apy0;
            arg1 = apy1;
            arg2 = apy2;
            funlab_js = 1;
        }
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function* sieve_1(arg0, arg1) {
    var apy0;
    var apy1;
    var tmp6;
    var tmp8;
    var tmp9;
    var tmp10;
    var tmp11;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        tmp6 = yield * _ats2keh_ch2recv_kehyield_(arg0);
        yield * _ats2keh_ch2send_kehyield_(arg1, tmp6);
        tmp8 = _ats2keh_ch2make();
        tmp9 = tmp8[0];
        tmp10 = tmp8[1];
        tmp11 = _ats2keh_go_cloptr1(__patsfun_2__closurerize(arg0, tmp6, tmp10));
        apy0 = tmp9;
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
function* __patsfun_2(env0, env1, env2) {
    var tmplab, tmplab_js;
    yield * filter_0(env1, env0, env2);
    return;
}
function* producer_3(arg0, arg1) {
    var apy0;
    var apy1;
    var tmp15;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        yield * _ats2keh_ch2send_kehyield_(arg0, arg1);
        tmp15 = ats2jspre_add_int0_int0(arg1, 1);
        apy0 = arg0;
        apy1 = tmp15;
        arg0 = apy0;
        arg1 = apy1;
        funlab_js = 1;
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function* consumer_4(arg0) {
    var apy0;
    var tmp17;
    var tmp19;
    var tmp20;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        tmp17 = yield * _ats2keh_ch2recv_kehyield_(arg0);
        tmp20 = ats2jspre_toString(tmp17);
        tmp19 = ats2jspre_string_append('received: ', tmp20);
        ats2jspre_console_log(tmp19);
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
    var tmp23;
    var tmp24;
    var tmp25;
    var tmp26;
    var tmp27;
    var tmp28;
    var tmp29;
    var tmp31;
    var tmp33;
    var tmplab, tmplab_js;
    tmp23 = _ats2keh_ch2make();
    tmp24 = tmp23[0];
    tmp25 = tmp23[1];
    tmp26 = _ats2keh_ch2make();
    tmp27 = tmp26[0];
    tmp28 = tmp26[1];
    tmp29 = _ats2keh_go_cloptr1(__patsfun_6__closurerize(tmp25, tmp27));
    tmp31 = _ats2keh_go_cloptr1(__patsfun_7__closurerize(tmp24));
    tmp33 = _ats2keh_go_cloptr1(__patsfun_8__closurerize(tmp28));
    return;
}
function* __patsfun_6(env0, env1) {
    var tmplab, tmplab_js;
    yield * sieve_1(env0, env1);
    return;
}
function* __patsfun_7(env0) {
    var tmplab, tmplab_js;
    yield * producer_3(env0, 2);
    return;
}
function* __patsfun_8(env0) {
    var tmplab, tmplab_js;
    yield * consumer_4(env0);
    return;
}
function _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_sieve_056_dats__dynload() {
    var tmplab, tmplab_js;
    if (ATSCKiseqz(_057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_sieve_056_dats__dynloadflag)) {
        _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_sieve_056_dats__dynloadflag = 1;
    }
    return;
}