var statmp0;
var statmp4;
var statmp11;
function __patsfun_0__closurerize() {
    return [function (cenv, arg0) {
            return __patsfun_0(arg0);
        }];
}
function __patsfun_1__closurerize() {
    return [function (cenv, arg0) {
            return __patsfun_1(arg0);
        }];
}
function __patsfun_4__closurerize(env0) {
    return [
        function (cenv, arg0) {
            return __patsfun_4(cenv[1], arg0);
        },
        env0
    ];
}
function __patsfun_9__9__1__closurerize(env0, env1, env2) {
    return [
        function* (cenv) {
            return yield * __patsfun_9__9__1(cenv[1], cenv[2], cenv[3]);
        },
        env0,
        env1,
        env2
    ];
}
function __patsfun_10__10__1__closurerize(env0, env1, env2) {
    return [
        function* (cenv) {
            return yield * __patsfun_10__10__1(cenv[1], cenv[2], cenv[3]);
        },
        env0,
        env1,
        env2
    ];
}
function __patsfun_0(arg0) {
    var tmp3;
    var tmplab, tmplab_js;
    tmp3 = ats2jspre_JSmath_random();
    ats2jspre_arrayref_set_at(statmp0, arg0, tmp3);
    return;
}
function __patsfun_1(arg0) {
    var tmp7;
    var tmp8;
    var tmp9;
    var tmp10;
    var tmplab, tmplab_js;
    tmp9 = ats2jspre_arrayref_get_at(statmp0, arg0);
    tmp10 = ats2jspre_arrayref_get_at(statmp4, 0);
    tmp8 = ats2jspre_gt_double_double(tmp9, tmp10);
    if (tmp8) {
        tmp7 = ats2jspre_arrayref_get_at(statmp0, arg0);
    } else {
        tmp7 = ats2jspre_arrayref_get_at(statmp4, 0);
    }
    ats2jspre_arrayref_set_at(statmp4, 0, tmp7);
    return;
}
function make_color_2(arg0) {
    var tmpret12;
    var tmp13;
    var tmp14;
    var tmp15;
    var tmp16;
    var tmp17;
    var tmp18;
    var tmp19;
    var tmp20;
    var tmp21;
    var tmplab, tmplab_js;
    tmp16 = ats2jspre_mul_double_double(arg0, 255);
    tmp15 = ats2jspre_JSmath_round(tmp16);
    tmp14 = ats2jspre_sub_double_double(255, tmp15);
    tmp13 = ats2jspre_toString(tmp14);
    tmp21 = ats2jspre_string_append('rgb(', tmp13);
    tmp20 = ats2jspre_string_append(tmp21, ',');
    tmp19 = ats2jspre_string_append(tmp20, tmp13);
    tmp18 = ats2jspre_string_append(tmp19, ',');
    tmp17 = ats2jspre_string_append(tmp18, tmp13);
    tmpret12 = ats2jspre_string_append(tmp17, ')');
    return tmpret12;
}
function draw_3() {
    var tmp23;
    var tmplab, tmplab_js;
    tmp23 = ats2js_HTML5_canvas2d_getById('Patsoptaas-Evaluate-canvas');
    ats2js_HTML5_canvas2d_clearRect(tmp23, 0, 0, 920, 600);
    ats2jspre_arrayref_foreach_cloref(statmp0, 64, __patsfun_4__closurerize(tmp23));
    return;
}
function __patsfun_4(env0, arg0) {
    var tmp26;
    var tmp27;
    var tmp28;
    var tmp29;
    var tmp30;
    var tmp31;
    var tmp32;
    var tmp33;
    var tmp34;
    var tmp35;
    var tmp36;
    var tmp37;
    var tmp38;
    var tmp39;
    var tmp40;
    var tmp42;
    var tmp43;
    var tmplab, tmplab_js;
    tmp27 = ats2jspre_arrayref_get_at(statmp0, arg0);
    tmp26 = ats2jspre_div_double_double(tmp27, statmp11);
    tmp30 = ats2jspre_int2double(arg0);
    tmp31 = ats2jspre_int2double(920);
    tmp29 = ats2jspre_mul_double_double(tmp30, tmp31);
    tmp32 = ats2jspre_int2double(64);
    tmp28 = ats2jspre_div_double_double(tmp29, tmp32);
    tmp33 = ats2jspre_int2double(600);
    tmp35 = ats2jspre_int2double(920);
    tmp36 = ats2jspre_int2double(64);
    tmp34 = ats2jspre_div_double_double(tmp35, tmp36);
    tmp39 = ats2jspre_int2double(600);
    tmp38 = ats2jspre_mul_double_double(tmp26, tmp39);
    tmp40 = ats2jspre_neg_double(1);
    tmp37 = ats2jspre_mul_double_double(tmp38, tmp40);
    tmp42 = make_color_2(tmp26);
    ats2js_HTML5_canvas2d_set_fillStyle_string(env0, tmp42);
    tmp43 = ats2jspre_mul_double_double(tmp34, 0.8);
    ats2js_HTML5_canvas2d_fillRect(env0, tmp28, tmp33, tmp43, tmp37);
    return;
}
function* main0() {
    var tmplab, tmplab_js;
    my_dynload();
    yield * mergesort_8__8__1(statmp0, 0, 64);
    return;
}
function* mergesort_8__8__1(arg0, arg1, arg2) {
    var tmp67__1;
    var tmp68__1;
    var tmp69__1;
    var tmp70__1;
    var tmp71__1;
    var tmp73__1;
    var tmp77__1;
    var tmplab, tmplab_js;
    tmp67__1 = ats2jspre_gte_int1_int1(arg2, 2);
    if (tmp67__1) {
        tmp68__1 = ats2jspre_half_int1(arg2);
        tmp69__1 = ats2jspre_sub_int1_int1(arg2, tmp68__1);
        tmp70__1 = ats2jspre_add_int1_int1(arg1, tmp68__1);
        tmp71__1 = _ats2keh_go_cloptr(__patsfun_9__9__1__closurerize(arg0, arg1, tmp68__1));
        tmp73__1 = _ats2keh_go_cloptr(__patsfun_10__10__1__closurerize(arg0, tmp69__1, tmp70__1));
        yield * _ats2keh_join_kehyield_(tmp71__1);
        yield * _ats2keh_join_kehyield_(tmp73__1);
        tmp77__1 = ats2jspre_add_int1_int1(arg1, arg2);
        yield * merge_7__7__1(arg0, arg1, tmp70__1, tmp77__1);
    } else {
    }
    return;
}
function* __patsfun_9__9__1(env0, env1, env2) {
    var tmplab, tmplab_js;
    yield * mergesort_8__8__1(env0, env1, env2);
    return;
}
function* __patsfun_10__10__1(env0, env1, env2) {
    var tmplab, tmplab_js;
    yield * mergesort_8__8__1(env0, env2, env1);
    return;
}
function* merge_7__7__1(arg0, arg1, arg2, arg3) {
    var apy0;
    var apy1;
    var apy2;
    var apy3;
    var tmp56__1;
    var tmp57__1;
    var tmp58__1;
    var tmp59__1;
    var tmp60__1;
    var tmp61__1;
    var tmp63__1;
    var tmp64__1;
    var tmp65__1;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        tmp56__1 = ats2jspre_lt_int1_int1(arg1, arg2);
        if (tmp56__1) {
            tmp57__1 = ats2jspre_lt_int1_int1(arg2, arg3);
            if (tmp57__1) {
                tmp59__1 = ats2jspre_arrayref_get_at(arg0, arg2);
                tmp60__1 = ats2jspre_arrayref_get_at(arg0, arg1);
                tmp58__1 = ATSLIB_056_prelude__gcompare_val_val__16__1(tmp59__1, tmp60__1);
                tmp61__1 = ats2jspre_lte_int0_int0(tmp58__1, 0);
                if (tmp61__1) {
                    yield * move_left_6__6__1(arg0, arg1, arg2);
                    tmp63__1 = ats2jspre_add_int1_int1(arg1, 1);
                    tmp64__1 = ats2jspre_add_int1_int1(arg2, 1);
                    apy0 = arg0;
                    apy1 = tmp63__1;
                    apy2 = tmp64__1;
                    apy3 = arg3;
                    arg0 = apy0;
                    arg1 = apy1;
                    arg2 = apy2;
                    arg3 = apy3;
                    funlab_js = 1;
                } else {
                    tmp65__1 = ats2jspre_add_int1_int1(arg1, 1);
                    apy0 = arg0;
                    apy1 = tmp65__1;
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
function ATSLIB_056_prelude__gcompare_val_val__16__1(arg0, arg1) {
    var tmpret103__1;
    var tmplab, tmplab_js;
    tmpret103__1 = ats2jspre_compare_double_double(arg0, arg1);
    return tmpret103__1;
}
function* move_left_6__6__1(arg0, arg1, arg2) {
    var apy0;
    var apy1;
    var apy2;
    var tmp51__1;
    var tmp53__1;
    var tmp54__1;
    var funlab_js;
    var tmplab, tmplab_js;
    while (true) {
        funlab_js = 0;
        tmp51__1 = ats2jspre_eq_int1_int1(arg1, arg2);
        if (tmp51__1) {
        } else {
            tmp53__1 = ats2jspre_sub_int1_int1(arg2, 1);
            yield * array_swap_5__5__1(arg0, tmp53__1, arg2);
            tmp54__1 = ats2jspre_sub_int1_int1(arg2, 1);
            apy0 = arg0;
            apy1 = arg1;
            apy2 = tmp54__1;
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
function* array_swap_5__5__1(arg0, arg1, arg2) {
    var tmp45__1;
    var tmp47__1;
    var tmplab, tmplab_js;
    tmp45__1 = ats2jspre_arrayref_get_at(arg0, arg1);
    tmp47__1 = ats2jspre_arrayref_get_at(arg0, arg2);
    ats2jspre_arrayref_set_at(arg0, arg1, tmp47__1);
    ats2jspre_arrayref_set_at(arg0, arg2, tmp45__1);
    yield * _ats2keh_sleep_kehyield_(1);
    draw_3();
    return;
}
var _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_mergesort_056_dats__dynloadflag = 0;
function _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_mergesort_056_dats__dynload() {
    var tmplab, tmplab_js;
    if (ATSCKiseqz(_057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_mergesort_056_dats__dynloadflag)) {
        _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_mergesort_056_dats__dynloadflag = 1;
        statmp0 = ats2jspre_arrayref_make_elt(64, 0);
        ats2jspre_arrayref_foreach_cloref(statmp0, 64, __patsfun_0__closurerize());
        statmp4 = ats2jspre_arrayref_make_elt(1, 0);
        ats2jspre_arrayref_foreach_cloref(statmp0, 64, __patsfun_1__closurerize());
        statmp11 = ats2jspre_arrayref_get_at(statmp4, 0);
    }
    return;
}
function my_dynload() {
    var tmplab, tmplab_js;
    _057_home_057_unknown_057_world_057_courses_057_myatscontrib_057_node_modules_057_atscntrb_055_keh_055_direct_056_js_057_TEST_057_mergesort_056_dats__dynload();
    return;
}