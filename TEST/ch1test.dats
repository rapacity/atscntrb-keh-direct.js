
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
  val () = ch1send(ch, n);
  val () = producer(ch)
in end

fun consumer(ch: chendpt): void = let
  val n  = ch1recv(ch)
  val () = console_log("recieved from producer: " + n)
  val () = consumer(ch)
in end

implement main0() = let
  val '(chin0, chout0) = ch1make()
  val '(chin1, chout1) = ch1make()
  val () = ch1link(chin0, chout1)
  val _ = go(producer, '(chout0))
  val _ = go(consumer, '(chin1))
  val _ = go(helloloop)
in end
