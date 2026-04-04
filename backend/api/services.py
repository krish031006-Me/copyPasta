from cerebras.cloud.sdk import Cerebras
import os
import json

def inference(user_input):
    # getting the cerbras API key stored in environment variables
    client = Cerebras(
        api_key=os.environ.get("CEREBRAS_API_KEY")
    )
    
    prompt = """
     You are an autonomous data classification engine. Your task is to analyze the user's input and categorize it into one of three types: TEXT, CODE, or LINK.

    Classification Rules:
    1. "link": If the input is a valid URL, URI, or web address.
    2. "code": If the input is a snippet of programming code, markup language, or a script.
    3. "text": If the input is natural language, prose, or anything that does not clearly fit the other two categories.

    Language Detection Rules:
    - If the type is "code", identify the specific programming language (e.g., "Python", "JavaScript", "HTML" etc.).
    - If the type is "text" or "link", the language field MUST be strictly null.

    Output Rules:
    You MUST respond with ONLY a valid JSON object. Do not include markdown code blocks (like ```json), do not include greetings, and do not provide any explanations.

    Expected JSON Schema:
    {
    "content_type": text | code | link,
    "language": "LanguageName" | null
    }
        
        """

    # getting the result from cerebras
    completion = client.chat.completions.create(
        response_format={"type": "json_object"}, 
        temperature=0.0,
        max_tokens=100,
        model="llama3.1-8b",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": user_input}],
    )

    ai_result = json.loads(completion.choices[0].message.content)
    if not ai_result["language"]:
        ai_result["language"] = "english"
    print(ai_result)
    return ai_result 