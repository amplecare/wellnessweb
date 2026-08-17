import type { LandingContent } from '@/components/seo/LandingPage';

/** How it feels on shift right now. Retention owns intent to leave; absence owns days lost. */
export const careStaffMorale: LandingContent = {
  path: '/care-staff-morale',
  eyebrow: 'Care staff morale',
  h1: 'Morale does not collapse.',
  h1Accent: 'It thins, quietly, over months.',
  lead: 'You can feel when the atmosphere in a service has changed, long before it shows up in any figure. Here is how to measure something that feels unmeasurable — and what actually lifts it.',

  recognition: {
    heading: 'The things that go missing first',
    lead: 'Low morale rarely announces itself. It shows up as an absence of things that used to happen.',
    items: [
      'Handovers have become purely functional — the small observations about residents have stopped.',
      'The staff room is quieter, and people take breaks separately rather than together.',
      'Nobody volunteers for anything any more, including things people used to enjoy.',
      'New ideas have stopped coming up in team meetings.',
      'Small irritations between colleagues are escalating in a way they did not used to.',
      'People do their job properly and nothing beyond it, and you can feel the difference.',
    ],
  },

  emotion: {
    quote:
      'Nobody hands in their notice because morale is low. They hand it in because they have stopped believing it will get better.',
  },

  consequence: {
    heading: 'What low morale takes with it',
    lead: 'Morale is not a soft issue. It is the discretionary effort that care quality quietly depends on.',
    steps: [
      'Discretionary effort disappears first — the extra five minutes with a resident who is having a bad day, the noticing of something not quite right.',
      'Communication thins, so information that used to pass informally between colleagues stops moving.',
      'Small problems escalate because nobody feels it is worth raising them early.',
      'Recruitment gets harder too, because a service where morale is low is a service current staff do not recommend to friends.',
    ],
    closing:
      'Care quality depends heavily on people doing slightly more than the task requires. That is precisely what low morale removes.',
  },

  education: [
    {
      eyebrow: 'What morale actually is',
      heading: 'Morale is the visible result of several concrete things',
      paragraphs: [
        'Morale feels intangible, which is why it often gets treated as a mood to be lifted with an event. It is more useful to understand it as the outward sign of a handful of measurable conditions: whether people feel their work is noticed, whether they have any influence over how it is done, whether raising a concern leads anywhere, whether they trust the people above them, and whether the job is currently sustainable.',
        'Each of those can be asked about directly and tracked over time. Once you do, morale stops being a vague atmosphere and becomes a set of specific findings — this team does not feel heard, that team does not trust the rota to be fair.',
        'That reframing matters because it changes what you do. You cannot instruct a team to feel better. You can act on the fact that nobody has had feedback on a change they suggested nine months ago.',
      ],
    },
    {
      eyebrow: 'Why events do not fix it',
      heading:
        'A pizza afternoon lands very differently on a team that has not had a proper break in weeks',
      paragraphs: [
        'Staff appreciation events are pleasant and they are not the problem. The difficulty is when they are the entire response to low morale, because they can read as a substitute for addressing the thing people have actually been raising.',
        'The teams we see respond best to gestures are the teams whose conditions are basically sound — for them, recognition genuinely lands. On a team that is short-staffed, missing breaks and feeling unheard, the same gesture can register as tone-deaf and occasionally makes things worse.',
        'The order matters. Fix what is broken, then recognise people. Doing it the other way round is how a well-intentioned event becomes something staff talk about sarcastically for a year.',
      ],
    },
    {
      eyebrow: 'The single biggest lever',
      heading: 'Closing the loop on what staff tell you',
      paragraphs: [
        'The most consistent finding in this area is unglamorous: morale responds strongly to whether people can see that speaking up changes something. Not whether they get what they asked for — whether they find out what happened to it.',
        'Most providers gather views more often than they realise, through supervisions, team meetings, suggestion boxes and surveys. Where it breaks down is the return journey. People contribute, nothing visible follows, and they conclude it was decorative. The next time they are asked, they do not bother.',
        'This is why we build feedback into the process rather than treating it as a courtesy. Telling staff what the assessment found, what will change, and what will not change and why, is one of the cheapest and most effective interventions available.',
      ],
    },
  ],

  solution: {
    heading: 'Turning an atmosphere into something you can act on',
    steps: [
      {
        icon: 'clipboard',
        title: 'Measure the components',
        body: 'Recognition, voice, trust, autonomy and sustainability, asked confidentially across the whole workforce rather than inferred from how the building feels.',
      },
      {
        icon: 'chart',
        title: 'Locate it precisely',
        body: 'Results by team, shift and length of service, so you can see that one unit is struggling rather than concluding the whole service is.',
      },
      {
        icon: 'users',
        title: 'Close the loop, visibly',
        body: 'Feed the findings back to staff with what will change and what will not — the step most providers skip and the one that most affects whether they engage next time.',
      },
      {
        icon: 'link',
        title: 'Re-measure',
        body: 'The same questions later, so improvement is demonstrable rather than a matter of opinion.',
      },
    ],
  },

  evidenceIds: ['turnover-rate', 'sickness-absence'],

  objections: [
    {
      objection: 'Morale is too subjective to measure.',
      answer:
        'Individual feelings are subjective; patterns across a workforce are not. Asking consistent questions about recognition, voice and trust, then tracking the answers over time, produces something you can genuinely act on and defend.',
    },
    {
      objection: 'We do staff recognition already.',
      answer:
        'Recognition works well when the underlying job is sustainable and can land badly when it is not. Worth knowing which situation each of your teams is in before adding more of it.',
    },
    {
      objection: 'Morale is low because of pay, and we cannot change that.',
      answer:
        'Pay is often part of it. But teams on identical pay in the same organisation frequently report very different morale, and that difference is usually about how they are managed, heard and supported day to day.',
    },
    {
      objection: 'Our managers already know how their teams feel.',
      answer:
        'Good managers have a real feel for it, and they also have a blind spot: staff tend not to tell a manager that the manager is part of the problem. A confidential route surfaces what supervision cannot.',
    },
    {
      objection: 'Will asking about morale not raise expectations we cannot meet?',
      answer:
        'It will, if you ask and then say nothing. That is why feeding back is built into our process, including what will not change and why. Staff are generally realistic about constraints; what they react badly to is silence.',
    },
    {
      objection: 'We had a bad period but things have settled.',
      answer:
        'Quite possibly, and a measurement would confirm it rather than leaving it to impression. Trust also takes considerably longer to recover than conditions do, so a service can be functioning well while morale still lags behind.',
    },
  ],

  faqs: [
    {
      question: 'How do you improve staff morale in a care home?',
      answer:
        'Measure what is actually driving it — recognition, voice, trust, autonomy and sustainability — address the specific conditions the findings identify, and visibly close the loop with staff about what will and will not change.',
    },
    {
      question: 'What are the signs of low morale in a care team?',
      answer:
        'Functional handovers with no informal observations, quieter staff rooms, nobody volunteering, no new ideas raised, minor conflicts escalating, and people doing the task but nothing beyond it.',
    },
    {
      question: 'How is morale different from engagement?',
      answer:
        'They overlap heavily. Morale describes how a team feels day to day; engagement describes how invested people are in the work and the organisation. In practice we measure both and report them together.',
    },
    {
      question: 'Can you measure morale without staff identifying themselves?',
      answer:
        'Yes, and it only works that way. Responses are confidential and reported in aggregate with a minimum group size, so no individual or very small team can be identified from the results.',
    },
    {
      question: 'How quickly can morale improve?',
      answer:
        'Faster than most people expect when the change is visible and specific, and slower than expected where trust has been damaged. Feeding back findings honestly is usually the fastest single lever.',
    },
    {
      question: 'Does low morale really affect care quality?',
      answer:
        'Care quality depends substantially on discretionary effort — the noticing, the extra few minutes, the informal passing on of information. That is exactly what low morale removes first, which is why it is an operational issue rather than a soft one.',
    },
  ],

  finalCta: {
    heading: 'You can feel that something has changed. It is worth finding out what.',
    body: 'Book a free consultation and we will talk through what is happening in your teams.',
  },
};
