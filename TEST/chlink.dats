
#include "share/atspre_define.hats"
#include "{$LIBATSCC2JS}/mylibies.hats"

#include "../SATS/direct.sats"


fun helloloop(): void = let
  val () = console_log(if JSmath_random() > 0.5 then "HELLO" else "BYE")
  val () = sleep(2000)
  val () = helloloop()
in end

fun producer(ch: chendpt): void = let
  val n  = JSmath_random() * 100000
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
  val '(chneg0, chpos0) = chmake()
  val '(chneg1, chpos1) = chmake()
  val () = chlink(chpos0, chneg1)
  val _ = go(producer, '(chneg0))
  val _ = go(consumer, '(chpos1))
  val _ = go(helloloop)
in end

