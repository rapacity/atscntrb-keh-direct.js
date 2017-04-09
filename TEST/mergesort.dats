
#include "share/atspre_define.hats"
#include "{$LIBATSCC2JS}/mylibies.hats"

#include "../SATS/direct.sats"

staload "{$LIBATSCC2JS}/SATS/HTML/canvas-2d/canvas2d.sats"

staload UN = "prelude/SATS/unsafe.sats"

#define N 64
#define WIDTH 920
#define HEIGHT 600
 
implement main0() = let
  val S = arrayref_make_elt{double}(N, 0.0)
  val () = arrayref_foreach_cloref(S, N, lam(i) => S[i] := JSmath_random())
  val M = arrayref_make_elt{double}(1, 0.0)
  val () = arrayref_foreach_cloref(S, N, lam(i) => M[0] := (if S[i] > M[0] then S[i] else M[0]))
  val M : double = M[0]

  fun {} make_color(r: double) = let
    val c = toString(255.0 - JSmath_round(r * 255.0));
  in
    "rgb(" + c + "," + c + "," + c + ")"
  end

  fun {} draw():<cloptr1> void = let
    val canvas = canvas2d_getById("Patsoptaas-Evaluate-canvas")
    val () = canvas2d_clearRect(canvas, 0, 0, WIDTH, HEIGHT)
    val () = arrayref_foreach_cloref{double}(S, N,
      lam (i) => let
        val intensity = S[i] / M
        val x         = $UN.cast{double}(i) * $UN.cast{double}(WIDTH) / $UN.cast{double}(N)
        val y         = $UN.cast{double}(HEIGHT)
        val width     = $UN.cast{double}(WIDTH) / $UN.cast{double}(N)
        val height    = intensity * $UN.cast{double}(HEIGHT) * ~1.0
        val () = canvas2d_set_fillStyle_string(canvas, make_color(intensity))
      in
        canvas2d_fillRect(canvas, x, y, width * 0.8, height)
      end)
  in end

  fun {a:t@ype} array_swap {i,j,n:nat | i < j; j < n} (A: !arrayref(a,n), i: int i, j: int j): void = let
    val tmp = A[i]
    val () = A[i] := A[j]
    val () = A[j] := tmp
    val () = sleep(1)
    val () = draw()
  in end 
   
  fun {a:t@ype} move_left {i,j,n:nat | i <= j; j < n} (A: arrayref(a,n), i: int i, j: int j): void =
    if i = j then ()
    else let
      val () = array_swap(A,j-1,j)
      val () = move_left(A,i,j-1)
      in end
  
  fun {a:t@ype} merge {i,j,k,n: nat | i <= j; j <= k; k <= n}
    (A: !arrayref(a, n), i: int i, j: int j, k: int k): void =
    if i < j then
      if j < k then let
          val sgn = gcompare_val_val(A[j], A[i])
        in
          if sgn <= 0 then let
            val () = move_left(A, i, j)
            val () = merge(A,i+1,j+1,k)
            in end
          else let
            val () = merge(A,i+1,j,k)
            in end
        end
      else ()
    else ()
  
  fun {a:t@ype} mergesort {sz,l,n:nat | l + sz <= n} (A: !arrayref (a, n), l: int l,  sz: int sz): void =
    if sz >= 2 then let
        val szl = half(sz)
        val szr = sz - szl
        val r   = l + szl
        val () = mergesort(A, l, szl)
        val () = mergesort(A, r, szr)
      in
        merge(A, l, r, l + sz)
      end
    else
      ()

  val () = mergesort(S,0,N)
in end







