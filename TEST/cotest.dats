
#include "share/atspre_define.hats"
#include "{$LIBATSCC2JS}/staloadall.hats"

#include "../SATS/direct.sats"

%{^

function console_log(a) {
  console.log(a);
}

function rand() {
  return Math.random();
}

%}

extern fun
console_log{a:vt@ype}(a): void = "mac#console_log"

extern fun
rand(): double = "mac#rand"

fun helloloop(ch: chendpt): void = let
  val () = console_log(if rand() > 0.5 then "HELLO" else "BYE")
  val () = sleep(2000)
  val () = helloloop(ch)
in end


fun producer(ch: chendpt): void = let
  val n  = rand() * 100000
  val () = sleep(1000)
  val () = chsend(ch, n);
  val () = producer(ch)
in end


fun consumer(ch: chendpt): void = let
  val n  = chrecv(ch)
  val () = console_log("recieved from producer: " + n)
  val () = consumer(ch)
in end


implement main0() = let
  val '(chneg, chpos) = make_channel()
  val _ = go(producer, '(chneg))
  val _ = go(consumer, '(chpos))
  val _ = go(helloloop)
in end

