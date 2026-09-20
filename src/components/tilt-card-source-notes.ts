// Original Bencho Tilt card explanatory comments, preserved from the supplied MIT source.
// https://bencho.dev/licence
// React-specific notes describe the original; TiltCard.astro adapts it to native events.

/* BUTTERFLY was Bencho's own pictures, which are not licensed
   to travel. Point this at yours. */

/* ══ Tilt ═════════════════════════════════════════════════
   A picture card that gives under the pointer.

   IT SINKS, IT DOES NOT LIFT. Every tilt card on the internet
   rotates TOWARD the cursor: the corner you are nearest rises
   to meet you and the card reads as a slab of glass catching
   the light. This one does the opposite — the point you are
   over goes AWAY, and the far side comes up. The difference
   is one minus sign and it is the whole component: a surface
   that rises to your finger is being displayed to you, and a
   surface that gives under it is being touched.

   Which means the sign is not a detail to get right by
   fiddling. Cursor at the top → the top edge has to go back,
   which is a POSITIVE rotateX; cursor at the right → the
   right edge goes back, which is a positive rotateY. Hence
   `rx = -ny` and `ry = +nx`, the negation of the usual pair.

   THE ROTATION ALONE IS NOT ENOUGH. A rotation about the
   centre is symmetric — the near side down, the far side up
   by the same amount — and on its own it reads as a card
   pivoting, not as one being pressed. What makes it a press
   is that the darkest point tracks the pointer: a depression
   catches shadow at its deepest, and the rim opposite catches
   light. Those two gradients are doing at least as much of
   the work as the transform is, and neither would convince on
   its own.

   ONE PAIR OF NUMBERS IS THE STATE. Two springs hold where
   the pointer is, normalised to -1..1, and the rotation, both
   gradients and the shadow are all read off them. Nothing
   here has a transition of its own — see the note on Sound
   for why that matters, which is the same reason. */

/* Portrait, and the picture is cropped to it by
   scripts/butterfly.sh rather than being fitted at runtime —
   change one and change the other or the crop moves. */

/* ── how deep the room is ──────────────────────────────────
   The one number that decides whether this reads as a card
   turning or as a poster being sheared. Perspective is the
   distance from the viewer to the screen, so a small number
   is a face close to the glass: the near corner grows, the
   far corner shrinks, and ten degrees looks like thirty.

   800 against a 320px card is about two and a half card
   heights back — far enough that the foreshortening is a
   suggestion rather than a fisheye, close enough that the
   corners are visibly different sizes. It is not a knob
   because it is not a separate idea from the tilt: both
   answer "how 3D", and two sliders for one feeling is how a
   panel stops meaning anything. */

/* how far the whole card retreats while it is being touched.
   Small on purpose — this is the difference between a card
   that tips and a card that is pushed, and at anything past
   about twenty it stops being a press and becomes a zoom. */

/* ── inlined from ./spring ──────────────────────── */

/* ── one spring, for everything that settles ───────────────
   The maths was already on this bench twice, copied by hand:
   Humidity's wheel and Brightness's column both accumulate
   velocity toward a target, damp it, and snap when both the
   delta and the velocity fall under 0.02. Two copies is a
   coincidence; five would be a policy, so it comes out here
   before the elastic blocks are written against it.

   The two shipped copies are deliberately NOT refactored onto
   this. They work, they are tuned, and rewriting the innards
   of two live components to prove a point about duplication
   is how a good afternoon becomes a bad one. This is the one
   new code uses.

   Frames, not milliseconds. `dt` is expressed in sixtieths of
   a second and the damping is RAISED to it rather than
   multiplied by it, so a dropped frame decays the same amount
   of energy as the two frames it replaced. Multiplying is the
   version that makes a spring behave differently on a busy
   page, which is the hardest kind of bug to see.

   The loop parks itself the moment the value has settled.
   CLAUDE.md is not complimentary about the one permanent
   requestAnimationFrame already on this bench and there is no
   case for five more. */

/* 0..100 into the two numbers a spring actually has.

   50 is what Humidity and Brightness were tuned at, which is
   the rule every elastic knob on this bench follows — see
   lab/motion. Turn the panel to the middle and nothing has
   changed.

   Both ends have to be usable, which is what fixes the range:
   at 0 it is slow and heavy and still arrives, at 100 it is
   quick with a visible overshoot, and nowhere in between does
   it ring for longer than it takes to read. */

/* The pair is chosen by DAMPING RATIO and then written back
   as stiffness and decay, because the ratio is the thing a
   person is actually setting and the two numbers on their own
   do not say what they add up to.

     zeta = -ln(d) / (2 * sqrt(k))

   The first version of this ran 0.06..0.26 stiffness against
   0.93..0.74 decay, which reads as a sensible spread and is
   not one: it puts zeta between 0.15 and 0.16 across the
   WHOLE range, so every setting overshot by about sixty per
   cent and the knob only changed how fast it did it. Pull's
   return went 130px past its own resting position and lifted
   the content off the top of the card.

     0   → zeta ~0.85, heavy, arrives without a ring
     50  → zeta ~0.41, near where Humidity and Brightness sit
     100 → zeta ~0.20, lively, two visible rebounds

   Both ends shippable, which is the constraint that fixed the
   numbers rather than taste. */

