from prompts import HR_PROMPT, TECH_PROMPT
from llama_client import ask_llama

class InterviewAgent:
    def __init__(self, company, role, level):
        self.company = company
        self.role = role
        self.level = level
        self.history = []

    def _ask(self, system_prompt, user_answer):
        messages = [{"role": "system", "content": system_prompt}]

        for role, content in self.history:
            messages.append({"role": role, "content": content})

        messages.append({"role": "user", "content": user_answer})

        reply = ask_llama(messages)

        self.history.append(("user", user_answer))
        self.history.append(("assistant", reply))

        return reply

    def hr_interviewer(self, answer):
        return self._ask(
            HR_PROMPT.format(
                company=self.company,
                level=self.level
            ),
            answer
        )

    def tech_interviewer(self, answer):
        return self._ask(
            TECH_PROMPT.format(
                company=self.company,
                role=self.role,
                level=self.level
            ),
            answer
        )
