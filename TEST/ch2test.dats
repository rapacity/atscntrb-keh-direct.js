
#include "share/atspre_define.hats"
#include "{$LIBATSCC2JS}/mylibies.hats"

#include "../SATS/direct.sats"


fun helloloop(): void = let
  val () = console_log(if JSmath_random() > 0.5 then "HELLO" else "BYE")
  val () = sleep(6000)
  val () = helloloop()
in end

fun workerA(ch: ch2endpt): void = let
  val () = sleep(3000)
  val n  = JSmath_random() * 100000
  val () = console_log("<workerA> send to workerB: " + toString(n))
  val () = ch2send(ch, n)
  val n  = ch2recv(ch);
  val () = console_log("<workerA> recv from workerB: " + n)
  val () = workerA(ch)
in end

fun workerB(ch: ch2endpt): void = let
  val () = sleep(3000)
  val n  = ch2recv(ch)
  val () = console_log("<workerB> recv from workerA: " + n)
  val n  = JSmath_random() * 100000
  val () = console_log("<workerB> send to workerA: " + toString(n))
  val () = ch2send(ch, n);
  val () = workerB(ch)
in end

implement main0() = let
  val '(chneg0, chpos0) = ch2make()
  val '(chneg1, chpos1) = ch2make()
  val '(chneg2, chpos2) = ch2make()
  val () = ch2link(chpos0, chneg1)
  val () = ch2link(chpos1, chneg2)
  val _ = go(workerA(chneg0))
  val _ = go(workerB(chpos2))
  val _ = go(helloloop())
in end

