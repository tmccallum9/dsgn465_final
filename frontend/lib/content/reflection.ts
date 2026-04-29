// RFC2 §10: Reflection content for /results page
// Tyler to author final content

export interface ReflectionQuestion {
  id: string;
  prompt: string;
  answer: string;
}
export const REFLECTION = {

  context: `At BCG, I will face a wide range of objections when introducing new ideas to clients. In large organizations, innovation is rarely blocked by a lack of ideas. It is blocked by a lack of confidence. Teams struggle to align on how to proceed, worry about whether something has been done before, and often get stuck in proof of concept loops without real commitment.  [oai_citation:0‡Growth Innovation 2026 - Class 3. share.pdf](sediment://file_00000000613c722faeba304ba1487e1e)

This game reflects that reality. It is not about having the perfect answer. It is about recognizing the underlying tension behind an objection and responding with the right lens. Whether that tension sits in customer relevance, organizational fit, or values, the goal is to diagnose it quickly and respond in a way that builds confidence. Over time, that is how ideas move from possibility to action.

The deeper lesson is that innovation is a design challenge, not just a strategic one. Organizations are living systems, and confidence has to be built deliberately.  [oai_citation:1‡Growth Innovation 2026 - Class 3. share.pdf](sediment://file_00000000613c722faeba304ba1487e1e) This game is practice for doing exactly that.`,

  questions: [
    {
      id: 'q1',
      prompt: 'What liquid expectations should you consider, including direct, experiential, and perceptual expectations, and what evidence can you provide to demonstrate this?',
      answer: `In my upcoming internship and professional roles, I should assume that the people I serve will compare the organization not only to direct alternatives, but also to the best experiences they have with any product, service, platform, or workplace interaction that makes a complicated task feel simple, respectful, and personally relevant. Direct expectations will come from peer organizations that offer similar value, similar roles, or similar services, because stakeholders will already have a mental model for what competent performance looks like and will notice when our experience feels slower, less transparent, or less useful than a close substitute.

Experiential expectations will come from moments outside the organization's category, because people now expect clear status updates, intuitive self-service, responsive communication, and low-friction handoffs after seeing those mechanics work well in other parts of their lives. Perceptual expectations will come from the broader meaning people attach to the organization, because a company that presents itself as innovative, human-centered, or trustworthy will be judged against that promise even when the specific interaction is routine.

The evidence I would use to demonstrate these expectations would include stakeholder interviews, onboarding feedback, support tickets, usage analytics, internal process maps, competitive benchmarking, and observation of where people create workarounds because the formal experience does not meet their standard. If interns, employees, customers, or partners repeatedly ask for clearer next steps, faster decisions, more personalized guidance, or better visibility into why something is happening, that pattern would show that expectations are liquid rather than contained within one narrow category.`

    },
    {
      id: 'q2',
      prompt: 'What organizational innovation context should you consider, what are the relevant postures, and what evidence supports this?',
      answer: `The organizational innovation context I should consider is whether the organization treats innovation as exploration, execution, adaptation, or protection, because each posture changes what kind of contribution will be useful during an internship or early professional role. If the organization is in an explorer posture, the evidence would include ambiguous problem statements, appetite for experiments, tolerance for incomplete information, and leaders who ask for options before asking for a business case. If the organization is in an optimizer posture, the evidence would include established processes, clear performance metrics, and interest in improving speed, quality, cost, or coordination without disrupting the whole operating model.

If the organization is in a defender posture, the evidence would include heavy approval layers, risk language that appears early in conversations, emphasis on reputation, and a preference for proven approaches over unfamiliar ones. If the organization is in a transformer posture, the evidence would include public commitments to change, reorganized teams, new capability investments, visible executive sponsorship, and tension between legacy ways of working and the future state the organization says it wants.

I should not assume the posture from the organization's external messaging alone, because many organizations describe themselves as innovative while their internal routines reward predictability, consensus, and short-term delivery. The stronger evidence will come from how decisions are made, how resources are allocated, who has permission to test new ideas, what happens after a failed experiment, and whether people closest to the work can influence the design of new solutions.`
    },

    {
      id: 'q3',
      prompt: 'How can you in your internship or role support innovation within the organization, and what are some hacks you will employ?',
      answer: `I can support innovation in my internship or role by becoming useful at the moment when a good idea is still fragile, because early ideas often fail not because they are weak, but because they are poorly framed, disconnected from stakeholder incentives, or presented before the organization has enough confidence to act. My first hack will be to translate broad ambition into a small testable question, since a focused question lowers the emotional and political cost of experimentation while still creating evidence that can move the conversation forward.

My second hack will be to map the stakeholders around an idea before trying to sell the idea, because innovation depends on the people who approve, block, fund, use, maintain, and explain the work after the initial excitement fades. I would look for each stakeholder's success metric, fear, constraint, and language, then shape the recommendation so it feels connected to their reality rather than like an abstract improvement imposed from the outside.

My third hack will be to create tangible artifacts before asking for commitment, such as a one-page concept, prototype, decision tree, pilot plan, before-and-after journey, or lightweight metric dashboard that makes the idea easier to discuss. My fourth hack will be to document objections as design inputs rather than treating them as resistance, because a repeated objection often reveals the exact trust gap, capability gap, or incentive gap that the innovation must solve before it can scale.`
    },

    {
      id: 'q4',
      prompt: 'How does the organization support or not support conscious innovation, and what evidence tells you this?',
      answer: `The organization supports conscious innovation when it makes the consequences of new ideas visible before those ideas become locked into systems, incentives, and routines. Evidence of support would include clear ethical review practices, inclusive research with affected stakeholders, accessible escalation paths, transparent success metrics, and decision processes that ask who benefits, who might be harmed, who is excluded, and what tradeoffs are being accepted.

The organization may not support conscious innovation if it treats responsibility as a final compliance checkpoint rather than as part of the design process, because by the time a new initiative reaches final approval, the core assumptions may already be difficult to change. Evidence of weak support would include teams measuring only efficiency or revenue, limited user research, vague ownership for unintended consequences, pressure to launch before risks are understood, or a culture where junior employees notice concerns but do not know where those concerns should go.

In my role, I would look for whether conscious innovation is embedded in everyday artifacts such as project briefs, meeting agendas, pilot metrics, procurement decisions, and post-launch reviews. If responsibility appears only in public statements, annual reports, or training modules, I would treat that as incomplete evidence, while repeated operational practices would show that the organization is more serious about building innovation that is useful, fair, and durable.`
    },

    {
      id: 'q5',
      prompt: 'What are your reflections on conscious innovation, and how will you take those reflections forward in your career?',
      answer: `My main reflection on conscious innovation is that good intentions are not enough, because an idea can create value for one group while quietly transferring cost, confusion, risk, or exclusion to another group. I want to carry forward the habit of asking consequence-based questions early, especially when a project feels exciting, technically impressive, or strategically urgent, because those are the moments when teams can become most willing to overlook the people who are not in the room.

I also see conscious innovation as a professional discipline rather than a personal preference, because it requires evidence, process, and accountability instead of relying on someone to be thoughtful at the right moment. In my career, I will try to make responsibility visible through concrete practices, including naming affected stakeholders, asking what data is missing, separating what we know from what we assume, and pushing for pilots that measure trust, accessibility, comprehension, and unintended consequences alongside financial or operational outcomes.

The way I take this forward will be through the kinds of questions I normalize in team settings. I want to become someone who can raise concerns without stopping momentum, frame ethical issues as design issues, and help teams see that conscious innovation is not a constraint on ambition, but a way to make ambition more credible and more resilient.`
    },

    {
      id: 'q6',
      prompt: 'What are your reflections on innovation postures, and how will you take those reflections forward in your career?',
      answer: `My reflection on innovation postures is that there is no single correct way for an organization to approach innovation, because the right posture depends on the organization's goals, constraints, capabilities, risk tolerance, and moment in time. An exploratory posture can be powerful when the problem is ambiguous, an optimizing posture can be valuable when the system already works but needs improvement, a defensive posture can be rational when trust and reliability are central, and a transformational posture can be necessary when the current model no longer fits the environment.

The career lesson for me is that I should diagnose the posture before recommending the move, because a recommendation that sounds bold in one context may sound reckless in another, while a recommendation that sounds practical in one context may sound timid when the organization actually needs reinvention. I will take this forward by listening for the language people use around risk, speed, evidence, ownership, and success, then adapting my contribution so it matches the organization's real readiness rather than the posture I personally prefer.

I also want to use innovation postures as a way to understand myself, because I am naturally drawn to making ideas concrete and moving them toward action, which can be valuable but can also cause me to rush past ambiguity before the team has learned enough. In my career, I want to become more flexible across postures, so I can explore when discovery is needed, optimize when discipline matters, defend when trust is at stake, and help transform when the evidence shows that incremental change will not be enough.`
    },

  ],

  designNotes: `Filtering objections into clear framework categories makes the game easier to learn, but it removes the ambiguity that exists in real-world situations. In practice, objections often sit across multiple dimensions at once. The scoring system is intentionally soft because innovation is not binary. Progress matters more than perfection. Keeping the frameworks visible reinforces that this is about applying thinking, not memorizing answers. The goal is to build confidence and fluency, not just correctness.`

};
