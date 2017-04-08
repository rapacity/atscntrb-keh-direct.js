
#include "share/atspre_define.hats"
#include "{$LIBATSCC2JS}/mylibies.hats"

#include "../SATS/direct.sats"



fun worker(ch: ch2endpt): void = let
  val a  = parseInt(prompt_some("Enter a number:", "0"))
  val () = ch2send(ch, a)
  val () = alert("message sent!")

  val b  = parseInt(prompt_some("Enter another number:", "0"))
  val () = ch2send(ch, b)
  val () = alert("message sent!")

  val n  = ch2recv(ch)
  val () = alert(n)

  val () = ch2close(ch)
in end


implement main0() = let
  val ch = chmake_ws("ws://localhost:5000/")
  val co = go(worker(ch))
in end

