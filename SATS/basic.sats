
abstype coroutine

absviewtype ch1in
absviewtype ch1out
absviewtype ch2endpt

fun
yield{a:vt@ype}(): a = "mac#_ats2keh_kehyield_"

fun
go_apply{a,b:vt@ype}(a, b): coroutine = "mac#_ats2keh_addCoroutine"

fun
go_nil{a:vt@ype}(a): coroutine = "mac#_ats2keh_addCoroutine"

fun
go_cloptr(() -<lin,cloptr1> void): coroutine = "mac#_ats2keh_go_cloptr"

macdef go(f) = go_cloptr(llam() =<lin,cloptr1> ,(f))

fun
join(coroutine): void = "mac#_ats2keh_join_kehyield_"

// --------------------------------------------------------------------------- 

fun
ch1make{a:t@ype}(): '(ch1in, ch1out) = "mac#_ats2keh_ch1make"

fun
ch1send{a:vt@ype}(!ch1out, a): void = "mac#_ats2keh_ch1send_kehyield_"

fun
ch1recv{a:vt@ype}(!ch1in): a = "mac#_ats2keh_ch1recv_kehyield_"

fun
ch1inclose(ch1in): void = "mac#_ats2keh_ch1inclose"

fun
ch1outclose(ch1out): void = "mac#_ats2keh_ch1outclose"

overload ch1close with ch1inclose
overload ch1close with ch1outclose

fun
ch1infree(ch1in): void = "mac#_ats2keh_ch1inclose"

fun
ch1outfree(ch1out): void = "mac#_ats2keh_ch1outclose"

fun
ch1indup(!ch1in): ch1in = "mac#_ats2keh_ch1indup"

fun
ch1outdup(!ch1out): ch1out = "mac#_ats2keh_ch1outdup"

overload ch1dup with ch1indup
overload ch1dup with ch1outdup

fun
ch1link(ch1in, ch1out): void = "mac#_ats2keh_ch1link"

// --------------------------------------------------------------------------- 

fun
ch2make{a:t@ype}(): '(ch2endpt, ch2endpt) = "mac#_ats2keh_ch2make"

fun
ch2send{a:vt@ype}(!ch2endpt, a): void = "mac#_ats2keh_ch2send_kehyield_"

fun
ch2recv{a:vt@ype}(!ch2endpt): a = "mac#_ats2keh_ch2recv_kehyield_"

fun
ch2link(ch2endpt, ch2endpt): void = "mac#_ats2keh_ch2link"

fun
ch2close(ch2endpt): void = "mac#_ats2keh_ch2close"

fun
ch2dup(!ch2endpt): ch2endpt = "mac#_ats2keh_ch2dup"

fun
ch2split(ch2endpt): '(ch1in, ch1out) = "mac#_ats2keh_ch2split"



// --------------------------------------------------------------------------- 

fun
chmake_ws(string): ch2endpt = "mac#_ats2keh_makeWebSocketChannel"

//extern fun
//chmake_event(string, string): ch1in =

// --------------------------------------------------------------------------- 

fun
wakeup(): void = "mac#_ats2keh_wakeup"

fun
msleep(int): void = "mac#_ats2keh_sleep_kehyield_"

fun
main0(): void = "main0"



