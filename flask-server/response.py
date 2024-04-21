GOOGLE_API_KEY = "AIzaSyCJOqrrnesFYSg0m-BHExHhouYCxLSqaPM"
import google.generativeai as genai
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

def gemini_preprocess(prompt):
    context = f'Отнеси следующий вопрос {prompt} к одной из следующих категорий \n' + 'Музей, Памятник, Смотровая площадка, Дворец, Выставочный зал, Парк, Развлечения, Выставочный комплекс, Архитектурный памятник'
    response = model.generate_content(context)
    return response


if __name__ == "__main__":
    print(gemini_preprocess("Я хочу посетить исторические места"))