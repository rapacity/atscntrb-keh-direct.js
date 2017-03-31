
#include "share/atspre_define.hats"
#include "{$LIBATSCC2JS}/mylibies.hats"

#include "../SATS/direct.sats"



fun worker(ch: chendpt): void = let
  val a  = parseInt(prompt_some("Enter a number:", "0"))
  val () = chsend(ch, a)
  val () = alert("message sent!")

  val b  = parseInt(prompt_some("Enter another number:", "0"))
  val () = chsend(ch, b)
  val () = alert("message sent!")

  val n  = chrecv(ch)
  val () = alert(n)
in end


implement main0() = let
  val ch = make_webchan("ws://localhost:5000/")
  val co = go(worker, '(ch))
in end

