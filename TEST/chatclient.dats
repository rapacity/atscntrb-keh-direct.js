
#include "share/atspre_define.hats"
#include "{$LIBATSCC2JS}/mylibies.hats"

staload "./../SATS/basic.sats"
//staload "./../SATS/frp.sats"
//staload _ = "./../DATS/frp.dats"

#define ATS_MAINATSFLAG 1
#define ATS_DYNLOADNAME "my_dynload"
 
staload UN = "prelude/SATS/unsafe.sats"

extern fun my_dynload(): void = "mac#my_dynload"

%{$

function _ats2keh_getElementById(s) {
  return document.getElementById(s);
}

function _ats2keh_addEventListener(d, s, f) {
  return d.addEventListener(s, f);
}

function _ats2keh_addEventSubscriber(d, s, c, f) {
  return d.addEventListener(s, function(evt) {
    _ats2keh_addCoroutine(function*() {
      yield * f(c, evt);
    });
    M.wakeup();
  });
}

function _ats2keh_chpipe_ev(d, s, c) {
  d.addEventListener(s, function (evt) { 
    M.addCoroutine(function*() { yield* _ats2keh_ch1send_kehyield_(c, evt); });
  });
}

function _ats2keh_KeyboardEvent_get(d, s) {
  return d[s];
}


function _ats2keh_dom_get(d, s) {
  return d[s];
}

function _ats2keh_dom_set(d, s, v) {
  return d[s] = v;
}

function appendMessage(nick, msg) {
  var messages = document.getElementById("messages")
  var input = document.getElementById("input")
  var message = document.createElement("div");
  message.classList.add("message");
  messages.appendChild(message);
  message.textContent = msg;
  messages.appendChild(document.createElement("hr"));
  messages.scrollTop = messages.scrollHeight;
}

function setNick(nick) {
  var dom = document.getElementById("nick")
  dom.textContent = nick + " >";
}



%}

abstype dom

abstype KeyboardEvent

extern fun setNick(s: string): void = "mac#setNick"

extern fun appendMessage(n: string, s: string): void = "mac#appendMessage"

extern fun getElementById(s: string): dom = "mac#_ats2keh_getElementById"
//extern fun addEventListener(d: dom, s: string, f: (dom) -<lin,cloptr1> void): void = "mac#_ats2keh_addEventListener"

extern fun addEventListener{a:t@ype}(d: dom, s: string, f: (a) -> void): void = "mac#_ats2keh_addEventListener"

extern fun addEventSubscriber{a:t@ype}(d: dom, s: string, c: ch1out, f: (!ch1out, a) -> void): void = "mac#_ats2keh_addEventSubscriber"

extern fun KeyboardEvent_get{a:t@ype}(d: KeyboardEvent, s: string): a = "mac#_ats2keh_KeyboardEvent_get"

extern fun dom_get{a:t@ype}(d: dom, s: string): a = "mac#_ats2keh_dom_get"

extern fun dom_set{a:t@ype}(d: dom, s: string, v: a): void = "mac#_ats2keh_dom_set"


fun chpipe_ev{a:t@ype}(d: dom, s: string, c: ch1out): void =
  addEventSubscriber{a}(d, s, c, lam (c,x) => ch1send(c,x))

fun chmake_ev{a:t@ype}(d: dom, s: string): ch1in = let
  val '(cin, cout) = ch1make()
  val () = chpipe_ev(d, s, cout)
in
  cin
end

fun consumer(cin: ch1in, cout: ch1out): void = let
  val evt   = ch1recv{KeyboardEvent}(cin)
  val code  = KeyboardEvent_get{string}(evt, "code")
  val input = getElementById("input")
  val value = dom_get{string}(input, "value")
  val ()    = if code = "Enter" && value <> "" then let
      val input = getElementById("input")
      val value = dom_get{string}(input, "value")
      val ()    = dom_set{string}(input, "value", "")
      val ()    = ch1send(cout, value)
    in end
  val ()    = consumer(cin, cout)
in end

fun display(cin: ch1in): void = let
  val msg  = ch1recv{string}(cin)
  val ()   = console_log(msg)
  val ()   = appendMessage("", msg)
  val ()   = display(cin)
in end

fun write(nick: string, cin: ch1in, cout: ch1out): void = let
  val msg  = ch1recv{string}(cin)
  val ()   = ch1send{string}(cout, nick + " > " + msg)
  val ()   = console_log(msg)
  val ()   = write(nick, cin, cout)
in end


implement main0() = let
  val ()             = my_dynload()
  val nick           = "guest" + toString(JSmath_round(JSmath_random() * 1000))
  val ()             = setNick(nick)
  val '(wsin,wsout)  = ch2split(chmake_ws("ws://localhost:5000/"))
  val input          = getElementById("input")
  val cin0           = chmake_ev(input, "keypress")
  val '(cin1, cout1) = ch1make()
  val _              = go(consumer(cin0, cout1))
  val _              = go(display(wsin))
  val _              = go(write(nick, cin1, wsout))
in end

