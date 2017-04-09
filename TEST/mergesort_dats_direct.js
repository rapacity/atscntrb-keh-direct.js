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
function __patsfun_1__closurerize(env0) {
    return [
        function (cenv, arg0) {
            return __patsfun_1(cenv[1], arg0);
        },
        env0
    ];
}
function __patsfun_2__closurerize(env0, env1) {
    return [
        function (cenv, arg0) {
            return __patsfun_2(cenv[1], cenv[2], arg0);
        },
        env0,
        env1
    ];
}
function draw_4__4__1__closurerize(env0, env1) {
    return [
        function (cenv) {
            return draw_4__4__1(cenv[1], cenv[2]);
        },
        env0,
        env1
    ];
}
function __patsfun_5__5__1__closurerize(env0, env1, env2) {
    return [
        function (cenv, arg0) {
            return __patsfun_5__5__1(cenv[1], cenv[2], cenv[3], arg0);
        },
        env0,
        env1,
        env2
    ];
}
function* main0() {
    var tmp1;
    var tmp5;
    var tmp12;
    var tmplab, tmplab_js;
    tmp1 = ats2jspre_arrayref_make_elt(64, 0);
    ats2jspre_arrayref_foreach_cloref(tmp1, 64, __patsfun_1__closurerize(tmp1));
    tmp5 = ats2jspre_arrayref_make_elt(1, 0);
    ats2jspre_arrayref_foreach_cloref(tmp1, 64, __patsfun_2__closurerize(tmp1, tmp5));
    tmp12 = ats2jspre_arrayref_get_at(tmp5, 0);
    yield * mergesort_9__9__1(tmp1, tmp12, tmp1, 0, 64);
    return;
}
function __patsfun_1(env0, arg0) {
    var tmp4;
    var tmplab, tmplab_js;
    tmp4 = ats2jspre_JSmath_random();
    ats2jspre_arrayref_set_at(env0, arg0, tmp4);
    return;
}
function __patsfun_2(env0, env1, arg0) {
    var tmp8;
    var tmp9;
    var tmp10;
    var tmp11;
    var tmplab, tmplab_js;
    tmp10 = ats2jspre_arrayref_get_at(env0, arg0);
    tmp11 = ats2jspre_arrayref_get_at(env1, 0);
    tmp9 = ats2jspre_gt_double_double(tmp10, tmp11);
    if (tmp9) {
        tmp8 = ats2jspre_arrayref_get_at(env0, arg0);
    } else {
        tmp8 = ats2jspre_arrayref_get_at(env1, 0);
    }
    ats2jspre_arrayref_set_at(env1, 0, tmp8);
    return;
}
function* mergesort_9__9__1(env0, env1, arg0, arg1, arg2) {
    var tmp61__1;
    var tmp62__1;
    var tmp63__1;
    var tmp64__1;
    var tmp67__1;
    var tmplab, tmplab_js;
    tmp61__1 = ats2jspre_gte_int1_int1(arg2, 2);
    if (tmp61__1) {
        tmp62__1 = ats2jspre_half_int1(arg2);
        tmp63__1 = ats2jspre_sub_int1_int1(arg2, tmp62__1);
        tmp64__1 = ats2jspre_add_int1_int1(arg1, tmp62__1);
        yield * mergesort_9__9__1(env0, env1, arg0, arg1, tmp62__1);
        yield * mergesort_9__9__1(env0, env1, arg0, tmp64__1, tmp63__1);
        tmp67__1 = ats2jspre_add_int1_int1(arg1, arg2);
        yield * merge_8__8__1(env0, env1, arg0, arg1, tmp64__1, tmp67__1);
    } else {
    }
    return;
}
function* merge_8__8__1(env0, env1, arg0, arg1, arg2, arg3) {
    var apy0;
    var apy1;
    var apy2;
    var apy3;
    var tmp50__1;
    var tmp51__1;
    var tmp52__1;
    var tmp53__1;
    var tmp54__1;
    var tmp55__1;
    var tmp57__1;
    var tmp58__1;
    var tmp59__1;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        tmp50__1 = ats2jspre_lt_int1_int1(arg1, arg2);
        if (tmp50__1) {
            tmp51__1 = ats2jspre_lt_int1_int1(arg2, arg3);
            if (tmp51__1) {
                tmp53__1 = ats2jspre_arrayref_get_at(arg0, arg2);
                tmp54__1 = ats2jspre_arrayref_get_at(arg0, arg1);
                tmp52__1 = ATSLIB_056_prelude__gcompare_val_val__12__1(tmp53__1, tmp54__1);
                tmp55__1 = ats2jspre_lte_int0_int0(tmp52__1, 0);
                if (tmp55__1) {
                    yield * move_left_7__7__1(env0, env1, arg0, arg1, arg2);
                    tmp57__1 = ats2jspre_add_int1_int1(arg1, 1);
                    tmp58__1 = ats2jspre_add_int1_int1(arg2, 1);
                    apy0 = arg0;
                    apy1 = tmp57__1;
                    apy2 = tmp58__1;
                    apy3 = arg3;
                    arg0 = apy0;
                    arg1 = apy1;
                    arg2 = apy2;
                    arg3 = apy3;
                    funlab_js = 1;
                } else {
                    tmp59__1 = ats2jspre_add_int1_int1(arg1, 1);
                    apy0 = arg0;
                    apy1 = tmp59__1;
                    apy2 = arg2;
                    apy3 = arg3;
                    arg0 = apy0;
                    arg1 = apy1;
                    arg2 = apy2;
                    arg3 = apy3;
                    funlab_js = 1;
                }
            } else {
            }
        } else {
        }
        if (funlab_js > 0)
            continue;
        else
            return;
    }
}
function ATSLIB_056_prelude__gcompare_val_val__12__1(arg0, arg1) {
    var tmpret87__1;
    var tmplab, tmplab_js;
    tmpret87__1 = ats2jspre_compare_double_double(arg0, arg1);
    return tmpret87__1;
}
function* move_left_7__7__1(env0, env1, arg0, arg1, arg2) {
    var apy0;
    var apy1;
    var apy2;
    var tmp45__1;
    var tmp47__1;
    var tmp48__1;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        tmp45__1 = ats2jspre_eq_int1_int1(arg1, arg2);
        if (tmp45__1) {
        } else {
            tmp47__1 = ats2jspre_sub_int1_int1(arg2, 1);
            yield * array_swap_6__6__1(env0, env1, arg0, tmp47__1, arg2);
            tmp48__1 = ats2jspre_sub_int1_int1(arg2, 1);
            apy0 = arg0;
            apy1 = arg1;
            apy2 = tmp48__1;
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
function* array_swap_6__6__1(env0, env1, arg0, arg1, arg2) {
    var tmp39__1;
    var tmp41__1;
    var tmplab, tmplab_js;
    tmp39__1 = ats2jspre_arrayref_get_at(arg0, arg1);
    tmp41__1 = ats2jspre_arrayref_get_at(arg0, arg2);
    ats2jspre_arrayref_set_at(arg0, arg1, tmp41__1);
    ats2jspre_arrayref_set_at(arg0, arg2, tmp39__1);
    yield * _ats2keh_sleep_kehyield_(1);
    draw_4__4__1__closurerize(env0, env1)[0](draw_4__4__1__closurerize(env0, env1));
    return;
}
function draw_4__4__1(env0, env1) {
    var tmp24__1;
    var tmplab, tmplab_js;
    tmp24__1 = ats2js_HTML5_canvas2d_getById('Patsoptaas-Evaluate-canvas');
    ats2js_HTML5_canvas2d_clearRect(tmp24__1, 0, 0, 920, 600);
    ats2jspre_arrayref_foreach_cloref(env0, 64, __patsfun_5__5__1__closurerize(env0, env1, tmp24__1));
    return;
}
function __patsfun_5__5__1(env0, env1, env2, arg0) {
    var tmp27__1;
    var tmp28__1;
    var tmp29__1;
    var tmp30__1;
    var tmp31__1;
    var tmp32__1;
    var tmp33__1;
    var tmp34__1;
    var tmp36__1;
    var tmp37__1;
    var tmplab, tmplab_js;
    tmp28__1 = ats2jspre_arrayref_get_at(env0, arg0);
    tmp27__1 = ats2jspre_div_double_double(tmp28__1, env1);
    tmp30__1 = ats2jspre_mul_double_double(arg0, 920);
    tmp29__1 = ats2jspre_div_double_double(tmp30__1, 64);
    tmp31__1 = ats2jspre_div_double_double(920, 64);
    tmp33__1 = ats2jspre_mul_double_double(tmp27__1, 600);
    tmp34__1 = ats2jspre_neg_double(1);
    tmp32__1 = ats2jspre_mul_double_double(tmp33__1, tmp34__1);
    tmp36__1 = make_color_3__3__1(tmp27__1);
    ats2js_HTML5_canvas2d_set_fillStyle_string(env2, tmp36__1);
    tmp37__1 = ats2jspre_mul_double_double(tmp31__1, 0.8);
    ats2js_HTML5_canvas2d_fillRect(env2, tmp29__1, 600, tmp37__1, tmp32__1);
    return;
}
function make_color_3__3__1(arg0) {
    var tmpret13__1;
    var tmp14__1;
    var tmp15__1;
    var tmp16__1;
    var tmp17__1;
    var tmp18__1;
    var tmp19__1;
    var tmp20__1;
    var tmp21__1;
    var tmp22__1;
    var tmplab, tmplab_js;
    tmp17__1 = ats2jspre_mul_double_double(arg0, 255);
    tmp16__1 = ats2jspre_JSmath_round(tmp17__1);
    tmp15__1 = ats2jspre_sub_double_double(255, tmp16__1);
    tmp14__1 = ats2jspre_toString(tmp15__1);
    tmp22__1 = ats2jspre_string_append('rgb(', tmp14__1);
    tmp21__1 = ats2jspre_string_append(tmp22__1, ',');
    tmp20__1 = ats2jspre_string_append(tmp21__1, tmp14__1);
    tmp19__1 = ats2jspre_string_append(tmp20__1, ',');
    tmp18__1 = ats2jspre_string_append(tmp19__1, tmp14__1);
    tmpret13__1 = ats2jspre_string_append(tmp18__1, ')');
    return tmpret13__1;
}
function _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_mergesort_056_dats__dynload() {
    var tmplab, tmplab_js;
    if (ATSCKiseqz(_057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_mergesort_056_dats__dynloadflag)) {
        _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_mergesort_056_dats__dynloadflag = 1;
    }
    return;
}