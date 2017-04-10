
abstype coroutine

absviewtype ch1in
absviewtype ch1out
absviewtype ch2endpt

extern fun
yield{a:vt@ype}(): a = "mac#_ats2keh_kehyield_"

extern fun
go_apply{a,b:vt@ype}(a, b): coroutine = "mac#_ats2keh_addCoroutine"

extern fun
go_nil{a:vt@ype}(a): coroutine = "mac#_ats2keh_addCoroutine"

extern fun
go_cloptr1(() -<lin,cloptr1> void): coroutine = "mac#_ats2keh_go_cloptr1"

macdef go(f) = go_cloptr1(llam() =<cloptr1> ,(f))

extern fun
sync1(coroutine): void = "mac#_ats2keh_sync_kehyield_"

extern fun
sync2(coroutine, coroutine): void = "mac#_ats2keh_sync_kehyield_"

extern fun
sync3(coroutine, coroutine, coroutine): void = "mac#_ats2keh_sync_kehyield_"

extern fun
sync4(coroutine, coroutine, coroutine, coroutine): void = "mac#_ats2keh_sync_kehyield_"

extern fun
sync5(coroutine, coroutine, coroutine, coroutine, coroutine): void = "mac#_ats2keh_sync_kehyield_"

overload sync with sync1
overload sync with sync2
overload sync with sync3
overload sync with sync4
overload sync with sync5


// --------------------------------------------------------------------------- 

extern fun
ch1make{a:t@ype}(): '(ch1in, ch1out) = "mac#_ats2keh_ch1make"

extern fun
ch1send{a:vt@ype}(!ch1out, a): void = "mac#_ats2keh_ch1send_kehyield_"

extern fun
ch1recv{a:vt@ype}(!ch1in): a = "mac#_ats2keh_ch1recv_kehyield_"

extern fun
ch1inclose(ch1in): void = "mac#_ats2keh_ch1inclose"

extern fun
ch1outclose(ch1out): void = "mac#_ats2keh_ch1outclose"

overload ch1close with ch1inclose
overload ch1close with ch1outclose


extern fun
ch1indup(!ch1in): ch1in = "mac#_ats2keh_ch1indup"

extern fun
ch1outdup(!ch1out): ch1out = "mac#_ats2keh_ch1outdup"

overload ch1dup with ch1indup
overload ch1dup with ch1outdup

extern fun
ch1link(ch1in, ch1out): void = "mac#_ats2keh_ch1link"

// --------------------------------------------------------------------------- 

extern fun
ch2make{a:t@ype}(): '(ch2endpt, ch2endpt) = "mac#_ats2keh_ch2make"

extern fun
ch2send{a:vt@ype}(!ch2endpt, a): void = "mac#_ats2keh_ch2send_kehyield_"

extern fun
ch2recv{a:vt@ype}(!ch2endpt): a = "mac#_ats2keh_ch2recv_kehyield_"

extern fun
ch2link(ch2endpt, ch2endpt): void = "mac#_ats2keh_ch2link"

extern fun
ch2close(ch2endpt): void = "mac#_ats2keh_ch2close"

extern fun
ch2dup(!ch2endpt): ch2endpt = "mac#_ats2keh_ch2dup"

extern fun
ch2split(ch2endpt): '(ch1in, ch1out) = "mac#_ats2keh_ch2split"



// --------------------------------------------------------------------------- 

extern fun
chmake_ws(string): ch2endpt = "mac#_ats2keh_makeWebSocketChannel"

//extern fun
//chmake_event(string, string): ch1in =

// --------------------------------------------------------------------------- 

extern fun
sleep(int): void = "mac#_ats2keh_sleep_kehyield_"

extern fun
main0(): void = "main0"

%{$
  window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false);
    (function(){
      M.wakeup();
      if (main0 && main0.constructor) {
        if (main0.constructor.name === 'GeneratorFunction') M.addCoroutine(main0);
        else if (main0.constructor.name === 'Function') M.addJobCallback(main0);
        M.wakeup();
      }
    })();
  });
%}