/* stiffness: how hard it is pulled toward the target */

/* decay, per frame: how much of the velocity survives */

/* Units matter. The snap threshold is absolute, so a caller
   works in pixels or in 0..100 — a spring driven over 0..1
   would be "settled" before it had visibly moved. */

/* `tune` sits here beside `target` for the reason
       Brightness spells out: the loop closes over it, so
       without it a knob turned mid-flight would do nothing
       until something else restarted the effect. Restarting
       picks up from the refs, so it continues rather than
       snapping. */

/* Read once, the way the wheel and the pill nav do. A
   preference, not a live input. */

/* the most either axis turns, in degrees */

/* how dark the dent gets, 0..100 */

/* ── the state, and there is only this ───────────────────
     Where the pointer is, as -1..1 on each axis, sprung. The
     spring is on the POSITION rather than on the rotation, so
     the gradients and the transform can never disagree about
     where the finger is — they are three readings of one
     number instead of three things being animated towards
     the same place.

     Sprung rather than tracked one-to-one because a card with
     no weight follows the cursor exactly and reads as a
     texture pinned to the mouse. The lag is what gives it
     mass, and the settle on the way out is the only reason
     leaving the card feels like anything at all. */

/* one more for how much of any of this applies, so the
     shadow and the sheen fade rather than cutting */

/* the pointer in the card's own terms, as a PERCENTAGE —
     the wall and the overlay both draw this block at their
     own scale, and a gradient placed in pixels would land
     somewhere else in each of them */

/* measured from the FRAME, which never moves. Reading the
       card instead would be asking a rotating object where it
       is, and near the edges it has already turned away from
       the pointer that is asking. */

/* pointer, not mouse: the same handler carries a finger
         dragged across the card, so a phone gets the effect
         while it is being touched rather than getting nothing
         at all. */

/* ── `out` with a containment test, NOT `leave` ───────
         Which is what leave IS — the browser derives it from
         exactly this event by asking whether the thing you
         moved to is inside the thing you were on — so this is
         not a second mechanism, it is the same one written
         out. What it buys is the case React would not
         synthesise: the rehearsal drives a scripted pointer by
         dispatching `pointerout`, and its final beat walks off
         the card carrying `relatedTarget: null`. Measured, no
         `onPointerLeave` came of it, and every card on the
         wall finished its demo still sunk under a cursor that
         had gone.

         Null counts as outside, which is also the honest
         answer for a real pointer leaving the window. */

/* a touch taken over by a scroll never reports leaving */

/* translateZ FIRST, so the retreat is measured in
             the room's axes rather than in the card's own —
             after a rotation, the card's z points somewhere
             off to the side and "back" stops meaning back. */

/* ── the shadow TIGHTENS ────────────────────────
             A thing pressed into a surface has less air under
             it, so the gap closes and the shadow draws in.
             Growing it on hover is the reflex — it is what a
             card that LIFTS would do — and it fights every
             other cue here. */

/* ── the dent, and the rim opposite it ───────────
            The shadow pools where the surface is deepest,
            which is under the pointer, and the light catches
            the far edge that has risen — so the two are
            placed at mirrored points and neither is centred
            on anything. This is the layer that makes the
            transform read as a press. */

/* ══ Tilt ═══════════════════════════════════════════════════
   A picture card that gives under the pointer. Almost nothing
   is here: the rotation, both gradients and the shadow are
   written per frame from the pointer's position, and a rule
   in this file that also had an opinion about any of them
   would be a second author. What is left is the things that
   are true whatever the pointer is doing. */

/* The frame is what the pointer is measured against and it
     is deliberately the ONLY thing in here that never moves.
     The perspective lives on it rather than on the card for
     the usual reason: on the card itself, `perspective` is
     applied per element and the vanishing point rides along
     with the rotation instead of staying put in the room. */

/* `cover` and a fixed frame, so the crop is the one
     scripts/butterfly.sh already made rather than a second
     one on top of it */

/* NO `will-change`. It would hold a composited layer for
     every copy of this block on the wall, permanently, to
     save one frame on a hover that may never come — the same
     bookkeeping CLAUDE.md objects to for permanent rAF. The
     browser promotes this on its own once the transform
     starts moving. */

/* ── the dent and the rim ───────────────────────────────────
   One element, two gradients, both placed from the pointer —
   the dark one under it and the light one at its mirror. It
   inherits the corner rather than being told one, so the knob
   only has to reach the card. */
