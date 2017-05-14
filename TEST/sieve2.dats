
#include "share/atspre_define.hats"
#include "{$LIBATSCC2JS}/mylibies.hats"

staload "./../SATS/basic.sats"

fun ch1filter{a:t@ype}(in0: ch1in, f: (a) -<cloptr1> bool): ch1in = let
  fun loop{a:t@ype}(cout: ch1out, cin: ch1in, f: (a) -<cloptr1> bool): void = let
    val v  = ch1recv{a}(cin)
    val () = if f(v) then ch1send{a}(cout, v) else ()
  in
    loop{a}(cout, cin, f)
  end
  val '(in1, out1) = ch1make()
  val _ = go(loop(out1, in0, f))
in
  in1
end

fun ch1iota(n: int, step: int): ch1in = let
  fun loop(cout: ch1out, n: int, step: int): void = let
    val _ = ch1send(cout, n)
  in
    loop(cout, n + step, step)
  end
  val '(cin, cout) = ch1make()
  val _ = go(loop(cout, n, step))
in
  cin
end

fun sieve(up: ch1in): ch1in = let
  fun loop(up: ch1in, dn: ch1out): void = let
    val n0 = ch1recv{int}(up)
    val () = ch1send{int}(dn, n0)
    val up2 = ch1filter{int}(up, lam (n) => n % n0 > 0)
  in
   loop(up2, dn)
  end
  val '(up2, dn2) = ch1make()
  val _ = go(loop(up, dn2))
in
  up2
end


fun consumer(ch: ch1in): void = let
  val n = ch1recv{int}(ch)
  val () = console_log("received: " + toString(n))
  val () = msleep(1000)
  val () = consumer(ch)
in end

implement main0() = let
  val N = ch1iota(2, 1)
  val P = sieve(N)
  val _ = go(consumer(P))
in end






