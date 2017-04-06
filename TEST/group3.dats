
#include "share/atspre_define.hats"
#include "{$LIBATSCC2JS}/mylibies.hats"

#include "../SATS/direct.sats"

fun worker0(ch: ch2endpt): void = let
  val () = sleep(3000)
  val n  = JSmath_random() * 100000
  val () = ch2send(ch, '(0, n))
  val msg = ch2recv(ch)
  val () = console_log("<worker0> recv: " + msg)
  val () = worker0(ch)
in end

fun worker1(ch: ch2endpt): void = let
  val () = sleep(3000)
  val msg = ch2recv(ch)
  val () = console_log("<worker1> recv: " + msg)
  val n  = JSmath_random() * 100000
  val () = ch2send(ch, '(1, n))
  val () = worker1(ch)
in end

fun worker2(ch: ch2endpt): void = let
  val ()  = sleep(3000)
  val msg = ch2recv(ch)
  val ()  = console_log("<worker2> logged: " + msg)
  val ()  = worker2(ch)
in end


fun ch3link(ch0: ch2endpt, ch1: ch2endpt, ch2: ch2endpt): void = let
  val ch0d = ch2dup(ch0)
  val ch1d = ch2dup(ch1)
  val ch2d = ch2dup(ch2)
  val () = ch2link(ch0,  ch1)
  val () = ch2link(ch0d, ch2)
  val () = ch2link(ch1d, ch2d)
in end

implement main0() = let
  val '(chneg0, chpos0) = ch2make()
  val '(chneg1, chpos1) = ch2make()
  val '(chneg2, chpos2) = ch2make()

  val () = ch3link(chpos0, chpos1, chpos2)

  val _ = go(worker0, '(chneg0))
  val _ = go(worker1, '(chneg1))
  val _ = go(worker2, '(chneg2))
in end

