
#include "share/atspre_define.hats"
#include "{$LIBATSCC2JS}/mylibies.hats"

staload "./../SATS/basic.sats"


fun helloloop(): void = let
  val () = console_log(if JSmath_random() > 0.5 then "HELLO" else "BYE")
  val () = msleep(2000)
  val () = helloloop()
in end

fun producer(ch: ch1out): void = let
  val n  = JSmath_random() * 100000
  val () = msleep(1000)
  val () = ch1send(ch, n);
  val () = producer(ch)
in end

fun consumer(ch: ch1in): void = let
  val n  = ch1recv(ch)
  val () = console_log("recieved from producer: " + n)
  val () = consumer(ch)
in end

implement main0() = let
  val '(chin0, chout0) = ch1make()
  val '(chin1, chout1) = ch1make()
  val '(chin2, chout2) = ch1make()
  val () = ch1link(chin0, chout1)
  val () = ch1link(chin1, chout2)
  val _ = go(producer(chout0))
  val _ = go(consumer(chin2))
  val _ = go(helloloop())
in end

