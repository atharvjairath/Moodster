import speech_recognition as sr
from os import path
AUDIO_FILE = r'C:\Users\Atharv\Desktop\YourTime\Moodster\AI\text_to_speech\Recording.wav'

r = sr.Recognizer()
with sr.AudioFile(AUDIO_FILE) as source:
    audio = r.record(source)  # read the entire audio file
text = r.recognize_google(audio)
print(text)