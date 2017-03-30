
#include "share/atspre_define.hats"
#include "{$LIBATSCC2JS}/staloadall.hats"

#include "../SATS/direct.sats"


%{^

function prompt_int(msg, v) {
  return parseInt(prompt(msg, v));
}

%}


extern fun
galert{a:vt@ype}(a): void = "mac#alert"


extern fun
prompt_int(string, int): int = "mac#prompt_int"




fun worker(ch: chendpt): void = let
  val a  = prompt_int("Enter a number:", 0)
  val () = chsend(ch, a)
  val () = galert("message sent!")

  val b  = prompt_int("Enter another number:", 0)
  val () = chsend(ch, b)
  val () = galert("message sent!")

  val n  = chrecv(ch)
  val () = galert(n)

in end


implement main0() = let
  val ch = make_webchan("ws://localhost:5000/")
  val co = go(worker, '(ch))
in end

