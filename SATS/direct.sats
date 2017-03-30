
abstype coroutine
abstype chendpt

extern fun
yield{a:vt@ype}(): a = "mac#_ats2keh_kehyield_"

extern fun
go_apply{a,b:vt@ype}(a, b): coroutine = "mac#_ats2keh_addCoroutine"


extern fun
go_nil{a:vt@ype}(a): coroutine = "mac#_ats2keh_addCoroutine"

overload go with go_apply
overload go with go_nil

extern fun
make_channel{a:t@ype}(): '(chendpt, chendpt) = "mac#_ats2keh_makeDualChannel"

extern fun
chsend{a:vt@ype}(chendpt, a): void = "mac#_ats2keh_dualChannelWrite_kehyield_"

extern fun
chrecv{a:vt@ype}(chendpt): a = "mac#_ats2keh_dualChannelRead_kehyield_"

extern fun
sleep(int): void = "mac#_ats2keh_sleep_kehyield_"

extern fun
make_webchan(string): chendpt = "mac#_ats2keh_makeWebSocketChannel"

extern fun
main0(): void = "main0"

%{^
(function(){
  M.wakeup();
  if (main0 && main0.constructor) {
    if (main0.constructor.name === 'GeneratorFunction') M.addCoroutine(main0);
    else if (main0.constructor.name === 'Function') main0();
    M.wakeup();
  }
})();
%}

