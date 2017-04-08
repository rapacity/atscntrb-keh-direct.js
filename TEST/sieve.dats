
#include "share/atspre_define.hats"
#include "{$LIBATSCC2JS}/mylibies.hats"

#include "../SATS/direct.sats"

(*
** stream-based
*)

(*
fun
sieve(ns: stream(int)) = $delay
(
let
   val-stream_cons(n1, ns) = !xs
in
   stream_cons(n1, sieve(stream_filter(ns, lam n => n % n1 > 0)))
end
)
*)

fun
filter
   (n0: int, up: ch2endpt, dn: ch2endpt): void = let
   val n = ch2recv{int}(up)
in
   if
   (n % n0 > 0)
   then let
     val () = ch2send{int}(dn, n) in filter(n0, up, dn)
   end // end of [then]
   else filter(n0, up, dn)
end

fun
sieve(up: ch2endpt, dn: ch2endpt): void = let
//
val n0 = ch2recv{int}(up)
val () = ch2send(dn, n0)
val $tup(up2, dn2) = ch2make()
val _ = go(filter(n0, up, dn2))
//
in
   sieve(up2, dn)
end

fun producer(ch: ch2endpt, n: int): void = let
  val () = ch2send(ch, n)
  val () = producer(ch, n+1)
in end

fun consumer(ch: ch2endpt): void = let
  val n = ch2recv{int}(ch)
  val () = console_log("received: " + toString(n))
  val () = sleep(1000)
  val () = consumer(ch)
in end

implement main0() = let
  val '(up0, dn0) = ch2make()
  val '(up1, dn1) = ch2make()
  val _ = go(sieve(dn0, up1))
  val _ = go(producer(up0, 2))
  val _ = go(consumer(dn1))
in end

