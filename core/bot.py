import nltk
import string
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from core.models import BotTrainer

#nltk.download('all')

raw = None
sent_tokens = None
word_tokens = None
lemmer = None
remove_punct_dict = None


def train():
    global raw
    global sent_tokens
    global word_tokens
    global lemmer
    global remove_punct_dict
    if not BotTrainer.objects.filter().exists():
        raw = BotTrainer.objects.create().text
    else:
        raw = BotTrainer.objects.filter().first().text
    sent_tokens = nltk.sent_tokenize(raw, language='russian')  # converts to list of sentences
    word_tokens = nltk.word_tokenize(raw, language='russian')  # converts to list of words
    lemmer = nltk.stem.WordNetLemmatizer()
    remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)


def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]


def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))


def response():
    if raw == "":
        return "Я вас не понял"
    robo_response = ''
    russian_stopwords = stopwords.words("russian")
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words=None)
    TfidfVec.stop_words_ = russian_stopwords
    tfidf = TfidfVec.fit_transform(sent_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]

    if req_tfidf == 0:
        robo_response = robo_response + "Я вас не понял"
        return robo_response
    else:
        robo_response = robo_response + sent_tokens[idx]
        return robo_response


def bot(text):
    global word_tokens
    user_response = text.lower()
    sent_tokens.append(user_response)
    word_tokens = word_tokens + nltk.word_tokenize(user_response)
    final_words = list(set(word_tokens))
    text = response()
    sent_tokens.remove(user_response)
    return text
